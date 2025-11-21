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
    </main>
  );
}
