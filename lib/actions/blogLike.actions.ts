"use server";
import db from "@/lib/db";
import { requireUser, requireSelf } from "@/lib/server/users";
import { mutation, positiveId, refresh } from "@/lib/server/action-utils";
export async function getBlogLikeCount(blogId: number) {
  return db.blogLike.count({ where: { blog_id: positiveId(blogId) } });
}
export async function checkIfUserLikedBlog(userId: string, blogId: number) {
  await requireSelf(userId);
  return !!(await db.blogLike.findUnique({
    where: {
      blog_id_user_id: { blog_id: positiveId(blogId), user_id: userId },
    },
    select: { id: true },
  }));
}
export async function likeBlog(form: FormData, path?: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.blogLike.createMany({
      data: [
        { blog_id: positiveId(form.get("blogId")), user_id: user.user_id },
      ],
      skipDuplicates: true,
    });
    refresh(path);
  });
}
export async function unlikeBlog(form: FormData, path?: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.blogLike.deleteMany({
      where: { blog_id: positiveId(form.get("blogId")), user_id: user.user_id },
    });
    refresh(path);
  });
}
export async function getTotalBlogLikesForUser(userId: string) {
  return db.blogLike.count({ where: { blog: { user_id: userId } } });
}
