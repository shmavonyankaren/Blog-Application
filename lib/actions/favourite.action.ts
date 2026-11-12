"use server";
import db from "@/lib/db";
import { requireSelf, requireUser, publicProfile } from "@/lib/server/users";
import { mutation, positiveId, refresh } from "@/lib/server/action-utils";
export async function checkIfBlogIsFavourited(userId: string, blogId: number) {
  await requireSelf(userId);
  return !!(await db.favourite.findUnique({
    where: {
      user_id_blog_id: { user_id: userId, blog_id: positiveId(blogId) },
    },
    select: { id: true },
  }));
}
export async function favouriteBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.favourite.createMany({
      data: [
        { user_id: user.user_id, blog_id: positiveId(form.get("blogId")) },
      ],
      skipDuplicates: true,
    });
    refresh(path);
  });
}
export async function unfavouriteBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.favourite.deleteMany({
      where: { user_id: user.user_id, blog_id: positiveId(form.get("blogId")) },
    });
    refresh(path);
  });
}
export async function deleteAllFavouritesByUser(_form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.favourite.deleteMany({ where: { user_id: user.user_id } });
    refresh(path);
  });
}
export async function getAllFavouritesByUser(userId: string) {
  await requireSelf(userId);
  const blogs = await db.blog.findMany({
    where: { favourites: { some: { user_id: userId } } },
    include: {
      author: { select: publicProfile },
      likes: { where: { user_id: userId }, select: { id: true } },
    },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
  });
  return blogs.map(({ author, likes, ...b }) => ({
    ...b,
    created_at: b.created_at.toISOString(),
    updated_at: b.updated_at.toISOString(),
    creator: author,
    isLiked: likes.length > 0,
    isFavourited: true,
  }));
}
