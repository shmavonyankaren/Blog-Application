import CommentLikeButton from "./CommentLikeButton";
import {
  checkIfUserLikedComment,
  getCommentLikeCount,
} from "@/lib/actions/comment.actions";

export default async function CommentLikeSection({
  blogId,
  commentId,
  userId,
}: {
  blogId: number;
  commentId: number;
  userId: string;
}) {
  const likes = await getCommentLikeCount(commentId);
  const isLiked = await checkIfUserLikedComment(userId, commentId);
  // Fetch like count when component mounts
  return (
    <div className="">
      <CommentLikeButton
        blogId={blogId}
        commentId={commentId}
        isLiked={isLiked}
        likes={likes}
      />
    </div>
  );
}
