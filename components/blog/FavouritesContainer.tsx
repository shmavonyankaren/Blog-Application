import { BlogList } from "@/components";
import FavouritesFooter from "./FavouritesFooter";
import { getAllFavouritesByUser } from "@/lib/actions/favourite.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function FavouritesContainer() {
  const user = await currentUser();
  const favourites = await getAllFavouritesByUser(user!.id);
  const totalCount = favourites?.length || 0;

  return (
    <div className="min-h-full py-8 px-4">
      <div className="mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden max-w-7xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
        {/* Header Section with Gradient Background */}
        <div className="bg-linear-to-r from-red-600 to-pink-600 dark:from-slate-800 dark:to-slate-700 duration-300 transition-colors px-6 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                My Favourites
              </h1>
              <p className="text-red-100 dark:text-slate-200 text-sm transition-colors duration-300">
                Your collection of saved blogs
                {totalCount > 0 && (
                  <span className="ml-1 font-semibold">
                    ({totalCount}{" "}
                    {totalCount === 1 ? "favourite" : "favourites"})
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8">
          {favourites && favourites.length > 0 ? (
            <>
              <BlogList cardType="viewer" blogs={favourites} />
              <FavouritesFooter favourites={favourites} />
            </>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 dark:text-slate-600 mb-4 transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                No Favourites Yet
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6 transition-colors duration-300">
                Start exploring blogs and add your favourites here!
              </p>
              <a
                href="/all-blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Explore Blogs
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
