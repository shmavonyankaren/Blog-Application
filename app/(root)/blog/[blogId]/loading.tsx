export default function LoadingBlogDetail() {
  return (
    <main className="w-full min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden mb-6 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <div className="relative h-[400px] md:h-[500px] bg-gray-200 dark:bg-slate-800 animate-pulse">
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            {/* Title overlay skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="h-12 bg-white/20 rounded w-3/4 mb-4 animate-pulse"></div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
                  <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
                  <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white/20 animate-pulse"></div>
                  <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-5/6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-4/5 animate-pulse"></div>
          </div>

          {/* Metadata footer skeleton */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="h-4 w-48 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Comments Section Skeleton */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-slate-800">
          <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-32 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-32 animate-pulse"></div>
                  <div className="h-16 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Section Skeleton */}
      <div className="relative mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 lg:mb-12 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-linear-to-r from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-2xl sm:rounded-3xl transition-colors duration-300" />

        {/* Content container */}
        <div className="relative px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-10 lg:py-12 max-w-full overflow-hidden">
          {/* Header section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 shadow-lg mb-4 sm:mb-6 transition-colors duration-300">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="h-10 sm:h-12 lg:h-14 bg-gray-300 dark:bg-slate-600 rounded animate-pulse mx-auto w-80 sm:w-96 lg:w-[500px]"></div>
              <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse mx-auto w-64 sm:w-80 lg:w-96"></div>
            </div>
          </div>

          {/* Recommendations list skeleton */}
          <div className="relative">
            <div className="flex gap-3 sm:gap-4 lg:gap-5 xl:gap-6 overflow-hidden">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="flex-none basis-[5em] flex justify-center items-center"
                >
                  <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl h-[200px] sm:h-[220px] lg:h-[240px] w-72 sm:w-80 lg:w-96 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Subtle gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 xl:w-20 bg-linear-to-r from-white dark:from-slate-950 to-transparent pointer-events-none z-10 transition-colors duration-300" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 xl:w-20 bg-linear-to-l from-white dark:from-slate-950 to-transparent pointer-events-none z-10 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </main>
  );
}
