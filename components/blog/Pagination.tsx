"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage) return; // Prevent unnecessary re-renders
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${basePath}?${params.toString()}`);
    },
    [basePath, router, searchParams, currentPage]
  );

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    // Show ellipsis or pages near start
    if (showEllipsisStart) {
      pages.push("...");
    } else if (totalPages > 1) {
      for (let i = 2; i <= Math.min(3, totalPages - 1); i++) {
        pages.push(i);
      }
    }

    // Show current page and surrounding pages
    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
    } else if (currentPage === 3 && totalPages > 4) {
      pages.push(3);
    } else if (currentPage === totalPages - 2 && totalPages > 4) {
      pages.push(totalPages - 2);
    }

    // Show ellipsis or pages near end
    if (showEllipsisEnd) {
      pages.push("...");
    } else if (totalPages > 3) {
      for (let i = Math.max(totalPages - 2, 4); i <= totalPages - 1; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-indigo-400 dark:hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-colors duration-300"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2 text-gray-500 dark:text-gray-400 transition-colors duration-300"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`min-w-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : " cursor-pointer text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-indigo-400 dark:hover:border-slate-600 transition-colors duration-300"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Mobile: Current Page Indicator */}
      <div className="sm:hidden px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg transition-colors duration-300">
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-indigo-400 dark:hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-colors duration-300"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
