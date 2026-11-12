import Image from "next/image";
import { User } from "@/lib/types";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface CommentHeaderProps {
  creatorOfComment: User;
  createdAt: string;
  updatedAt: string;
}

export default function CommentHeader({
  creatorOfComment,
  createdAt,
  updatedAt,
}: CommentHeaderProps) {
  const isEdited = createdAt !== updatedAt;
  const { user } = useUser();
  const adjustedCreatedAt = new Date(createdAt);
  const adjustedUpdatedAt = new Date(updatedAt);
  const isOwnBlog = user?.id === creatorOfComment.user_id;
  return (
    <Link
      href={
        isOwnBlog ? "/my-blogs" : `/creator-page/${creatorOfComment.user_id}`
      }
      className="flex items-center gap-3"
    >
      <Image
        src={creatorOfComment.photo || "/assets/images/user_avatar.png"}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">
          {isOwnBlog
            ? "You"
            : creatorOfComment.username ||
              creatorOfComment.first_name + " " + creatorOfComment.last_name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {adjustedCreatedAt.toLocaleString()}
          {isEdited && (
            <span className="ml-2 text-gray-400 dark:text-gray-500 italic transition-colors duration-300">
              (edited {adjustedUpdatedAt.toLocaleString()})
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
