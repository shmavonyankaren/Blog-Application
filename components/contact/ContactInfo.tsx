import ContactInfoItem from "./ContactInfoItem";

export default function ContactInfo() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
        Get in Touch
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 transition-colors duration-300">
        We&apos;re here to help and answer any questions you might have. We look
        forward to hearing from you!
      </p>

      <div className="space-y-6">
        {/* Email */}
        <ContactInfoItem
          icon={
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          title="Email"
          content="2003.karen.shmavonyan@gmail.com"
        />

        {/* Phone */}
        <ContactInfoItem
          icon={
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          }
          title="Phone"
          content="+374 (95) 72-66-78"
        />

        {/* Location */}
        {/* <ContactInfoItem
          icon={
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          title="Office"
          content={
            <p className="text-gray-600">
              123 Blog Street, Suite 100
              <br />
              San Francisco, CA 94102
            </p>
          }
        /> */}
      </div>
    </div>
  );
}
