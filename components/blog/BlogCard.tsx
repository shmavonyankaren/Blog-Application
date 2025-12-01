import { BlogCreator, BlogType } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

import { getUserById } from "@/lib/actions/user.actions";
import BlogCreatorButtons from "./BlogCreatorButtons";
import { formatDateHour } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { checkIfBlogIsFavourited } from "@/lib/actions/favourite.action";
import { checkIfUserLikedBlog } from "@/lib/actions/blogLike.actions";
import SaveLikeButtons from "./SaveLikeButtons";

type BlogCardProps = {
  cardType: "creator" | "viewer";
  blog: BlogType;
};

export default async function BlogCard({ cardType, blog }: BlogCardProps) {
  const creatorUser: BlogCreator = await getUserById(blog.user_id);
  const user = await currentUser();
  const isFavourited = user
    ? await checkIfBlogIsFavourited(user.id, blog.id)
    : false;
  const isLiked = user ? await checkIfUserLikedBlog(user.id, blog.id) : false;
  const isOwnBlog = user?.id === blog.user_id;

  return (
    <div className="group relative flex min-h-[320px] sm:min-h-[360px] md:min-h-[380px] w-full max-w-[450px] sm:max-w-[480px] md:max-w-[500px] min-w-[280px] sm:min-w-[320px] md:min-w-[350px] flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 shadow-lg dark:shadow-slate-950/50 hover:shadow-2xl border border-gray-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-600 transform transition-all duration-300 ease-in-out">
      <Link
        scroll={true}
        href={`/blog/${blog.id}`}
        style={{
          backgroundImage: blog.image
            ? `url(${blog.image})`
            : "url(/assets/images/default_blog_image.png)",
        }}
        className="relative flex-center grow bg-gray-50 dark:bg-slate-800/50 bg-cover bg-center text-grey-500 overflow-hidden transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      {user && (
        <SaveLikeButtons
          blogId={blog.id}
          isFavourited={isFavourited}
          isLiked={isLiked}
        />
      )}

      {/* Event creator controls */}
      {cardType === "creator" && (
        <BlogCreatorButtons blog={blog} from="blogCard" />
      )}

      <div className="flex min-h-[180px] sm:min-h-[200px] md:min-h-[230px] flex-col gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-900 transition-colors duration-300">
        <Link href={`/blog/${blog.id}`} className="cursor-pointer">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold line-clamp-2 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
            {blog.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
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
          <span>{formatDateHour(blog.created_at)}</span>
        </div>

        <div className="flex-between w-full pt-2 sm:pt-3 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <Link
            href={isOwnBlog ? "/my-blogs" : `/creator-page/${blog.user_id}`}
            className="cursor-pointer flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              className="rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              src={creatorUser?.photo || "/assets/images/user_avatar.png"}
              alt="event creator"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
              loading="lazy"
            />
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300">
              {isOwnBlog
                ? "You"
                : creatorUser.username ||
                  creatorUser.first_name + " " + creatorUser.last_name}
            </p>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/blog/${blog.id}`}
              className="cursor-pointer flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors group/link"
            >
              <span className="text-xs sm:text-sm font-medium">Read</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/link:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
