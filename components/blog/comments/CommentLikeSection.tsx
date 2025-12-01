"use client";

import { memo, useEffect, useState } from "react";
import CommentLikeButton from "./CommentLikeButton";
import { getCommentLikeData } from "@/lib/actions/comment.actions";
import { useUser } from "@clerk/nextjs";

function CommentLikeSection({
  blogId,
  commentId,
}: {
  blogId: number;
  commentId: number;
}) {
  const { user } = useUser();
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikeData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Single optimized query instead of 2 separate calls
        const likeData = await getCommentLikeData(commentId, user.id);
        setLikes(likeData.count);
        setIsLiked(likeData.isLiked);
      } catch (error) {
        console.error("Failed to fetch like data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeData();
  }, [commentId, user]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="h-8 w-16 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <CommentLikeButton
      blogId={blogId}
      commentId={commentId}
      initialIsLiked={isLiked}
      initialLikes={likes}
    />
  );
}

export default memo(CommentLikeSection);
