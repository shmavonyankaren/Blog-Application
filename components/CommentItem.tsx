"use client";

import { CommentType, User } from "@/lib/types";
import { useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentActions from "./CommentActions";
import EditCommentForm from "./EditCommentForm";

export default function CommentItem({
  comment,
  creatorOfComment,
  isOwner,
}: {
  comment: CommentType;
  creatorOfComment: User;
  isOwner: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-200 transition-colors">
      {/* Header with user info and actions */}
      <div className="flex items-center justify-between mb-3">
        <CommentHeader
          creatorOfComment={creatorOfComment}
          createdAt={comment.created_at}
        />

        {isOwner && (
          <CommentActions
            commentId={comment.id}
            blogId={comment.blog_id}
            isEditing={isEditing}
            onEditClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {/* Comment content or edit form */}
      {isEditing ? (
        <EditCommentForm
          commentId={comment.id}
          blogId={comment.blog_id}
          initialContent={comment.content}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      ) : (
        <p className="text-gray-700 leading-relaxed pl-[52px]">
          {comment.content}
        </p>
      )}
    </div>
  );
}
