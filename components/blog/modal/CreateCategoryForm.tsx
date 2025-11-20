"use client";

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
  const handleAddClick = async () => {
    if (!value.trim() || !userId) return;

    const formData = new FormData();
    formData.append("name", value.trim());
    formData.append("creatorId", userId);

    await createCategory(formData);
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
    <div className="mb-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Category name..."
          className="flex-1 px-3 py-2 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
