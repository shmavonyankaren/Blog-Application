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
    <div className="group relative flex min-h-[380px] w-full max-w-[500px] min-w-[350px] flex-col overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-transform duration-500 ease-in-out md:min-h-[438px] card-container">
      <Link
        scroll={true}
        href={`/blog/${blog.id}`}
        style={{
          backgroundImage: blog.image
            ? `url(${blog.image})`
            : "url(/assets/images/default_blog_image.png)",
        }}
        className="flex-center grow bg-gray-50 bg-cover bg-center  text-grey-500"
      />

      {/* Event creator controls */}
      {cardType === "creator" && <BlogCreatorButtons blog={blog} />}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          {/* <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            FREE
          </span> */}
          {/* <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            Category
          </p> */}
        </div>

        <Link href="#">
          <p className="text-xl  md:p-medium-20 line-clamp-2 flex-1 text-blue-800">
            {blog.title}
          </p>
        </Link>

        <p className="p-medium-16 text-grey-500">
          Uploaded : {formatDateHour(blog.created_at)}
        </p>

        <div className="flex-between w-full">
          <div className="flex items-center justify-end gap-2">
            <Image
              className="rounded-full max-h-8"
              src={creatorUser?.photo || "/assets/images/user_avatar.png"}
              alt="event creator"
              width={32}
              height={32}
            />
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {creatorUser.username ||
                creatorUser.first_name + " " + creatorUser.last_name}
            </p>
          </div>

          <Link href="#" className="flex gap-2">
            <p className="text-primary-500">Comments</p>
            <Image
              src="/assets/icons/arrow.svg"
              alt="arrow"
              width={10}
              height={10}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
