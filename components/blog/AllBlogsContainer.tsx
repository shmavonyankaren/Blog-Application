import { getAllBlogs } from "@/lib/actions/blog.actions";
import { BlogList, Pagination, SearchBar } from "@/components";
import CategoryFilter from "./CategorySearchFilter";
import SortBy from "./SortBy";

interface AllBlogsContainerProps {
  searchQuery?: string;
  page?: number;
  categoryId?: string;
  sort?: "newest" | "oldest" | "most_viewed" | "most_liked" | "most_commented";
}

export default async function AllBlogsContainer({
  searchQuery,
  page = 1,
  categoryId,
  sort,
}: AllBlogsContainerProps) {
  try {
    const result = await getAllBlogs(searchQuery, page, 9, categoryId, sort);
    const blogs = result?.data || [];
    const totalPages = result?.totalPages || 1;
    const totalCount = result?.totalCount || 0;

    return (
      <div className="min-h-full py-8 px-4">
        <div className="mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-slate-950/50 overflow-hidden max-w-7xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          {/* Header Section with Gradient Background */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 dark:from-slate-800 dark:to-slate-700 px-6 py-10 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Explore Blogs
                </h1>
                <p className="text-indigo-100 text-sm">
                  Discover stories, ideas, and insights from our community
                  {totalCount > 0 && (
                    <span className="ml-1 font-semibold">
                      ({totalCount} {totalCount === 1 ? "blog" : "blogs"})
                    </span>
                  )}
                </p>
              </div>
              <SearchBar />
            </div>
          </div>

          {/* Category Filter Section */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <CategoryFilter />
          </div>

          {/* Content Section */}
          <div className="px-6 py-8">
            <SortBy />
            {searchQuery && (
              <div className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Search results for:
                </span>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-[#302b63] text-indigo-700 dark:text-white rounded-full font-medium transition-colors duration-300">
                  {searchQuery}
                </span>
              </div>
            )}
            {blogs && blogs.length > 0 ? (
              <>
                <BlogList cardType="viewer" blogs={blogs} />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/all-blogs"
                />
              </>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-1 transition-colors duration-300">
                  {searchQuery ? "No blogs found" : "No blogs yet"}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Check back later for new content"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in AllBlogsContainer:", error);
    return (
      <div className="min-h-full py-8 px-4">
        <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden max-w-7xl p-8 text-center">
          <p className="text-red-600">
            Error loading blogs. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
