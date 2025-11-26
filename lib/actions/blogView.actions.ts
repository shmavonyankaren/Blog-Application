"use server";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils/";

export async function getBlogViewCount(blogId: string) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM blog_views WHERE blog_id = ?",
      [blogId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total;
  } catch (error) {
    handleError(error);
    return 0;
  }
}

export async function incrementBlogView(formData: FormData, path: string) {
  try {
    const blogId = formData.get("blogId");
    const userId = formData.get("userId");
    await pool!.query(
      "INSERT INTO blog_views (blog_id, user_id) VALUES (?, ?)",
      [blogId, userId]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getUserBlogViewCount(userId: string, blogId: string) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM blog_views WHERE blog_id = ? AND user_id = ?",
      [blogId, userId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total;
  } catch (error) {
    handleError(error);
    return 0;
  }
}

export async function getTotalBlogViewsForUser(userId: string) {
  try {
    const [rows] = await pool!.query(
      "SELECT COUNT(*) as total FROM blog_views WHERE user_id = ?",
      [userId]
    );
    const countResult = (rows as { total: number }[])[0];
    return countResult.total;
  } catch (error) {
    handleError(error);
    return 0;
  }
}
