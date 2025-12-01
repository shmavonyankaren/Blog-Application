"use client";

import { editCommentByCommentId } from "@/lib/actions/comment.actions";
import { useState, useTransition, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface EditCommentFormProps {
  commentId: string | number;
  blogId: string | number;
  initialContent: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EditCommentForm({
  commentId,
  blogId,
  initialContent,
  onCancel,
  onSuccess,
}: EditCommentFormProps) {
  const [editContent, setEditContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const wasSubmitting = useRef(false);

  // Memoize callbacks to prevent unnecessary effect re-runs
  const handleSuccessCallback = useCallback(() => {
    if (wasSubmitting.current && !isPending) {
      wasSubmitting.current = false;
      onSuccess();
    }
  }, [isPending, onSuccess]);

  useEffect(() => {
    handleSuccessCallback();
  }, [handleSuccessCallback]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    const formData = new FormData();
    formData.append("commentId", String(commentId));
    formData.append("blogId", String(blogId));
    formData.append("content", editContent);

    wasSubmitting.current = true;
    startTransition(async () => {
      await editCommentByCommentId(formData, "/blog/" + blogId);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        disabled={isPending}
        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        rows={3}
        required
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending || !editContent.trim()}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
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
              Saving...
            </>
          ) : (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Cancel
        </button>
      </div>
    </form>
  );
}
