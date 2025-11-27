import { BlogType } from "@/lib/types";
import BlogCard from "./BlogCard";

export default function RecommendationList({ blogs }: { blogs: BlogType[] }) {
  // Duplicate the blogs array to create endless scroll effect
  const duplicatedBlogs = [...blogs, ...blogs];

  return (
    <div className="w-full overflow-hidden py-3 sm:py-4 lg:py-6">
      <div className="flex animate-scroll gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
        {duplicatedBlogs.map((blog, index) => {
          return (
            <div
              key={`${blog.id}-${index}`}
              className="recommendation-item shrink-0 w-72 sm:w-80 lg:w-96 xl:w-96 mr-3 sm:mr-4 lg:mr-5 xl:mr-6 transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]"
            >
              <BlogCard cardType="viewer" blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
