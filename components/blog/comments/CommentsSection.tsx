import {
  getAllCommentsByBlog,
  getCommentLikeCount,
  checkIfUserLikedComment,
} from "@/lib/actions/comment.actions";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import CommentsFooter from "./CommentsFooter";
import { currentUser } from "@clerk/nextjs/server";
import { CommentType } from "@/lib/types";

export default async function CommentsSection({
  blogId,
  creatorId,
}: {
  blogId: string;
  creatorId: string;
}) {
  const comments = (await getAllCommentsByBlog(blogId)) || [];
  const user = await currentUser();

  // Fetch all like data at server level - modern approach for instant rendering
  const likesData: Record<number, { count: number; isLiked: boolean }> = {};

  if (user && comments.length > 0) {
    // Flatten all comments including nested replies
    const flattenComments = (comms: CommentType[]): CommentType[] => {
      const result: CommentType[] = [];
      const traverse = (cs: CommentType[]) => {
        cs.forEach((c) => {
          result.push(c);
          if (c.replies && c.replies.length > 0) {
            traverse(c.replies);
          }
        });
      };
      traverse(comms);
      return result;
    };

    const allComments = flattenComments(comments);

    // Fetch all likes data in parallel
    const likesResults = await Promise.all(
      allComments.map(async (comment) => {
        const [count, isLiked] = await Promise.all([
          getCommentLikeCount(comment.id),
          checkIfUserLikedComment(user.id, comment.id),
        ]);
        return { id: comment.id, count, isLiked };
      })
    );

    // Convert to object for easy lookup
    likesResults.forEach((like) => {
      likesData[like.id] = { count: like.count, isLiked: like.isLiked };
    });
  }
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 px-3 sm:px-4 md:px-6 py-4 sm:py-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex flex-wrap items-center gap-2 sm:gap-3">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0"
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
          <span className="wrap-break-word">Comments</span>
          {comments.length > 0 && (
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold">
              {comments.length}
            </span>
          )}
        </h2>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">
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
            <CommentsList
              initialComments={comments}
              blogId={blogId}
              likesData={likesData}
            />
          </div>
        )}
        <AddCommentForm blogId={blogId} />

        {comments.length > 0 && (
          <CommentsFooter
            creatorId={creatorId}
            comments={comments}
            currentUserId={user?.id || null}
          />
        )}
      </div>
    </div>
  );
}
