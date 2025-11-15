import { CreateEditBlogModal } from "@/components";
import { deleteBlog, getBlogById } from "@/lib/actions/blog.actions";
import { BlogType } from "@/lib/types";
import Image from "next/image";
import { formatDateHour } from "@/lib/utils/";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const user = await currentUser();
  const blog: BlogType = await getBlogById(blogId);
  return (
    <main className="w-full px-4 py-8 flex justify-center items-start">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Image column */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[700px]">
              <Image
                src={blog.image || "/assets/images/default_blog_image.png"}
                alt={blog.title}
                width={800}
                height={480}
                className="w-full max-w-[800px] max-h-[480px] h-auto rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content column */}
          <div className="w-full md:w-1/2 flex flex-col justify-start items-center md:items-start text-center md:text-left gap-4">
            <div className="flex w-full justify-end items-end">
              {/* <DeleteButton
                action={deleteBlog}
                deleteId={blog.id}
                text="Delete Blog"
              /> */}
              {user?.id === blog.user_id && (
                <div className="flex justify-center items-center gap-2">
                  <CreateEditBlogModal actionType="edit" blog={blog} />
                  <form
                    className="flex justify-center items-center"
                    action={async (form: FormData) => {
                      "use server";
                      deleteBlog(form);
                      redirect("/my-blogs");
                    }}
                  >
                    <input
                      type="hidden"
                      name="blogId"
                      value={String(blog.id)}
                    />
                    <button>
                      <Image
                        className="cursor-pointer"
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    </button>
                  </form>
                </div>
              )}
            </div>
            <div className="w-full flex justify-center md:justify-start">
              <h1 className="w-full text-2xl md:text-3xl font-bold text-gray-900 text-center">
                {blog.title}
              </h1>
            </div>
            <p className="w-full text-sm text-right text-gray-500">
              Last updated : {formatDateHour(blog.updated_at)}
            </p>
            <p className="text-base text-gray-700 mt-2">
              {blog.description ?? "No description provided."}
            </p>
            {/* Add more metadata or actions here */}
          </div>
        </div>
      </div>
    </main>
  );
}
