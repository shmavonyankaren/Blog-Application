export default function LoadingMyBlogs() {
  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 dark:bg-linear-to-b dark:from-slate-950 dark:to-slate-900 flex-1 h-full w-full min-h-0 flex items-center justify-center transition-colors duration-300">
      <div className="min-h-full py-8 px-4 w-full">
        <div className="mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden max-w-7xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          {/* Header Skeleton */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 dark:from-slate-800 dark:to-slate-700 duration-300 transition-colors px-6 py-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left space-y-3">
                <div className="h-10 bg-white/20 rounded w-48 animate-pulse mx-auto sm:mx-0"></div>
                <div className="h-5 bg-white/10 rounded w-64 animate-pulse mx-auto sm:mx-0"></div>

                {/* Stats Skeleton */}
                <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                  <div className="text-center">
                    <div className="h-8 w-12 bg-white/20 rounded animate-pulse mb-1 mx-auto"></div>
                    <div className="h-3 w-10 bg-white/10 rounded animate-pulse mx-auto"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-8 w-12 bg-white/20 rounded animate-pulse mb-1 mx-auto"></div>
                    <div className="h-3 w-10 bg-white/10 rounded animate-pulse mx-auto"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-8 w-12 bg-white/20 rounded animate-pulse mb-1 mx-auto"></div>
                    <div className="h-3 w-10 bg-white/10 rounded animate-pulse mx-auto"></div>
                  </div>
                </div>
              </div>
              <div className="h-12 w-32 bg-white/20 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-9 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Blog Grid Skeleton */}
          <div className="px-6 py-8">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-100 dark:bg-slate-800 rounded-2xl h-[438px] animate-pulse border border-gray-200 dark:border-slate-700"
                  ></div>
                ))}
              </div>
            </div>

            {/* Footer Skeleton */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-6 w-12 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-8 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
