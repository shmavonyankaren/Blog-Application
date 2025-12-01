import { getUserById } from "@/lib/actions/user.actions";
import { getRepliesByCommentId } from "@/lib/actions/comment.actions";
import { CommentType, User } from "@/lib/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import CommentActions from "./CommentActions";
import EditCommentForm from "./EditCommentForm";
import { useUser } from "@clerk/nextjs";
import CommentReply from "./CommentReply";
import CommentReplyForm from "./CommentReplyForm";
import CommentLikeSection from "./CommentLikeSection";
export default function CommentReplyItem({ reply }: { reply: CommentType }) {
  const [creator, setCreator] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const [replies, setReplies] = useState<CommentType[]>([]);
  const { user } = useUser();

  const isOwner = user?.id === reply.user_id;

  useEffect(() => {
    function fetchCreator() {
      getUserById(reply.user_id).then((userData) => {
        setCreator(userData);
      });
    }
    fetchCreator();
  }, [reply.user_id]);

  useEffect(() => {
    getRepliesByCommentId(reply.id).then(setReplies);
  }, [reply.id]);

  const refetchReplies = () => {
    getRepliesByCommentId(reply.id).then(setReplies);
  };
  if (!creator) {
    return (
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-24 mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-16"></div>
          </div>
        </div>
        <div className="pl-11">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-full mb-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Image
            src={creator.photo || "/assets/images/user_avatar.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {creator.username || creator.first_name + " " + creator.last_name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(reply.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        {isOwner && (
          <CommentActions
            commentId={reply.id}
            blogId={reply.blog_id}
            isEditing={isEditing}
            onEditClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {isEditing ? (
        <EditCommentForm
          commentId={reply.id}
          blogId={reply.blog_id}
          initialContent={reply.content}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false);
            refetchReplies();
          }}
        />
      ) : (
        <p className="text-gray-700 dark:text-gray-300 pl-11">
          {reply.content}
        </p>
      )}

      {user && (
        <div className="flex justify-between">
          <div className="mt-4 pl-11 flex items-center gap-4">
            <CommentLikeSection
              blogId={reply.blog_id}
              commentId={reply.id}
              initialLikes={0}
              initialIsLiked={false}
            />
            <CommentReply isOpen={isReplying} setIsOpen={setIsReplying} />
          </div>
          <div>
            {replies.length > 0 &&
              (openReplies ? (
                <button
                  className="mt-4 pl-8 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  onClick={() => setOpenReplies(false)}
                >
                  Hide Replies ({replies.length})
                </button>
              ) : (
                <button
                  className="mt-4 pl-8 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  onClick={() => setOpenReplies(true)}
                >
                  View Replies ({replies.length})
                </button>
              ))}
          </div>
        </div>
      )}

      {user && isReplying && (
        <CommentReplyForm
          onClose={() => setIsReplying(false)}
          commentId={reply.id}
          userId={user.id}
          blogId={reply.blog_id}
          onSuccess={refetchReplies}
        />
      )}

      {openReplies && (
        <div className="mt-4 pl-8 border-l-2 border-gray-200 dark:border-slate-700">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 block">
            All Replies:
          </span>
          {replies.map((subReply) => (
            <CommentReplyItem key={subReply.id} reply={subReply} />
          ))}
        </div>
      )}
    </div>
  );
}
