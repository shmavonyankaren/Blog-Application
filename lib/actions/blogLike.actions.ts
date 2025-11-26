"use server";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils/";

export async function getBlogLikeCount(blogId: string) {
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

export async function getUserBlogLikeCount(userId: string, blogId: string) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM blog_likes WHERE blog_id = ? AND user_id = ?",
      [blogId, userId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total;
  } catch (error) {
    handleError(error);
    return 0;
  }
}
