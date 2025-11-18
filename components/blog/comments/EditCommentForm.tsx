"use client";

import { editCommentByCommentId } from "@/lib/actions/blog.actions";
import { useState } from "react";

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

  const handleSubmit = async (formData: FormData) => {
    await editCommentByCommentId(formData);
    onSuccess();
  };

  return (
    <form action={handleSubmit} className="pl-[52px]">
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="blogId" value={blogId} />
      <textarea
        name="content"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full px-3 py-2 border border-indigo-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
        rows={3}
        required
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
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
