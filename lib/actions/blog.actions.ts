"use server";

// import { revalidatePath } from "next/cache";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";

import { handleError } from "@/lib/utils/";

import { BlogType as Blog, GetBlogsByUserParams } from "@/lib/types";

// const getCategoryByName = async (name: string) => {
//   return Category.findOne({ name: { $regex: name, $options: "i" } });
// };

// const populateEvent = (query: any) => {
//   return query
//     .populate({
//       path: "organizer",
//       model: User,
//       select: "_id firstName lastName photo",
//     })
//     .populate({ path: "category", model: Category, select: "_id name" });
// };

// CREATE
export async function createBlog(formData: FormData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const userId = formData.get("userId");

    await pool!.query(
      "INSERT INTO blogs (title, description, image, user_id) VALUES (?, ?, ?, ?)",
      [title, description, image, userId]
    );

    // Revalidate only necessary paths
    revalidatePath("/my-blogs");
    revalidatePath("/all-blogs");

    // return { success: true, id: (result as any).insertId };
  } catch (error) {
    handleError(error);
  }
}

// GET ONE Blog BY ID
export async function getBlogById(blogId: string) {
  try {
    const [rows] = await pool!.query("SELECT * FROM blogs WHERE id = ?", [
      blogId,
    ]);
    const blog = (rows as Blog[])[0];

    if (!blog) throw new Error("Blog not found");

    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateBlog(formData: FormData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const blogId = formData.get("blogId");

    await pool!.query(
      `UPDATE blogs SET title = ?, description = ?, image = ? WHERE id = ?`,
      [title, description, image, blogId]
    );

    // Revalidate only necessary paths
    revalidatePath("/my-blogs");
    revalidatePath("/all-blogs");
    revalidatePath(`/blog/${blogId}`);

    return { success: true, id: blogId };
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteBlog(formData: FormData) {
  try {
    const blogId = formData.get("blogId");

    await pool!.query("DELETE FROM blogs WHERE id = ?", [blogId]);

    revalidatePath("/my-blogs");

    return { success: true };
  } catch (error) {
    handleError(error);
  }
}

// Delete all blogs by current User

export async function deleteAllBlogsByUser(formData: FormData) {
  try {
    const userId = formData.get("deleteId"); // Changed from "userId" to "deleteId" to match DeleteButton

    await pool!.query("DELETE FROM blogs WHERE user_id = ?", [userId]);

    revalidatePath("/my-blogs");
  } catch (error) {
    handleError(error);
  }
}

// GET ALL Blogs
export async function getAllBlogs(searchQuery?: string) {
  try {
    let query = "SELECT * FROM blogs";
    let params: string[] = [];

    if (searchQuery && searchQuery.trim()) {
      query += " WHERE title LIKE ? OR description LIKE ?";
      const searchPattern = `%${searchQuery.trim()}%`;
      params = [searchPattern, searchPattern];
    }

    query += " ORDER BY created_at DESC";

    const [blogs] = await pool!.query(query, params);

    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    handleError(error);
  }
}

// GET Blogs BY ORGANIZER
export async function getBlogsByUser({ userId }: GetBlogsByUserParams) {
  try {
    const [blogs] = await pool!.query("SELECT * FROM blogs WHERE user_id = ?", [
      userId,
    ]);

    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    handleError(error);
  }
}

// GET COMMENTS BY BLOG ID

export async function getAllCommentsByBlog(blogId: string) {
  try {
    const [comments] = await pool!.query(
      "SELECT * FROM comments WHERE blog_id = ? ORDER BY created_at DESC",
      [blogId]
    );
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    handleError(error);
  }
}

// ADD COMMENT TO BLOG

export async function addCommentToBlog(formData: FormData) {
  try {
    const blogId = formData.get("blogId");
    const userId = formData.get("userId");
    const content = formData.get("content");
    await pool!.query(
      "INSERT INTO comments (blog_id, user_id, content) VALUES (?, ?, ?)",
      [blogId, userId, content]
    );
    revalidatePath(`/blog/${blogId}`);
  } catch (error) {
    handleError(error);
  }
}

export async function editCommentByCommentId(formData: FormData) {
  try {
    const commentId = formData.get("commentId");
    const blogId = formData.get("blogId");
    const content = formData.get("content");
    await pool!.query("UPDATE comments SET content = ? WHERE id = ?", [
      content,
      commentId,
    ]);
    revalidatePath(`/blog/${blogId}`);
  } catch (error) {
    handleError(error);
  }
}

// Delete a comment from BLOG
export async function deleteCommentFromBlog(formData: FormData) {
  try {
    const commentId = formData.get("commentId");
    const blogId = formData.get("blogId");
    await pool!.query("DELETE FROM comments WHERE id = ?", [commentId]);

    revalidatePath(`/blog/${blogId}`);
  } catch (error) {
    handleError(error);
  }
}

// Delete all comments from BLOG

export async function deleteAllCommentsFromBlog(formData: FormData) {
  try {
    const blogId = formData.get("blogId");
    await pool!.query("DELETE FROM comments WHERE blog_id = ?", [blogId]);
    revalidatePath(`/blog/${blogId}`);
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   eventId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = {
//       $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
//     };

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const events = await populateEvent(eventsQuery);
//     const eventsCount = await Event.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(events)),
//       totalPages: Math.ceil(eventsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
