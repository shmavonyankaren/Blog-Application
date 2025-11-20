"use server";

import { revalidatePath } from "next/cache";

import pool from "@/lib/db/index";
import { handleError, sendEmail } from "@/lib/utils";

import { BlogCreator, CreateUserParams, UpdateUserParams } from "@/lib/types";

export async function createUser(user: CreateUserParams) {
  try {
    // Create new user in the database
    await pool!.query(
      "INSERT INTO users (user_id, email, first_name, last_name, photo, username) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user.clerkId,
        user.email,
        user.firstName,
        user.lastName,
        user.photo,
        user.username,
      ]
    );
    const [rows] = await pool!.query("SELECT * FROM users WHERE user_id = ?", [
      user.clerkId,
    ]);
    const newUser = (rows as CreateUserParams[])[0];

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// export async function createOrUpdataUser(
//   clerkId: string,
//   user: UpdateUserParams
// ) {
//   try {
//     // Update existing user or create new one if not exists
//     await pool!.query(
//       `INSERT INTO users (clerk_id, email, first_name, last_name, photo, username)<|diff_marker|> PATCH ADD A1000
//        VALUES (?, ?, ?, ?, ?, ?)
//        ON DUPLICATE KEY UPDATE
//          first_name = VALUES(first_name),
//             last_name = VALUES(last_name),
//             photo = VALUES(photo),
//             username = VALUES(username)`,
//         [
//           clerkId,
//           user.firstName,
//           user.lastName,
//           user.photo,
//           user.username,
//         ]
//     );

//   } catch (error) {
//     handleError(error);
//   }
// }

export async function getUserById(userId: string) {
  try {
    const [rows] = await pool!.query(
      "SELECT username, first_name, last_name, photo, email from users WHERE user_id = ?",
      [userId]
    );

    const targetUser = (rows as BlogCreator[])[0];

    if (!targetUser) throw new Error("User not found");

    return JSON.parse(JSON.stringify(targetUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await pool!.query(
      `UPDATE users SET first_name = ?, last_name = ?, photo = ?, username = ? WHERE user_id = ?`,
      [user.firstName, user.lastName, user.photo, user.username, clerkId]
    );

    const [rows] = await pool!.query("SELECT * FROM users WHERE user_id = ?", [
      clerkId,
    ]);
    const updatedUser = (rows as UpdateUserParams[])[0];

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await pool!
      .query("SELECT * FROM users WHERE user_id = ?", [clerkId])
      .then(([rows]) => (rows as CreateUserParams[])[0]);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    //Delete user's blogs
    await pool!.query("DELETE FROM blogs WHERE user_id = ?", [
      userToDelete.clerkId,
    ]);

    // Delete user
    await pool!.query("DELETE FROM users WHERE user_id = ?", [clerkId]);

    const deletedUser = userToDelete;
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function sendContactForm(form: FormData) {
  try {
    const name = form.get("name");
    const email = form.get("email");
    const subject = form.get("subject");
    const message = form.get("message");

    const result = await sendEmail(
      name as string,
      email as string,
      subject as string,
      message as string
    );

    if (!result.success) {
      throw new Error(result.error || "Failed to send email");
    }

    return { success: true };
  } catch (error) {
    handleError(error);
    return { success: false, error: "Failed to send contact form" };
  }
}
