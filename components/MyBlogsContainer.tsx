import { AddBlog, BlogFooter, BlogList } from "@/components";

import { getBlogsByUser } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function BlogContainer() {
  const user = await currentUser();

  const blogs = await getBlogsByUser({ userId: user!.id });

  return (
    <div className="min-h-full py-8 px-4">
      <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden max-w-7xl">
        {/* Header Section with Gradient Background */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Blogs</h1>
              <p className="text-indigo-100 text-sm">
                Create, manage, and share your stories with the world
              </p>
            </div>
            <AddBlog />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8">
          {blogs && blogs.length > 0 ? (
            <>
              <BlogList cardType="creator" blogs={blogs} />
              <BlogFooter blogs={blogs} />
            </>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
              <p className="text-gray-600 text-lg font-medium mb-1">
                No blogs yet
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Start sharing your thoughts by creating your first blog post
              </p>
              <AddBlog />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
