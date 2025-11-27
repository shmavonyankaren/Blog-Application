import React from "react";
import { AllBlogsContainer } from "@/components";

interface AllBlogsPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    category?: string;
    sort?:
      | "newest"
      | "oldest"
      | "most_viewed"
      | "most_liked"
      | "most_commented";
  }>;
}

export default async function AllBlogsPage({
  searchParams,
}: AllBlogsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q;
  const categoryId = params.category;
  const sort = params.sort;
  const pageParam = params.page ? parseInt(params.page, 10) : 1;
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 dark:bg-linear-to-b dark:from-slate-950 dark:to-slate-900 flex-1 h-full w-full min-h-0 flex items-center justify-center transition-colors duration-300">
      <AllBlogsContainer
        searchQuery={searchQuery}
        page={page}
        categoryId={categoryId}
        sort={sort}
      />
    </div>
  );
}
