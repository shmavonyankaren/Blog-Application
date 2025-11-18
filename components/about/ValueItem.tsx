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
    <div className="flex gap-4">
      <div className="shrink-0">
        <div
          className={`w-12 h-12 ${bgClass} rounded-lg flex items-center justify-center`}
        >
          <span className="text-2xl">{emoji}</span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
