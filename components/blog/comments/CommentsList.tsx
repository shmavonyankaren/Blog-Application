"use client";

import { CommentType, User } from "@/lib/types";
import CommentItem from "./CommentItem";
import { getUserById } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useMemo, useCallback } from "react";

interface CommentsListProps {
  initialComments: CommentType[];
  blogId: string;
  likesData: Record<number, { count: number; isLiked: boolean }>;
}

export default function CommentsList({
  initialComments,
  blogId,
  likesData,
}: CommentsListProps) {
  const { user } = useUser();
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [usersMap, setUsersMap] = useState<Map<string, User>>(new Map());

  // Sync comments state with initialComments prop
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  // Flatten comment tree to get all comments - memoized
  const flattenComments = useCallback(
    (comments: CommentType[]): CommentType[] => {
      const result: CommentType[] = [];
      const traverse = (comms: CommentType[]) => {
        comms.forEach((c) => {
          result.push(c);
          if (c.replies && c.replies.length > 0) {
            traverse(c.replies);
          }
        });
      };
      traverse(comments);
      return result;
    },
    []
  );

  // Fetch user data only - likes come from server via props
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || initialComments.length === 0) return;

      const allComments = flattenComments(initialComments);
      const uniqueUserIds = [...new Set(allComments.map((c) => c.user_id))];
      const userPromises = uniqueUserIds.map((id) => getUserById(id));
      const users = await Promise.all(userPromises);
      const newUsersMap = new Map(users.map((u) => [u.user_id, u]));
      setUsersMap(newUsersMap);
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    JSON.stringify(initialComments.map((c) => c.id)),
    user?.id,
    flattenComments,
  ]);

  // Memoize the comment items to prevent unnecessary re-renders
  const memoizedCommentItems = useMemo(
    () =>
      comments.map((comment) => {
        const creator = usersMap.get(comment.user_id);
        const likes = likesData[comment.id];

        return (
          <li key={comment.id} className="list-none">
            <CommentItem
              comment={comment}
              creatorOfComment={creator}
              depth={0}
              initialLikes={likes?.count || 0}
              initialIsLiked={likes?.isLiked || false}
              usersMap={usersMap}
              likesData={likesData}
            />
          </li>
        );
      }),
    [comments, usersMap, likesData]
  );

  return <div className="space-y-3">{memoizedCommentItems}</div>;
}
