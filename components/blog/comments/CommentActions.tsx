import { deleteCommentFromBlog } from "@/lib/actions/comment.actions";

interface CommentActionsProps {
  commentId: string | number;
  blogId: string | number;
  isEditing: boolean;
  onEditClick: () => void;
}

export default function CommentActions({
  commentId,
  blogId,
  isEditing,
  onEditClick,
}: CommentActionsProps) {
  const handleDelete = async (formData: FormData) => {
    await deleteCommentFromBlog(formData, "/blog/" + blogId);
  };

  return (
    <div className="flex items-center gap-1">
      {!isEditing && (
        <button
          onClick={onEditClick}
          className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
          aria-label="Edit comment"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}
      <form action={handleDelete}>
        <input type="hidden" name="commentId" value={commentId} />
        <input type="hidden" name="blogId" value={blogId} />
        <button
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-white dark:text-red-600 dark:hover:text-red-700 duration-300 rounded-lg transition-colors"
          type="submit"
          aria-label="Delete comment"
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
        </button>
      </form>
    </div>
  );
}
