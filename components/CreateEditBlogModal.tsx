"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import { useUser } from "@clerk/nextjs";

import Image from "next/image";

import { createBlog, updateBlog } from "@/lib/actions/blog.actions";
import FileUploader from "./FIleUploader";
import { CreateEditBlogTypes } from "@/lib/types";

export default function CreateEditBlogModal({
  actionType,
  blog,
}: CreateEditBlogTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string | null>(
    actionType === "edit" ? blog?.image || null : null
  );

  const handleOpen = () => {
    setIsOpen(true);
    // Reset image URL when opening create modal
    if (actionType === "create") {
      setImageUrl(null);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsOpen(false);

    try {
      if (actionType === "create") {
        await createBlog(formData);
      } else {
        await updateBlog(formData);
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
      // Optionally show error toast here
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {actionType === "create" ? (
        <button
          onClick={handleOpen}
          className="max-h-[45px] inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-sm"
        >
          + New Blog
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* modal panel */}
            <div className="pt-[23%] sm:pt-[15%]  md:pt-[12%] lg:pt-[8%] relative z-50  w-full max-w-5xl mx-4">
              <div className=" bg-white rounded-xl shadow-xl border border-gray-100 ">
                <div className="  flex  rounded-xl items-center justify-between px-4 sm:px-6 py-4 border-b bg-linear-to-r from-white to-gray-50 ">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {actionType === "create" ? "Create Blog" : "Edit Blog"}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="userId" value={user?.id ?? ""} />
                    {actionType === "edit" && (
                      <input type="hidden" name="blogId" value={blog?.id} />
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left side - Form fields */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Title
                          </label>
                          <input
                            name="title"
                            required
                            defaultValue={
                              actionType === "edit" ? blog?.title : ""
                            }
                            placeholder="Enter blog title"
                            className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            name="description"
                            rows={6}
                            defaultValue={
                              actionType === "edit" ? blog?.description : ""
                            }
                            placeholder="Write a short description..."
                            className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                          />
                        </div>
                      </div>

                      {/* Right side - Image uploader */}
                      <div className="lg:w-96 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                          Blog Image
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
                    <div className="flex items-center justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                      >
                        {actionType === "create" ? "Create Blog" : "Save Blog"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
