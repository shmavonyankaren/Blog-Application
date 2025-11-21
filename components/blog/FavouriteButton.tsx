"use client";

import { favouriteBlog, unfavouriteBlog } from "@/lib/actions/favourite.action";
import { useUser } from "@clerk/nextjs";
import { useState, useTransition } from "react";

export default function FavouriteButton({
  blogId,
  isFavourited,
}: {
  blogId: number;
  isFavourited: boolean;
}) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [optimisticFavourited, setOptimisticFavourited] =
    useState(isFavourited);

  const handleToggleFavourite = async () => {
    // Optimistically update UI immediately
    setOptimisticFavourited(!optimisticFavourited);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("userId", user?.id || "");
      formData.append("blogId", String(blogId));

      try {
        if (optimisticFavourited) {
          await unfavouriteBlog(formData);
        } else {
          await favouriteBlog(formData);
        }
      } catch {
        // Revert on error
        setOptimisticFavourited(optimisticFavourited);
      }
    });
  };

  return (
    <button
      onClick={handleToggleFavourite}
      disabled={isPending}
      className="absolute left-2 top-2 z-10 p-2.5 cursor-pointer bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-700 transition-all duration-300 group disabled:opacity-50"
      title={
        optimisticFavourited ? "Remove from Favourites" : "Add to Favourites"
      }
    >
      <svg
        className={`w-5 h-5 group-hover:scale-110 transition-all duration-300 ${
          optimisticFavourited
            ? "text-red-500 dark:text-red-400 fill-current"
            : "text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400"
        }`}
        fill={optimisticFavourited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}
