import React from "react";
import { AllBlogsContainer } from "@/components";

interface AllBlogsPageProps {
  searchParams: Promise<{ q?: string; page?: string; category?: string }>;
}

export default async function AllBlogsPage({
  searchParams,
}: AllBlogsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q;
  const categoryId = params.category;
  const pageParam = params.page ? parseInt(params.page, 10) : 1;
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 flex-1 h-full w-full min-h-0 flex items-center justify-center">
      <AllBlogsContainer
        searchQuery={searchQuery}
        page={page}
        categoryId={categoryId}
      />
    </div>
  );
}
