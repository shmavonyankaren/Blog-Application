import React from "react";
import { AllBlogsContainer } from "@/components";

interface AllBlogsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AllBlogsPage({
  searchParams,
}: AllBlogsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 flex-1 h-full w-full min-h-0 flex items-center justify-center">
      <AllBlogsContainer searchQuery={searchQuery} />
    </div>
  );
}
