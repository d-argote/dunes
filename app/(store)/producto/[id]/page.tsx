import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import ProductInteractive from "./_components/ProductInteractive";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("products")
    .select("name, description")
    .eq("id", id)
    .single();
  return {
    title: data?.name ?? "Producto",
    description: data?.description ?? undefined,
  };
}

const ACCORDIONS = [
  {
    key: "beneficios",
    label: "Beneficios",
    defaultOpen: false,
    content: (
      <div className="pt-4 space-y-4 text-sm leading-relaxed text-on-surface-variant">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary">eco</span>
          <p>Estimula la microcirculación del cuero cabelludo.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary">shutter_speed</span>
          <p>Reduce la caída visible en solo 21 días de uso constante.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary">architecture</span>
          <p>Engrosa la fibra capilar desde la raíz.</p>
        </div>
      </div>
    ),
  },
  {
    key: "ingredientes",
    label: "Ingredientes Activos",
    defaultOpen: true,
    content: (
      <div className="pt-4 space-y-3 text-sm leading-relaxed text-on-surface-variant">
        <p>
          <strong>Extracto de Romero:</strong> Antioxidante natural.
        </p>
        <p>
          <strong>Biotina:</strong> Vitamina esencial para la queratina.
        </p>
        <p>
          <strong>Jengibre Orgánico:</strong> Energizante folicular.
        </p>
        <p>
          <strong>Aceite de Argán:</strong> Hidratación profunda sin peso.
        </p>
        <p>
          <strong>Aminoácidos de Seda:</strong> Reparación de puntas abiertas.
        </p>
      </div>
    ),
  },
  {
    key: "modo_uso",
    label: "Modo de Uso",
    defaultOpen: false,
    content: (
      <div className="pt-4 space-y-4 text-sm text-on-surface-variant">
        {[
          "Aplica sobre el cabello húmedo y masajea el cuero cabelludo por 2 minutos.",
          "Deja actuar la espuma botánica mientras terminas tu ducha.",
          "Enjuaga con abundante agua tibia, evitando temperaturas extremas.",
        ].map((step, i) => (
          <div key={i} className="flex gap-4">
            <span className="font-headline font-bold text-secondary text-xl">
              0{i + 1}
            </span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "envios",
    label: "Envíos",
    defaultOpen: false,
    content: (
      <div className="pt-4 text-sm text-on-surface-variant">
        <p>
          Despachos a toda Colombia. Tiempo estimado: 2–4 días hábiles en ciudades
          principales.
        </p>
      </div>
    ),
  },
];

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;

  const [{ data, error }, { data: related }] = await Promise.all([
    supabaseAdmin.from("products").select("*").eq("id", id).single(),
    supabaseAdmin.from("products").select("*").neq("id", id).limit(2),
  ]);

  if (error || !data) notFound();
  const product = data as Product;
  const relatedProducts = (related ?? []) as Product[];

  return (
    <main className="pt-24 pb-32 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
      {/* ── Product grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative overflow-hidden group">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={product.name}
                className="w-full aspect-[4/5] object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-700"
                src={product.image_url}
              />
            ) : (
              <div className="w-full aspect-[4/5] bg-surface-container-low rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-8xl opacity-20">
                  spa
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none rounded-xl" />
          </div>

          {/* Thumbnails — placeholder para futuras fotos del producto */}
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg overflow-hidden bg-surface-container-high cursor-pointer ${
                  i === 0 ? "border-b-2 border-primary" : "hover:opacity-80 transition-opacity"
                }`}
              >
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={`${product.name} — vista ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary opacity-30">
                      spa
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div className="aspect-square rounded-lg bg-surface-container-high flex items-center justify-center cursor-pointer hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">
                play_circle
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 space-y-8">
          {/* Rating */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-tertiary">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star_half
              </span>
              <span className="text-xs font-medium ml-2 text-on-surface/60 font-label tracking-widest">
                (124 RESEÑAS)
              </span>
            </div>

            <h1 className="font-headline text-4xl lg:text-5xl font-bold text-primary leading-tight uppercase tracking-tighter">
              {product.name} (500ML)
            </h1>

            {product.description && (
              <p className="text-lg text-on-surface/80 leading-relaxed max-w-md">
                {product.description}
              </p>
            )}
          </div>

          {/* Interactive: purchase options + add to cart */}
          <ProductInteractive
            productId={product.id}
            productName={product.name}
            productImageUrl={product.image_url}
            price={product.price}
            stock={product.stock}
          />

          {/* Accordions */}
          <div className="divide-y divide-outline-variant/20 border-t border-outline-variant/20">
            {ACCORDIONS.map(({ key, label, defaultOpen, content }) => (
              <details key={key} className="group py-4" open={defaultOpen}>
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-headline font-bold tracking-widest text-sm text-primary uppercase">
                    {label}
                  </span>
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                {content}
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cross-sell: Completa tu rutina ── */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <h2 className="font-headline text-3xl font-bold text-primary mb-12 tracking-tighter uppercase">
            COMPLETA TU RUTINA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                className="group relative bg-surface-container-low rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
              >
                <div className="w-40 h-40 rounded-xl overflow-hidden shadow-lg bg-surface-container flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  {rp.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={rp.name}
                      src={rp.image_url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary opacity-30 text-4xl">
                        spa
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-headline text-xl font-bold text-primary tracking-tight uppercase">
                    {rp.name.toUpperCase()}
                  </h3>
                  {rp.description && (
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {rp.description.substring(0, 100)}…
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-bold text-secondary">
                      ${rp.price.toLocaleString("es-CO")}
                    </span>
                    <Link
                      href={`/producto/${rp.id}`}
                      className="bg-primary text-on-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                      VER
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
