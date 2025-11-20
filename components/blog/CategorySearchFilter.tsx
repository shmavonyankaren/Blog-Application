"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "@/lib/actions/blog.actions";
import { CategoryType } from "@/lib/types";
import { useEffect, useState } from "react";

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
      console.log("Category change event received");
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

  const handleCategoryClick = (categoryId: string) => {
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
  };

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
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-indigo-300 hover:shadow-md"
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
            px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out
            ${
              selectedCategory === category.id.toString()
                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-indigo-300 hover:shadow-md"
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
