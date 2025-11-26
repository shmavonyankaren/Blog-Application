"use client";

import { favouriteBlog, unfavouriteBlog } from "@/lib/actions/favourite.action";
import { useUser } from "@clerk/nextjs";
import { useState, useTransition, useCallback } from "react";

export default function FavouriteButton({
  blogId,
  isFavourited,
}: {
  blogId: number;
  isFavourited: boolean;
}) {
  const { user } = useUser();
  const [, startTransition] = useTransition();
  const [optimisticFavourited, setOptimisticFavourited] =
    useState(isFavourited);

  const handleToggleFavourite = useCallback(() => {
    if (!user?.id) return;

    // Store the current state before changing
    const previousState = optimisticFavourited;

    // Optimistically update UI immediately
    setOptimisticFavourited(!previousState);

    // Run the async operation in the background
    startTransition(async () => {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("blogId", String(blogId));

      try {
        if (previousState) {
          await unfavouriteBlog(formData, "/blog/" + blogId);
        } else {
          await favouriteBlog(formData, "/blog/" + blogId);
        }
      } catch {
        // Revert on error
        setOptimisticFavourited(previousState);
      }
    });
  }, [user, optimisticFavourited, startTransition, blogId]);

  return (
    <button
      onClick={handleToggleFavourite}
      className="p-2.5 cursor-pointer bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-700 transition-all duration-300 group"
      title={optimisticFavourited ? "Remove from Saved" : "Save for later"}
    >
      <svg
        className={`w-5 h-5 group-hover:scale-110 transition-all duration-300 ${
          optimisticFavourited
            ? "text-blue-600 dark:text-blue-400 fill-current"
            : "text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        }`}
        fill={optimisticFavourited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  );
}
