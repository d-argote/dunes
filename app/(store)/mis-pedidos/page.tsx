import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Mis pedidos" };

// TODO: fetch real orders by customer email (after Supabase Auth integration)
const PLACEHOLDER_ORDERS: {
  id: string;
  created_at: string;
  status: string;
  total: number;
}[] = [];

export default function MisPedidosPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="display text-4xl text-primary mb-10">MIS PEDIDOS</h1>

      {PLACEHOLDER_ORDERS.length === 0 ? (
        <div className="bg-surface-container-low rounded-2xl p-12 text-center shadow-ambient">
          <p className="text-on-surface-variant mb-6">
            Aún no tienes pedidos. Cuando completes tu primera compra aparecerán aquí.
          </p>
          <Link
            href="/tienda"
            className="btn-primary inline-flex items-center justify-center h-12 px-8 rounded-full text-sm font-semibold"
          >
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {PLACEHOLDER_ORDERS.map((order) => (
            <li
              key={order.id}
              className="bg-surface-container-low rounded-2xl p-6 shadow-ambient flex items-center justify-between gap-4"
            >
              <div>
                <p className="display text-sm text-on-surface">
                  PEDIDO #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {new Date(order.created_at).toLocaleDateString("es-CO")}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-tertiary">
                  ${order.total.toLocaleString("es-CO")}
                </span>
                <span className="text-xs bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant capitalize">
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
