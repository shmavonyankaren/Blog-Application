import { RowDataPacket } from "mysql2";

export interface CategoryType {
  id: number; // Auto-incremented primary key
  name: string; // Category name
  creator_id: string; // References users.user_id (Clerk ID)
}

export interface FavouriteType extends RowDataPacket {
  id: number; // Auto-incremented primary key
  user_id: string; // References users.user_id (Clerk ID)
  blog_id: number; // References blogs.id
}

export interface CommentType extends RowDataPacket {
  id: number; // Auto-incremented primary key
  blog_id: number; // References blogs.id
  user_id: string; // References users.user_id (Clerk ID)
  created_at: string; // ISO string (timestamp from DB)
  updated_at: string; // ISO string (timestamp from DB)
  content: string;
  parent_comment_id?: number | null; // References comments.id (nullable)
  replies: CommentType[]; // Nested replies
}

export interface BlogType extends RowDataPacket {
  id: number; // Auto-incremented primary key
  image?: string | undefined; // Optional image URL
  user_id: string; // References users.user_id (Clerk ID)
  title: string; // Blog title, required
  description?: string | undefined; // Optional description (TEXT in SQL can be null)
  category_id?: number | undefined; // References categories.id
  created_at: string; // ISO string (timestamp from DB)
  updated_at: string;
}

export type CreateEditBlogTypes = {
  actionType: "edit" | "create";
  blog?: {
    id: number;
    title: string;
    description?: string;
    image?: string;
    category_id?: number;
  };
};

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

export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export interface User {
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
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
