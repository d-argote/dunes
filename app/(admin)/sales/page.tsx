"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesSeries = [
  { week: "W1", revenue: 6.2, leads: 1900 },
  { week: "W2", revenue: 7.1, leads: 2140 },
  { week: "W3", revenue: 8.3, leads: 2380 },
  { week: "W4", revenue: 9.4, leads: 2600 },
  { week: "W5", revenue: 10.7, leads: 2840 },
  { week: "W6", revenue: 12.2, leads: 3010 },
];

const funnel = [
  { label: "Sessions", value: 100, tone: "bg-primary" },
  { label: "ATC", value: 42, tone: "bg-primary-container" },
  { label: "Checkout", value: 24, tone: "bg-secondary" },
  { label: "Paid", value: 11, tone: "bg-[#b86b48]" },
];

export default function AdminSalesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
        <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Sales intelligence</p>
        <h1 className="mt-2 font-headline text-4xl font-semibold uppercase tracking-[-0.05em] text-primary">
          Revenue y conversión
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">
          Vista táctica del pipeline desde sesión hasta pago, con foco en señales de mejora de conversión y ticket promedio.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2.25rem] bg-surface px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Trayectoria semanal</p>
          <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
            Revenue vs leads calificados
          </h2>

          <div className="mt-6 h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesSeries}>
                <defs>
                  <linearGradient id="revenueGradientSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#904c2d" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#904c2d" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e5e2db" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#42493f", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#42493f", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 18, border: "none", background: "#fcf9f2", boxShadow: "0 18px 48px rgba(28,28,24,0.08)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#904c2d" strokeWidth={3} fill="url(#revenueGradientSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-surface-container-highest px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Embudo de pago</p>
          <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
            Conversión por etapa
          </h2>

          <div className="mt-8 space-y-4">
            {funnel.map((step) => (
              <div key={step.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-on-surface">
                  <span>{step.label}</span>
                  <span className="font-medium">{step.value}%</span>
                </div>
                <div className="h-4 rounded-full bg-surface">
                  <div className={`h-4 rounded-full ${step.tone}`} style={{ width: `${step.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-surface px-4 py-4">
            <p className="font-brand text-[11px] tracking-[0.22em] uppercase text-secondary">Insight</p>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              El mayor gap sigue entre Add to Cart y Checkout. La siguiente mejora táctica es simplificar shipping messaging en PDP y checkout one-step.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}