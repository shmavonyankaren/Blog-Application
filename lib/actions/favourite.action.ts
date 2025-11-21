"use server";

import pool from "@/lib/db";
import { handleError } from "@/lib/utils/";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { BlogType, FavouriteType } from "@/lib/types";

export async function checkIfBlogIsFavourited(userId: string, blogId: number) {
  try {
    const [rows] = await pool!.query(
      "SELECT * FROM favourites WHERE user_id = ? AND blog_id = ?",
      [userId, blogId]
    );
    return (rows as FavouriteType[]).length > 0;
  } catch (error) {
    handleError(error);
  }
}

// CREATE
export async function favouriteBlog(formData: FormData) {
  try {
    const userId = formData.get("userId");
    const blogId = formData.get("blogId");
    await pool!.query(
      "INSERT INTO favourites (user_id, blog_id) VALUES (?, ?)",
      [userId, blogId]
    );
    revalidatePath("/all-blogs");
    revalidatePath("/favourites");
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function unfavouriteBlog(formData: FormData) {
  try {
    const userId = formData.get("userId");
    const blogId = formData.get("blogId");
    await pool!.query(
      "DELETE FROM favourites WHERE user_id = ? AND blog_id = ?",
      [userId, blogId]
    );
    revalidatePath("/all-blogs");
    revalidatePath("/favourites");
  } catch (error) {
    handleError(error);
  }
}

// DELETE ALL FAVOURITES FOR A USER
export async function deleteAllFavouritesByUser(formData: FormData) {
  try {
    const userId = formData.get("deleteId"); // Changed to match DeleteButton
    await pool!.query("DELETE FROM favourites WHERE user_id = ?", [userId]);
    revalidatePath("/favourites");
  } catch (error) {
    handleError(error);
  }
}
// GET ALL FAVOURITES FOR A USER
export async function getAllFavouritesByUser(userId: string) {
  try {
    const [rows] = await pool!.query(
      `SELECT b.* FROM blogs b
       JOIN favourites f ON b.id = f.blog_id
         WHERE f.user_id = ?`,
      [userId]
    );
    const favourites: BlogType[] = JSON.parse(JSON.stringify(rows));

    return favourites;
  } catch (error) {
    handleError(error);
  }
}
