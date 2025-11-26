"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "@/lib/actions/blog.actions";
import { CategoryType } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data || []);
    };
    fetchCategories();

    // Listen for category changes
    const handleCategoryChange = () => {
      fetchCategories();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("categoryChange", handleCategoryChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("categoryChange", handleCategoryChange);
      }
    };
  }, []);

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (categoryId === "all") {
        params.delete("category");
      } else {
        params.set("category", categoryId);
      }

      // Reset to page 1 when changing category
      params.delete("page");

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : window.location.pathname);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* All Button */}
      <button
        onClick={() => handleCategoryClick("all")}
        className={`
          px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out
          ${
            selectedCategory === "all"
              ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
              : "bg-white dark:bg-[#302b63] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#24243e] border border-gray-200 dark:border-[#302b63] hover:border-indigo-300 dark:hover:border-[#24243e] hover:shadow-md transition-colors duration-300"
          }
        `}
      >
        All Categories
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id.toString())}
          className={`
            px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out cursor-pointer
            ${
              selectedCategory === category.id.toString()
                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-600 hover:shadow-md transition-colors duration-300"
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
