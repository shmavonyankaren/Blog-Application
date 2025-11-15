import Image from "next/image";
import CreateEditBlogModal from "./CreateEditBlogModal";
import { deleteBlog } from "@/lib/actions/blog.actions";
import { BlogType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export default function BlogCreatorButtons({ blog }: { blog: BlogType }) {
  return (
    <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
      <CreateEditBlogModal actionType="edit" blog={blog} />
      <form
        action={async (form: FormData) => {
          "use server";
          deleteBlog(form);
          revalidatePath("/my-blogs");
        }}
      >
        <input type="hidden" name="blogId" value={String(blog.id)} />
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
  );
}
