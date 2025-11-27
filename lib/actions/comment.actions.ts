"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db/index";
import { handleError } from "@/lib/utils/";

// get all commments by blog id

export async function getAllCommentsByBlog(blogId: string) {
  try {
    const [comments] = await pool!.query(
      "SELECT id, blog_id, user_id, content, created_at, updated_at FROM comments WHERE blog_id = ? ORDER BY created_at DESC",
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

// Comment like/unlike actions

export async function likeComment(formData: FormData, path: string) {
  try {
    const commentId = formData.get("commentId");
    const userId = formData.get("userId");
    await pool!.query(
      "INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)",
      [commentId, userId]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function unlikeComment(formData: FormData, path: string) {
  try {
    const commentId = formData.get("commentId");
    const userId = formData.get("userId");
    await pool!.query(
      "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
      [commentId, userId]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getCommentLikeCount(commentId: number) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) AS likeCount FROM comment_likes WHERE comment_id = ?",
      [commentId]
    );
    const result = JSON.parse(JSON.stringify(rows)) as { likeCount: number }[];
    return result[0]?.likeCount || 0;
  } catch (error) {
    handleError(error);
    return 0;
  }
}

// export async function checkIfUserLikedComment(
//   userId: string,
//   commentId: number
// ) {
//   try {
//     const [rows] = await pool!.query(
//       "SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id = ? AND user_id = ?",
//       [commentId, userId]
//     );
//     const result = JSON.parse(JSON.stringify(rows)) as { count: number }[];
//     return result[0]?.count > 0;
//   } catch (error) {
//     handleError(error);
//     return false;
//   }
// }

export async function checkIfUserLikedComment(
  userId: string,
  commentId: number
) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM comment_likes WHERE comment_id = ? AND user_id = ?",
      [commentId, userId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total > 0;
  } catch (error) {
    handleError(error);
    return false;
  }
}
