import { CreateEditBlogModal } from "@/components";
import { getBlogById } from "@/lib/actions/blog.actions";
import { BlogType } from "@/lib/types";
import Image from "next/image";
import { formatDateHour } from "@/lib/utils/";
import { currentUser } from "@clerk/nextjs/server";
import CommentsSection from "@/components/blog/comments/CommentsSection";
import BlogDetailDeleteButton from "@/components/blog/BlogDetailDeleteButton";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const user = await currentUser();

  let blog: BlogType;
  try {
    blog = await getBlogById(blogId);
    if (!blog) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden mb-6 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src={blog.image || "/assets/images/default_blog_image.png"}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {formatDateHour(blog.updated_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit/Delete buttons */}
            {user?.id === blog.user_id && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <CreateEditBlogModal actionType="edit" blog={blog} />
                <BlogDetailDeleteButton
                  blogId={blog.id}
                  blogTitle={blog.title}
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap transition-colors duration-300">
              {blog.description ?? "No description provided."}
            </p>
          </div>

          {/* Metadata footer */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              <span>Published on {formatDateHour(blog.created_at)}</span>
              {blog.updated_at !== blog.created_at && (
                <span>Last updated {formatDateHour(blog.updated_at)}</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CommentsSection
            blogId={String(blog.id)}
            creatorId={String(blog.user_id)}
          />
        </div>
      </div>
    </main>
  );
}
