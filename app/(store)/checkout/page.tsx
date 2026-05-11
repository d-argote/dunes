"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import type { OrderItem } from "@/lib/types";

/* â”€â”€â”€ Colombian departments + main cities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const CITIES_BY_DEPARTMENT: Record<string, string[]> = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Medellín","Bello","Envigado","Itagüí","Rionegro","Apartadó","Turbo","Caucasia","Sabaneta","La Estrella","Copacabana","Girardota","Barbosa","Caldas","Andes","Santa Fe de Antioquia"],
  "Arauca": ["Arauca","Saravena","Tame","Fortul","Arauquita"],
  "Atlántico": ["Barranquilla","Soledad","Malambo","Sabanalarga","Baranoa","Puerto Colombia"],
  "Bolívar": ["Cartagena","Magangué","Turbaco","El Carmen de Bolívar","Mompós"],
  "Boyacá": ["Tunja","Duitama","Sogamoso","Chiquinquirá","Paipa","Villa de Leyva"],
  "Caldas": ["Manizales","Villamaría","Chinchiná","La Dorada","Riosucio","Salamina"],
  "Caquetá": ["Florencia","San Vicente del Caguán","Puerto Rico"],
  "Casanare": ["Yopal","Aguazul","Villanueva","Paz de Ariporo","Tauramena"],
  "Cauca": ["Popayán","Santander de Quilichao","Puerto Tejada","Patía","Bolívar"],
  "Cesar": ["Valledupar","Aguachica","Bosconia","Codazzi","La Jagua de Ibirico"],
  "Chocó": ["Quibdó","Istmina","Tumaco","Condoto","Riosucio"],
  "Córdoba": ["Montería","Lorica","Cereté","Sahagún","Montelíbano","Tierralta"],
  "Cundinamarca": ["Bogotá D.C.","Soacha","Facatativá","Zipaquirá","Chía","Mosquera","Madrid","Fusagasugá","Girardot","La Mesa","Cajicá","Tocancipá","Funza"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare","El Retorno","Calamar"],
  "Huila": ["Neiva","Pitalito","Garzón","La Plata","Campoalegre"],
  "La Guajira": ["Riohacha","Maicao","Uribia","Manaure","San Juan del Cesar"],
  "Magdalena": ["Santa Marta","Ciénaga","Fundación","El Banco","Plato"],
  "Meta": ["Villavicencio","Acacías","Granada","Puerto López","San Martín"],
  "Nariño": ["Pasto","Tumaco","Ipiales","La Unión","Túquerres"],
  "Norte de Santander": ["Cúcuta","Ocaña","Pamplona","Villa del Rosario","Los Patios","El Zulia"],
  "Putumayo": ["Mocoa","Puerto Asís","Orito","Valle del Guamuez"],
  "Quindío": ["Armenia","Calarcá","Cartago","La Tebaida","Montenegro","Quimbaya"],
  "Risaralda": ["Pereira","Dosquebradas","Santa Rosa de Cabal","La Virginia","Apía"],
  "San Andrés y Providencia": ["San Andrés","Providencia"],
  "Santander": ["Bucaramanga","Floridablanca","Girón","Piedecuesta","Barrancabermeja","Socorro","San Gil"],
  "Sucre": ["Sincelejo","Corozal","San Marcos","Sampués","Tolú"],
  "Tolima": ["Ibagué","Espinal","Melgar","Honda","Líbano","Chaparral"],
  "Valle del Cauca": ["Cali","Buenaventura","Palmira","Tuluá","Buga","Cartago","Jamundí","Yumbo","Candelaria","Caicedonia"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño","La Primavera"],
};

const DEPARTMENTS = Object.keys(CITIES_BY_DEPARTMENT).sort();

/* â”€â”€â”€ Form state & validation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  cedula: string;
  address: string;
  complement: string;
  department: string;
  city: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  cedula?: string;
  address?: string;
  department?: string;
  city?: string;
  phone?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.email.trim()) {
    errors.email = "El correo es requerido.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Ingresa un correo válido.";
  }
  if (!form.firstName.trim()) errors.firstName = "El nombre es requerido.";
  if (!form.lastName.trim()) errors.lastName = "El apellido es requerido.";
  if (!form.cedula.trim()) {
    errors.cedula = "La cédula es requerida.";
  } else if (!/^\d{6,12}$/.test(form.cedula.replace(/\./g, ""))) {
    errors.cedula = "Ingresa una cédula válida (solo números, 6–12 dígitos).";
  }
  if (!form.address.trim()) errors.address = "La dirección es requerida.";
  if (!form.department) errors.department = "Selecciona un departamento.";
  if (!form.city) errors.city = "Selecciona una ciudad.";
  if (!form.phone.trim()) {
    errors.phone = "El teléfono es requerido.";
  } else if (!/^(\+?57)?[3][0-9]{9}$/.test(form.phone.replace(/[\s\-]/g, ""))) {
    errors.phone = "Ingresa un celular colombiano válido (10 dígitos, empieza por 3).";
  }
  return errors;
}

/* â”€â”€â”€ Page component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const cartSubtotal = subtotal();

  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    cedula: "",
    address: "",
    complement: "",
    department: "",
    city: "",
    phone: "",
  });

  const cities = useMemo(
    () => (form.department ? CITIES_BY_DEPARTMENT[form.department] ?? [] : []),
    [form.department]
  );

  const errors = useMemo(() => validate(form), [form]);
  const showError = (field: keyof FormErrors) =>
    (submitAttempted || touched[field]) ? errors[field] : undefined;

  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);
  const effectiveShipping = totalQuantity >= 4 ? 0 : (shippingCost ?? 0);
  const total = cartSubtotal + effectiveShipping;

  function setField(name: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function blur(name: keyof FormState) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function fetchShipping(dept: string) {
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

  function handleDepartmentChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const dept = e.target.value;
    setField("department", dept);
    setField("city", "");
    fetchShipping(dept);
    blur("department");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) return;
    if (items.length === 0) return;
    setSubmitting(true);

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
        body: JSON.stringify({
          customer_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          customer_email: form.email.trim(),
          phone: form.phone.replace(/[\s\-]/g, ""),
          department: form.department,
          city: form.city,
          address: form.address.trim() + (form.complement ? `, ${form.complement.trim()}` : ""),
          items: orderItems,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Error al crear la orden");
      }

      const { wompi_url } = await res.json();
      clearCart();
      window.location.href = wompi_url;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Hubo un error. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-32 px-4 max-w-2xl mx-auto text-center">
        <h1 className="font-brand text-5xl text-primary uppercase tracking-tighter mb-8">CHECKOUT</h1>
        <div className="bg-surface-container-low p-16 flex flex-col items-center gap-6">
          <span className="material-symbols-outlined text-primary opacity-30 text-8xl">shopping_bag</span>
          <p className="font-headline text-on-surface-variant uppercase tracking-widest text-sm">Tu carrito está vacío</p>
          <Link href="/tienda" className="bg-primary text-on-primary font-brand px-10 py-4 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
            IR A LA TIENDA
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-32 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px]">

        {/* â”€â”€ LEFT: Form â”€â”€ */}
        <div className="px-6 md:px-12 py-10 border-r border-outline-variant/20">
          <Link href="/tienda" className="font-brand text-2xl text-primary tracking-tighter block mb-10">
            DUNES
          </Link>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">

            {/* Contacto */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-brand text-sm tracking-widest text-on-surface uppercase">Contacto</h2>
              </div>
              <Field
                label="Correo electrónico"
                error={showError("email")}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => blur("email")}
                  placeholder="tu@correo.com"
                  className={inputCls(!!showError("email"))}
                />
              </Field>
            </section>

            {/* Entrega */}
            <section className="flex flex-col gap-4">
              <h2 className="font-brand text-sm tracking-widest text-on-surface uppercase">Entrega</h2>

              {/* País (fijo) */}
              <Field label="País / Región">
                <div className={`${inputCls(false)} bg-surface-container-low text-on-surface-variant cursor-not-allowed`}>
                  Colombia
                </div>
              </Field>

              {/* Nombre + Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nombre" error={showError("firstName")}>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    onBlur={() => blur("firstName")}
                    placeholder="Diego"
                    className={inputCls(!!showError("firstName"))}
                  />
                </Field>
                <Field label="Apellido" error={showError("lastName")}>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    onBlur={() => blur("lastName")}
                    placeholder="Argote"
                    className={inputCls(!!showError("lastName"))}
                  />
                </Field>
              </div>

              {/* Cédula */}
              <Field label="Cédula (sin puntos ni letras)" error={showError("cedula")}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.cedula}
                  onChange={(e) => setField("cedula", e.target.value.replace(/[^\d]/g, ""))}
                  onBlur={() => blur("cedula")}
                  placeholder="1234567890"
                  maxLength={12}
                  className={inputCls(!!showError("cedula"))}
                />
              </Field>

              {/* Dirección */}
              <Field label="Dirección" error={showError("address")}>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  onBlur={() => blur("address")}
                  placeholder="Calle 123 #45-67"
                  className={inputCls(!!showError("address"))}
                />
              </Field>

              {/* Complemento */}
              <Field label="Apartamento, casa, bloque (opcional)">
                <input
                  type="text"
                  value={form.complement}
                  onChange={(e) => setField("complement", e.target.value)}
                  placeholder="Apto 301, Torre A"
                  className={inputCls(false)}
                />
              </Field>

              {/* Departamento + Ciudad + Teléfono */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Departamento" error={showError("department")}>
                  <select
                    value={form.department}
                    onChange={handleDepartmentChange}
                    className={selectCls(!!showError("department"))}
                  >
                    <option value="">Selecciona...</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Ciudad" error={showError("city")}>
                  <select
                    value={form.city}
                    onChange={(e) => { setField("city", e.target.value); blur("city"); }}
                    onBlur={() => blur("city")}
                    disabled={!form.department}
                    className={selectCls(!!showError("city"), !form.department)}
                  >
                    <option value="">Selecciona...</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Shipping feedback */}
              {loadingShipping && (
                <p className="text-xs text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  Calculando costo de envío...
                </p>
              )}
              {shippingCost !== null && !loadingShipping && totalQuantity < 4 && (
                <p className="text-xs text-secondary font-medium">
                  Envío a {form.department}: ${shippingCost.toLocaleString("es-CO")} COP
                </p>
              )}

              {/* Teléfono */}
              <Field label="Teléfono" error={showError("phone")}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value.replace(/[^\d+\s\-]/g, ""))}
                  onBlur={() => blur("phone")}
                  placeholder="300 123 4567"
                  maxLength={15}
                  className={inputCls(!!showError("phone"))}
                />
              </Field>
            </section>

            {/* Submit (mobile only – desktop button is on the right panel) */}
            <div className="lg:hidden">
              <SubmitButton submitting={submitting} canPay={shippingCost !== null || totalQuantity >= 4} hasErrors={Object.keys(errors).length > 0 && submitAttempted} />
            </div>
          </form>
        </div>

        {/* â”€â”€ RIGHT: Order Summary â”€â”€ */}
        <div className="bg-surface-container-low px-6 md:px-10 py-10 flex flex-col gap-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-l border-outline-variant/20">

          {/* Items */}
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={`${item.product_id}-${item.purchase_type}`} className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0 bg-surface overflow-hidden">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline text-2xl">spa</span>
                    </div>
                  )}
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-on-surface text-surface text-[10px] font-bold flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-semibold text-on-surface text-sm uppercase tracking-tight truncate">{item.name}</p>
                  <p className="text-xs text-on-surface-variant">Unidad</p>
                </div>
                <span className="font-headline font-bold text-on-surface text-sm flex-shrink-0">
                  ${(item.price * item.quantity).toLocaleString("es-CO")}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-outline-variant/30" />

          {/* Totals */}
          <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
            <div className="flex justify-between">
              <span>Subtotal · {totalQuantity} {totalQuantity === 1 ? "artículo" : "artículos"}</span>
              <span className="text-on-surface font-medium">${cartSubtotal.toLocaleString("es-CO")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Envío</span>
              <span>
                {totalQuantity >= 4 ? (
                  <span className="text-primary font-bold">GRATIS</span>
                ) : shippingCost !== null ? (
                  <span className="text-on-surface font-medium">${shippingCost.toLocaleString("es-CO")}</span>
                ) : (
                  <span className="text-xs italic">Se calcula al seleccionar ciudad</span>
                )}
              </span>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-4 flex justify-between items-baseline">
            <span className="font-brand text-base uppercase tracking-widest text-on-surface">Total</span>
            <div className="text-right">
              <span className="text-xs text-on-surface-variant mr-1">COP</span>
              <span className="font-headline font-bold text-2xl text-on-surface">
                ${total.toLocaleString("es-CO")}
              </span>
            </div>
          </div>

          {/* Desktop submit */}
          <div className="hidden lg:block">
            <SubmitButton
              submitting={submitting}
              canPay={shippingCost !== null || totalQuantity >= 4}
              hasErrors={Object.keys(errors).length > 0 && submitAttempted}
              onClick={handleSubmit}
            />
            {shippingCost === null && totalQuantity < 4 && !submitting && (
              <p className="text-xs text-on-surface-variant text-center mt-3">
                Selecciona tu departamento para ver el costo de envío
              </p>
            )}
            {Object.keys(errors).length > 0 && submitAttempted && (
              <p className="text-xs text-error text-center mt-3">
                Por favor completa todos los campos requeridos.
              </p>
            )}
          </div>

          <p className="text-xs text-on-surface-variant text-center leading-relaxed">
            Pago seguro procesado por{" "}
            <span className="font-semibold text-on-surface">Wompi</span>. Tu información está protegida.
          </p>
        </div>
      </div>
    </main>
  );
}

/* â”€â”€â”€ Helper components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function Field({
  label, error, children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">{label}</label>
      {children}
      {error && (
        <span className="text-xs text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </span>
      )}
    </div>
  );
}

function SubmitButton({
  submitting, canPay, hasErrors, onClick,
}: {
  submitting: boolean;
  canPay: boolean;
  hasErrors: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="submit"
      disabled={submitting || !canPay}
      onClick={onClick}
      className="w-full bg-primary text-on-primary font-brand py-5 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
    >
      {submitting ? (
        <>
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
          PROCESANDO...
        </>
      ) : (
        "PAGAR CON WOMPI →"
      )}
    </button>
  );
}

function inputCls(hasError: boolean) {
  return `w-full bg-surface border ${hasError ? "border-error" : "border-outline-variant"} px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors`;
}

function selectCls(hasError: boolean, disabled?: boolean) {
  return `w-full bg-surface border ${hasError ? "border-error" : "border-outline-variant"} px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;
}

