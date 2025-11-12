import { AddBlog, BlogFooter, BlogList } from "@/components";

import { getBlogsByUser } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function BlogContainer() {
  const user = await currentUser();

  const blogs = await getBlogsByUser({ userId: user!.id });

  return (
    <div className="min-h-full  py-8">
      <div className="mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              List of my blogs
            </h1>
            <AddBlog />
          </div>
          <BlogList cardType="creator" blogs={blogs} />
          <BlogFooter blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
