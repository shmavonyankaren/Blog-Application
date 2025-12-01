interface FormActionsProps {
  actionType: "create" | "edit";
  onCancel: () => void;
}

export default function FormActions({
  actionType,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
      >
        {actionType === "create" ? (
          <>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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
            <span className="hidden sm:inline">Create Blog</span>
            <span className="sm:hidden">Create</span>
          </>
        ) : (
          <>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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
            <span className="hidden sm:inline">Save Changes</span>
            <span className="sm:hidden">Save</span>
          </>
        )}
      </button>
    </div>
  );
}
