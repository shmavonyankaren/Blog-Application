import FavouriteButton from "./FavouriteButton";
import LikeButton from "./LikeButton";

export default function SaveLikeButtons({
  blogId,
  isFavourited,
  isLiked,
}: {
  blogId: number;
  isFavourited?: boolean;
  isLiked: boolean;
}) {
  return (
    <div className="absolute left-4 top-4 flex justify-center items-center flex-col gap-2 z-10">
      <FavouriteButton blogId={blogId} isFavourited={isFavourited || false} />
      <LikeButton blogId={blogId} isLiked={isLiked} />
    </div>
  );
}
