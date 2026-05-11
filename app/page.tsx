import type { Metadata } from "next";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/app/_components/ProductImage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shampoo Natural para Hombres | Detiene la Caída y Activa el Crecimiento",
  description:
    "DUNES: shampoo 100% natural con romero, jengibre y extractos botánicos colombianos. Ideal para hombres que buscan detener la caída del cabello y estimular el crecimiento sin químicos.",
  alternates: { canonical: "https://ditechdev.com" },
  openGraph: {
    title: "Shampoo Natural para Hombres | DUNES — Hecho en Colombia",
    description:
      "Shampoo orgánico y tónico capilar con ingredientes botánicos 100% naturales. Sin sulfatos agresivos. Hecho en Colombia para hombres de disciplina.",
    url: "https://ditechdev.com",
    type: "website",
  },
};

/* ── Static data ── */
const SHAMPOO_INGREDIENTS = [
  {
    img: "/ingredientes/romero1.jpg",
    name: "ROMERO",
    desc: "Estimulante de microcirculación capilar certificado por estudios de tricología.",
  },
  {
    img: "/ingredientes/jengibre1.jpg",
    name: "JENGIBRE",
    desc: "Potente antiinflamatorio que purifica el folículo de impurezas ambientales.",
  },
  {
    img: "/ingredientes/canela1.jpg",
    name: "CANELA",
    desc: "Antioxidante natural que previene la oxidación prematura del color.",
  },
  {
    img: "/ingredientes/cebolla1.jpg",
    name: "CEBOLLA",
    desc: "Fuente pura de azufre para la producción endógena de queratina.",
  },
  {
    img: "/ingredientes/pantenol1.png",
    name: "PANTENOL",
    desc: "Pro-vitamina B5 para retención de humedad y elasticidad estructural.",
  },
];

const TONIC_INGREDIENTS = [
  {
    img: "/ingredientes/cebrena1.png",
    name: "CEBREÑA",
    desc: "Extracto botánico que refuerza el ciclo vital del folículo capilar.",
  },
  {
    img: "/ingredientes/ortiga1.jpg",
    name: "ORTIGA",
    desc: "Rica en silicio y hierro, nutre la raíz y estimula el crecimiento activo.",
  },
  {
    img: "/ingredientes/quina1.png",
    name: "QUINA",
    desc: "Corteza ancestral con propiedades tónicas que fortalecen el cuero cabelludo.",
  },
  {
    img: "/ingredientes/clavos1.jpg",
    name: "CLAVOS DE OLOR",
    desc: "Propiedades antifúngicas y antisépticas que mantienen el cuero cabelludo saludable.",
  },
  {
    img: "/ingredientes/hojaguaya1.jpg",
    name: "HOJA DE GUAYABA",
    desc: "Polifenoles naturales que combaten la oxidación y sellan la cutícula.",
  },
];

const TESTIMONIALS = [
  {
    text: '"Llevaba años probando productos de farmacia. DUNES fue el primero que realmente detuvo la caída después del primer mes de disciplina diaria."',
    author: "Carlos M.",
    since: "Miembro desde 2026",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvocbTcx-M8ecO4wI-wVXCB4l75jt1ahNBbvDFVJjWRcart0ZtAp_k4oM5ZmQLsCNQ2v20aVw5WvTF48tFhYAj8IBWHIKJ6uOHcE9OIi44_kqkgmGOnPJEuSOmfvn2II6iM-wut6rFKyCp6YVdNRdVhMTHjekXfZRW8suqqPQ-NymlYrCxFUmB-QCLA0CIWyy44obOBtQ6PKH2EnQ_wwK1kqB-n2ThW4OUC419Ja3tSb_vpK6jdPPiSEtk-T8eVrgebIGyFV4vQCw",
    highlighted: false,
  },
  {
    text: '"El olor es increíblemente natural, nada de químicos. Mi cabello se siente mucho más denso y manejable. Vale cada centavo."',
    author: "Julián R.",
    since: "Miembro desde 2026",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTIs0t-1Uf6qkW6JnUJ-z8G-n0N0CwExmBZggc601sJddLzYHLxQvT1hGPHlKuIOdLOghv5U6tDs37nr6EuvTKy4PL_cnAMr9Skis9-xk9yF-_FwO4c8G6iab6JA3J_uBrZgqq8Zs_t5QFpwhsDp2-w7n7uegdvjtiCfO9eoPXPR72x3qwTAvoTGQ5CdYIOnwWESRJ5A9EeRw7mSz-sEjBwg7xkLrgC76ppEl6F7UZn7D4UdVOQDStXf2A2iXchl19gERsfX3nj3g",
    highlighted: false,
  },
  {
    text: '"Los resultados se empiezan a notar desde el primer mes. La calidad de los ingredientes se siente diferente a cualquier otro producto."',
    author: "Andrés S.",
    since: "Miembro desde 2026",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClzxbWEaxD7hwRs_et_2-HH8OSOZxvOoMImmMXrYAbzRgYpZQbHJMyGbipaFrnBlDEmjffF3qrdkiSuuf6KuS7YVxd9EqhTmA4fi6PbtxdRRd6JMC2mWcBNizVDo8aevuLsUZi_yIlX8MG0smACzvmoHBToAw3sQpLAIUyNv-5yvX4J_MKJ2Ck7UFgHW3jai6_QxOIvfNRTj8qB9kgH36z9_EOU2HmVaN0nwK9yB6lt21y2K7nx28cMKs89DOrrzsFo5hixy-GqUw",
    highlighted: true,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ditechdev.com/#organization",
      name: "DUNES Botanical Lab",
      url: "https://ditechdev.com",
      logo: "https://ditechdev.com/DunesOK.png",
      sameAs: ["https://instagram.com/dunesbotanical", "https://tiktok.com/@dunesbotanical"],
      address: { "@type": "PostalAddress", addressCountry: "CO" },
    },
    {
      "@type": "Product",
      name: "Shampoo de Crecimiento Natural DUNES",
      description:
        "Shampoo 100% natural con romero, jengibre, canela y cebolla. Detiene la caída del cabello y estimula el crecimiento en hombres. Sin sulfatos agresivos ni parabenos.",
      brand: { "@type": "Brand", name: "DUNES" },
      category: "Shampoo natural para hombres",
      url: "https://ditechdev.com/tienda",
      image: "https://ditechdev.com/og-image.jpg",
      offers: {
        "@type": "Offer",
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "DUNES Botanical Lab" },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "3",
        bestRating: "5",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ditechdev.com/#website",
      url: "https://ditechdev.com",
      name: "DUNES",
      publisher: { "@id": "https://ditechdev.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://ditechdev.com/tienda?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function HomePage() {
  const { data } = await supabaseAdmin
    .from("products")
    .select("id, name, slug, description, price, stock, image_url, images, video_url")
    .order("name");

  const products: Product[] = data ?? [];
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fcf9f2]">
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center max-w-5xl py-20 md:py-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="DUNES Logo"
            className="w-64 md:w-80 lg:w-96 mb-10 md:mb-14 object-contain"
            src="/DunesOK.png"
            fetchPriority="high"
            decoding="async"
          />
          <h1 className="font-brand font-bold tracking-tighter mb-6 md:mb-8">
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[88px] text-primary leading-[1.05] mb-1 md:mb-2">
              FORTALECE TU CABELLO.
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[88px] text-secondary leading-[1.05]">
              MANTÉN LA DISCIPLINA.
            </span>
          </h1>
          <p className="font-body text-sm md:text-base lg:text-lg text-on-surface-variant mb-10 md:mb-12 max-w-sm md:max-w-md leading-relaxed">
            Tratamiento capilar masculino con extractos botánicos colombianos.
            Sin químicos agresivos. Sin milagros.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full sm:w-auto">
            <Link
              href="/tienda"
              className="w-full sm:w-auto bg-primary text-on-primary font-brand text-sm md:text-base px-8 md:px-10 py-3.5 md:py-4 tracking-[0.2em] hover:bg-primary-container hover:text-primary transition-colors duration-200 uppercase text-center"
            >
              INICIA TU TRATAMIENTO
            </Link>
            <Link
              href="/comunidad"
              className="w-full sm:w-auto font-brand text-sm md:text-base px-8 md:px-10 py-3.5 md:py-4 tracking-[0.2em] text-primary border border-primary/30 hover:border-primary transition-colors duration-200 uppercase text-center"
            >
              NUESTRA HISTORIA
            </Link>
          </div>
        </div>
        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-brand tracking-[0.3em] uppercase text-primary">Scroll</span>
          <span className="material-symbols-outlined text-primary text-base">arrow_downward</span>
        </div>
      </section>

      {/* ── Nuestros Productos ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-surface-container">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-secondary font-brand tracking-[0.3em] uppercase text-xs font-bold block mb-3">
              Ciencia Botánica
            </span>
            <h2 className="font-brand text-3xl md:text-5xl text-on-surface leading-[1.1]">
              EL ARSENAL COMPLETO
            </h2>
            <p className="font-body text-sm text-on-surface-variant mt-3 max-w-xs mx-auto">
              Dos fórmulas. Un solo objetivo: recuperar tu cabello.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/producto/${p.id}`}
                className="group bg-surface overflow-hidden block flex flex-col"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <ProductImage
                    src={p.image_url || `/${p.slug}.jpg`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="font-brand text-2xl md:text-3xl text-primary leading-[1.1] uppercase mb-3">{p.name}</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-1 mb-4 min-h-[2.5rem]">
                    {p.description ?? ""}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                    <span className="font-headline font-bold text-lg text-tertiary">
                      ${p.price.toLocaleString("es-CO")}
                    </span>
                    <span className="inline-flex items-center gap-1 font-brand text-xs tracking-[0.2em] uppercase text-primary group-hover:text-secondary transition-colors">
                      Ver producto
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problema vs Solución ─────────────────────────────── */}
      <section className="py-16 md:py-28 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-5 md:space-y-6">
              <span className="text-secondary font-brand tracking-[0.3em] uppercase text-xs font-bold block">
                El Manifiesto
              </span>
              <h2 className="font-brand text-3xl md:text-5xl lg:text-6xl text-primary leading-[1.1]">
                A LOS 20S, NO ESPERES A ESTAR MÁS CALVO PARA REACCIONAR.
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg">
                La prevención es la única cura real. No vendemos promesas vacías;
                entregamos una herramienta de grado arquitectónico para reconstruir
                tu confianza desde el folículo.
              </p>
            </div>
            <div className="relative flex flex-col md:flex-row gap-8">
              {/* Before */}
              <div className="flex-1 bg-surface-container-low p-5 md:p-8 shadow-sm">
                <div className="aspect-[4/5] bg-stone-200 mb-4 md:mb-6 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Cabello antes de DUNES"
                    className="w-full h-full object-cover"
                    src="/cabello/before.png"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="font-brand text-xl text-primary uppercase mb-2">
                  El Problema Real
                </h3>
                <p className="text-sm text-on-surface-variant italic">
                  Caída progresiva, folículos debilitados y pérdida de densidad por estrés oxidativo y desnutrición capilar.
                </p>
              </div>
              {/* After */}
              <div className="flex-1 bg-primary text-on-primary p-5 md:p-8 shadow-2xl md:-translate-y-8">
                <div className="aspect-[4/5] bg-primary-container mb-4 md:mb-6 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Cabello después de DUNES"
                    className="w-full h-full object-cover"
                    src="/cabello/after.png"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="font-brand text-xl uppercase mb-2">
                  El Resultado DUNES
                </h3>
                <p className="text-sm text-on-primary-container italic">
                  Mayor densidad visible, raíz fortalecida y crecimiento activo desde el primer mes de tratamiento constante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredientes activos ─────────────────────────────── */}
      <section className="py-16 md:py-28 bg-surface-container-highest">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-secondary font-brand tracking-[0.3em] uppercase text-xs font-bold block mb-3 md:mb-4">
              Fórmula Botánica
            </span>
            <h2 className="font-brand text-2xl md:text-3xl lg:text-5xl text-primary">
              INGREDIENTES ACTIVOS
            </h2>
          </div>

          {/* Shampoo */}
          <div className="mb-10 md:mb-14">
            <p className="font-headline text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-6 md:mb-8 text-center">
              Shampoo de Crecimiento Natural
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
              {SHAMPOO_INGREDIENTS.map((ing) => (
                <div key={ing.name} className="text-center space-y-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={ing.name}
                      className="w-full h-full object-cover"
                      src={ing.img}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="font-brand text-xs md:text-sm text-primary tracking-widest">{ing.name}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tónico */}
          <div className="border-t border-primary/10 pt-10 md:pt-14">
            <p className="font-headline text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-6 md:mb-8 text-center">
              Tónico Capilar
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
              {TONIC_INGREDIENTS.map((ing) => (
                <div key={ing.name} className="text-center space-y-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={ing.name}
                      className="w-full h-full object-cover"
                      src={ing.img}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="font-brand text-xs md:text-sm text-primary tracking-widest">{ing.name}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonios ──────────────────────────────────────── */}
      <section className="py-16 md:py-28 bg-surface overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="max-w-xl">
              <span className="text-secondary font-brand tracking-[0.3em] uppercase text-xs font-bold block mb-3 md:mb-4">
                Comunidad DUNES
              </span>
              <h2 className="font-brand text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.1]">
                RESEÑAS QUE RESPALDAN NUESTRO MÉTODO
              </h2>
            </div>
            <Link href="/tienda" className="font-brand text-sm tracking-[0.2em] uppercase text-secondary hover:text-primary transition-colors shrink-0">
              Ver productos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`bg-surface-container-low p-8 flex flex-col justify-between gap-8 ${
                  t.highlighted ? "ring-1 ring-secondary/40" : ""
                }`}
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-[#C3A354] text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed italic">{t.text}</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/20">
                  <div className="w-11 h-11 bg-stone-300 rounded-full overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={t.author}
                      className="w-full h-full object-cover"
                      src={t.img}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <p className="font-brand text-xs tracking-widest text-primary uppercase">
                      {t.author}
                    </p>
                    <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest mt-0.5">{t.since}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}
