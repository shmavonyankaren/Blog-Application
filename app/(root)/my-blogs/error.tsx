"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import Link from "next/link";

export default function MyBlogsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  const errorHandler = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center min-h-0 bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 px-4 py-8">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="absolute -inset-2 bg-red-500/20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Failed to Load Your Blogs
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-3 transition-colors duration-300">
          We couldn&apos;t load your blog posts. Please try again.
        </p>

        {/* Error Details */}
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400 font-mono wrap-break-word">
            {error.message || "An unknown error occurred"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={errorHandler}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
          <Link
            href="/all-blogs"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-slate-100 font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg border border-indigo-200 dark:border-slate-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Browse All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
