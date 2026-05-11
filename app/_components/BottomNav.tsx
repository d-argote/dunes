"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/tienda", label: "Tienda", icon: "rebase_edit" },
  { href: "/comunidad", label: "Comunidad", icon: "groups" },
  { href: "/blog", label: "Blog", icon: "auto_stories" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 w-full z-50 bg-[#fcf9f2] rounded-t-3xl border-t border-stone-200/10 shadow-[0_-8px_32px_rgba(0,0,0,0.04)] flex justify-around items-center h-20 px-4"
      aria-label="Navegación principal"
    >
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center transition-colors ease-out duration-200 ${
              isActive
                ? "text-primary bg-surface-container-highest rounded-xl px-3 py-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                isActive
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {icon}
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest font-medium mt-1">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
