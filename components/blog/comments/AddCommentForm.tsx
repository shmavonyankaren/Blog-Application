"use client";

import { addCommentToBlog } from "@/lib/actions/comment.actions";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function AddCommentForm({ blogId }: { blogId: string }) {
  const { user } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    const formData = new FormData();
    formData.append("blogId", blogId);
    formData.append("userId", user.id);
    formData.append("content", content);

    startTransition(async () => {
      await addCommentToBlog(formData, "/blog/" + blogId);
      setContent("");
      router.refresh();
    });
  };

  if (!user) {
    return (
      <div className="mt-6 mb-6 bg-linear-to-r border-2 border-indigo-200 dark:bg-slate-800 shadow-sm dark:shadow-slate-800/50 dark:border-slate-500 border-b rounded-xl p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-indigo-600 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="text-xl font-bold  text-gray-900 dark:text-white mb-2 transition-colors duration-300">
          Join the Conversation
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
          Sign in to share your thoughts and engage with the community.
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          Sign In to Comment
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
        Add a Comment
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          placeholder="Share your thoughts..."
          disabled={isPending}
          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending || !content.trim()}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:bg-gradient-to-r dark:from-indigo-700 dark:to-purple-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-800 dark:hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg dark:focus:ring-indigo-600 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
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
                Posting...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
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
                Post Comment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
