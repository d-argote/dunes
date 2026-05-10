import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import ProductsCatalog from "./_components/ProductsCatalog";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name, slug, description, price, stock, image_url, images, video_url")
    .order("name");

  const products: Product[] = error ? [] : (data ?? []);

  return (
    <div className="px-6 md:px-16 py-12 min-h-screen pb-32">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface mb-8 uppercase tracking-tight">
            PRODUCTOS — GESTIÓN DE CATÁLOGO
          </h2>
        </div>
        <div className="flex gap-4 self-stretch md:self-auto">
          <button className="bg-surface-container-highest text-on-surface-variant px-6 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-surface-container-high transition-colors flex items-center gap-2 border border-outline-variant">
            <span className="material-symbols-outlined">filter_list</span>
            Filtros
          </button>
          <Link
            href="/admin/products/new"
            className="bg-primary text-on-primary px-8 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            AÑADIR PRODUCTO
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-8 px-4 py-3 border border-error/30 bg-error-container/20 font-body text-sm text-error">
          Error al cargar productos. Verifica la conexión con Supabase.
        </div>
      )}

      <ProductsCatalog products={products} />

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-16">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <div className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          2026 DUNES BOTANICAL ARCHITECT
        </div>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary transition-colors">EDITOR MODE</span>
          <span className="text-primary underline">SYSTEM STATUS</span>
        </div>
      </footer>
    </div>
  );
}

