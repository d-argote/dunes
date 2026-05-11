import { supabaseAdmin } from "@/lib/supabase/server";
import type { OrderItem, OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_MAP: Record<OrderStatus, { label: string; class: string }> = {
  pending: { label: "Pendiente", class: "bg-surface-variant text-on-surface-variant" },
  paid: { label: "Pagado", class: "bg-secondary-container text-on-surface" },
  shipped: { label: "Enviado", class: "bg-primary-container text-on-primary-container" },
  delivered: { label: "Completado", class: "bg-primary-container text-on-primary-container" },
  cancelled: { label: "Cancelado", class: "bg-error-container text-on-error-container" },
};

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function DashboardPage() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [todayRes, activeRes, recentRes, allItemsRes] = await Promise.all([
    supabaseAdmin
      .from("orders")
      .select("total")
      .gte("created_at", todayStart.toISOString())
      .neq("status", "cancelled"),
    supabaseAdmin
      .from("orders")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "paid"]),
    supabaseAdmin
      .from("orders")
      .select("id, customer_name, items, total, status")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("orders")
      .select("items")
      .neq("status", "cancelled"),
  ]);

  const todayRevenue = (todayRes.data ?? []).reduce(
    (s, o) => s + (o.total ?? 0),
    0
  );
  const activeCount = activeRes.count ?? 0;
  const recentOrders = recentRes.data ?? [];

  // Aggregate top products from JSONB items arrays
  const productTotals = new Map<string, { name: string; qty: number }>();
  for (const order of allItemsRes.data ?? []) {
    for (const item of (order.items ?? []) as OrderItem[]) {
      const existing = productTotals.get(item.product_id) ?? {
        name: item.product_name,
        qty: 0,
      };
      existing.qty += item.quantity;
      productTotals.set(item.product_id, existing);
    }
  }
  const topProducts = Array.from(productTotals.values())
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 4);
  const maxQty = topProducts[0]?.qty ?? 1;

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-12 min-h-screen pb-32">

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">VENTAS HOY</p>
          <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">{formatCOP(todayRevenue)}</p>
          <div className="mt-4 flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-base">payments</span>
            <span className="font-body text-xs font-semibold">Actualizado en tiempo real</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">PEDIDOS ACTIVOS</p>
          <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">{activeCount}</p>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base">pending_actions</span>
            <span className="font-body text-xs font-semibold">Pendientes + Pagados</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">TASA CONVERSION</p>
          <p className="font-headline text-3xl font-bold text-on-surface-variant tracking-[-0.02em]">—</p>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base">analytics</span>
            <span className="font-body text-xs font-semibold">Requiere Google Analytics</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">VISITANTES</p>
          <p className="font-headline text-3xl font-bold text-on-surface-variant tracking-[-0.02em]">—</p>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base">people</span>
            <span className="font-body text-xs font-semibold">Requiere Google Analytics</span>
          </div>
        </div>
      </section>

      {/* Chart: Ventas 30 dias */}
      <section className="bg-surface-container-low p-8 rounded-[2px] min-h-[220px] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">VENTAS — ULTIMOS 30 DIAS</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="font-body text-sm text-on-surface-variant text-center">
            Conecta Google Analytics o una vista de Supabase para mostrar el gráfico histórico.
          </p>
        </div>
      </section>

      {/* Bottom: Table + Top Products */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Orders table */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 rounded-[2px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ULTIMOS PEDIDOS</h2>
            <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
          </div>
          {recentOrders.length === 0 ? (
            <p className="font-body text-sm text-on-surface-variant">No hay pedidos todavía.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/50">
                    {["ORDEN", "CLIENTE", "PRODUCTO", "MONTO", "ESTADO"].map((h) => (
                      <th key={h} className="py-4 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-body text-base text-on-surface">
                  {recentOrders.map((order) => {
                    const s = STATUS_MAP[order.status as OrderStatus] ?? STATUS_MAP.pending;
                    const firstItem = (order.items as OrderItem[])?.[0];
                    return (
                      <tr key={order.id} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                        <td className="py-4 font-body text-xs font-semibold">#{order.id.slice(0, 8).toUpperCase()}</td>
                        <td className="py-4">{order.customer_name}</td>
                        <td className="py-4 text-on-surface-variant">{firstItem?.product_name ?? "—"}</td>
                        <td className="py-4 text-right font-semibold">{formatCOP(order.total)}</td>
                        <td className="py-4 text-right">
                          <span className={`inline-block px-3 py-1 rounded-[2px] font-body text-xs font-semibold uppercase ${s.class}`}>{s.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-[2px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">TOP PRODUCTOS</h2>
            <span className="material-symbols-outlined text-on-surface-variant">trending_up</span>
          </div>
          {topProducts.length === 0 ? (
            <p className="font-body text-sm text-on-surface-variant">Sin ventas registradas todavía.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {topProducts.map((item, i) => (
                <div key={item.name}>
                  <div className="flex justify-between font-body text-base text-on-surface mb-2">
                    <span>{i + 1}. {item.name}</span>
                    <span className="font-body text-xs font-bold text-primary">{item.qty} Und.</span>
                  </div>
                  <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${Math.round((item.qty / maxQty) * 100)}%`, opacity: 1 - i * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer bar */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          2026 DUNES BOTANICAL ARCHITECT
        </span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          <span className="hover:text-primary transition-colors cursor-default">EDITOR MODE</span>
          <span className="hover:text-primary transition-colors cursor-default">SYSTEM STATUS</span>
        </div>
      </footer>
    </div>
  );
}