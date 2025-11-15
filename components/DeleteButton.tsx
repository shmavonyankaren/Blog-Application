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
    <div className="flex flex- items-center gap-2">
      <form action={action}>
        <input type="hidden" name="deleteId" value={deleteId} />
        {/** Optional path to revalidate after action completes. If omitted, no revalidation is attempted. */}
        <input type="hidden" name="revalidatePath" value="" />
        <button
          className="min-w-[90px] py-3 px-3 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
          type="submit"
          aria-label={`Delete item with ID ${deleteId}`}
        >
          {text}
        </button>
      </form>
    </div>
  );
}
