import { getAllCommentsByBlog } from "@/lib/actions/comment.actions";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import CommentsFooter from "./CommentsFooter";

export default async function CommentsSection({
  blogId,
  creatorId,
}: {
  blogId: string;
  creatorId: string;
}) {
  const comments = (await getAllCommentsByBlog(blogId)) || [];
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 px-6 py-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>Comments</span>
          {comments.length > 0 && (
            <span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {comments.length}
            </span>
          )}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-lg mb-1 transition-colors duration-300">
              No comments yet
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <CommentsList initialComments={comments} blogId={blogId} />
          </div>
        )}
        <AddCommentForm blogId={blogId} />

        {comments.length > 0 && (
          <CommentsFooter creatorId={creatorId} comments={comments} />
        )}
      </div>
    </div>
  );
}
