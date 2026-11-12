export interface CategoryType {
  id: number;
  name: string;
  creator_id: string | null;
}
export interface FavouriteType {
  id: number;
  user_id: string;
  blog_id: number;
}
export interface User {
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  photo: string | null;
}
export type BlogCreator = User;
export interface CommentType {
  id: number;
  blog_id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  content: string;
  parent_comment_id?: number | null;
  replies: CommentType[];
  creator?: User;
  likeCount?: number;
  isLiked?: boolean;
}
export interface BlogType {
  id: number;
  image: string | null;
  user_id: string;
  title: string;
  description: string;
  category_id: number | null;
  created_at: string;
  updated_at: string;
  category_name?: string | null;
  creator?: User;
  isLiked?: boolean;
  isFavourited?: boolean;
  views?: number;
  likes?: number;
  comments?: number;
}
export type CreateEditBlogTypes = {
  actionType: "edit" | "create";
  blog?: {
    id: number;
    title: string;
    description?: string;
    image?: string | null;
    category_id?: number | null;
  };
};
export type DeleteBlogParams = { id: number };
export type GetBlogsByUserParams = { userId: string };
export type UpdateBlogParams = {
  id: number;
  title?: string;
  description?: string;
  image?: string | null;
};
export type SortOption =
  | "newest"
  | "oldest"
  | "title-asc"
  | "title-desc"
  | "most_viewed"
  | "most_liked"
  | "most_commented";
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
