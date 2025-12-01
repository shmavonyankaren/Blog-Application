import FavouriteButton from "./FavouriteButton";
import LikeButton from "./LikeButton";

export default function SaveLikeButtons({
  blogId,
  isFavourited,
  isLiked,
  shouldReRenderViewCount,
}: {
  blogId: number;
  isFavourited?: boolean;
  isLiked: boolean;
  shouldReRenderViewCount?: boolean;
}) {
  return (
    <div className="absolute left-2 sm:left-3 md:left-4 top-2 sm:top-3 md:top-4 flex justify-center items-center flex-col gap-1.5 sm:gap-2 z-10">
      <FavouriteButton blogId={blogId} isFavourited={isFavourited || false} />
      <LikeButton
        blogId={blogId}
        isLiked={isLiked}
        shouldReRenderViewCount={shouldReRenderViewCount}
      />
    </div>
  );
}
