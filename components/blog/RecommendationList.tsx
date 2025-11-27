import { BlogType } from "@/lib/types";
import BlogCard from "./BlogCard";

export default function RecommendationList({ blogs }: { blogs: BlogType[] }) {
  // Duplicate the blogs array to create endless scroll effect

  return (
    <div
      id="carousel"
      className="w-full mx-auto overflow-x-auto flex gap-3 sm:gap-4 lg:gap-5 xl:gap-6 py-3 sm:py-4 lg:py-6"
    >
      <div className="scroll-animation flex justify-center items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
        {blogs.map((blog, index) => {
          return (
            <div
              key={`${blog.id}-${index}`}
              // className="recommendation-item shrink-0 w-72 sm:w-80 lg:w-96 xl:w-96 mr-3 sm:mr-4 lg:mr-5 xl:mr-6 transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]"
              className="recommendation-item flex-none basis-[5em] flex justify-center items-center"
            >
              <BlogCard cardType="viewer" blog={blog} />
            </div>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="aria-hidden scroll-animation flex justify-center items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6"
      >
        {blogs.map((blog, index) => {
          return (
            <div
              key={`${blog.id}-${index}`}
              // className="recommendation-item shrink-0 w-72 sm:w-80 lg:w-96 xl:w-96 mr-3 sm:mr-4 lg:mr-5 xl:mr-6 transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]"
              className="recommendation-item flex-none basis-[5em] flex justify-center items-center"
            >
              <BlogCard cardType="viewer" blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
