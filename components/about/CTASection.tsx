import Link from "next/link";

export default function CTASection() {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Join Our Community Today
      </h2>
      <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
        Start sharing your stories, connect with readers, and be part of a
        growing community of passionate writers.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/sign-up"
          className="px-8 py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-slate-100 font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
        >
          Get Started
        </Link>
        <Link
          href="/all-blogs"
          className="px-8 py-4 bg-indigo-700 text-white font-semibold rounded-xl hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl border-2 border-indigo-400 inline-block"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
