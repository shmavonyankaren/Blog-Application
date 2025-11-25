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
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 dark:from-slate-800 dark:to-slate-700 duration-300 transition-colors px-6 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Saved Blogs
              </h1>
              <p className="text-blue-100 dark:text-slate-200 text-sm transition-colors duration-300">
                Your collection of saved blogs for later reading
                {totalCount > 0 && (
                  <span className="ml-1 font-semibold">
                    ({totalCount} {totalCount === 1 ? "blog" : "blogs"})
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
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
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                No Saved Blogs Yet
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6 transition-colors duration-300">
                Start exploring blogs and save them for later reading!
              </p>
              <a
                href="/all-blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
