export default function ContactFAQCard() {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
      <p className="text-indigo-100 mb-6">
        Before reaching out, you might find your answer in our FAQ section.
        Check it out for quick solutions to common questions.
      </p>
      <a
        href="/faq"
        className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-all inline-flex items-center gap-2"
      >
        View FAQ
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  );
}
