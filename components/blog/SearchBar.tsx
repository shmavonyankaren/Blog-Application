"use client";

import { useCallback, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isSearching, setIsSearching] = useState(false);

  // Perform the actual search operation
  const performSearch = useCallback(
    (searchQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
      } else {
        params.delete("q");
      }

      router.push(`?${params.toString()}`);
      setIsSearching(false);
    },
    [router, searchParams]
  );

  // Create debounced search function (2 seconds delay)
  const debouncedSearch = useMemo(
    () => debounce(performSearch, 2000),
    [performSearch]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      setIsSearching(true);
      debouncedSearch(value);
    } else {
      setIsSearching(false);
      // Cancel any pending debounced calls
      debouncedSearch.cancel();
      // Clear the search results when input is empty
      router.push(window.location.pathname);
    }
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search blogs..."
        className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-[#0f172a] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 shadow-sm hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-200"
      />

      {/* Loading Spinner */}
      {isSearching && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Clear Button */}
      {query && !isSearching && (
        <button
          onClick={() => {
            setQuery("");
            setIsSearching(false);
            debouncedSearch.cancel();
            router.push(window.location.pathname);
          }}
          className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
          aria-label="Clear search"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
