"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";

export default function DeleteButton({
  action,
  deleteId,
  text,
  itemName,
  itemType = "blog",
}: {
  action: (formData: FormData, path: string) => Promise<void>;
  deleteId: string | number;
  text: string;
  itemName: string;
  itemType?: string;
  revalidatePath?: string;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleteModalOpen(false);
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("deleteId", deleteId.toString());
    formData.append("revalidatePath", "");
    await action(formData, "/favourites");
    router.refresh();
  }, [deleteId, action, router]);
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-slate-700 hover:border-red-300 dark:hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          aria-label={`Delete item with ID ${deleteId}`}
        >
          {isDeleting ? (
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
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
          )}
          {isDeleting ? "Deleting..." : text}
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
