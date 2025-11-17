import { addCommentToBlog } from "@/lib/actions/blog.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function AddCommentForm({ blogId }: { blogId: string }) {
  const user = await currentUser();
  return (
    <div className="mt-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Add a Comment
      </h3>
      <form action={addCommentToBlog} className="flex flex-col gap-3">
        <input type="hidden" name="blogId" value={blogId} />
        <input type="hidden" name="userId" value={user!.id} />
        <textarea
          name="content"
          required
          rows={4}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
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
