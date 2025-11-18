export default function DeleteButton({
  action,
  deleteId,
  text,
}: {
  action: (formData: FormData) => Promise<void>;
  deleteId: string | number;
  text: string;
  revalidatePath?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <form action={action}>
        <input type="hidden" name="deleteId" value={deleteId} />
        {/** Optional path to revalidate after action completes. If omitted, no revalidation is attempted. */}
        <input type="hidden" name="revalidatePath" value="" />
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow"
          type="submit"
          aria-label={`Delete item with ID ${deleteId}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {text}
        </button>
      </form>
    </div>
  );
}
