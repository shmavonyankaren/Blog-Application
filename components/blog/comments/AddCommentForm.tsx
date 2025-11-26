import { addCommentToBlog } from "@/lib/actions/comment.actions";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function AddCommentForm({ blogId }: { blogId: string }) {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="mt-6 mb-6 bg-linear-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-indigo-600 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
          Join the Conversation
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
          Sign in to share your thoughts and engage with the community.
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          Sign In to Comment
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
        Add a Comment
      </h3>
      <form
        action={async (formData: FormData) => {
          "use server";
          await addCommentToBlog(formData, "/blog/" + blogId);
        }}
        className="flex flex-col gap-3"
      >
        <input type="hidden" name="blogId" value={blogId} />
        <input type="hidden" name="userId" value={user!.id} />
        <textarea
          name="content"
          required
          rows={4}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 transition-all duration-300 resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 dark:bg-linear-to-r dark:from-indigo-700 dark:to-purple-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-800 dark:hover:to-purple-800   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg dark:focus:ring-indigo-600 dark:focus:ring-offset-slate-900"
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
