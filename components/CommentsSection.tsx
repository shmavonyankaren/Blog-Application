import { getAllCommentsByBlog } from "@/lib/actions/blog.actions";
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
  const comments = await getAllCommentsByBlog(blogId);
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-6 h-6"
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
          Comments
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
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
            <p className="text-gray-600 font-medium">No comments yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <CommentsList comments={comments} />
        )}

        <AddCommentForm blogId={blogId} />
        {comments.length > 0 && (
          <CommentsFooter creatorId={creatorId} comments={comments} />
        )}
      </div>
    </div>
  );
}
