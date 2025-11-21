import FavouritesContainer from "@/components/blog/FavouritesContainer";

export default async function Favourites() {
  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 dark:bg-linear-to-b dark:from-slate-950 dark:to-slate-900 flex-1 h-full w-full min-h-0 flex items-center justify-center transition-colors duration-300">
      <FavouritesContainer />
    </div>
  );
}
