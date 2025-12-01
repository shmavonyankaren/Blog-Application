export default function FAQPage() {
  const faqs = [
    {
      question: "How do I create a blog post?",
      answer:
        "Sign in to your account, navigate to 'My Blogs', and click the 'New Blog' button. Fill in your title, description, upload an image, and publish!",
    },
    {
      question: "Can I edit or delete my blog posts?",
      answer:
        "Yes! Go to 'My Blogs' to see all your posts. Each post has edit and delete buttons that only you can see.",
    },
    {
      question: "Do I need an account to read blogs?",
      answer:
        "No, you can browse and read all blogs without an account. However, you'll need to sign in to create posts or leave comments.",
    },
    {
      question: "How do I comment on a blog post?",
      answer:
        "Sign in to your account, open any blog post, scroll to the comments section, and share your thoughts in the comment box.",
    },
    {
      question: "Can I delete my comments?",
      answer:
        "Yes, you can edit or delete any comments you've made. Just look for the edit and delete buttons next to your comments.",
    },
    {
      question: "How do I search for specific blogs?",
      answer:
        "Use the search bar on the 'All Blogs' page to search by title or description. Results update as you type!",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely! We use industry-standard security measures and only display your first name publicly. Your email and other details remain private.",
    },
    {
      question: "Can I upload images to my blog posts?",
      answer:
        "Yes! You can upload a cover image when creating or editing your blog post. We support common image formats like JPG, PNG, and WebP.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
            Find answers to common questions about using BlogSpace. Can&apos;t
            find what you&apos;re looking for? Contact us!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl border border-gray-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-600 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3 transition-colors duration-300">
                <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                  Q
                </span>
                {faq.question}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed ml-9 sm:ml-11 transition-colors duration-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-8 sm:mt-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-5 sm:mb-6">
            We&apos;re here to help! Reach out to our support team.
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-slate-100 font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-slate-600"
          >
            Contact Us
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
