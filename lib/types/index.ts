import { RowDataPacket } from "mysql2";

export interface BlogType extends RowDataPacket {
  id: number; // Auto-incremented primary key
  image?: string | undefined; // Optional image URL
  user_id: string; // References users.user_id (Clerk ID)
  title: string; // Blog title, required
  description?: string | undefined; // Optional description (TEXT in SQL can be null)
  created_at: string; // ISO string (timestamp from DB)
  updated_at: string;
}

export type DeleteBlogParams = {
  id: number;
};

export type GetBlogsByUserParams = {
  userId: string;
};

export type UpdateBlogParams = {
  id: number;
  title?: string;
  description?: string;
  image?: string;
};

export interface User {
  user_id: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  photo: string;
  email: string;
}

export interface BlogCreator {
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  photo: string | null;
}

export type CreateUserParams = {
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string | null;
  lastName: string | null;
  username: string;
  photo: string;
};
