import type { Metadata } from "next";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tienda — Shampoo y Tónico Capilar Natural para Hombres",
  description:
    "Compra el shampoo natural y el tónico capilar orgánico de DUNES. Formulados con extractos botánicos colombianos para detener la caída del cabello y activar su crecimiento.",
  alternates: { canonical: "https://www.dunesbotanical.com/tienda" },
  openGraph: {
    title: "Tienda DUNES | Shampoo Natural Orgánico para Hombres en Colombia",
    description:
      "Shampoo 100% natural sin químicos agresivos y tónico capilar botánico. Envíos a todo Colombia.",
    url: "https://www.dunesbotanical.com/tienda",
    type: "website",
  },
};

export default async function TiendaPage() {
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching products:", error.message);
  }

  const ORDER = ["shampoo", "acondicionador"];
  const items = ((products ?? []) as Product[]).sort((a, b) => {
    const ai = ORDER.findIndex((k) => a.slug.includes(k));
    const bi = ORDER.findIndex((k) => b.slug.includes(k));
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* ── Header editorial ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/20 pb-10 mb-16">
        <div className="max-w-2xl">
          <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter text-primary leading-[0.9]">
            NUESTROS<br />PRODUCTOS
          </h1>
          <p className="mt-6 text-on-surface-variant max-w-lg leading-relaxed">
            Formulados con ingredientes botánicos seleccionados para fortalecer y
            nutrir tu cabello de raíz a punta. Sin filtros, solo disciplina.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-surface-container-highest text-xs font-medium uppercase tracking-widest text-primary rounded-full">
            Botánico
          </span>
          <span className="px-4 py-2 bg-surface-container-highest text-xs font-medium uppercase tracking-widest text-primary rounded-full">
            Sin sulfatos
          </span>
          <span className="px-4 py-2 bg-surface-container-highest text-xs font-medium uppercase tracking-widest text-primary rounded-full">
            Colombia
          </span>
        </div>
      </div>

      {/* ── Product grid ── */}
      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-on-surface-variant text-lg">
            Configura Supabase con tu .env.local para ver los productos.
          </p>
          <p className="text-sm text-on-surface-variant mt-2">
            Ejecuta el archivo{" "}
            <code className="bg-surface-container-high px-2 py-0.5">
              supabase/migrations/001_initial_schema.sql
            </code>{" "}
            en tu proyecto.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/producto/${product.id}`}
              className="group flex flex-col cursor-pointer"
            >
              <article className="flex flex-col flex-1">
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6 relative">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container">
                      <span className="material-symbols-outlined text-primary text-6xl opacity-30">
                        spa
                      </span>
                    </div>
                  )}
                  {/* Stock badge */}
                  {product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-error text-on-error px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                      Agotado
                    </div>
                  )}
                </div>

                {/* Info */}
                <h2 className="font-brand text-2xl uppercase leading-tight mb-2 text-primary group-hover:text-secondary transition-colors">
                  {product.name.toUpperCase()}
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-sm min-h-[3rem]">
                  {product.description ?? ""}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
                  <span className="font-headline font-bold text-xl text-tertiary">
                    ${product.price.toLocaleString("es-CO")}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                    Ver producto
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
