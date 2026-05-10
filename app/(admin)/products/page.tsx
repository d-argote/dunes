"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: "active" | "low" | "draft";
  image: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "Serum Andino 01", sku: "SA-001", price: "$120", stock: 45, status: "active", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLwGU37ud8FSjzjqmLKGcbM3-Nrc3hAi8XEYmSQMt30M6bU6N4elq82FZoqDc678q-mWaQifDVx-httIUnHgJm7pJ2gYuhUj1XwsaD4SJqwks4B1rSJpThoXmeqsaLQuQlgpIFRu8w7SEph5v49Fly3QyQY9ZhQxPaTh3s76Z2WtMnMs6_YZalz0VOKXTP8iu8ExXg4WwyNhhLEAv4e6b7HDapK605LrOQv0LcOdNrWQGk0IgkkH786dNHUOxqatQIoovLrN25aQ" },
  { id: "2", name: "Arcilla Volcanica", sku: "AV-002", price: "$85", stock: 12, status: "active", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8zI4-AV-FS_N--x5R1iXQ7Lcgu1Pu4nYbmw_DkxB9e2n3T0fcZbCBYcDJQLSQPcJPYh9KxwTknafW-7qwB4ytME-P4rDHSkIuv_uTspHnyybYg76Jpm4iwoDJtRoAwYb2VxH8IoVjNKjMeYFID9_WOrs82uQaSwa96kw-hwpIgBiFdusX3RLL-Shm5MucPtyWwUnFPPamVUHMyWg5M033-EIMlW_Xu8jwTWalUI2WHNT5BSUpO04zVRMoLYGXsJeNKcgX5wJb0g" },
  { id: "3", name: "Elixir Nocturno", sku: "EN-003", price: "$150", stock: 3, status: "low", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRHC3nE-DZ8OSHJjnFLleMXjCofgefSbMU1NVEI_1ecqljTJ_YlEocJ1LjIuP-KflMa-SGWT_PE6pQ74Q-fKAQ32__RCvITDGQ7mrX6p3u69NZDEWyk7d9Mh9ANbirfWMTHJki7U-6jHZXDOO8FLP9M2XXpC8AgtNjayKKqEtKNYlgAPlwys4JWvuIxppYaHFaBmZdpNIryfCTHN5GnL0sUDlQCTjmj1eDTZzXYAjkGYblRrWEtB0WwcZBIp1Hp7skmzxW1rCS7g" },
  { id: "4", name: "Bruma Refrescante", sku: "--", price: "--", stock: 0, status: "draft", image: "" },
];

function StatusBadge({ status }: { status: Product["status"] }) {
  if (status === "active") return <span className="bg-primary text-on-primary font-body text-xs font-semibold px-3 py-1 uppercase">Activo</span>;
  if (status === "low") return <span className="bg-error-container text-on-error-container font-body text-xs font-semibold px-3 py-1 uppercase border border-error">Bajo Stock</span>;
  return <span className="bg-surface-variant text-on-surface-variant font-body text-xs font-semibold px-3 py-1 uppercase border border-outline">Borrador</span>;
}

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="px-6 md:px-16 py-12 min-h-screen pb-32">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface mb-8 uppercase tracking-tight">
            PRODUCTOS — GESTION DE CATALOGO
          </h2>
          <div className="flex gap-4 md:gap-12 flex-wrap">
            <div>
              <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Total</span>
              <span className="font-brand font-bold text-on-surface text-5xl">142</span>
            </div>
            <div>
              <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Stock Activo</span>
              <span className="font-brand font-bold text-primary text-5xl">128</span>
            </div>
            <div>
              <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Sin Stock</span>
              <span className="font-brand font-bold text-error text-5xl">4</span>
            </div>
            <div>
              <span className="font-body text-xs font-semibold text-on-surface-variant uppercase block mb-1">Borradores</span>
              <span className="font-brand font-bold text-outline text-5xl">10</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 self-stretch md:self-auto">
          <button className="bg-surface-container-highest text-on-surface-variant px-6 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-surface-container-high transition-colors flex items-center gap-2 border border-outline-variant">
            <span className="material-symbols-outlined">filter_list</span>
            Filtros
          </button>
          <Link href="/admin/products/new" className="bg-primary text-on-primary px-8 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>
            ANADIR PRODUCTO
          </Link>
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}`}
            className={`bg-surface-container-low relative group cursor-pointer ${product.status === "draft" ? "opacity-75 hover:opacity-100 transition-opacity" : ""}`}
          >
            <div className="absolute top-4 left-4 z-10">
              <StatusBadge status={product.status} />
            </div>
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="bg-surface/90 backdrop-blur text-on-surface p-2 rounded-full hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-surface-container-highest flex items-center justify-center">
              {product.image ? (
                <Image
                  src={product.image}
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
              <h3 className={`font-headline text-xl font-bold mb-2 uppercase tracking-[-0.02em] ${product.status === "draft" ? "text-on-surface-variant italic" : "text-on-surface"}`}>
                {product.name}
              </h3>
              <div className="flex justify-between items-end">
                <span className="font-body text-xs font-semibold text-on-surface-variant">{`SKU: ${product.sku}`}</span>
                <span className={`font-headline text-2xl font-bold tracking-[-0.02em] ${product.status === "draft" ? "text-outline-variant" : "text-primary"}`}>{product.price}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant/50 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.status === "low" ? "bg-error" : product.status === "draft" ? "bg-outline-variant" : "bg-primary-container"}`} />
                <span className={`font-body text-base ${product.status === "low" ? "text-error font-semibold" : "text-on-surface-variant"}`}>
                  {product.status === "draft" ? "Stock: --" : `Stock: ${product.stock} u.`}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-16">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <div className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          2026 DUNES BOTANICAL ARCHITECT
        </div>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary transition-colors">AUTO-SAVE: ACTIVE</span>
          <span className="hover:text-primary transition-colors">EDITOR MODE</span>
          <span className="text-primary underline">SYSTEM STATUS</span>
        </div>
      </footer>
    </div>
  );
}