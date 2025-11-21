"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type LinkType = {
  name: string;
  href: string;
  requiresAuth?: boolean;
};

const navLinks: LinkType[] = [
  { name: "Home", href: "/" },
  { name: "All Blogs", href: "/all-blogs" },
  { name: "My Blogs", href: "/my-blogs", requiresAuth: true },
  { name: "Favourites", href: "/favourites", requiresAuth: true },
];

type NavigationProps = {
  onNavigate?: () => void;
};

export default function Navigation({ onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div>
      <ul className="flex flex-col md:flex-row md:gap-8 sm: gap-3">
        {navLinks.map((link) => {
          // Skip links that require auth if user is not logged in
          if (link.requiresAuth && !user) return null;

          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li className="" key={link.name}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-all ${
                  isActive
                    ? "text-white font-bold"
                    : "text-indigo-100 hover:text-white"
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
