"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import { useUser } from "@clerk/nextjs";

import Image from "next/image";

import { createBlog, updateBlog } from "@/lib/actions/blog.actions";

type CreateEditBlogTypes = {
  actionType: "edit" | "create";
  blog?: {
    id: number;
    title: string;
    description?: string;
    image?: string;
  };
};

export default function CreateEditBlogModal({
  actionType,
  blog,
}: CreateEditBlogTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (formData: FormData) => {
    if (actionType === "create") {
      await createBlog(formData);
    } else {
      await updateBlog(formData);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      {actionType === "create" ? (
        <button
          onClick={() => setIsOpen(true)}
          className="max-h-[45px] inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-sm"
        >
          + New Blog
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-block cursor-pointer"
        >
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
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* modal panel */}
            <div className="relative z-50 w-full max-w-2xl mx-4">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between px-6 py-4 border-b bg-linear-to-r from-white to-gray-50">
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

                <div className="p-6">
                  <form
                    action={handleSubmit}
                    className="grid grid-cols-1 gap-4"
                  >
                    <input type="hidden" name="userId" value={user?.id ?? ""} />
                    {actionType === "edit" && (
                      <input type="hidden" name="blogId" value={blog?.id} />
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        name="title"
                        required
                        defaultValue={actionType === "edit" ? blog?.title : ""}
                        placeholder="Enter blog title"
                        className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        name="image"
                        defaultValue={actionType === "edit" ? blog?.image : ""}
                        placeholder="https://... (optional)"
                        className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        defaultValue={
                          actionType === "edit" ? blog?.description : ""
                        }
                        placeholder="Write a short description..."
                        className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
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
