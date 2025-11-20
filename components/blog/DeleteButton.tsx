"use client";

import { useState } from "react";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";

export default function DeleteButton({
  action,
  deleteId,
  text,
  itemName,
  itemType = "blog",
}: {
  action: (formData: FormData) => Promise<void>;
  deleteId: string | number;
  text: string;
  itemName: string;
  itemType?: string;
  revalidatePath?: string;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.append("deleteId", deleteId.toString());
    formData.append("revalidatePath", "");
    await action(formData);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDeleteClick}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-slate-700 hover:border-red-300 dark:hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow"
          type="button"
          aria-label={`Delete item with ID ${deleteId}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {text}
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        itemName={itemName}
        itemType={itemType}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
