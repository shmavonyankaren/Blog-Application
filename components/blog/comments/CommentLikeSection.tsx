import { useEffect, useState } from "react";
import CommentLikeButton from "./CommentLikeButton";
import { getCommentLikeCount } from "@/lib/actions/comment.actions";

export default function CommentLikeSection({
  blogId,
  commentId,
  userId,
  isLiked,
}: {
  blogId: number;
  commentId: number;
  userId: string;
  isLiked: boolean;
}) {
  const [likes, setLikes] = useState<number>(0);
  useEffect(() => {
    async function fetchLikeCount() {
      const count = await getCommentLikeCount(commentId);

      setLikes(count);
    }
    fetchLikeCount();
  }, [commentId, userId]);
  // Fetch like count when component mounts
  return (
    <div>
      <CommentLikeButton
        blogId={blogId}
        commentId={commentId}
        isLiked={isLiked}
      />
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {likes} {likes === 1 ? "Like" : "Likes"}
      </span>
    </div>
  );
}
