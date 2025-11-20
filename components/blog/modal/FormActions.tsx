interface FormActionsProps {
  actionType: "create" | "edit";
  onCancel: () => void;
}

export default function FormActions({
  actionType,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
      >
        {actionType === "create" ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Blog
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save Changes
          </>
        )}
      </button>
    </div>
  );
}
