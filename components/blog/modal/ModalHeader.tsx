interface ModalHeaderProps {
  actionType: "create" | "edit";
  onClose: () => void;
}

export default function ModalHeader({ actionType, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-4 sm:py-5 bg-linear-to-r from-indigo-600 to-purple-600">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
        {actionType === "create" ? "Create New Blog" : "Edit Blog"}
      </h3>
      <button
        onClick={onClose}
        className="cursor-pointer inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
