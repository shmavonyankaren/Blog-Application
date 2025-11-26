"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "@/lib/actions/blog.actions";
import { CategoryType } from "@/lib/types";

export function useCategoryManager(userId?: string, isOpen?: boolean) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data || []);
  };

  useEffect(() => {
    if (isOpen) {
      (async () => {
        await fetchCategories();
      })();
    }
  }, [isOpen]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim() || !userId) return;

    const formData = new FormData();
    formData.append("name", newCategoryName.trim());
    formData.append("creatorId", userId);

    await createCategory(formData, pathname);
    setNewCategoryName("");
    setShowCreateForm(false);
    await fetchCategories();

    // Dispatch custom event to notify other components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("categoryChange"));
    }
  };

  const handleDeleteCategory = async (
    categoryId: number,
    categoryName: string
  ) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    const formData = new FormData();
    formData.append("categoryId", categoryToDelete.id.toString());

    await deleteCategory(formData, pathname);
    if (selectedCategory === categoryToDelete.id.toString()) {
      setSelectedCategory("");
    }
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
    await fetchCategories();

    // Dispatch custom event to notify other components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("categoryChange"));
    }
  };

  const resetCategory = () => {
    setSelectedCategory("");
    setShowCreateForm(false);
    setNewCategoryName("");
  };

  return {
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
    handleCreateCategory,
    handleDeleteCategory,
    confirmDelete,
    resetCategory,
    fetchCategories,
  };
}
