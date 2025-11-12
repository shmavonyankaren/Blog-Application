import { getAllBlogs } from "@/lib/actions/blog.actions";
import { BlogList } from "@/components";

export default async function AllBlogsContainer() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-full  py-8">
      <div className="mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              List of all blogs
            </h1>
          </div>
          <BlogList cardType="viewer" blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
