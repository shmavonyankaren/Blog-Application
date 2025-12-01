"use client";

import { addReplyToComment } from "@/lib/actions/comment.actions";
import React, {
  useState,
  useTransition,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

export default function CommentReplyForm({
  onClose,
  commentId,
  userId,
  blogId,
  onSuccess,
}: {
  onClose: () => void;
  commentId: number;
  userId: string;
  blogId: number;
  onSuccess?: () => void;
}) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const wasSubmitting = useRef(false);

  // Memoize callbacks to prevent unnecessary effect re-runs
  const handleSuccessCallback = useCallback(() => {
    if (wasSubmitting.current && !isPending) {
      wasSubmitting.current = false;
      onSuccess?.();
      onClose();
    }
  }, [isPending, onSuccess, onClose]);

  useEffect(() => {
    handleSuccessCallback();
  }, [handleSuccessCallback]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("blogId", String(blogId));
    formData.append("parentCommentId", String(commentId));
    formData.append("userId", userId);
    formData.append("content", content);

    wasSubmitting.current = true;
    startTransition(async () => {
      await addReplyToComment(formData, "/blog/" + blogId);
      router.refresh();
    });
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
          className="w-full px-3 py-2 border border-indigo-300 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0f172a] text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          rows={4}
          placeholder="Write your reply..."
          required
        ></textarea>
        <div className="flex justify-end mt-3 space-x-2">
          <button
            type="submit"
            disabled={isPending || !content.trim()}
            className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
                Replying...
              </>
            ) : (
              <>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Reply
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
