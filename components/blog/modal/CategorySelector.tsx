"use client";

import { CategoryType } from "@/lib/types";
import CreateCategoryForm from "./CreateCategoryForm";
import { useState } from "react";

interface CategorySelectorProps {
  categories: CategoryType[];
  selectedCategory: string;
  currentUserId?: string;
  showCreateForm: boolean;
  newCategoryName: string;
  onCategorySelect: (categoryId: string) => void;
  onToggleCreateForm: () => void;
  onNewCategoryChange: (value: string) => void;
  onCancelCreate: () => void;
  onDeleteCategory: (categoryId: number, categoryName: string) => void;
  onCategoryCreated: () => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  currentUserId,
  showCreateForm,
  newCategoryName,
  onCategorySelect,
  onToggleCreateForm,
  onNewCategoryChange,
  onCancelCreate,
  onDeleteCategory,
  onCategoryCreated,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategoryObj = categories.find(
    (cat) => cat.id.toString() === selectedCategory
  );

  const handleDeleteClick = (
    e: React.MouseEvent,
    categoryId: number,
    categoryName: string
  ) => {
    e.stopPropagation();
    onDeleteCategory(categoryId, categoryName);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
          Category
        </label>
        <button
          type="button"
          onClick={onToggleCreateForm}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors duration-300"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Category
        </button>
      </div>

      {showCreateForm && (
        <CreateCategoryForm
          value={newCategoryName}
          userId={currentUserId}
          onChange={onNewCategoryChange}
          onCancel={onCancelCreate}
          onSuccess={onCategoryCreated}
        />
      )}

      {/* Custom Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 text-left bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm hover:border-indigo-400 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span
              className={
                selectedCategoryObj
                  ? "text-gray-900 dark:text-white transition-colors duration-300"
                  : "text-gray-500 dark:text-gray-400 transition-colors duration-300"
              }
            >
              {selectedCategoryObj ? selectedCategoryObj.name : "No category"}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-64 overflow-y-auto transition-colors duration-300">
            {/* None Option */}
            <button
              type="button"
              onClick={() => {
                onCategorySelect("");
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-[#302b63] transition-colors duration-300 ${
                selectedCategory === ""
                  ? "bg-indigo-100 dark:bg-[#302b63] text-indigo-700 dark:text-white font-medium"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              No category
            </button>

            {/* Category Options */}
            {categories.map((category) => {
              const isOwner = category.creator_id === currentUserId;
              const isSelected = selectedCategory === category.id.toString();

              return (
                <div
                  key={category.id}
                  className={`flex items-center justify-between px-4 py-2.5 hover:bg-indigo-50 dark:hover:bg-[#302b63] transition-colors duration-300 ${
                    isSelected ? "bg-indigo-100 dark:bg-[#302b63]" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onCategorySelect(category.id.toString());
                      setIsOpen(false);
                    }}
                    className={`flex-1 text-left transition-colors duration-300 ${
                      isSelected
                        ? "text-indigo-700 dark:text-white font-medium"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={(e) =>
                        handleDeleteClick(e, category.id, category.name)
                      }
                      className="ml-2 p-1.5 rounded hover:bg-red-100 transition-colors text-red-500 hover:text-red-700"
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
            })}
          </div>
        )}
      </div>

      <input type="hidden" name="categoryId" value={selectedCategory} />
    </div>
  );
}
