import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import "next/dist/server/node-environment";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";

function loadProxy() {
  const exports: {
    config?: { matcher: string[] };
    default?: (
      auth: { protect: () => Promise<void> },
      req: unknown,
    ) => Promise<void>;
  } = {};
  const source = ts.transpileModule(readFileSync("proxy.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, {
    exports,
    require: () => ({
      clerkMiddleware: (handler: unknown) => handler,
      createRouteMatcher: () => () => false,
    }),
  });
  return exports;
}

test("upload requests receive Clerk context while static files stay excluded", () => {
  const { config } = loadProxy();
  assert.ok(config);
  for (const url of [
    "/api/uploadthing",
    "/api/uploadthing?slug=imageUploader&actionType=upload",
    "/all-blogs",
  ]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, url }), true);
  }
  assert.equal(
    unstable_doesMiddlewareMatch({ config, url: "/assets/icons/upload.svg" }),
    false,
  );
});

test("upload callbacks are not redirected but private pages remain protected", async () => {
  const proxy = loadProxy().default!;
  let protections = 0;
  const auth = {
    protect: async () => {
      protections++;
    },
  };
  await proxy(auth, { nextUrl: { pathname: "/api/uploadthing" } });
  assert.equal(protections, 0);
  await proxy(auth, { nextUrl: { pathname: "/my-blogs" } });
  assert.equal(protections, 1);
});
