import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Execute the actual action source with isolated auth/database dependencies.
// These tests do not load environment files, connect to services, or prove SQL behavior.
function load(file: string, modules: Record<string, unknown>) {
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports: Record<string, (...args: unknown[]) => Promise<unknown>> = {};
  vm.runInNewContext(source, {
    exports,
    require: (name: string) => {
      if (!(name in modules)) throw new Error("Unexpected dependency: " + name);
      return modules[name];
    },
    console,
    FormData,
    Map,
    Date,
  });
  return exports;
}
function setup(authenticated = true) {
  const calls: unknown[] = [];
  const db = {
    blog: {
      create: async (args: unknown) => {
        calls.push(args);
      },
      updateMany: async (args: unknown) => {
        calls.push(args);
        return { count: 1 };
      },
      deleteMany: async (args: unknown) => {
        calls.push(args);
      },
    },
    favourite: {
      findUnique: async () => {
        calls.push("private read");
        return null;
      },
    },
  };
  const identity = {
    requireUser: async () => {
      if (!authenticated) throw new Error("Unauthorized");
      return { user_id: "verified-user" };
    },
    requireSelf: async (id: string) => {
      if (!authenticated || id !== "verified-user")
        throw new Error("Unauthorized");
    },
    publicProfile: {},
  };
  const modules = {
    "@clerk/nextjs/server": {
      auth: async () => ({ userId: authenticated ? "verified-user" : null }),
    },
    "next/navigation": {
      notFound: () => {
        throw new Error("Not found");
      },
      redirect: () => {},
    },
    "@/lib/db": db,
    "@/lib/generated/prisma/client": { Prisma: {} },
    "@/lib/server/users": identity,
    "@/lib/server/action-utils": {
      mutation: (fn: () => unknown) => fn(),
      positiveId: (value: unknown) => Number(value),
      text: (form: FormData, key: string) => form.get(key),
      refresh: () => {},
    },
  };
  return { calls, modules };
}
function blogForm() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    title: "Title",
    description: "Content",
    userId: "victim",
    blogId: "12",
    deleteId: "victim",
  }))
    form.set(key, value);
  return form;
}

test("unauthenticated blog mutation never reaches the database", async () => {
  const { calls, modules } = setup(false);
  const actions = load("lib/actions/blog.actions.ts", modules);
  await assert.rejects(actions.createBlog(blogForm(), "/"));
  assert.equal(calls.length, 0);
});
test("blog author comes from the verified session, not FormData", async () => {
  const { calls, modules } = setup();
  const actions = load("lib/actions/blog.actions.ts", modules);
  await actions.createBlog(blogForm(), "/");
  assert.equal(
    (calls[0] as { data: { user_id: string } }).data.user_id,
    "verified-user",
  );
});
test("blog update includes ownership in the database predicate", async () => {
  const { calls, modules } = setup();
  const actions = load("lib/actions/blog.actions.ts", modules);
  await actions.updateBlog(blogForm(), "/");
  const where = (calls[0] as { where: { id: number; user_id: string } }).where;
  assert.equal(where.id, 12);
  assert.equal(where.user_id, "verified-user");
});
test("bulk deletion cannot target a submitted victim ID", async () => {
  const { calls, modules } = setup();
  const actions = load("lib/actions/blog.actions.ts", modules);
  await actions.deleteAllBlogsByUser(blogForm(), "/");
  assert.equal(
    (calls[0] as { where: { user_id: string } }).where.user_id,
    "verified-user",
  );
});
test("another account's favourites cannot be read", async () => {
  const { calls, modules } = setup();
  const actions = load("lib/actions/favourite.action.ts", modules);
  await assert.rejects(actions.checkIfBlogIsFavourited("victim", 12));
  assert.equal(calls.length, 0);
});
test("actual requireSelf rejects spoofed or absent sessions", async () => {
  let id: string | null = "verified-user";
  const users = load("lib/server/users.ts", {
    "server-only": {},
    react: { cache: (fn: unknown) => fn },
    "@clerk/nextjs/server": { auth: async () => ({ userId: id }) },
    "@/lib/db": {},
  });
  await assert.rejects(users.requireSelf("victim"));
  assert.equal(await users.requireSelf("verified-user"), id);
  id = null;
  await assert.rejects(users.requireSelf("verified-user"));
});
test("missing local profile is rebuilt only from the authenticated Clerk ID", async () => {
  const lookups: string[] = [];
  const users = load("lib/server/users.ts", {
    "server-only": {},
    react: { cache: (fn: unknown) => fn },
    "@clerk/nextjs/server": {
      auth: async () => ({ userId: "verified-user" }),
      clerkClient: async () => ({
        users: {
          getUser: async (id: string) => {
            lookups.push(id);
            return {
              emailAddresses: [
                { id: "email", emailAddress: "test@example.invalid" },
              ],
              primaryEmailAddressId: "email",
              username: null,
              firstName: null,
              lastName: null,
              imageUrl: "",
            };
          },
        },
      }),
    },
    "@/lib/db": {
      user: {
        findUnique: async () => null,
        upsert: async (args: { create: { user_id: string } }) => ({
          user_id: args.create.user_id,
        }),
      },
    },
  });
  const result = (await users.requireUser()) as { user_id: string };
  assert.equal(result.user_id, "verified-user");
  assert.deepEqual(lookups, ["verified-user"]);
});
test("UTC display does not introduce a four-hour offset", async () => {
  const formatter = load("lib/utils/formatDateHour.ts", {});
  assert.equal(
    formatter.default("2026-11-12T23:59:00.000Z"),
    "2026-11-12 23:59",
  );
});

test("actual ID validator accepts decimal IDs and rejects malformed/range-invalid values", () => {
  const helpers = load("lib/server/action-utils.ts", {
    "server-only": {},
    "next/cache": {},
    "next/navigation": {},
  });
  assert.equal(helpers.positiveId("12"), 12);
  for (const value of ["12oops", "1.5", "", "-1", 0, NaN, 2147483648, null])
    assert.throws(() => helpers.positiveId(value));
});
