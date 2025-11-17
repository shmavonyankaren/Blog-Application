import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      href: "#",
      path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
    },
    {
      name: "GitHub",
      href: "https://github.com/shmavonyankaren",
      path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shmavonyan-karen/",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Blogs", href: "/all-blogs" },
    { name: "My Blogs", href: "/my-blogs" },
  ];

  //   const resourseLinks = [
  //     { name: "About Us", href: "#" },
  //     { name: "Privacy Policy", href: "#" },
  //     { name: "Terms of Service", href: "#" },
  //     { name: "Contact", href: "#" },
  //   ];

  const resourseLinks: { name: string; href: string }[] = [];

  //   const privacyLinks = [
  //     { name: "Privacy", href: "#" },
  //     { name: "Terms", href: "#" },
  //     { name: "Cookies", href: "#" },
  //   ];
  const privacyLinks: { name: string; href: string }[] = [];

  return (
    <footer className="bg-linear-to-r from-indigo-900 to-purple-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div
          // className="grid grid-cols-1 md:grid-cols-4 gap-8"

          className="flex justify-between gap-8 flex-col sm:flex-row md:flex-r"
        >
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
              BlogSpace
            </h3>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-md">
              Share your thoughts, stories, and ideas with the world. Join our
              community of writers and readers passionate about meaningful
              content.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social Links */}
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-indigo-300 hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={link.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-indigo-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          {resourseLinks.length ? (
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourseLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-indigo-200 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-indigo-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-indigo-300 text-sm">
              © {currentYear} BlogSpace. All rights reserved.
            </p>
            {privacyLinks.length ? (
              <div className="flex gap-6">
                {privacyLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-indigo-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
