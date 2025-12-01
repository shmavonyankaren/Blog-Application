"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db/index";
import { handleError } from "@/lib/utils/";
import { CommentType } from "../types";

// get all commments by blog id with nested replies

export async function getAllCommentsByBlog(blogId: string) {
  try {
    // Fetch all comments for the blog
    const [allComments] = await pool!.query(
      "SELECT id, blog_id, user_id, content, created_at, updated_at, parent_comment_id FROM comments WHERE blog_id = ? ORDER BY created_at DESC",
      [blogId]
    );

    const commentsArray = allComments as CommentType[];

    // Build a nested tree structure
    const commentMap = new Map();
    commentsArray.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    const rootComments: CommentType[] = [];
    commentsArray.forEach((comment) => {
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id);
        if (parent) {
          parent.replies.push(commentMap.get(comment.id));
        }
      } else {
        rootComments.push(commentMap.get(comment.id));
      }
    });

    return JSON.parse(JSON.stringify(rootComments));
  } catch (error) {
    handleError(error);
    return [];
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

// COMMENT REPLY ACTIONS

export async function addReplyToComment(formData: FormData, path: string) {
  try {
    const blogId = formData.get("blogId");
    const parent_comment_id = formData.get("parentCommentId");
    const userId = formData.get("userId");
    const content = formData.get("content");
    await pool!.query(
      "INSERT INTO comments (blog_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?)",
      [blogId, userId, content, parent_comment_id]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getRepliesByCommentId(commentId: number) {
  try {
    const [replies] = await pool!.query(
      "SELECT id, blog_id, user_id, content, created_at, updated_at FROM comments WHERE parent_comment_id = ? ORDER BY created_at ASC",
      [commentId]
    );
    return JSON.parse(JSON.stringify(replies));
  } catch (error) {
    handleError(error);
  }
}

export async function getRepliesCountByCommentId(commentId: number) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM comments WHERE parent_comment_id = ?",
      [commentId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total;
  } catch (error) {
    handleError(error);
    return 0;
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
    // revalidatePath(path);
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
    // revalidatePath(path);
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

// Optimized: Get like count and user like status in a single query
export async function getCommentLikeData(
  commentId: number,
  userId: string
): Promise<{ count: number; isLiked: boolean }> {
  try {
    const [rows] = await pool!.query(
      `SELECT 
        COUNT(*) as total_likes,
        SUM(CASE WHEN user_id = ? THEN 1 ELSE 0 END) as user_liked
      FROM comment_likes 
      WHERE comment_id = ?`,
      [userId, commentId]
    );
    const result = (rows as { total_likes: number; user_liked: number }[])[0];
    return {
      count: result.total_likes || 0,
      isLiked: result.user_liked > 0,
    };
  } catch (error) {
    handleError(error);
    return { count: 0, isLiked: false };
  }
}
