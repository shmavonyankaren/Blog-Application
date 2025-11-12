import { BlogType as Blog } from "@/lib/types";
import { deleteAllBlogsByUser } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";

async function BlogFooter({ blogs }: { blogs: Blog[] }) {
  const user = await currentUser();
  return (
    <div className="mt-8 border-t pt-6">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-gray-500">
              Total Number of Blogs:{" "}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-gray-800">
              {blogs.length}
            </span>
          </div>
        </div>

        <div className="flex flex- items-center gap-2">
          <form action={deleteAllBlogsByUser}>
            <input type="hidden" name="userId" value={user?.id} />
            <button
              className="min-w-[90px] py-3 px-3 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
              type="submit"
              aria-label="Clear all Blogs"
            >
              Delete All My Blogs
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogFooter;
