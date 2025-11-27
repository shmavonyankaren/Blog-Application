import { getRecommendedBlogs } from "@/lib/actions/blog.actions";
import RecommendationList from "./RecommendationList";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default async function RecommendationContainer({
  recSettings,
}: {
  recSettings: {
    category?: string;
    creator?: string;
    title?: string;
    excludeBlogId?: number;
    excludeUserId?: string;
  };
}) {
  const blogs = await getRecommendedBlogs(recSettings);
  return (
    <section className="relative mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 lg:mb-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-2xl sm:rounded-3xl transition-colors duration-300" />

      {/* Content container */}
      <div className="relative px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-10 lg:py-12 max-w-full overflow-hidden">
        {/* Header section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 shadow-lg mb-4 sm:mb-6 transition-colors duration-300">
            <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide transition-colors duration-300">
              Personalized
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent transition-colors duration-300 mb-3 sm:mb-4 leading-tight">
            Recommended for You
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-1 sm:px-2 lg:px-0 transition-colors duration-300">
            Discover amazing content tailored just for you. Explore trending
            topics and stories that match your interests.
          </p>
        </div>

        {/* Recommendations list */}
        <div className="relative">
          <RecommendationList blogs={blogs} />

          {/* Subtle gradient overlays for smooth edges - responsive widths */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 xl:w-20 bg-linear-to-r from-white dark:from-slate-950 to-transparent pointer-events-none z-10 transition-colors duration-300" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 xl:w-20 bg-linear-to-l from-white dark:from-slate-950 to-transparent pointer-events-none z-10 transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
