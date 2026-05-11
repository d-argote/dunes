"use client";

import { useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  created_at: string;
  status: string;
  status_label: string;
  total: number;
  shipping_cost: number;
  department: string;
  city: string;
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-surface-container-highest text-on-surface-variant",
  paid: "bg-primary-container text-on-surface",
  shipped: "bg-secondary-container text-on-surface",
  delivered: "bg-primary text-on-primary",
  cancelled: "bg-error-container text-on-error-container border border-error",
};

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OrderLookup() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrders(null);
    try {
      const res = await fetch(
        `/api/orders/lookup?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Error al buscar pedidos");
      }
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          disabled={loading}
          className="flex-1 bg-surface-container-low border-none py-4 px-6 text-sm font-medium tracking-wider focus:ring-2 focus:ring-primary outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary inline-flex items-center justify-center h-14 px-8 text-sm font-semibold uppercase tracking-widest disabled:opacity-60"
        >
          {loading ? "Buscando..." : "Buscar pedidos"}
        </button>
      </form>

      {error && (
        <p className="font-body text-sm text-error flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
        </p>
      )}

      {/* Results */}
      {orders !== null && (
        <>
          {orders.length === 0 ? (
            <div className="bg-surface-container-low rounded-2xl p-12 text-center shadow-ambient">
              <p className="text-on-surface-variant mb-6">
                No encontramos pedidos asociados a ese correo electronico.
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
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="bg-surface-container-low rounded-2xl p-6 shadow-ambient flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="display text-sm text-on-surface font-bold uppercase">
                      PEDIDO #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {new Date(order.created_at).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {order.city}, {order.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-semibold text-primary">
                      {formatCOP(order.total)}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 uppercase tracking-widest ${STATUS_COLOR[order.status] ?? "bg-surface-container-highest text-on-surface-variant"}`}
                    >
                      {order.status_label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
