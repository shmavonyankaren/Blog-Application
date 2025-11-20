"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUser } from "@clerk/nextjs";
import { createBlog, updateBlog } from "@/lib/actions/blog.actions";
import { CreateEditBlogTypes } from "@/lib/types";
import ModalTriggerButton from "./modal/ModalTriggerButton";
import ModalHeader from "./modal/ModalHeader";
import BlogFormFields from "./modal/BlogFormFields";
import CategorySelector from "./modal/CategorySelector";
import ImageUploadSection from "./modal/ImageUploadSection";
import FormActions from "./modal/FormActions";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import { useCategoryManager } from "./modal/useCategoryManager";
import FileUploader from "./FIleUploader";
import Image from "next/image";

export default function CreateEditBlogModal({
  actionType,
  blog,
}: CreateEditBlogTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string | null>(
    actionType === "edit" ? blog?.image || null : null
  );

  const {
    categories,
    selectedCategory,
    showCreateForm,
    newCategoryName,
    deleteModalOpen,
    categoryToDelete,
    setSelectedCategory,
    setShowCreateForm,
    setNewCategoryName,
    setDeleteModalOpen,
    handleDeleteCategory,
    confirmDelete,
    resetCategory,
    fetchCategories,
  } = useCategoryManager(user?.id, isOpen);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    if (actionType === "create") {
      setImageUrl(null);
      resetCategory();
    } else if (actionType === "edit" && blog?.category_id) {
      setSelectedCategory(blog.category_id.toString());
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsOpen(false);
    document.body.style.overflow = "";

    try {
      if (actionType === "create") {
        await createBlog(formData);
      } else {
        await updateBlog(formData);
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {actionType === "create" ? (
        <button
          onClick={handleOpen}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl border border-indigo-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Blog
        </button>
      ) : (
        <button onClick={handleOpen} className="inline-block cursor-pointer">
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </button>
      )}

      {/* Modal */}
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* modal panel */}
            <div className="pt-[23%] px-[2%] pb-[2%] sm:pt-[15%] sm:px-[1%] sm:pb-[1%]  md:pt-[12%] md:px-[1%] md:pb-[1%] lg:pt-[9%] xl:pt-[7%] lg:px-[1%] lg:pb-[1%] relative z-50  w-full max-w-5xl mx- -8">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header with gradient */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-5 bg-linear-to-r from-indigo-600 to-purple-600">
                  <h3 className="text-xl font-bold text-white">
                    {actionType === "create" ? "Create New Blog" : "Edit Blog"}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/20 text-white transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-gray-50">
                  <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="userId" value={user?.id ?? ""} />
                    {actionType === "edit" && blog?.id && (
                      <input
                        type="hidden"
                        name="blogId"
                        value={String(blog.id)}
                      />
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left side - Form fields */}
                      <div className="flex-1 space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Blog Title
                          </label>
                          <input
                            name="title"
                            required
                            defaultValue={
                              actionType === "edit" ? blog?.title : ""
                            }
                            placeholder="Enter an engaging title..."
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            name="description"
                            rows={6}
                            defaultValue={
                              actionType === "edit" ? blog?.description : ""
                            }
                            placeholder="Share your thoughts and ideas..."
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Right side - Image uploader */}
                      <div className="lg:w-96 flex flex-col gap-2">
                        <div className="lg:w-96 space-y-5">
                          <CategorySelector
                            categories={categories}
                            selectedCategory={selectedCategory}
                            currentUserId={user?.id}
                            showCreateForm={showCreateForm}
                            newCategoryName={newCategoryName}
                            onCategorySelect={setSelectedCategory}
                            onToggleCreateForm={() =>
                              setShowCreateForm(!showCreateForm)
                            }
                            onNewCategoryChange={setNewCategoryName}
                            onCancelCreate={() => {
                              setShowCreateForm(false);
                              setNewCategoryName("");
                            }}
                            onDeleteCategory={handleDeleteCategory}
                            onCategoryCreated={async () => {
                              setShowCreateForm(false);
                              setNewCategoryName("");
                              await fetchCategories();
                              // Dispatch event to notify other components
                              if (typeof window !== "undefined") {
                                window.dispatchEvent(
                                  new CustomEvent("categoryChange")
                                );
                              }
                            }}
                          />
                        </div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Cover Image
                        </label>
                        <FileUploader
                          onFieldChange={setImageUrl}
                          imageUrl={imageUrl}
                        />
                        <input
                          type="hidden"
                          name="image"
                          value={imageUrl || ""}
                        />
                      </div>
                    </div>

                    {/* Buttons at bottom */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                      >
                        {actionType === "create" ? (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Create Blog
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <DeleteConfirmationModal
              isOpen={deleteModalOpen}
              categoryName={categoryToDelete?.name || ""}
              onConfirm={confirmDelete}
              onCancel={() => setDeleteModalOpen(false)}
            />
          </div>,
          document.body
        )}
    </>
  );
}
