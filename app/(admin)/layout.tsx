"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/admin/dashboard", label: "DASHBOARD", icon: "dashboard" },
  { href: "/admin/products", label: "PRODUCTOS", icon: "eco" },
  { href: "/admin/customers", label: "COMUNIDAD", icon: "groups" },
  { href: "/admin/blog", label: "CONTENIDO", icon: "edit_note" },
  { href: "/admin/sales", label: "VENTAS", icon: "shopping_cart" },
  { href: "/admin/social", label: "SOCIAL", icon: "campaign" },
];

function matchesPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const isLogin = pathname === "/admin/login" || pathname === "/login";

  function handleLogout() {
    document.cookie = "dunes-admin-session=; path=/; max-age=0; SameSite=Lax";
    window.location.href = "/admin/login";
  }

  if (isLogin) {
    return <>{children}</>;
  }

  const activeNav = navigation.find((n) => matchesPath(pathname, n.href));

  return (
    <div className="flex min-h-screen bg-background text-on-background antialiased">
      {/* ── Sidebar ────────────────────────────────── */}
      <nav className="hidden md:flex w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface-container-low flex-col py-2 z-50">
        {/* Logo */}
        <div className="px-6 mb-8 mt-6">
          <h1 className="font-brand text-5xl font-bold tracking-[0.08em] text-primary uppercase leading-none">DUNES</h1>
          <p className="font-body text-xs text-on-surface-variant uppercase tracking-widest mt-2 font-semibold">Admin Suite 2026</p>
        </div>

        {/* Nav items */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {navigation.map((item) => {
            const active = matchesPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 mx-2 transition-all duration-200 font-brand text-sm font-semibold tracking-[0.15em] uppercase rounded-full ${
                  active
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-4 mt-auto mb-6 flex flex-col gap-3">
          <Link
            href="/admin/products/new"
            className="w-full bg-primary text-on-primary font-brand text-sm font-semibold tracking-widest uppercase py-4 px-8 text-center hover:bg-primary-container transition-colors"
          >
            NUEVO PRODUCTO
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full text-on-surface-variant hover:text-primary font-body text-xs tracking-widest uppercase font-semibold py-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* ── Main area ──────────────────────────────── */}
      <div className="flex-1 flex flex-col md:ml-[240px]">
        {/* TopBar */}
        <header className="h-16 sticky top-0 z-40 flex justify-between items-center px-6 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="font-brand text-sm font-semibold text-on-surface-variant tracking-widest uppercase">DUNES</span>
            <span className="material-symbols-outlined text-base text-on-surface-variant">chevron_right</span>
            <span className="font-brand text-sm font-bold text-primary tracking-widest uppercase">
              {activeNav?.label ?? "ADMIN"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-on-surface-variant hover:bg-surface-container-highest/30 transition-colors rounded-full p-2 cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-highest/30 transition-colors rounded-full p-2 cursor-pointer">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-highest/30 transition-colors rounded-full p-2 cursor-pointer">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 w-full bg-surface/90 backdrop-blur-lg border-t border-outline-variant flex justify-around items-center h-16 z-50">
          {navigation.slice(0, 4).map((item) => {
            const active = matchesPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full tap-highlight-transparent ${
                  active ? "text-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="font-body text-[10px] font-semibold tracking-widest uppercase mt-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}