"use client";

import { memo } from "react";
import CommentLikeButton from "./CommentLikeButton";

function CommentLikeSection({
  blogId,
  commentId,
  initialLikes,
  initialIsLiked,
}: {
  blogId: number;
  commentId: number;
  initialLikes: number;
  initialIsLiked: boolean;
}) {
  return (
    <CommentLikeButton
      blogId={blogId}
      commentId={commentId}
      initialIsLiked={initialIsLiked}
      initialLikes={initialLikes}
    />
  );
}

export default memo(CommentLikeSection);
