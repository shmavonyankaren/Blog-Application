import { BlogType as Blog } from "@/lib/types";
import { deleteAllFavouritesByUser } from "@/lib/actions/favourite.action";
import { currentUser } from "@clerk/nextjs/server";
import { DeleteButton } from "@/components";

async function FavouritesFooter({ favourites }: { favourites: Blog[] }) {
  const user = await currentUser();

  if (!favourites || favourites.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700">
      <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 dark:text-white rounded-lg p-6 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Stats Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-red-600 dark:text-red-400 transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300 font-medium transition-colors duration-300">
                Total Favourites
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                {favourites.length}
              </p>
            </div>
          </div>

          {/* Delete All Button */}
          <DeleteButton
            action={deleteAllFavouritesByUser}
            deleteId={user!.id}
            text="Remove All"
            itemName="All Your Favourites"
            itemType="favourites"
          />
        </div>
      </div>
    </div>
  );
}

export default FavouritesFooter;
