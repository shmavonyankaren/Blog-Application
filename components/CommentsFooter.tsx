import { deleteAllCommentsFromBlog } from "@/lib/actions/blog.actions";
import { CommentType } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

export default async function CommentsFooter({
  comments,
  creatorId,
}: {
  comments: CommentType[];
  creatorId: string;
}) {
  const currUser = await currentUser();
  const blogId = comments[0]?.blog_id;
  return (
    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100">
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </p>
      </div>
      {currUser!.id === creatorId && blogId && (
        <form action={deleteAllCommentsFromBlog}>
          <input type="hidden" name="blogId" value={blogId} />
          <button
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all"
            type="submit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete All
          </button>
        </form>
      )}
    </div>
  );
}
