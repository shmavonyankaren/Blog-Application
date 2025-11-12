// import { createBlog } from "@/lib/actions/blog.actions";
// import { currentUser } from "@clerk/nextjs/server";
import { CreateEditBlogModal } from "@/components";

async function AddBlog() {
  // const user = await currentUser();

  return <CreateEditBlogModal actionType="create" />;
}

export default AddBlog;
