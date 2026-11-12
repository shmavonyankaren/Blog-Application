"use client";
import { CommentType, User } from "@/lib/types";
import CommentItem from "./CommentItem";
import { useMemo } from "react";
interface CommentsListProps {
  initialComments: CommentType[];
  blogId: string;
  likesData: Record<number, { count: number; isLiked: boolean }>;
}
export default function CommentsList({
  initialComments,
  likesData,
}: CommentsListProps) {
  const usersMap = useMemo(() => {
    const users = new Map<string, User>();
    const visit = (nodes: CommentType[]) => {
      for (const node of nodes) {
        if (node.creator) users.set(node.user_id, node.creator);
        visit(node.replies);
      }
    };
    visit(initialComments);
    return users;
  }, [initialComments]);
  return (
    <div className="space-y-3">
      {initialComments.map((comment) => (
        <li key={comment.id} className="list-none">
          <CommentItem
            comment={comment}
            creatorOfComment={usersMap.get(comment.user_id)}
            depth={0}
            initialLikes={likesData[comment.id]?.count ?? 0}
            initialIsLiked={likesData[comment.id]?.isLiked ?? false}
            usersMap={usersMap}
            likesData={likesData}
          />
        </li>
      ))}
    </div>
  );
}
