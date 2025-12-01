type ValueItemProps = {
  emoji: string;
  title: string;
  description: string;
  bgColor: "indigo" | "purple";
};

export default function ValueItem({
  emoji,
  title,
  description,
  bgColor,
}: ValueItemProps) {
  const bgClass = bgColor === "indigo" ? "bg-indigo-100" : "bg-purple-100";

  return (
    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-600 transition-all duration-300">
      <div className="shrink-0">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 ${bgClass} rounded-lg flex items-center justify-center`}
        >
          <span className="text-xl sm:text-2xl">{emoji}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
