import Image from "next/image";

interface ModalTriggerButtonProps {
  actionType: "create" | "edit";
  onClick: () => void;
}

export default function ModalTriggerButton({
  actionType,
  onClick,
}: ModalTriggerButtonProps) {
  if (actionType === "create") {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl border border-indigo-200"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Blog
      </button>
    );
  }

  return (
    <button onClick={onClick} className="inline-block cursor-pointer">
      <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
    </button>
  );
}
