"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current" },
  { href: "/meetings/new", label: "Create" },
];

export default function NavLinks() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav>
      <ul className="flex justify-center gap-8 text-lg font-medium">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors duration-300 ${
                  active
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
