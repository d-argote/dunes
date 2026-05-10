"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

type ProductStatus = "active" | "low" | "draft";

function deriveStatus(stock: number): ProductStatus {
  if (stock === 0) return "draft";
  if (stock <= 5) return "low";
  return "active";
}

function StatusBadge({ status }: { status: ProductStatus }) {
  if (status === "active")
    return <span className="bg-primary text-on-primary font-body text-xs font-semibold px-3 py-1 uppercase">Activo</span>;
  if (status === "low")
    return <span className="bg-error-container text-on-error-container font-body text-xs font-semibold px-3 py-1 uppercase border border-error">Bajo Stock</span>;
  return <span className="bg-surface-variant text-on-surface-variant font-body text-xs font-semibold px-3 py-1 uppercase border border-outline">Sin Stock</span>;
}

export default function ProductsCatalog({ products }: { products: Product[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  const total = products.length;
  const active = products.filter((p) => p.stock > 5).length;
  const low = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <>
      {/* Stats */}
      <div className="flex gap-4 md:gap-12 flex-wrap mb-16">
        <div>
          <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Total</span>
          <span className="font-brand font-bold text-on-surface text-5xl">{total}</span>
        </div>
        <div>
          <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Stock Activo</span>
          <span className="font-brand font-bold text-primary text-5xl">{active}</span>
        </div>
        <div>
          <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Bajo Stock</span>
          <span className="font-brand font-bold text-error text-5xl">{low}</span>
        </div>
        <div>
          <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Sin Stock</span>
          <span className="font-brand font-bold text-outline text-5xl">{outOfStock}</span>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex justify-end mb-8 border-b border-outline-variant pb-4">
        <div className="flex gap-2">
          <button
            aria-label="Grid View"
            onClick={() => setView("grid")}
            className={`p-2 ${view === "grid" ? "text-primary border-b-2 border-primary bg-surface-container-low" : "text-on-surface-variant hover:bg-surface-container-low"} transition-colors`}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button
            aria-label="List View"
            onClick={() => setView("list")}
            className={`p-2 ${view === "list" ? "text-primary border-b-2 border-primary bg-surface-container-low" : "text-on-surface-variant hover:bg-surface-container-low"} transition-colors`}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'wght' 100" }}>inventory_2</span>
          <p className="font-headline text-xl font-bold uppercase">No hay productos aún</p>
          <Link href="/admin/products/new" className="bg-primary text-on-primary px-8 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors">
            AÑADIR PRIMER PRODUCTO
          </Link>
        </div>
      )}

      {/* Grid */}
      {view === "grid" && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const status = deriveStatus(product.stock);
            return (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className={`bg-surface-container-low relative group cursor-pointer ${status === "draft" ? "opacity-75 hover:opacity-100 transition-opacity" : ""}`}
              >
                <div className="absolute top-4 left-4 z-10">
                  <StatusBadge status={status} />
                </div>
                <div className="aspect-[4/5] overflow-hidden bg-surface-container-highest flex items-center justify-center">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-outline text-6xl" style={{ fontVariationSettings: "'wght' 100" }}>image</span>
                  )}
                </div>
                <div className="p-4 border-t border-outline-variant">
                  <h3 className={`font-headline text-xl font-bold mb-2 uppercase tracking-[-0.02em] ${status === "draft" ? "text-on-surface-variant italic" : "text-on-surface"}`}>
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-end">
                    <span className="font-body text-xs font-semibold text-on-surface-variant truncate max-w-[120px]">{product.slug}</span>
                    <span className={`font-headline text-2xl font-bold tracking-[-0.02em] ${status === "draft" ? "text-outline-variant" : "text-primary"}`}>
                      ${product.price.toLocaleString("es-CO")}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-outline-variant/50 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status === "low" ? "bg-error" : status === "draft" ? "bg-outline-variant" : "bg-primary-container"}`} />
                    <span className={`font-body text-base ${status === "low" ? "text-error font-semibold" : "text-on-surface-variant"}`}>
                      {`Stock: ${product.stock} u.`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* List */}
      {view === "list" && products.length > 0 && (
        <div className="flex flex-col divide-y divide-outline-variant/40">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-4 pb-3 font-body text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            <span>Producto</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Estado</span>
            <span />
          </div>
          {products.map((product) => {
            const status = deriveStatus(product.stock);
            return (
              <div key={product.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-4 py-4 items-center hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-surface-container-highest overflow-hidden">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline w-full h-full flex items-center justify-center">image</span>
                    )}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface uppercase tracking-tight">{product.name}</p>
                    <p className="font-body text-xs text-on-surface-variant">{product.slug}</p>
                  </div>
                </div>
                <span className="font-headline font-bold text-primary">${product.price.toLocaleString("es-CO")}</span>
                <span className={`font-body font-semibold ${status === "low" ? "text-error" : "text-on-surface"}`}>{product.stock} u.</span>
                <StatusBadge status={status} />
                <Link href={`/admin/products/${product.id}`} className="text-on-surface-variant hover:text-primary transition-colors flex justify-end">
                  <span className="material-symbols-outlined">edit</span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
