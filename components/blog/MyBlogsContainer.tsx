import { AddBlog, BlogFooter, BlogList, Pagination } from "@/components";
import CategoryFilter from "./CategorySearchFilter";

import { getBlogsByUser } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";
import SortBy from "./SortBy";
import { SortOption } from "@/lib/types";
import { getTotalBlogViewsForUser } from "@/lib/actions/blogView.actions";
import { getTotalBlogLikesForUser } from "@/lib/actions/blogLike.actions";

interface MyBlogsContainerProps {
  page?: number;
  categoryId?: string;
  sortOption?: SortOption;
}

export default async function BlogContainer({
  page = 1,
  categoryId,
  sortOption,
}: MyBlogsContainerProps) {
  try {
    const user = await currentUser();

    const result = await getBlogsByUser(
      { userId: user!.id },
      page,
      9,
      categoryId,
      sortOption
    );
    const blogs = result?.data || [];
    const totalPages = result?.totalPages || 1;
    const totalCount = result?.totalCount || 0;
    const totalViews = await getTotalBlogViewsForUser(user!.id);
    const totalLikes = await getTotalBlogLikesForUser(user!.id);

    return (
      <div className="min-h-full py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
        <div className="mx-auto bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          {/* Header Section with Gradient Background */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600  dark:from-slate-800 dark:to-slate-700 duration-300 transition-colors px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  My Blogs
                </h1>
                <p className="text-indigo-100 text-xs sm:text-sm mb-3 sm:mb-4">
                  Create, manage, and share your stories with the world
                </p>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-4 justify-center sm:justify-start">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {totalCount}
                    </p>
                    <p className="text-indigo-100 text-xs">
                      {totalCount === 0 || totalCount === 1 ? "Blog" : "Blogs"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {totalViews}
                    </p>
                    <p className="text-indigo-100 text-xs">
                      {totalViews === 0 || totalViews === 1 ? "View" : "Views"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {totalLikes}
                    </p>
                    <p className="text-indigo-100 text-xs">
                      {totalLikes === 0 || totalLikes === 1 ? "Like" : "Likes"}
                    </p>
                  </div>
                </div>
              </div>
              <AddBlog />
            </div>
          </div>

          {/* Category Filter Section */}
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <CategoryFilter />
          </div>

          {/* Content Section */}
          <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            {blogs && blogs.length > 0 ? (
              <>
                <SortBy />

                <BlogList cardType="creator" blogs={blogs} />
                <BlogFooter blogs={blogs} />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/my-blogs"
                />
              </>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <svg
                  className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-gray-400 dark:text-slate-600 mb-3 sm:mb-4 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium mb-1 transition-colors duration-300">
                  No blogs yet
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 transition-colors duration-300">
                  Start sharing your thoughts by creating your first blog post
                </p>
                <AddBlog />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in MyBlogsContainer:", error);
    return (
      <div className="min-h-full py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
        <div className="mx-auto bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl p-4 sm:p-6 md:p-8 text-center border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <p className="text-red-600 text-sm sm:text-base">
            Error loading blogs. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
