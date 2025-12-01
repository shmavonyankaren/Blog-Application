"use client";

import { likeComment, unlikeComment } from "@/lib/actions/comment.actions";
import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";

export default function CommentLikeButton({
  blogId,
  commentId,
  initialIsLiked,
  initialLikes,
}: {
  blogId: number;
  commentId: number;
  initialIsLiked: boolean;
  initialLikes: number;
}) {
  const { user } = useUser();
  const [liked, setLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialLikes);
  const pendingActionRef = useRef<Promise<void> | null>(null);
  const targetStateRef = useRef<boolean>(initialIsLiked);

  const handleToggleLike = async () => {
    if (!user?.id) return;

    // Store current UI state before toggle
    const previousLiked = liked;
    const previousCount = count;

    // Immediate optimistic update
    const newLikedState = !previousLiked;
    setLiked(newLikedState);
    setCount(newLikedState ? previousCount + 1 : previousCount - 1);

    // Update target state - this is what we want the final DB state to be
    targetStateRef.current = newLikedState;

    // Wait for any pending action to complete first
    if (pendingActionRef.current) {
      await pendingActionRef.current;
    }

    // Only execute if target state still matches what we just set
    // (if user clicked again, targetStateRef will be different)
    const targetAtExecution = targetStateRef.current;

    // Create new pending action
    const actionPromise = (async () => {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("commentId", String(commentId));

      try {
        // Execute action based on target state when this action runs
        if (targetAtExecution) {
          await likeComment(formData, "/blog/" + blogId);
        } else {
          await unlikeComment(formData, "/blog/" + blogId);
        }
      } catch (error) {
        // Rollback on error
        setLiked(previousLiked);
        setCount(previousCount);
        console.error("Failed to toggle like:", error);
      } finally {
        pendingActionRef.current = null;
      }
    })();

    pendingActionRef.current = actionPromise;
  };

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
        className={`w-4 h-4 transition-all duration-200 ${
          liked
            ? "text-red-600 dark:text-red-400 fill-current scale-110"
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
