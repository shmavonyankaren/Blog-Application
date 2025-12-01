"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteAllCommentsFromBlog } from "@/lib/actions/comment.actions";
import { CommentType } from "@/lib/types";
import DeleteConfirmationModal from "@/components/blog/modal/DeleteConfirmationModal";

export default function CommentsFooter({
  comments,
  creatorId,
  currentUserId,
}: {
  comments: CommentType[];
  creatorId: string;
  currentUserId: string | null;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const blogId = comments[0]?.blog_id;

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!blogId) return;
    setIsDeleteModalOpen(false);
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("blogId", String(blogId));
    await deleteAllCommentsFromBlog(formData, "/blog/" + blogId);
    router.refresh();
  }, [blogId, router]);

  return (
    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 transition-colors duration-300">
          <svg
            className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </p>
      </div>
      {currentUserId && currentUserId === creatorId && blogId && (
        <>
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-50 dark:hover:bg-slate-700 hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
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
            {isDeleting ? "Deleting..." : "Delete All"}
          </button>

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            itemName="All Comments"
            itemType="comments"
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}
