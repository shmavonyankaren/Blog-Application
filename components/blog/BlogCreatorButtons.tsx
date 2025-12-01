"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
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

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const formData = new FormData();
    formData.append("blogId", String(blog.id));
    if (from === "blogDetail") {
      await deleteBlogAndRedirect(formData, "/my-blogs");
    } else {
      await deleteBlog(formData, "/my-blogs");
    }
    setIsDeleteModalOpen(false);
  }, [blog, from]);

  return (
    <>
      <div className="absolute right-2 sm:right-3 md:right-4 top-2 sm:top-3 md:top-4 flex justify-center items-center flex-col gap-1.5 sm:gap-2 z-10">
        <CreateEditBlogModal actionType="edit" blog={blog} />
        <button
          className="p-1.5 sm:p-2 md:p-2.5 cursor-pointer bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-700 transition-all duration-300 group"
          onClick={handleDeleteClick}
          type="button"
        >
          <Image
            className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
            src="/assets/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
          />
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
