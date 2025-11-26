"use client";

import { CategoryType } from "@/lib/types";
import { memo } from "react";

interface CategoryItemProps {
  category: CategoryType;
  isSelected: boolean;
  currentUserId?: string;
  onSelect: () => void;
  onDelete: (categoryId: number, categoryName: string) => void;
}

function CategoryItem({
  category,
  isSelected,
  currentUserId,
  onSelect,
  onDelete,
}: CategoryItemProps) {
  const isOwner = category.creator_id === currentUserId;

  return (
    <div
      className={`
        flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all
        ${
          isSelected
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        }
      `}
    >
      <button type="button" onClick={onSelect} className="flex-1 text-left">
        {category.name}
      </button>
      {isOwner && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category.id, category.name);
          }}
          className={`
            ml-2 p-1 rounded hover:bg-red-100 transition-colors
            ${isSelected ? "text-white hover:text-red-600" : "text-red-500"}
          `}
          title="Delete category"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
