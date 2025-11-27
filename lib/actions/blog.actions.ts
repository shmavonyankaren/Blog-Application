"use server";

import pool from "@/lib/db/index";
import { revalidatePath } from "next/cache";

import { handleError } from "@/lib/utils/";

import {
  BlogType as Blog,
  GetBlogsByUserParams,
  SortOption,
} from "@/lib/types";

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
  categoryId?: string,
  sort?: "newest" | "oldest" | "most_viewed" | "most_liked" | "most_commented"
) {
  try {
    const offset = (page - 1) * limit;

    // Helper to retry a query once on transient connection errors
    const execQuery = async (q: string, p: (string | number)[]) => {
      try {
        return await pool!.query(q, p);
      } catch (err: unknown) {
        // Retry on common transient errors
        if (
          err &&
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          ((err as { code?: string }).code === "ECONNRESET" ||
            (err as { code?: string }).code === "PROTOCOL_CONNECTION_LOST")
        ) {
          // small delay then retry once
          await new Promise((r) => setTimeout(r, 200));
          return await pool!.query(q, p);
        }
        throw err;
      }
    };

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total
      FROM blogs b
    `;

    let dataQuery = `
      SELECT 
        b.id, b.title, b.description, b.image, b.user_id, 
        b.category_id, b.created_at,

        -- view count
        (SELECT COUNT(*) FROM blog_views v WHERE v.blog_id = b.id) AS views,

        -- like count
        (SELECT COUNT(*) FROM blog_likes l WHERE l.blog_id = b.id) AS likes,

        -- comment count
        (SELECT COUNT(*) FROM comments c WHERE c.blog_id = b.id) AS comments
      FROM blogs b
    `;

    const params: (string | number)[] = [];
    const whereClauses: string[] = [];

    // Search filter
    if (searchQuery && searchQuery.trim()) {
      whereClauses.push("(b.title LIKE ? OR b.description LIKE ?)");
      const searchPattern = `%${searchQuery.trim()}%`;
      params.push(searchPattern, searchPattern);
    }

    // Category filter
    if (categoryId && categoryId !== "all") {
      whereClauses.push("b.category_id = ?");
      params.push(parseInt(categoryId));
    }

    // Add WHERE clauses if exist
    if (whereClauses.length > 0) {
      const whereClause = " WHERE " + whereClauses.join(" AND ");
      countQuery += whereClause;
      dataQuery += whereClause;
    }

    // Sorting
    switch (sort) {
      case "oldest":
        dataQuery += " ORDER BY b.created_at ASC";
        break;

      case "most_viewed":
        dataQuery += " ORDER BY views DESC";
        break;

      case "most_liked":
        dataQuery += " ORDER BY likes DESC";
        break;

      case "most_commented":
        dataQuery += " ORDER BY comments DESC";
        break;

      default: // newest
        dataQuery += " ORDER BY b.created_at DESC";
    }

    dataQuery += " LIMIT ? OFFSET ?";

    // Total count
    const [countResult] = await execQuery(countQuery, params);
    const total = (countResult as CountResult[])[0].total;

    // Get paginated blogs
    const [blogs] = await execQuery(dataQuery, [...params, limit, offset]);

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

// GET Recommended Blogs

export async function getRecommendedBlogs() {
  try {
    const [rows] = await pool!.query(
      `SELECT 
        b.id, b.title, b.description, b.image, b.user_id, 
        b.category_id, b.created_at,
        (SELECT COUNT(*) FROM blog_views v WHERE v.blog_id = b.id) AS views,
        (SELECT COUNT(*) FROM blog_likes l WHERE l.blog_id = b.id) AS likes,
        (SELECT COUNT(*) FROM comments c WHERE c.blog_id = b.id) AS comments
      FROM blogs b
      ORDER BY likes DESC
      LIMIT 5`
    );
    return JSON.parse(JSON.stringify(rows));
  } catch (error) {
    handleError(error);
  }
}

// GET Blogs BY ORGANIZER
export async function getBlogsByUser(
  { userId }: GetBlogsByUserParams,
  page: number = 1,
  limit: number = 9,
  categoryId?: string,
  sort?: SortOption
) {
  try {
    const offset = (page - 1) * limit;

    // Helper to retry a query once on transient connection errors
    const execQuery = async (q: string, p: (string | number)[]) => {
      try {
        return await pool!.query(q, p);
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          ((err as { code?: string }).code === "ECONNRESET" ||
            (err as { code?: string }).code === "PROTOCOL_CONNECTION_LOST")
        ) {
          await new Promise((r) => setTimeout(r, 200));
          return await pool!.query(q, p);
        }
        throw err;
      }
    };

    // Base queries with counts (views, likes, comments)
    let countQuery = `SELECT COUNT(*) as total FROM blogs WHERE user_id = ?`;
    let dataQuery = `
      SELECT
        b.id, b.title, b.description, b.image, b.user_id,
        b.category_id, b.created_at,
        (SELECT COUNT(*) FROM blog_views v WHERE v.blog_id = b.id) AS views,
        (SELECT COUNT(*) FROM blog_likes l WHERE l.blog_id = b.id) AS likes,
        (SELECT COUNT(*) FROM comments c WHERE c.blog_id = b.id) AS comments
      FROM blogs b
      WHERE b.user_id = ?
    `;

    const params: (string | number)[] = [userId];

    if (categoryId && categoryId !== "all") {
      countQuery += " AND category_id = ?";
      dataQuery += " AND b.category_id = ?";
      params.push(parseInt(categoryId));
    }

    // Sorting - mirror getAllBlogs logic and also support title sorts
    switch (sort as string) {
      case "oldest":
        dataQuery += " ORDER BY b.created_at ASC";
        break;
      case "most_viewed":
        dataQuery += " ORDER BY views DESC";
        break;
      case "most_liked":
        dataQuery += " ORDER BY likes DESC";
        break;
      case "most_commented":
        dataQuery += " ORDER BY comments DESC";
        break;
      case "title-asc":
        dataQuery += " ORDER BY b.title ASC";
        break;
      case "title-desc":
        dataQuery += " ORDER BY b.title DESC";
        break;
      default:
        dataQuery += " ORDER BY b.created_at DESC";
    }

    dataQuery += " LIMIT ? OFFSET ?";

    // Get counts and data with retry helper
    const [countResult] = await execQuery(countQuery, params);
    const total = (countResult as CountResult[])[0].total;

    const [blogs] = await execQuery(dataQuery, [...params, limit, offset]);

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
