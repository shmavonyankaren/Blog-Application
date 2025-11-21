"use client";

import Image from "next/image";
import { useState } from "react";
import CreateEditBlogModal from "./CreateEditBlogModal";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import { deleteBlog } from "@/lib/actions/blog.actions";
import { BlogType } from "@/lib/types";

export default function BlogCreatorButtons({ blog }: { blog: BlogType }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.append("blogId", String(blog.id));
    await deleteBlog(formData);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white dark:bg-slate-800 p-3 shadow-sm transition-all duration-300">
        <CreateEditBlogModal actionType="edit" blog={blog} />
        <button onClick={handleDeleteClick} type="button">
          <Image
            className="cursor-pointer"
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
