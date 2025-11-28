"use client";

import { likeComment, unlikeComment } from "@/lib/actions/comment.actions";
import { useUser } from "@clerk/nextjs";
import { useCallback, useState, useTransition, useEffect } from "react";

export default function CommentLikeButton({
  blogId,
  commentId,
  isLiked,
  likes,
}: {
  blogId: number;
  commentId: number;
  isLiked: boolean;
  likes: number;
}) {
  const { user } = useUser();
  const [, startTransition] = useTransition();
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likes);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setCount(likes);
  }, [likes]);

  const handleToggleLike = useCallback(() => {
    if (!user?.id) return;
    // Store the current state before changing
    const previousLiked = liked;
    const previousCount = count;
    // Optimistically update UI immediately
    setLiked(!previousLiked);
    setCount(previousLiked ? previousCount - 1 : previousCount + 1);
    // Run the async operation in the background
    startTransition(async () => {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("commentId", String(commentId));

      try {
        if (previousLiked) {
          await unlikeComment(formData, "/blog/" + blogId);
        } else {
          await likeComment(formData, "/blog/" + blogId);
        }
      } catch {
        // Revert on error
        setLiked(previousLiked);
        setCount(previousCount);
      }
    });
  }, [user, liked, count, commentId, blogId]);

  return (
    <button
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer group ${
        liked
          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50"
          : "bg-white/80 dark:bg-slate-800/80 text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600/50"
      } shadow-sm hover:shadow-md backdrop-blur-sm`}
      onClick={handleToggleLike}
      type="button"
      title={liked ? "Unlike" : "Like"}
    >
      <svg
        className={`w-4 h-4 transition-colors duration-300 ${
          liked
            ? "text-red-600 dark:text-red-400 fill-current"
            : "text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"
        }`}
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="transition-colors duration-300">{count}</span>
    </button>
  );
}
