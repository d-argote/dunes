"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const kpis = [
  { label: "Revenue 30d", value: "$42.8M", delta: "+18.4%", icon: "payments" },
  { label: "AOV", value: "$118K", delta: "+6.7%", icon: "point_of_sale" },
  { label: "Conversión", value: "4.9%", delta: "+0.8 pp", icon: "conversion_path" },
  { label: "Recompra", value: "27%", delta: "+4.1 pp", icon: "repeat" },
];

const revenueSeries = [
  { day: "Lun", sales: 8.2, orders: 76 },
  { day: "Mar", sales: 9.7, orders: 81 },
  { day: "Mié", sales: 12.1, orders: 96 },
  { day: "Jue", sales: 11.4, orders: 91 },
  { day: "Vie", sales: 14.8, orders: 114 },
  { day: "Sáb", sales: 16.9, orders: 128 },
  { day: "Dom", sales: 13.2, orders: 104 },
];

const channelSeries = [
  { channel: "Meta", roas: 5.4 },
  { channel: "Google", roas: 4.1 },
  { channel: "TikTok", roas: 3.6 },
  { channel: "Email", roas: 7.2 },
];

const orderFeed = [
  { id: "#D-1842", customer: "Daniel Pava", product: "Kit Shampoo + Tónico", total: "$182.000", status: "Pagado" },
  { id: "#D-1841", customer: "Juan Méndez", product: "Shampoo 500 ml", total: "$89.000", status: "Empacando" },
  { id: "#D-1838", customer: "Camilo Ríos", product: "Tónico Renacer", total: "$96.000", status: "En tránsito" },
  { id: "#D-1836", customer: "Esteban Gil", product: "Rutina Trimestral", total: "$248.000", status: "Pagado" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <article
            key={item.label}
            className="rounded-[2rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-on-surface-variant">{item.label}</p>
                <p className="mt-3 font-headline text-4xl font-semibold tracking-[-0.05em] text-primary">{item.value}</p>
              </div>
              <span className="material-symbols-outlined rounded-full bg-surface px-3 py-3 text-[24px] text-secondary">
                {item.icon}
              </span>
            </div>
            <p className="mt-5 inline-flex rounded-full bg-surface px-3 py-1 text-[11px] font-brand tracking-[0.22em] uppercase text-secondary">
              {item.delta}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <article className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Volumen comercial</p>
              <h3 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
                Revenue y pedidos por día
              </h3>
            </div>
            <div className="rounded-full bg-surface px-4 py-2 text-sm text-on-surface-variant">Últimos 7 días</div>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#234b1d" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#234b1d" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e5e2db" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#42493f", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#42493f", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 18, border: "none", background: "#fcf9f2", boxShadow: "0 18px 48px rgba(28,28,24,0.08)" }}
                />
                <Area type="monotone" dataKey="sales" stroke="#234b1d" strokeWidth={3} fill="url(#salesGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-surface-container-highest px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">ROAS por canal</p>
          <h3 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
            Mezcla pagada
          </h3>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelSeries} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid horizontal={false} stroke="#dcdad3" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#42493f", fontSize: 12 }} />
                <YAxis type="category" dataKey="channel" tickLine={false} axisLine={false} tick={{ fill: "#1c1c18", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 18, border: "none", background: "#fcf9f2", boxShadow: "0 18px 48px rgba(28,28,24,0.08)" }}
                />
                <Bar dataKey="roas" fill="#904c2d" radius={[20, 20, 20, 20]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Operación en vivo</p>
              <h3 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
                Últimos pedidos
              </h3>
            </div>
            <div className="rounded-full bg-surface px-4 py-2 text-sm text-on-surface-variant">Tiempo real</div>
          </div>

          <div className="mt-6 space-y-3">
            {orderFeed.map((order) => (
              <div key={order.id} className="grid gap-3 rounded-[1.75rem] bg-surface px-4 py-4 md:grid-cols-[0.8fr_1fr_0.8fr_0.6fr] md:items-center">
                <div>
                  <p className="font-headline text-lg font-semibold text-primary">{order.id}</p>
                  <p className="text-sm text-on-surface-variant">{order.customer}</p>
                </div>
                <p className="text-sm leading-6 text-on-surface">{order.product}</p>
                <p className="font-medium text-on-surface">{order.total}</p>
                <span className="inline-flex w-fit rounded-full bg-surface-container-highest px-3 py-1 text-[11px] font-brand tracking-[0.2em] uppercase text-secondary">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-primary px-5 py-5 text-white shadow-[0_24px_56px_rgba(35,75,29,0.18)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-white/70">Acciones críticas</p>
          <h3 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-white">
            Prioridades del turno
          </h3>

          <div className="mt-6 space-y-4">
            {[
              "Reabastecer kit trimestral antes de las 3 PM.",
              "Subir nuevo creativo UGC con claim de disciplina diaria.",
              "Ajustar bundle post-compra para elevar recompra en 7 días.",
            ].map((task, index) => (
              <div key={task} className="rounded-[1.6rem] bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="font-brand text-[11px] tracking-[0.22em] uppercase text-white/72">Task 0{index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-white/90">{task}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}