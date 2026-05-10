"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const snapshots = [
  { label: "Pedidos hoy", value: "184", icon: "shopping_bag" },
  { label: "ROAS semanal", value: "4.8x", icon: "trending_up" },
  { label: "CTR creativos", value: "3.2%", icon: "ads_click" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@dunesbotanical.com");
  const [password, setPassword] = useState("dunes-ops");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    document.cookie = "dunes-admin-session=active; path=/; max-age=28800; SameSite=Lax";
    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <div className="grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden bg-primary px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-8">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/88">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Volver a la tienda
              </Link>

              <div className="max-w-2xl space-y-5">
                <p className="font-brand text-xs tracking-[0.36em] uppercase text-white/80">Dunes Botanical Lab</p>
                <h1 className="font-headline text-4xl font-semibold uppercase leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Opera marca, catálogo y revenue desde una sola cabina.
                </h1>
                <p className="max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                  Este acceso centraliza performance, productos, clientes y ejecución creativa sin salir del App Router.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {snapshots.map((item) => (
                <div key={item.label} className="rounded-[2rem] bg-white/12 px-5 py-5 backdrop-blur-md">
                  <span className="material-symbols-outlined text-[24px] text-white/80">{item.icon}</span>
                  <p className="mt-6 text-3xl font-semibold tracking-[-0.04em]">{item.value}</p>
                  <p className="mt-1 text-sm text-white/72">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center bg-surface px-6 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-md space-y-8 rounded-[2.25rem] bg-surface-container-low px-6 py-7 shadow-[0_28px_60px_rgba(28,28,24,0.08)] sm:px-8 sm:py-9">
            <div className="space-y-3">
              <p className="font-brand text-[11px] tracking-[0.32em] uppercase text-secondary">Login administrativo</p>
              <h2 className="font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
                Accede al panel
              </h2>
              <p className="text-sm leading-6 text-on-surface-variant">
                La sesión se guarda en la cookie <span className="font-medium text-on-surface">dunes-admin-session</span> para que el middleware proteja el resto de rutas.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-on-surface">Correo</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-[1.35rem] bg-surface-container-highest px-4 py-3.5 text-sm outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(35,75,29,0.15)]"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-on-surface">Contraseña</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-[1.35rem] bg-surface-container-highest px-4 py-3.5 text-sm outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(35,75,29,0.15)]"
                />
              </label>

              <div className="rounded-[1.5rem] bg-surface px-4 py-3 text-sm leading-6 text-on-surface-variant">
                Demo operativa: cualquier submit crea la cookie local y redirige al dashboard.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-70"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                {loading ? "Accediendo" : "Entrar al panel"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}