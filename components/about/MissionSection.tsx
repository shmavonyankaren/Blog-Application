export default function MissionSection() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Our Mission
        </h2>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
        At BlogSpace, we believe everyone has a story worth sharing. Our mission
        is to provide a platform where writers of all backgrounds can express
        themselves freely, connect with like-minded individuals, and inspire
        others through their words.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
        We&apos;re committed to creating an inclusive, supportive environment
        where creativity thrives and meaningful conversations happen.
      </p>
    </div>
  );
}
