export default function LoadingCreatorPage() {
  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 dark:bg-linear-to-b dark:from-slate-950 dark:to-slate-900 flex-1 min-h-screen transition-colors duration-300">
      <div className="min-h-full py-8 px-4">
        <div className="mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden max-w-7xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          {/* Skeleton Header */}
          <div className="bg-linear-to-r from-purple-600 to-indigo-600 dark:from-slate-800 dark:to-slate-700 duration-300 transition-colors px-6 py-12 md:py-16">
            <div className="flex flex-col items-center text-center gap-6">
              {/* Avatar Skeleton */}
              <div className="w-[120px] h-[120px] rounded-full bg-white/20 animate-pulse"></div>

              {/* Name Skeleton */}
              <div className="space-y-3 w-full max-w-md">
                <div className="h-10 bg-white/20 rounded animate-pulse"></div>
                <div className="h-6 bg-white/10 rounded animate-pulse w-2/3 mx-auto"></div>
              </div>

              {/* Stats Skeleton */}
              <div className="flex gap-8 mt-4">
                <div className="text-center space-y-2">
                  <div className="h-8 w-16 bg-white/20 rounded animate-pulse mx-auto"></div>
                  <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="px-6 py-8">
            <div className="mb-6">
              <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-64 animate-pulse"></div>
            </div>

            {/* Blog Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 dark:bg-slate-800 rounded-2xl h-[380px] animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
