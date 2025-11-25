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
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300 font-medium transition-colors duration-300">
                Total Saved
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
