import Image from "next/image";
import { User } from "@/lib/types";

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

  // Add 4 hours to compensate for Railway UTC storage
  const offset = 4 * 60 * 60 * 1000;
  const adjustedCreatedAt = new Date(new Date(createdAt).getTime() + offset);
  const adjustedUpdatedAt = new Date(new Date(updatedAt).getTime() + offset);

  return (
    <div className="flex items-center gap-3">
      <Image
        src={creatorOfComment.photo}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full ring-2 ring-gray-200"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">
          {creatorOfComment.username ||
            creatorOfComment.first_name + " " + creatorOfComment.last_name}
        </p>
        <p className="text-xs text-gray-500">
          {adjustedCreatedAt.toLocaleString()}
          {isEdited && (
            <span className="ml-2 text-gray-400 italic">
              (edited {adjustedUpdatedAt.toLocaleString()})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
