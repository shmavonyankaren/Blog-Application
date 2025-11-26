import { memo } from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 hover:shadow-xl border border-gray-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-600 transition-all duration-300">
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-4 rounded-xl inline-block mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}

export default memo(FeatureCard);
