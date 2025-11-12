// import { deleteBlog } from "@/lib/actions/blog.actions";
// // import { getUserById } from "@/lib/actions/user.actions";
// import {
//   BlogType,
//   // , User
// } from "@/lib/types";
// import Image from "next/image";

// export function formatDate(iso?: string) {
//   if (!iso) return "-";
//   try {
//     return new Date(iso).toLocaleString("en-GB", { timeZone: "UTC" });
//   } catch {
//     return iso;
//   }
// }

// async function Blog({ blog }: { blog: BlogType }) {
//   // const creator: User = await getUserById(blog.user_id);
//   return (
//     <article className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
//       <div className="flex gap-4 p-4 items-start">
//         <div className="shrink-0 w-28 h-20 rounded-lg bg-gray-100 overflow-hidden border border-gray-100">
//           {blog.image ? (
//             <Image
//               src={blog.image}
//               alt={blog.title}
//               width={280}
//               height={200}
//               className="w-full h-full object-cover"
//               unoptimized // Be carefull this is not recommended: for me to remember to change later
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
//               No Image
//             </div>
//           )}
//         </div>
//         <div className="flex-1 min-w-0">
//           <h3 className="text-lg font-semibold text-gray-900 truncate">
//             {blog.title}
//           </h3>
//           <p className="mt-1 text-sm text-gray-600 line-clamp-3">
//             {blog.description ?? "No description provided."}
//           </p>

//           <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
//             <div className="flex items-center gap-2">
//               <span className="font-medium text-gray-700">Created:</span>
//               <time dateTime={blog.created_at}>
//                 {formatDate(blog.created_at)}
//               </time>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="font-medium text-gray-700">Updated:</span>
//               <time dateTime={blog.updated_at}>
//                 {formatDate(blog.updated_at)}
//               </time>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-start">
//           <form action={deleteBlog} className="">
//             <input type="hidden" name="blogId" value={String(blog.id)} />
//             <button
//               type="submit"
//               className="ml-2 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 transition"
//               aria-label={`Delete blog ${blog.title}`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 6a1 1 0 10-2 0v6a1 1 0 102 0V8zm6 0a1 1 0 10-2 0v6a1 1 0 102 0V8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>Delete</span>
//             </button>
//           </form>
//         </div>
//       </div>
//       {/* <div className="flex justify-end">
//         <span>by {blog.user_id}</span>
//       </div> */}
//     </article>
//   );
// }

// export default Blog;

import { deleteBlog } from "@/lib/actions/blog.actions";

import { BlogCreator, BlogType } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

import { CreateEditBlogModal } from "@/components";
import { getUserById } from "@/lib/actions/user.actions";

type BlogCardProps = {
  cardType: "creator" | "viewer";
  blog: BlogType;
};

export default async function BlogCard({ cardType, blog }: BlogCardProps) {
  const creatorUser: BlogCreator = await getUserById(blog.user_id);
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[500px] min-w-[350px] flex-col overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-transform duration-500 ease-in-out md:min-h-[438px] card-container">
      <Link
        scroll={true}
        href="#"
        style={{
          backgroundImage: blog.image
            ? `url(${blog.image})`
            : "url(/assets/images/default_blog_image.png)",
        }}
        className="flex-center grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {/* Event creator controls */}
      {cardType === "creator" && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <CreateEditBlogModal actionType="edit" blog={blog} />
          <form action={deleteBlog}>
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
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          {/* <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            FREE
          </span> */}
          {/* <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            Category
          </p> */}
        </div>

        <p className="p-medium-16 text-grey-500">Jan 1, 2025 - 10:00 AM</p>

        <Link href="#">
          <p className="p-medium-16  md:p-medium-20 line-clamp-2 flex-1 text-black">
            {blog.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <div className="flex items-center justify-end gap-2">
            <Image
              className="rounded-full max-h-8"
              src={creatorUser?.photo || "/assets/images/user_avatar.png"}
              alt="event creator"
              width={32}
              height={32}
            />
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {creatorUser.username ||
                creatorUser.first_name + " " + creatorUser.last_name}
            </p>
          </div>

          {/* <Link href="#" className="flex gap-2">
            <p className="text-primary-500">Order Details</p>
            <Image
              src="/assets/icons/arrow.svg"
              alt="arrow"
              width={10}
              height={10}
            />
          </Link> */}
        </div>
      </div>
    </div>
  );
}
