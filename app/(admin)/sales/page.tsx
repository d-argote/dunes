import { supabaseAdmin } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function SalesPage() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("id, total, status, created_at");

  const allOrders = orders ?? [];
  const paid = allOrders.filter(
    (o) => (o.status as OrderStatus) !== "cancelled"
  );

  const totalRevenue = paid.reduce((s, o) => s + (o.total ?? 0), 0);
  const avgTicket = paid.length > 0 ? totalRevenue / paid.length : 0;
  const pendingCount = allOrders.filter((o) => o.status === "pending").length;
  const deliveredCount = allOrders.filter((o) => o.status === "delivered").length;
  const cancelledCount = allOrders.filter((o) => o.status === "cancelled").length;

  // Current quarter date range label
  const now = new Date();
  const qStartMonth = Math.floor(now.getMonth() / 3) * 3;
  const qStart = new Date(now.getFullYear(), qStartMonth, 1);
  const qLabel = `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`;

  const channels = [
    { name: "Directo (Web)", pct: 75, amount: "—" },
    { name: "Retail", pct: 45, amount: "—" },
    { name: "Pop-up Events", pct: 20, amount: "—" },
    { name: "B2B", pct: 15, amount: "—" },
  ];

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-12 min-h-screen pb-32">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-outline-variant pb-8">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">SALES ANALYTICS</h2>
          <p className="font-brand text-sm font-semibold tracking-widest uppercase text-on-surface-variant mt-2">{qLabel} — {qStart.toLocaleDateString("es-CO", { month: "short", day: "2-digit" }).toUpperCase()} al HOY</p>
        </div>
        <button className="bg-primary text-on-primary px-8 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">file_download</span>
          EXPORT REPORT
        </button>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: formatCOP(totalRevenue), icon: "payments" },
          { label: "TICKET PROMEDIO", value: formatCOP(avgTicket), icon: "receipt" },
          { label: "PEDIDOS COMPLETADOS", value: String(deliveredCount), icon: "check_circle" },
          { label: "PEDIDOS PENDIENTES", value: String(pendingCount), icon: "pending_actions" },
          { label: "CANCELADOS", value: String(cancelledCount), icon: "cancel" },
          { label: "TOTAL PEDIDOS", value: String(allOrders.length), icon: "shopping_cart" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-low p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{kpi.label}</p>
              <span className="material-symbols-outlined text-2xl text-primary">{kpi.icon}</span>
            </div>
            <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">{kpi.value}</p>
          </div>
        ))}
      </section>

      {/* Channels + Funnel */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Ventas por Canal */}
        <div className="bg-surface-container-low p-8">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-4">VENTAS POR CANAL</h3>
          <p className="font-body text-xs text-on-surface-variant mb-6">Distribución estimada. Conecta Google Analytics para datos reales.</p>
          <div className="flex flex-col gap-6">
            {channels.map((ch) => (
              <div key={ch.name} className="flex flex-col gap-2">
                <div className="flex justify-between font-body text-base text-on-surface">
                  <span>{ch.name}</span>
                  <span className="font-semibold text-on-surface-variant">{ch.amount}</span>
                </div>
                <div className="w-full bg-surface-container-highest h-8 overflow-hidden relative">
                  <div className="h-full bg-primary transition-all duration-700" style={{ width: `${ch.pct}%` }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-brand text-xs font-semibold text-on-surface-variant tracking-widest">{ch.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-surface-container-low p-8">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-4">CONVERSION FUNNEL</h3>
          <p className="font-body text-xs text-on-surface-variant mb-6">Requiere integración con Google Analytics para datos de sesiones y conversión.</p>
          <div className="flex flex-col items-center justify-center h-32">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">analytics</span>
            <p className="font-body text-sm text-on-surface-variant">Datos de funnel no disponibles</p>
          </div>
        </div>
      </section>

      {/* Behavior Table */}
      <section className="bg-surface-container-low p-8">
        <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-4">ANALISIS DE COMPORTAMIENTO</h3>
        <p className="font-body text-sm text-on-surface-variant">
          Este módulo requiere integración con Google Analytics 4 para mostrar sesiones, tasa de rebote y conversión por segmento.
        </p>
      </section>

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">2026 DUNES BOTANICAL ARCHITECT</span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary">AUTO-SAVE: ACTIVE</span>
          <span className="text-primary underline">ANALYTICS MODE</span>
        </div>
      </footer>
    </div>
  );
}