"use client";

import Image from "next/image";
import { useState } from "react";
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.append("blogId", String(blogId));
    await deleteBlogAndRedirect(formData);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-lg shadow-lg transition-all duration-300"
        type="button"
      >
        <Image
          className="cursor-pointer"
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
