"use client";

import { usePathname } from "next/navigation";
import { createCategory } from "@/lib/actions/blog.actions";

interface CreateCategoryFormProps {
  value: string;
  userId?: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CreateCategoryForm({
  value,
  userId,
  onChange,
  onCancel,
  onSuccess,
}: CreateCategoryFormProps) {
  const pathname = usePathname();

  const handleAddClick = async () => {
    if (!value.trim() || !userId) return;

    const formData = new FormData();
    formData.append("name", value.trim());
    formData.append("creatorId", userId);

    await createCategory(formData, pathname);
    onChange("");
    onSuccess();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddClick();
    }
  };

  return (
    <div className="mb-3 p-3 bg-indigo-50 dark:bg-[#0f172a] rounded-lg border border-indigo-200 dark:border-slate-700 transition-colors duration-300">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Category name..."
          className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 border border-indigo-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors duration-300"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="px-3 py-2 bg-indigo-600 dark:bg-indigo-700 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 bg-gray-300 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600 transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
