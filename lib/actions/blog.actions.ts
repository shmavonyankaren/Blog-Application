"use server";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";

import { handleError } from "@/lib/utils/";

import { BlogType as Blog, GetBlogsByUserParams } from "@/lib/types";

type CountResult = { total: number };

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
export async function createBlog(formData: FormData, path: string) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const userId = formData.get("userId");
    const categoryId = formData.get("categoryId");

    await pool!.query(
      "INSERT INTO blogs (title, description, image, user_id, category_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, image, userId, categoryId || null]
    );

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ONE Blog BY ID
export async function getBlogById(blogId: string) {
  try {
    const [rows] = await pool!.query(
      `SELECT b.*, c.name as category_name 
       FROM blogs b 
       LEFT JOIN categories c ON b.category_id = c.id 
       WHERE b.id = ?`,
      [blogId]
    );
    const blog = (rows as Blog[])[0];

    if (!blog) throw new Error("Blog not found");

    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateBlog(formData: FormData, path: string) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const blogId = formData.get("blogId");
    const categoryId = formData.get("categoryId");

    await pool!.query(
      `UPDATE blogs SET title = ?, description = ?, image = ?, category_id = ? WHERE id = ?`,
      [title, description, image, categoryId || null, blogId]
    );

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteBlog(formData: FormData, path: string) {
  try {
    const blogId = formData.get("blogId");

    await pool!.query("DELETE FROM blogs WHERE id = ?", [blogId]);

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// DELETE BLOG FROM DETAIL PAGE WITH REDIRECT
export async function deleteBlogAndRedirect(formData: FormData, path: string) {
  const { redirect } = await import("next/navigation");

  try {
    const blogId = formData.get("blogId");

    await pool!.query("DELETE FROM blogs WHERE id = ?", [blogId]);

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }

  redirect(path);
}

// Delete all blogs by current User

export async function deleteAllBlogsByUser(formData: FormData, path: string) {
  try {
    const userId = formData.get("deleteId"); // Changed from "userId" to "deleteId" to match DeleteButton

    await pool!.query("DELETE FROM blogs WHERE user_id = ?", [userId]);

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL Blogs
export async function getAllBlogs(
  searchQuery?: string,
  page: number = 1,
  limit: number = 9,
  categoryId?: string
) {
  try {
    const offset = (page - 1) * limit;

    let countQuery = "SELECT COUNT(*) as total FROM blogs";
    let dataQuery =
      "SELECT id, title, description, image, user_id, category_id, created_at FROM blogs";
    const params: (string | number)[] = [];
    const whereClauses: string[] = [];

    if (searchQuery && searchQuery.trim()) {
      whereClauses.push("(title LIKE ? OR description LIKE ?)");
      const searchPattern = `%${searchQuery.trim()}%`;
      params.push(searchPattern, searchPattern);
    }

    if (categoryId && categoryId !== "all") {
      whereClauses.push("category_id = ?");
      params.push(parseInt(categoryId));
    }

    if (whereClauses.length > 0) {
      const whereClause = " WHERE " + whereClauses.join(" AND ");
      countQuery += whereClause;
      dataQuery += whereClause;
    }

    dataQuery += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

    // Get total count
    const [countResult] = await pool!.query(countQuery, params);
    const total = (countResult as CountResult[])[0].total;

    // Get paginated data
    const [blogs] = await pool!.query(dataQuery, [...params, limit, offset]);

    return {
      data: JSON.parse(JSON.stringify(blogs)),
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCount: total,
    };
  } catch (error) {
    handleError(error);
    return {
      data: [],
      totalPages: 1,
      currentPage: page,
      totalCount: 0,
    };
  }
}

// GET Blogs BY ORGANIZER
export async function getBlogsByUser(
  { userId }: GetBlogsByUserParams,
  page: number = 1,
  limit: number = 9,
  categoryId?: string
) {
  try {
    const offset = (page - 1) * limit;
    let countQuery = "SELECT COUNT(*) as total FROM blogs WHERE user_id = ?";
    let dataQuery =
      "SELECT id, title, description, image, user_id, category_id, created_at FROM blogs WHERE user_id = ?";
    const params: (string | number)[] = [userId];

    if (categoryId && categoryId !== "all") {
      countQuery += " AND category_id = ?";
      dataQuery += " AND category_id = ?";
      params.push(parseInt(categoryId));
    }

    dataQuery += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

    // Get total count
    const [countResult] = await pool!.query(countQuery, params);
    const total = (countResult as CountResult[])[0].total;

    // Get paginated data
    const [blogs] = await pool!.query(dataQuery, [...params, limit, offset]);

    return {
      data: JSON.parse(JSON.stringify(blogs)),
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCount: total,
    };
  } catch (error) {
    handleError(error);
    return {
      data: [],
      totalPages: 1,
      currentPage: page,
      totalCount: 0,
    };
  }
}

// CREATE CATEGORY

export async function createCategory(formData: FormData, path: string) {
  try {
    const name = formData.get("name");
    const creatorId = formData.get("creatorId");

    await pool!.query(
      "INSERT INTO categories (name, creator_id) VALUES (?, ?)",
      [name, creatorId]
    );

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// UPDATE CATEGORY
export async function updateCategory(formData: FormData, path: string) {
  try {
    const categoryId = formData.get("categoryId");
    const name = formData.get("name");
    await pool!.query("UPDATE categories SET name = ? WHERE id = ?", [
      name,
      categoryId,
    ]);
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// DELETE CATEGORY

export async function deleteCategory(formData: FormData, path: string) {
  try {
    const categoryId = formData.get("categoryId");
    await pool!.query("DELETE FROM categories WHERE id = ?", [categoryId]);
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL CATEGORIES

export async function getAllCategories() {
  try {
    const [rows] = await pool!.query(
      "SELECT id, name, creator_id FROM categories"
    );
    return JSON.parse(JSON.stringify(rows));
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
