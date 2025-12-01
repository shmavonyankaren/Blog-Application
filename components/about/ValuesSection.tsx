import ValueItem from "./ValueItem";

export default function ValuesSection() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center transition-colors duration-300">
        Our Core Values
      </h2>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <ValueItem
          emoji="🎯"
          title="Authenticity"
          description="We value genuine voices and original perspectives. Be yourself and share your unique insights."
          bgColor="indigo"
        />

        <ValueItem
          emoji="🤝"
          title="Respect"
          description="We foster a respectful environment where diverse opinions are welcomed and valued."
          bgColor="purple"
        />

        <ValueItem
          emoji="💡"
          title="Innovation"
          description="We continuously improve our platform to provide the best writing and reading experience."
          bgColor="indigo"
        />

        <ValueItem
          emoji="🌟"
          title="Quality"
          description="We encourage thoughtful, well-crafted content that adds value to our community."
          bgColor="purple"
        />
      </div>
    </div>
  );
}
