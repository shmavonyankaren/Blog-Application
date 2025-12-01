"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CreateEditBlogModal from "./CreateEditBlogModal";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import { deleteBlog, deleteBlogAndRedirect } from "@/lib/actions/blog.actions";
import { BlogType } from "@/lib/types";

export default function BlogCreatorButtons({
  blog,
  from,
}: {
  blog: BlogType;
  from: "blogCard" | "blogDetail";
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleteModalOpen(false);
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("blogId", String(blog.id));
    if (from === "blogDetail") {
      // Server action handles redirect from detail page
      await deleteBlogAndRedirect(formData, "/my-blogs");
    } else {
      await deleteBlog(formData, "/my-blogs");
      router.refresh();
    }
  }, [blog, from, router]);

  return (
    <>
      <div className="absolute right-2 sm:right-3 md:right-4 top-2 sm:top-3 md:top-4 flex justify-center items-center flex-col gap-1.5 sm:gap-2 z-10">
        <CreateEditBlogModal actionType="edit" blog={blog} />
        <button
          className="p-1.5 sm:p-2 md:p-2.5 cursor-pointer bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-700 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDeleteClick}
          type="button"
          disabled={isDeleting}
          aria-label="Delete blog"
          title="Delete blog"
        >
          {isDeleting ? (
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-red-600"
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
            <Image
              className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
              src="/assets/icons/delete.svg"
              alt="delete"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        itemName={blog.title}
        itemType="blog"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
