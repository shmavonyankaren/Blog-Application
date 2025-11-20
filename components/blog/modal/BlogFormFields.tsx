interface BlogFormFieldsProps {
  actionType: "create" | "edit";
  defaultTitle?: string;
  defaultDescription?: string;
}

export default function BlogFormFields({
  actionType,
  defaultTitle,
  defaultDescription,
}: BlogFormFieldsProps) {
  return (
    <div className="flex-1 space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Blog Title
        </label>
        <input
          name="title"
          required
          defaultValue={actionType === "edit" ? defaultTitle : ""}
          placeholder="Enter an engaging title..."
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={6}
          defaultValue={actionType === "edit" ? defaultDescription : ""}
          placeholder="Share your thoughts and ideas..."
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
        />
      </div>
    </div>
  );
}
