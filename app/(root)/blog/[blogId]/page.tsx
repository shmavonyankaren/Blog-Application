import { BlogCreatorButtons } from "@/components";
import { getBlogById } from "@/lib/actions/blog.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { BlogType } from "@/lib/types";
import Image from "next/image";
import { formatDateHour } from "@/lib/utils/";
import { currentUser } from "@clerk/nextjs/server";
import CommentsSection from "@/components/blog/comments/CommentsSection";
import { notFound } from "next/navigation";
import Link from "next/link";
import { checkIfBlogIsFavourited } from "@/lib/actions/favourite.action";
import {
  checkIfUserLikedBlog,
  getBlogLikeCount,
} from "@/lib/actions/blogLike.actions";
import { getBlogViewCount } from "@/lib/actions/blogView.actions";
import ViewCount from "@/components/blog/ViewCount";
import SaveLikeButtons from "@/components/blog/SaveLikeButtons";
import RecommendationContainer from "@/components/blog/RecommendationContainer";

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

  const creator = await getUserById(blog.user_id);
  const isFavourited = user
    ? await checkIfBlogIsFavourited(user.id, blog.id)
    : false;
  const isLiked = user ? await checkIfUserLikedBlog(user.id, blog.id) : false;
  const likeCount = await getBlogLikeCount(blog.id);
  const viewCount = await getBlogViewCount(blog.id);
  const recommendationSetting = {
    category: blog.category_id ? String(blog.category_id) : undefined,
    creator: blog.user_id ? String(blog.user_id) : undefined,
    title: blog.title ? String(blog.title) : undefined,
    excludeBlogId: Number(blog.id),
    excludeUserId: user ? user.id : undefined,
  };
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

              <div className="flex items-center gap-4 text-white/90 flex-wrap">
                {/* Creator Info */}
                <Link
                  href={
                    user?.id === blog.user_id
                      ? "/my-blogs"
                      : `/creator-page/${blog.user_id}`
                  }
                >
                  <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image
                      src={creator?.photo || "/assets/images/user_avatar.png"}
                      alt={creator?.username || "User"}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white/30"
                    />
                    <span className="text-sm font-medium">
                      {user?.id === blog.user_id
                        ? "You"
                        : creator?.username ||
                          `${creator?.first_name} ${creator?.last_name}`}
                    </span>
                  </div>
                </Link>
                <span className="text-white/50">•</span>
                <div
                  title="blog category section"
                  className="flex items-center gap-2"
                >
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
                {(blog as BlogType).category_name && (
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {(blog as BlogType).category_name}
                    </span>
                  </div>
                )}
                <span className="text-white/50">•</span>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 fill-current"
                    fill="currentColor"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Likes: {likeCount}
                </div>
                <span className="text-white/50">•</span>
                <ViewCount viewCount={viewCount} blogId={blog.id} />
              </div>
            </div>

            {/* Save/Favourite button for logged-in users */}
            {user && (
              <SaveLikeButtons
                blogId={blog.id}
                isFavourited={isFavourited}
                isLiked={isLiked}
              />
            )}

            {/* Edit/Delete buttons */}
            {user?.id === blog.user_id && (
              // <div className="absolute top-4 right-4 flex flex-col items-center gap-2">
              //   <div className="flex justify-center items-center p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-lg shadow-lg transition-all duration-300">
              //     <CreateEditBlogModal actionType="edit" blog={blog} />
              //   </div>
              //   <BlogDetailDeleteButton
              //     blogId={blog.id}
              //     blogTitle={blog.title}
              //   />
              <BlogCreatorButtons blog={blog} from="blogDetail" />
              // </div>
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

      <RecommendationContainer recSettings={recommendationSetting} />
    </main>
  );
}
