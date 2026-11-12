"use server";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { requireUser, publicProfile } from "@/lib/server/users";
import { mutation, positiveId, text, refresh } from "@/lib/server/action-utils";
import type { GetBlogsByUserParams, SortOption } from "@/lib/types";

function blogData(form: FormData) {
  const category = form.get("categoryId");
  const image = form.get("image");
  if (image && (typeof image !== "string" || !/^https?:\/\//.test(image)))
    throw new Error("Invalid image URL.");
  return {
    title: text(form, "title", 500),
    description: text(form, "description"),
    image: typeof image === "string" && image ? image : null,
    category_id: category ? positiveId(category) : null,
  };
}
async function blogInclude() {
  const { userId } = await auth();
  return {
    author: { select: publicProfile },
    category: { select: { name: true } },
    _count: { select: { views: true, likes: true, comments: true } },
    likes: { where: { user_id: userId ?? "" }, select: { id: true } },
    favourites: { where: { user_id: userId ?? "" }, select: { id: true } },
  } satisfies Prisma.BlogInclude;
}
type LoadedBlog = Prisma.BlogGetPayload<{
  include: Awaited<ReturnType<typeof blogInclude>>;
}>;
function serialize(blog: LoadedBlog) {
  const { author, category, _count, likes, favourites, ...data } = blog;
  return {
    ...data,
    created_at: data.created_at.toISOString(),
    updated_at: data.updated_at.toISOString(),
    creator: author,
    category_name: category?.name ?? null,
    views: _count.views,
    likes: _count.likes,
    comments: _count.comments,
    isLiked: likes.length > 0,
    isFavourited: favourites.length > 0,
  };
}
function order(sort?: string): Prisma.BlogOrderByWithRelationInput[] {
  const first: Prisma.BlogOrderByWithRelationInput =
    sort === "oldest"
      ? { created_at: "asc" }
      : sort === "title-asc"
        ? { title: "asc" }
        : sort === "title-desc"
          ? { title: "desc" }
          : sort === "most_viewed"
            ? { views: { _count: "desc" } }
            : sort === "most_liked"
              ? { likes: { _count: "desc" } }
              : sort === "most_commented"
                ? { comments: { _count: "desc" } }
                : { created_at: "desc" };
  return [first, { id: "desc" }];
}
async function listing(
  where: Prisma.BlogWhereInput,
  page: number,
  limit: number,
  sort?: string,
) {
  page = Number.isSafeInteger(page) && page > 0 ? page : 1;
  limit = Number.isSafeInteger(limit) ? Math.min(50, Math.max(1, limit)) : 9;
  const include = await blogInclude();
  const [totalCount, blogs] = await Promise.all([
    db.blog.count({ where }),
    db.blog.findMany({
      where,
      include,
      orderBy: order(sort),
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);
  return {
    data: blogs.map(serialize),
    totalPages: Math.max(1, Math.ceil(totalCount / limit)),
    currentPage: page,
    totalCount,
  };
}
export async function createBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.blog.create({
      data: { ...blogData(form), user_id: user.user_id },
    });
    refresh(path);
  });
}
export async function getBlogById(blogId: string) {
  if (
    !/^\d+$/.test(blogId) ||
    Number(blogId) > 2147483647 ||
    Number(blogId) < 1
  )
    notFound();
  const blog = await db.blog.findUnique({
    where: { id: Number(blogId) },
    include: await blogInclude(),
  });
  if (!blog) notFound();
  return serialize(blog);
}
export async function updateBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const result = await db.blog.updateMany({
      where: { id: positiveId(form.get("blogId")), user_id: user.user_id },
      data: blogData(form),
    });
    if (!result.count) throw new Error("Not authorized.");
    refresh(path);
  });
}
export async function deleteBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const result = await db.blog.deleteMany({
      where: { id: positiveId(form.get("blogId")), user_id: user.user_id },
    });
    if (!result.count) throw new Error("Not authorized or already deleted.");
    refresh(path);
  });
}
export async function deleteBlogAndRedirect(form: FormData, path: string) {
  await deleteBlog(form, path);
  redirect(path.startsWith("/") && !path.startsWith("//") ? path : "/my-blogs");
}
export async function deleteAllBlogsByUser(_form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.blog.deleteMany({ where: { user_id: user.user_id } });
    refresh(path);
  });
}
export async function getAllBlogs(
  searchQuery?: string,
  page = 1,
  limit = 9,
  categoryId?: string,
  sort?: "newest" | "oldest" | "most_viewed" | "most_liked" | "most_commented",
) {
  const where: Prisma.BlogWhereInput = {};
  if (searchQuery?.trim())
    where.OR = [
      { title: { contains: searchQuery.trim(), mode: "insensitive" } },
      { description: { contains: searchQuery.trim(), mode: "insensitive" } },
    ];
  if (categoryId && categoryId !== "all")
    where.category_id = positiveId(categoryId);
  return listing(where, page, limit, sort);
}
export async function getBlogsByUser(
  { userId }: GetBlogsByUserParams,
  page = 1,
  limit = 9,
  categoryId?: string,
  sort?: SortOption,
) {
  const session = await auth();
  if (session.userId === userId) await requireUser();
  return listing(
    {
      user_id: userId,
      ...(categoryId && categoryId !== "all"
        ? { category_id: positiveId(categoryId) }
        : {}),
    },
    page,
    limit,
    sort,
  );
}
export async function getRecommendedBlogs(settings: {
  category?: string;
  creator?: string;
  title?: string;
  excludeBlogId?: number;
  excludeUserId?: string;
}) {
  const exclusions = [Prisma.sql`TRUE`];
  if (settings.excludeBlogId)
    exclusions.push(Prisma.sql`id <> ${positiveId(settings.excludeBlogId)}`);
  if (settings.excludeUserId)
    exclusions.push(Prisma.sql`user_id <> ${settings.excludeUserId}`);
  const filters = [...exclusions];
  if (settings.category)
    filters.push(Prisma.sql`category_id = ${positiveId(settings.category)}`);
  if (settings.creator) filters.push(Prisma.sql`user_id = ${settings.creator}`);
  if (settings.title)
    filters.push(Prisma.sql`title ILIKE ${"%" + settings.title + "%"}`);
  const selected = await db.$queryRaw<{ id: number }[]>(
    Prisma.sql`SELECT id FROM blogs WHERE ${Prisma.join(filters, " AND ")} ORDER BY random() LIMIT 7`,
  );
  if (selected.length < 7) {
    if (selected.length)
      exclusions.push(
        Prisma.sql`id NOT IN (${Prisma.join(selected.map((b) => b.id))})`,
      );
    selected.push(
      ...(await db.$queryRaw<{ id: number }[]>(
        Prisma.sql`SELECT id FROM blogs WHERE ${Prisma.join(exclusions, " AND ")} ORDER BY random() LIMIT ${7 - selected.length}`,
      )),
    );
  }
  const blogs = await db.blog.findMany({
    where: { id: { in: selected.map((b) => b.id) } },
    include: await blogInclude(),
  });
  const byId = new Map(blogs.map((b) => [b.id, serialize(b)]));
  return selected
    .map((b) => byId.get(b.id))
    .filter((b): b is NonNullable<typeof b> => !!b);
}
export async function createCategory(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.category.create({
      data: { name: text(form, "name", 255), creator_id: user.user_id },
    });
    refresh(path);
  });
}
export async function updateCategory(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const result = await db.category.updateMany({
      where: {
        id: positiveId(form.get("categoryId")),
        creator_id: user.user_id,
      },
      data: { name: text(form, "name", 255) },
    });
    if (!result.count) throw new Error("Not authorized.");
    refresh(path);
  });
}
export async function deleteCategory(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const result = await db.category.deleteMany({
      where: {
        id: positiveId(form.get("categoryId")),
        creator_id: user.user_id,
      },
    });
    if (!result.count) throw new Error("Not authorized or already deleted.");
    refresh(path);
  });
}
export async function getAllCategories() {
  return db.category.findMany({
    select: { id: true, name: true, creator_id: true },
    orderBy: { name: "asc" },
  });
}
