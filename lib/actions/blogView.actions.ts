"use server";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils/";

type ViewType = {
  id: number;
  blog_id: number;
  user_id: string;
  view_date: string;
};

async function canUserViewBlog(blogId: number, userId: string) {
  try {
    const [rows] = await pool!.query(
      `SELECT COUNT(*) AS total
       FROM blog_views
       WHERE blog_id = ? AND user_id = ? AND view_date = CURDATE()`,
      [blogId, userId]
    );

    return (rows as { total: number }[])[0].total < 3; // limit: 3 views per day
  } catch (error) {
    handleError(error);
    return false;
  }
}

export async function getBlogViewCount(blogId: number) {
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

export async function incrementBlogView(
  blogId: number,
  userId: string,
  path: string
) {
  try {
    const allowed = await canUserViewBlog(blogId, userId);
    if (!allowed) {
      console.log("Daily view limit reached");
      return;
    }
    await pool!.query(
      "INSERT INTO blog_views (blog_id, user_id) VALUES (?, ?)",
      [blogId, userId]
    );
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getUserBlogViewCount(userId: string, blogId: number) {
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
      `
      SELECT COUNT(*) AS total
      FROM blog_views bv
      JOIN blogs b ON bv.blog_id = b.id
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
