"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db/index";
import { handleError } from "@/lib/utils/";

// get all commments by blog id

export async function getAllCommentsByBlog(blogId: string) {
  try {
    const [comments] = await pool!.query(
      "SELECT id, blog_id, user_id, content, created_at FROM comments WHERE blog_id = ? ORDER BY created_at DESC",
      [blogId]
    );
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    handleError(error);
  }
}

// ADD COMMENT TO BLOG

export async function addCommentToBlog(formData: FormData, path: string) {
  try {
    const blogId = formData.get("blogId");
    const userId = formData.get("userId");
    const content = formData.get("content");
    await pool!.query(
      "INSERT INTO comments (blog_id, user_id, content) VALUES (?, ?, ?)",
      [blogId, userId, content]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function editCommentByCommentId(formData: FormData, path: string) {
  try {
    const commentId = formData.get("commentId");
    // const blogId = formData.get("blogId");
    const content = formData.get("content");
    await pool!.query("UPDATE comments SET content = ? WHERE id = ?", [
      content,
      commentId,
    ]);
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// Delete a comment from BLOG
export async function deleteCommentFromBlog(formData: FormData, path: string) {
  try {
    const commentId = formData.get("commentId");
    // const blogId = formData.get("blogId");
    await pool!.query("DELETE FROM comments WHERE id = ?", [commentId]);

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// Delete all comments from BLOG

export async function deleteAllCommentsFromBlog(
  formData: FormData,
  path: string
) {
  try {
    const blogId = formData.get("blogId");
    await pool!.query("DELETE FROM comments WHERE blog_id = ?", [blogId]);
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
