export default function ResponseTimeNotice() {
  return (
    <div className="mt-12 text-center">
      <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl shadow-md px-6 py-4 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <span className="font-semibold">Average response time:</span> Within
          24 hours
        </p>
      </div>
    </div>
  );
}
