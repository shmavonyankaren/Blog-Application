"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import { deleteBlogAndRedirect } from "@/lib/actions/blog.actions";

export default function BlogDetailDeleteButton({
  blogId,
  blogTitle,
}: {
  blogId: number;
  blogTitle: string;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const formData = new FormData();
    formData.append("blogId", String(blogId));
    await deleteBlogAndRedirect(formData, "/my-blogs");
  }, [blogId]);

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="cursor-pointer p-1.5 sm:p-2 md:p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-lg shadow-lg transition-all duration-300"
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        itemName={blogTitle}
        itemType="blog"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
