import { BlogType as Blog } from "@/lib/types";
import { deleteAllBlogsByUser } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";
import { DeleteButton } from "@/components";

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
            <span className="flex justify-center items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-gray-800">
              {blogs.length}
            </span>
          </div>
        </div>

        <DeleteButton
          action={deleteAllBlogsByUser}
          deleteId={user!.id}
          text="Delete All My Blogs"
        />
      </div>
    </div>
  );
}

export default BlogFooter;
