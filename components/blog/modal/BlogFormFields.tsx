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
        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
          Blog Title
        </label>
        <input
          name="title"
          required
          defaultValue={actionType === "edit" ? defaultTitle : ""}
          placeholder="Enter an engaging title..."
          className="block w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
          Description
        </label>
        <textarea
          name="description"
          rows={6}
          defaultValue={actionType === "edit" ? defaultDescription : ""}
          placeholder="Share your thoughts and ideas..."
          className="block w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 transition-all duration-300 resize-none"
        />
      </div>
    </div>
  );
}
