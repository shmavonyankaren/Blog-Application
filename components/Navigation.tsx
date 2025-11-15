"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  name: string;
  href: string;
};

const navLinks: LinkType[] = [
  { name: "Home", href: "/" },
  { name: "My Blogs", href: "/my-blogs" },
  { name: "All Blogs", href: "/all-blogs" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex flex-col md:flex-row md:gap-8 sm: gap-3">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li className="" key={link.name}>
              <Link
                href={link.href}
                className={`text-sm ${
                  isActive ? "font-semibold text-blue-500" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
