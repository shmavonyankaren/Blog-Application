import { BlogType as Blog } from "@/lib/types";
import { deleteAllBlogsByUser } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";
import { DeleteButton } from "@/components";

async function BlogFooter({ blogs }: { blogs: Blog[] }) {
  const user = await currentUser();

  if (!blogs || blogs.length === 0) {
    return null; // Don't show footer if no blogs
  }

  return (
    <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:text-white rounded-lg p-4 sm:p-5 md:p-6 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Stats Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 transition-colors duration-300">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-300 transition-colors duration-300">
                Total Posts
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                {blogs.length}
              </p>
            </div>
          </div>

          {/* Delete All Button */}
          <DeleteButton
            action={deleteAllBlogsByUser}
            deleteId={user!.id}
            text="Delete All"
            itemName="All Your Blogs"
            itemType="blogs"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogFooter;
