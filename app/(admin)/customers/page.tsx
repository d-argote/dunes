"use client";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const customerMix = [
  { name: "Compradores", value: 62, color: "#234b1d" },
  { name: "No compradores", value: 38, color: "#904c2d" },
];

const cohortSeries = [
  { segment: "Nuevos", rate: 31 },
  { segment: "2da compra", rate: 46 },
  { segment: "Suscripción", rate: 68 },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
        <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Customer intelligence</p>
        <h1 className="mt-2 font-headline text-4xl font-semibold uppercase tracking-[-0.05em] text-primary">
          Buyers vs non-buyers
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">
          Lectura de segmentos con foco en activación, recompra y oportunidades de recuperación de intentos fallidos.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-[2.25rem] bg-surface px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Mix actual</p>
          <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
            Base activa
          </h2>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerMix} dataKey="value" innerRadius={72} outerRadius={105} paddingAngle={3}>
                  {customerMix.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 18, border: "none", background: "#fcf9f2", boxShadow: "0 18px 48px rgba(28,28,24,0.08)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {customerMix.map((entry) => (
              <div key={entry.name} className="rounded-[1.6rem] bg-surface-container-low px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">{entry.name}</p>
                <p className="mt-3 text-2xl font-semibold text-on-surface">{entry.value}%</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-surface-container-highest px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Retención por segmento</p>
          <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
            Cohortes de recompra
          </h2>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortSeries}>
                <Tooltip contentStyle={{ borderRadius: 18, border: "none", background: "#fcf9f2", boxShadow: "0 18px 48px rgba(28,28,24,0.08)" }} />
                <Bar dataKey="rate" radius={[18, 18, 18, 18]} fill="#234b1d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { label: "Winback pendiente", value: "412" },
              { label: "VIP recurrentes", value: "128" },
              { label: "Checkout abandonado", value: "689" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.6rem] bg-surface px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}