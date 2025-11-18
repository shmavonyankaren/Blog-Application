import { BlogCard } from "@/components";

import { BlogType as Blog } from "@/lib/types";

type BlogListProps = {
  cardType: "creator" | "viewer";
  blogs: Blog[];
};

export default function BlogList({ cardType, blogs }: BlogListProps) {
  return (
    <div className="w-full ">
      <ul className="flex flex-wrap gap-6 w-full justify-center items-stretch">
        {blogs.map((blog) => {
          return (
            <li
              key={blog.id}
              className="transition-all duration-200 hover:scale-[1.02] list-none"
            >
              <BlogCard cardType={cardType} blog={blog} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
