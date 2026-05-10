"use client";

import Link from "next/link";
import { useState } from "react";

const products = [
  { id: "shampoo-crecimiento-natural", name: "Shampoo Crecimiento Natural", sku: "DUN-SHN-500", stock: 124, price: "$89.000", status: "Activo", category: "Core", description: "Hero SKU para adquisición fría y bundles de entrada." },
  { id: "tonico-renacer-capilar", name: "Tónico Renacer Capilar", sku: "DUN-TON-250", stock: 82, price: "$96.000", status: "Activo", category: "Upsell", description: "Sube AOV en flujo post-compra y recompra." },
  { id: "kit-disciplina-90d", name: "Kit Disciplina 90D", sku: "DUN-KIT-90", stock: 39, price: "$248.000", status: "Bajo stock", category: "Bundle", description: "Bundle de margen alto para usuarios comprometidos." },
  { id: "masajeador-capilar", name: "Masajeador Capilar", sku: "DUN-MAS-001", stock: 212, price: "$32.000", status: "Activo", category: "Accesorio", description: "Cross-sell de alta rotación y fácil ticket attach." },
];

export default function AdminProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  const visibleProducts = products.filter((product) => {
    const value = query.toLowerCase();
    return [product.name, product.sku, product.category].join(" ").toLowerCase().includes(value);
  });

  return (
    <div className="space-y-6">
      <section className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Catálogo</p>
            <h1 className="font-headline text-4xl font-semibold uppercase tracking-[-0.05em] text-primary">
              Control de productos
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-on-surface-variant">
              Cambia entre vista editorial y tabla operativa para revisar precio, stock y foco comercial.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-3 rounded-full bg-surface px-4 py-3 text-sm text-on-surface-variant shadow-[0_14px_34px_rgba(28,28,24,0.04)]">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, SKU o categoría"
                className="w-full bg-transparent outline-none placeholder:text-on-surface-variant sm:w-64"
              />
            </label>

            <div className="flex rounded-full bg-surface p-1 shadow-[0_14px_34px_rgba(28,28,24,0.04)]">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-full px-4 py-2 text-sm font-medium ${view === "grid" ? "bg-primary text-white" : "text-on-surface"}`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`rounded-full px-4 py-2 text-sm font-medium ${view === "list" ? "bg-primary text-white" : "text-on-surface"}`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>
      </section>

      {view === "grid" ? (
        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="rounded-[2rem] bg-surface px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-brand text-[11px] tracking-[0.28em] uppercase text-secondary">{product.category}</p>
                  <h2 className="mt-3 font-headline text-2xl font-semibold uppercase tracking-[-0.04em] text-primary">
                    {product.name}
                  </h2>
                </div>
                <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[11px] font-brand tracking-[0.18em] uppercase text-secondary">
                  {product.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-on-surface-variant">{product.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 rounded-[1.75rem] bg-surface-container-low px-4 py-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Precio</p>
                  <p className="mt-2 text-lg font-semibold text-on-surface">{product.price}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Stock</p>
                  <p className="mt-2 text-lg font-semibold text-on-surface">{product.stock} uds.</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm text-on-surface-variant">{product.sku}</p>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Editar
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="space-y-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="grid gap-4 rounded-[2rem] bg-surface px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] xl:grid-cols-[1.1fr_0.8fr_0.6fr_0.6fr_0.45fr] xl:items-center"
            >
              <div>
                <p className="font-headline text-2xl font-semibold uppercase tracking-[-0.04em] text-primary">{product.name}</p>
                <p className="mt-2 text-sm text-on-surface-variant">{product.description}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">SKU</p>
                <p className="mt-2 text-sm font-medium text-on-surface">{product.sku}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Precio</p>
                <p className="mt-2 text-sm font-medium text-on-surface">{product.price}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Stock</p>
                <p className="mt-2 text-sm font-medium text-on-surface">{product.stock} uds.</p>
              </div>
              <div className="flex xl:justify-end">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  Abrir
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}