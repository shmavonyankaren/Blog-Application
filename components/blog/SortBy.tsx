"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { useState, useRef, useEffect } from "react";

export default function SortBy() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const currentSort = searchParams.get("sort") || "newest";

  const sortByOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Most Popular", value: "most_viewed" },
    { label: "Most Liked", value: "most_liked" },
    { label: "Most Commented", value: "most_commented" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathName}?${params.toString()}`);
    });
    setIsOpen(false);
  };

  const currentLabel = sortByOptions.find(
    (s) => s.value === currentSort
  )?.label;

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort
      </span> */}

      <div className="relative" ref={ref}>
        <label htmlFor="sortBy" className="sr-only">
          Sort By
        </label>
        <button
          type="button"
          onClick={() => setIsOpen((s) => !s)}
          className="cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-3 pl-2 sm:pl-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-800 text-xs sm:text-sm text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md dark:hover:bg-gray-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          aria-expanded={isOpen}
        >
          <span className="truncate max-w-32 sm:max-w-48">{currentLabel}</span>
          <svg
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M6 8l4 4 4-4"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-48 sm:w-56 mt-2 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 sm:max-h-64 overflow-y-auto transition-colors duration-300">
            {sortByOptions.map((option) => {
              const selected = option.value === currentSort;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`cursor-pointer w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-left hover:bg-indigo-50 dark:hover:bg-[#302b63] transition-colors duration-300 ${
                    selected
                      ? "bg-indigo-100 dark:bg-[#302b63] text-indigo-700 dark:text-white font-medium"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
