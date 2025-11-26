import { getUserById } from "@/lib/actions/user.actions";
import { getBlogsByUser } from "@/lib/actions/blog.actions";
import { BlogList, Pagination } from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTotalBlogViewsForUser } from "@/lib/actions/blogView.actions";
import { getTotalBlogLikesForUser } from "@/lib/actions/blogLike.actions";

export default async function CreatorPage({
  params,
  searchParams,
}: {
  params: Promise<{ creatorId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { creatorId } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  // Fetch creator information
  const creator = await getUserById(creatorId);

  if (!creator) {
    notFound();
  }

  // Fetch creator's blogs
  const result = await getBlogsByUser({ userId: creatorId }, page, 9);
  const blogs = result?.data || [];
  const totalPages = result?.totalPages || 1;
  const totalCount = result?.totalCount || 0;
  const totalViews = await getTotalBlogViewsForUser(creatorId);
  const totalLikes = await getTotalBlogLikesForUser(creatorId);

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 dark:bg-linear-to-b dark:from-slate-950 dark:to-slate-900 flex-1 min-h-screen transition-colors duration-300">
      <div className="min-h-full py-8 px-4">
        <div className="mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden max-w-7xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          {/* Creator Profile Header */}
          <div className="bg-linear-to-r from-purple-600 to-indigo-600 dark:from-slate-800 dark:to-slate-700 duration-300 transition-colors px-6 py-12 md:py-16">
            <div className="flex flex-col items-center text-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={creator.photo || "/assets/images/user_avatar.png"}
                  alt={creator.username || "Creator"}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white/30 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
              </div>

              {/* Creator Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {creator.username ||
                    `${creator.first_name} ${creator.last_name}`}
                </h1>
                <p className="text-purple-100 dark:text-slate-300 text-lg transition-colors duration-300">
                  Content Creator
                </p>
                {creator.email && (
                  <p className="text-purple-200 dark:text-slate-400 text-sm mt-2 transition-colors duration-300">
                    {creator.email}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{totalCount}</p>
                  <p className="text-purple-100 dark:text-slate-300 text-sm transition-colors duration-300">
                    {totalCount === 0 || totalCount === 1 ? "Blog" : "Blogs"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{totalViews}</p>
                  <p className="text-purple-100 dark:text-slate-300 text-sm transition-colors duration-300">
                    {totalViews === 0 || totalViews === 1 ? "View" : "Views"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{totalLikes}</p>
                  <p className="text-purple-100 dark:text-slate-300 text-sm transition-colors duration-300">
                    {totalLikes === 0 || totalLikes === 1 ? "Like" : "Likes"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Blogs Section */}
          <div className="px-6 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Published Blogs
              </h2>
              <p className="text-gray-600 dark:text-slate-400 transition-colors duration-300">
                Explore all blogs by this creator
              </p>
            </div>

            {blogs && blogs.length > 0 ? (
              <>
                <BlogList cardType="viewer" blogs={blogs} />
                <div className="mt-8">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    basePath={`/creator-page/${creatorId}`}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 dark:text-slate-600 mb-4 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  No Blogs Yet
                </h3>
                <p className="text-gray-600 dark:text-slate-400 transition-colors duration-300">
                  This creator hasn&apos;t published any blogs yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
