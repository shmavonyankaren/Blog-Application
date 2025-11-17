import { BlogCreator, BlogType } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

import { getUserById } from "@/lib/actions/user.actions";
import BlogCreatorButtons from "./BlogCreatorButtons";
import { formatDateHour } from "@/lib/utils";

type BlogCardProps = {
  cardType: "creator" | "viewer";
  blog: BlogType;
};

export default async function BlogCard({ cardType, blog }: BlogCardProps) {
  const creatorUser: BlogCreator = await getUserById(blog.user_id);
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[500px] min-w-[350px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out md:min-h-[438px]">
      <Link
        scroll={true}
        href={`/blog/${blog.id}`}
        style={{
          backgroundImage: blog.image
            ? `url(${blog.image})`
            : "url(/assets/images/default_blog_image.png)",
        }}
        className="relative flex-center grow bg-gray-50 bg-cover bg-center text-grey-500 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Event creator controls */}
      {cardType === "creator" && <BlogCreatorButtons blog={blog} />}

      <div className="flex min-h-[230px] flex-col gap-3 p-6 md:gap-4 bg-white">
        <Link href={`/blog/${blog.id}`}>
          <h3 className="text-xl font-bold md:text-2xl line-clamp-2 text-gray-900 hover:text-indigo-600 transition-colors">
            {blog.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
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

        <div className="flex-between w-full pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full ring-2 ring-gray-100"
              src={creatorUser?.photo || "/assets/images/user_avatar.png"}
              alt="event creator"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-sm font-medium text-gray-700">
              {creatorUser.username ||
                creatorUser.first_name + " " + creatorUser.last_name}
            </p>
          </div>

          <Link
            href={`/blog/${blog.id}`}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors group/link"
          >
            <span className="text-sm font-medium">Read</span>
            <svg
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
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
  );
}
