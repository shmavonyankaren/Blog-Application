"use client";

import { CommentType, User } from "@/lib/types";
import React, { useState, memo, useCallback } from "react";
import CommentActions from "./CommentActions";
import EditCommentForm from "./EditCommentForm";
import CommentReplyForm from "./CommentReplyForm";
import { useUser } from "@clerk/nextjs";
import CommentLikeSection from "./CommentLikeSection";
import { useRouter } from "next/navigation";
import Image from "next/image";

function CommentItem({
  comment,
  creatorOfComment,
  depth = 0,
  initialLikes,
  initialIsLiked,
  usersMap,
  likesMap,
}: {
  comment: CommentType;
  creatorOfComment?: User;
  depth?: number;
  initialLikes?: number;
  initialIsLiked?: boolean;
  usersMap: Map<string, User>;
  likesMap: Map<number, { count: number; isLiked: boolean }>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const ownerCheck = user?.id === comment.user_id;
  const maxDepth = 3;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const creator = creatorOfComment || usersMap.get(comment.user_id);
  const likes = likesMap.get(comment.id);
  const likesCount = likes?.count ?? initialLikes ?? 0;
  const isLiked = likes?.isLiked ?? initialIsLiked ?? false;

  const handleSuccess = useCallback(() => {
    setIsEditing(false);
    setIsReplying(false);
    router.refresh();
  }, [router]);

  if (!creator) return null;

  const indentClass = depth > 0 ? "ml-6 sm:ml-8 md:ml-10" : "";
  const borderClass =
    depth > 0
      ? "border-l-2 border-indigo-100 dark:border-indigo-900/30 pl-4"
      : "";

  return (
    <div className={`${indentClass} ${borderClass}`}>
      <div className="group relative bg-white dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-gray-100 dark:border-slate-700/50 transition-all duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Image
              src={creator.photo || "/assets/images/user_avatar.png"}
              alt={creator.username || "User"}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-gray-100 dark:ring-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                {creator.username ||
                  `${creator.first_name} ${creator.last_name}`}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {comment.updated_at !== comment.created_at && (
                  <span className="ml-1 italic">(edited)</span>
                )}
              </p>
            </div>
          </div>
          {ownerCheck && (
            <CommentActions
              commentId={comment.id}
              blogId={comment.blog_id}
              isEditing={isEditing}
              onEditClick={() => setIsEditing(true)}
            />
          )}
        </div>

        {/* Content */}
        {isEditing ? (
          <EditCommentForm
            commentId={comment.id}
            blogId={comment.blog_id}
            initialContent={comment.content}
            onCancel={() => setIsEditing(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 whitespace-pre-wrap wrap-break-word">
            {comment.content}
          </p>
        )}

        {/* Actions */}
        {user && !isEditing && (
          <div className="flex items-center gap-4 pt-2">
            <CommentLikeSection
              blogId={comment.blog_id}
              commentId={comment.id}
            />
            {depth < maxDepth && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>
            )}
            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01"
                  />
                </svg>
                {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reply Form */}
      {user && isReplying && depth < maxDepth && (
        <div className="mt-3 ml-4 sm:ml-6">
          <CommentReplyForm
            commentId={comment.id}
            userId={user.id}
            blogId={comment.blog_id}
            onClose={() => setIsReplying(false)}
            onSuccess={handleSuccess}
          />
        </div>
      )}

      {/* Nested Replies */}
      {showReplies && hasReplies && depth < maxDepth && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply: CommentType) => {
            const replyCreator = usersMap.get(reply.user_id);
            const replyLikes = likesMap.get(reply.id);
            return (
              <CommentItem
                key={reply.id}
                comment={reply}
                creatorOfComment={replyCreator}
                depth={depth + 1}
                initialLikes={replyLikes?.count || 0}
                initialIsLiked={replyLikes?.isLiked || false}
                usersMap={usersMap}
                likesMap={likesMap}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(CommentItem);
