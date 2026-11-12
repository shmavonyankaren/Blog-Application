"use server";
import db from "@/lib/db";
import { requireUser, requireSelf } from "@/lib/server/users";
import { mutation, positiveId, refresh } from "@/lib/server/action-utils";
export async function getBlogViewCount(blogId: number) {
  return db.blogView.count({ where: { blog_id: positiveId(blogId) } });
}
export async function incrementBlogView(
  blogId: number,
  _userId: string,
  path: string,
) {
  return mutation(async () => {
    const user = await requireUser();
    const id = positiveId(blogId);
    await db.$transaction(
      async (tx) => {
        // Row locking works with transaction pooling and serializes concurrent views
        // of the same blog, including requests from different function instances.
        const blogs = await tx.$queryRaw<
          { id: number }[]
        >`SELECT id FROM blogs WHERE id = ${id} FOR UPDATE`;
        if (!blogs.length) return;
        // Use the database clock and explicit UTC, independent of client/host timezone.
        const [clock] = await tx.$queryRaw<
          { day: Date }[]
        >`SELECT (clock_timestamp() AT TIME ZONE 'UTC')::date AS day`;
        const where = {
          blog_id: id,
          user_id: user.user_id,
          view_date: clock.day,
        };
        if ((await tx.blogView.count({ where })) < 3)
          await tx.blogView.create({ data: where });
      },
      { maxWait: 5000, timeout: 10000 },
    );
    refresh(path);
  });
}
export async function getUserBlogViewCount(userId: string, blogId: number) {
  await requireSelf(userId);
  return db.blogView.count({
    where: { user_id: userId, blog_id: positiveId(blogId) },
  });
}
export async function getTotalBlogViewsForUser(userId: string) {
  return db.blogView.count({ where: { blog: { user_id: userId } } });
}
