export default function AboutHero() {
  return (
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
        <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About Us
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
        Welcome to BlogSpace, where ideas come to life and stories find their
        audience. We&apos;re building a vibrant community of writers and readers
        passionate about sharing knowledge and creativity.
      </p>
    </div>
  );
}
