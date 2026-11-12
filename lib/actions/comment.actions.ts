"use server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { publicProfile, requireSelf, requireUser } from "@/lib/server/users";
import { mutation, positiveId, refresh, text } from "@/lib/server/action-utils";
import type { CommentType } from "@/lib/types";
export async function getAllCommentsByBlog(
  blogId: string,
): Promise<CommentType[]> {
  const { userId } = await auth();
  const rows = await db.comment.findMany({
    where: { blog_id: positiveId(blogId) },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    include: {
      author: { select: publicProfile },
      _count: { select: { likes: true } },
      likes: { where: { user_id: userId ?? "" }, select: { id: true } },
    },
  });
  const map = new Map<number, CommentType>();
  for (const { author, _count, likes, ...row } of rows)
    map.set(row.id, {
      ...row,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString(),
      creator: author,
      likeCount: _count.likes,
      isLiked: likes.length > 0,
      replies: [],
    });
  const roots: CommentType[] = [];
  for (const comment of map.values()) {
    if (comment.parent_comment_id)
      map.get(comment.parent_comment_id)?.replies.push(comment);
    else roots.push(comment);
  }
  return roots;
}
export async function addCommentToBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.comment.create({
      data: {
        blog_id: positiveId(form.get("blogId")),
        user_id: user.user_id,
        content: text(form, "content"),
      },
    });
    refresh(path);
  });
}
export async function addReplyToComment(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const blog_id = positiveId(form.get("blogId"));
    const parent_comment_id = positiveId(form.get("parentCommentId"));
    await db.$transaction(async (tx) => {
      const parent = await tx.comment.findFirst({
        where: { id: parent_comment_id, blog_id },
        select: { id: true },
      });
      if (!parent) throw new Error("Invalid parent comment.");
      await tx.comment.create({
        data: {
          blog_id,
          parent_comment_id,
          user_id: user.user_id,
          content: text(form, "content"),
        },
      });
    });
    refresh(path);
  });
}
export async function getRepliesByCommentId(
  commentId: number,
): Promise<CommentType[]> {
  const parent = await db.comment.findUnique({
    where: { id: positiveId(commentId) },
    select: { blog_id: true },
  });
  if (!parent) return [];
  const roots = await getAllCommentsByBlog(String(parent.blog_id));
  const find = (nodes: CommentType[]): CommentType | undefined => {
    for (const node of nodes) {
      if (node.id === commentId) return node;
      const found = find(node.replies);
      if (found) return found;
    }
  };
  return (find(roots)?.replies ?? []).slice().reverse();
}
export async function getRepliesCountByCommentId(commentId: number) {
  return db.comment.count({
    where: { parent_comment_id: positiveId(commentId) },
  });
}
export async function editCommentByCommentId(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const result = await db.comment.updateMany({
      where: { id: positiveId(form.get("commentId")), user_id: user.user_id },
      data: { content: text(form, "content") },
    });
    if (!result.count) throw new Error("Not authorized.");
    refresh(path);
  });
}
export async function deleteCommentFromBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const result = await db.comment.deleteMany({
      where: { id: positiveId(form.get("commentId")), user_id: user.user_id },
    });
    if (!result.count) throw new Error("Not authorized or already deleted.");
    refresh(path);
  });
}
export async function deleteAllCommentsFromBlog(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    const blog = await db.blog.findFirst({
      where: { id: positiveId(form.get("blogId")), user_id: user.user_id },
      select: { id: true },
    });
    if (!blog) throw new Error("Not authorized.");
    await db.comment.deleteMany({
      where: {
        blog_id: positiveId(form.get("blogId")),
        blog: { user_id: user.user_id },
      },
    });
    refresh(path);
  });
}
export async function likeComment(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.commentLike.createMany({
      data: [
        {
          comment_id: positiveId(form.get("commentId")),
          user_id: user.user_id,
        },
      ],
      skipDuplicates: true,
    });
    refresh(path);
  });
}
export async function unlikeComment(form: FormData, path: string) {
  return mutation(async () => {
    const user = await requireUser();
    await db.commentLike.deleteMany({
      where: {
        comment_id: positiveId(form.get("commentId")),
        user_id: user.user_id,
      },
    });
    refresh(path);
  });
}
export async function getCommentLikeCount(commentId: number) {
  return db.commentLike.count({ where: { comment_id: positiveId(commentId) } });
}
export async function checkIfUserLikedComment(
  userId: string,
  commentId: number,
) {
  await requireSelf(userId);
  return !!(await db.commentLike.findUnique({
    where: {
      comment_id_user_id: {
        comment_id: positiveId(commentId),
        user_id: userId,
      },
    },
    select: { id: true },
  }));
}
export async function getCommentLikeData(commentId: number, userId: string) {
  await requireSelf(userId);
  const [count, isLiked] = await Promise.all([
    getCommentLikeCount(commentId),
    checkIfUserLikedComment(userId, commentId),
  ]);
  return { count, isLiked };
}
