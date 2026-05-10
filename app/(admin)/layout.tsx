"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/products", label: "Productos", icon: "inventory_2" },
  { href: "/admin/sales", label: "Ventas", icon: "monitoring" },
  { href: "/admin/social", label: "Social", icon: "campaign" },
  { href: "/admin/customers", label: "Clientes", icon: "groups" },
  { href: "/admin/blog", label: "Blog", icon: "edit_square", unavailable: true },
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
    return <div className="fixed inset-0 z-[90] overflow-y-auto bg-surface text-on-surface">{children}</div>;
  }

  return (
    <div className="fixed inset-0 z-[90] bg-surface text-on-surface">
      <div className="grid h-full lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden h-full flex-col bg-surface-container-low px-6 py-8 shadow-[16px_0_48px_rgba(28,28,24,0.06)] lg:flex">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-brand text-xs tracking-[0.35em] text-secondary uppercase">Dunes Admin</p>
              <h1 className="font-headline text-3xl font-semibold uppercase tracking-[-0.03em] text-primary">
                Control de Operaciones
              </h1>
            </div>
            <p className="max-w-[18rem] text-sm leading-6 text-on-surface-variant">
              Métricas, catálogo y activación de marca en una sola capa operativa.
            </p>
          </div>

          <nav className="mt-10 space-y-2">
            {navigation.map((item) => {
              const active = matchesPath(pathname, item.href);

              if (item.unavailable) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center justify-between rounded-[1.75rem] bg-surface px-4 py-3 text-on-surface-variant opacity-70"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                      <span className="font-body text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-brand tracking-[0.2em] uppercase text-secondary">
                      Bloqueado
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[1.75rem] px-4 py-3 transition-transform duration-200 hover:scale-[1.02] ${
                    active
                      ? "bg-primary text-white shadow-[0_20px_40px_rgba(35,75,29,0.18)]"
                      : "bg-surface text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  <span className="font-body text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 rounded-[2rem] bg-surface px-5 py-5 shadow-[0_18px_48px_rgba(28,28,24,0.05)]">
            <div className="space-y-1">
              <p className="font-brand text-[11px] tracking-[0.3em] text-secondary uppercase">Estado del día</p>
              <p className="font-headline text-xl font-semibold uppercase text-primary">Operación estable</p>
            </div>
            <p className="text-sm leading-6 text-on-surface-variant">
              El dashboard carga con shell dedicada y middleware de sesión por cookie.
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-body text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-[#fcf9f2]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div>
              <p className="font-brand text-[11px] tracking-[0.32em] text-secondary uppercase">Botanical Operations</p>
              <h2 className="font-headline text-2xl font-semibold uppercase tracking-[-0.03em] text-primary">
                Admin Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden rounded-full bg-surface-container-low px-4 py-2 text-sm font-medium text-on-surface transition-transform duration-200 hover:scale-[1.02] sm:inline-flex"
              >
                Ver tienda
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-[18px]">shield_lock</span>
                Sesión activa
              </button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">{children}</div>
          </main>

          <nav className="bg-surface-container-low px-4 py-3 lg:hidden">
            <div className="grid grid-cols-5 gap-2">
              {navigation.filter((item) => !item.unavailable).map((item) => {
                const active = matchesPath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 rounded-[1.5rem] px-2 py-2 text-center ${
                      active ? "bg-primary text-white" : "bg-surface text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span className="text-[10px] font-brand tracking-[0.18em] uppercase">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}