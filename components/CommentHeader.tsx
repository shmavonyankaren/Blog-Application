import Image from "next/image";
import { User } from "@/lib/types";

interface CommentHeaderProps {
  creatorOfComment: User;
  createdAt: string;
}

export default function CommentHeader({
  creatorOfComment,
  createdAt,
}: CommentHeaderProps) {
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
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
