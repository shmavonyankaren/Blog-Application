export default function ContactHero() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
        <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Contact Us
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
        Have a question or feedback? We&apos;d love to hear from you. Send us a
        message and we&apos;ll respond as soon as possible.
      </p>
    </div>
  );
}
