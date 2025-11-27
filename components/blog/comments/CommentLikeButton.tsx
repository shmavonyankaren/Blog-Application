"use client";

import { likeComment, unlikeComment } from "@/lib/actions/comment.actions";
import { useUser } from "@clerk/nextjs";
import { useCallback, useState, useTransition, useEffect } from "react";

export default function LikeButton({
  blogId,
  commentId,
  isLiked,
}: {
  blogId: number;
  commentId: number;
  isLiked: boolean;
}) {
  const { user } = useUser();
  const [, startTransition] = useTransition();
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleToggleLike = useCallback(() => {
    if (!user?.id) return;
    // Store the current state before changing
    const previousState = liked;
    // Optimistically update UI immediately
    setLiked(!previousState);
    // Run the async operation in the background
    startTransition(async () => {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("commentId", String(commentId));

      try {
        if (previousState) {
          await unlikeComment(formData, "/blog/" + blogId);
        } else {
          await likeComment(formData, "/blog/" + blogId);
        }
      } catch {
        // Revert on error
        setLiked(previousState);
      }
    });
  }, [user, liked, commentId, blogId]);

  return (
    <button
      className="p-2.5 cursor-pointer bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-700 transition-all duration-300 group"
      onClick={handleToggleLike}
      type="button"
      title={liked ? "Unlike" : "Like"}
    >
      <svg
        className={`w-5 h-5 ${
          liked
            ? "text-red-600 dark:text-red-400 fill-current"
            : "text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
        }        `}
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
    </button>
  );
}
