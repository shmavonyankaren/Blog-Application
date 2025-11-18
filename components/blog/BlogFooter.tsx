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
    <div className="mt-10 pt-6 border-t border-gray-200">
      <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Stats Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100">
              <svg
                className="w-5 h-5 text-indigo-600"
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
              <p className="text-xs text-gray-500 font-medium">Total Posts</p>
              <p className="text-2xl font-bold text-gray-800">{blogs.length}</p>
            </div>
          </div>

          {/* Delete All Button */}
          <DeleteButton
            action={deleteAllBlogsByUser}
            deleteId={user!.id}
            text="Delete All"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogFooter;
