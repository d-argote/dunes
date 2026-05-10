"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import type { OrderItem } from "@/lib/types";

// Colombian departments for the shipping calculator
const DEPARTMENTS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá",
  "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba",
  "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena",
  "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda",
  "San Andrés y Providencia", "Santander", "Sucre", "Tolima",
  "Valle del Cauca", "Vaupés", "Vichada",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const cartSubtotal = subtotal();

  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    department: "",
    city: "",
    address: "",
  });

  const total = cartSubtotal + (shippingCost ?? 0);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleDepartmentChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    handleChange(e);
    const dept = e.target.value;
    if (!dept) return;

    setLoadingShipping(true);
    try {
      const res = await fetch(`/api/shipping?department=${encodeURIComponent(dept)}`);
      const json = await res.json();
      setShippingCost(json.rate ?? null);
    } catch {
      setShippingCost(null);
    } finally {
      setLoadingShipping(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    // Map CartItem → OrderItem for the API
    const orderItems: OrderItem[] = items.map((item) => ({
      product_id: item.product_id,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: orderItems }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Error al crear la orden");
      }

      const { wompi_url } = await res.json();
      clearCart();
      // External redirect — use window.location for reliability
      window.location.href = wompi_url;
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Hubo un error. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <main className="pt-24 pb-32 px-4 max-w-2xl mx-auto text-center">
        <h1 className="font-brand text-5xl text-primary uppercase tracking-tighter mb-8">
          CHECKOUT
        </h1>
        <div className="bg-surface-container-low p-16 flex flex-col items-center gap-6">
          <span className="material-symbols-outlined text-primary opacity-30 text-8xl">
            shopping_bag
          </span>
          <p className="font-headline text-on-surface-variant uppercase tracking-widest text-sm">
            Tu carrito está vacío
          </p>
          <Link
            href="/tienda"
            className="bg-primary text-on-primary font-brand px-10 py-4 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            IR A LA TIENDA
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-32 px-4 md:px-12 max-w-5xl mx-auto">
      <h1 className="font-brand text-5xl text-primary uppercase tracking-tighter mb-12">
        CHECKOUT
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ── Left: forms ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Personal info */}
          <fieldset className="bg-surface-container-low p-8 flex flex-col gap-5">
            <legend className="font-brand text-sm tracking-widest text-primary uppercase mb-2">
              INFORMACIÓN DE CONTACTO
            </legend>
            <InputField label="Nombre completo" name="customer_name" value={form.customer_name} onChange={handleChange} required />
            <InputField label="Correo electrónico" name="customer_email" type="email" value={form.customer_email} onChange={handleChange} required />
            <InputField label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
          </fieldset>

          {/* Shipping */}
          <fieldset className="bg-surface-container-low p-8 flex flex-col gap-5">
            <legend className="font-brand text-sm tracking-widest text-primary uppercase mb-2">
              DIRECCIÓN DE ENVÍO
            </legend>

            <div className="flex flex-col gap-1">
              <label htmlFor="department" className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                Departamento
              </label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleDepartmentChange}
                required
                className="bg-transparent border-b-2 border-surface-container-highest focus:border-primary px-0 py-2 text-sm text-on-surface focus:outline-none transition-colors"
              >
                <option value="">Selecciona un departamento</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {loadingShipping && (
                <span className="text-xs text-on-surface-variant mt-1">Calculando envío…</span>
              )}
              {shippingCost !== null && !loadingShipping && (
                <span className="text-xs text-secondary font-medium mt-1">
                  Envío: ${shippingCost.toLocaleString("es-CO")} COP
                </span>
              )}
            </div>

            <InputField label="Ciudad" name="city" value={form.city} onChange={handleChange} required />
            <InputField label="Dirección" name="address" value={form.address} onChange={handleChange} required />
          </fieldset>
        </div>

        {/* ── Right: order summary ── */}
        <div className="bg-surface-container-low p-8 flex flex-col gap-5 sticky top-24">
          <h2 className="font-brand text-xl uppercase tracking-widest text-primary">
            TU PEDIDO
          </h2>

          {/* Items */}
          <ul className="flex flex-col gap-3 divide-y divide-outline-variant/20">
            {items.map((item) => (
              <li key={`${item.product_id}-${item.purchase_type}`} className="flex justify-between items-start pt-3 text-sm first:pt-0">
                <div>
                  <p className="font-headline font-medium text-primary uppercase text-xs tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-on-surface-variant text-xs">
                    ×{item.quantity}
                  </p>
                </div>
                <span className="font-headline font-bold text-primary text-sm">
                  ${(item.price * item.quantity).toLocaleString("es-CO")}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-outline-variant/20 pt-4 space-y-2 text-sm text-on-surface-variant">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartSubtotal.toLocaleString("es-CO")}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{shippingCost !== null ? `$${shippingCost.toLocaleString("es-CO")}` : "—"}</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline border-t border-outline-variant/20 pt-4">
            <span className="font-brand text-lg uppercase tracking-widest text-primary">TOTAL</span>
            <span className="font-headline font-bold text-2xl text-primary">
              ${total.toLocaleString("es-CO")}
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting || shippingCost === null || total === 0}
            className="bg-primary text-on-primary font-brand py-5 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                PROCESANDO…
              </>
            ) : (
              "PAGAR CON WOMPI →"
            )}
          </button>

          {shippingCost === null && (
            <p className="text-xs text-on-surface-variant text-center">
              Selecciona tu departamento para continuar
            </p>
          )}
        </div>
      </form>
    </main>
  );
}

/* ── Reusable input ── */
function InputField({
  label, name, value, onChange, type = "text", required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-transparent border-b-2 border-surface-container-highest focus:border-primary px-0 py-2 text-sm text-on-surface focus:outline-none transition-colors"
      />
    </div>
  );
}


