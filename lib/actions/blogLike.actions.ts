"use server";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils/";

export async function getBlogLikeCount(blogId: number) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM blog_likes WHERE blog_id = ?",
      [blogId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total;
  } catch (error) {
    handleError(error);
    return 0;
  }
}

export async function checkIfUserLikedBlog(userId: string, blogId: number) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM blog_likes WHERE blog_id = ? AND user_id = ?",
      [blogId, userId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total > 0;
  } catch (error) {
    handleError(error);
    return false;
  }
}

export async function likeBlog(formData: FormData, path: string) {
  try {
    const blogId = formData.get("blogId");
    const userId = formData.get("userId");
    await pool!.query(
      "INSERT INTO blog_likes (blog_id, user_id) VALUES (?, ?)",
      [blogId, userId]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function unlikeBlog(formData: FormData, path: string) {
  try {
    const blogId = formData.get("blogId");
    const userId = formData.get("userId");
    await pool!.query(
      "DELETE FROM blog_likes WHERE blog_id = ? AND user_id = ?",
      [blogId, userId]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getTotalBlogLikesForUser(userId: string) {
  try {
    const [rows] = await pool!.query(
      `
      SELECT COUNT(*) AS total
      FROM blog_likes bl
      JOIN blogs b ON bl.blog_id = b.id
      WHERE b.user_id = ?
      `,
      [userId]
    );

    return (rows as { total: number }[])[0].total;
  } catch (error) {
    handleError(error);
    return 0;
  }
}
