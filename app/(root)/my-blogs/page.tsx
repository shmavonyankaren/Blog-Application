import MyBlogsContainer from "@/components/blog/MyBlogsContainer";

interface MyBlogsPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: MyBlogsPageProps) {
  const params = await searchParams;
  const categoryId = params.category;
  const pageParam = params.page ? parseInt(params.page, 10) : 1;
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 flex-1 h-full w-full min-h-0 flex items-center justify-center">
      <MyBlogsContainer page={page} categoryId={categoryId} />
    </div>
  );
}
