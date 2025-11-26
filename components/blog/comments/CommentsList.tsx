import { CommentType } from "@/lib/types";
import CommentItem from "./CommentItem";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function CommentsList({
  comments,
}: {
  comments: CommentType[];
}) {
  const currUser = await currentUser();

  // Fetch all user data for comments
  const userDataPromises = comments.map((comment) =>
    getUserById(comment.user_id)
  );
  const usersData = await Promise.all(userDataPromises);
  return (
    <div className="mb-6">
      <ul className="space-y-4">
        {comments.map((comment, index) => (
          <li key={comment.id}>
            <CommentItem
              comment={comment}
              creatorOfComment={usersData[index]}
              isOwner={currUser?.id === comment.user_id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
