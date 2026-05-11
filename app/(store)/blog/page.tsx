import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./_components/NewsletterForm";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { BlogArticle } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Ciencia Capilar y Rutinas para Hombres",
  description:
    "Guias y articulos sobre la caida del cabello en hombres, ingredientes botanicos naturales y rutinas de cuidado capilar sin quimicos. Basado en tricologia moderna.",
  alternates: { canonical: "https://ditechdev.com/blog" },
  openGraph: {
    title: "Blog DUNES | Shampoo Natural, Caida del Cabello y Cuidado Masculino",
    description:
      "Aprende sobre shampoo natural sin quimicos, romero para el crecimiento del cabello y rutinas capilares para hombres.",
    url: "https://ditechdev.com/blog",
    type: "website",
  },
};

type PublicArticle = Pick<BlogArticle, "id" | "title" | "slug" | "excerpt" | "category" | "status" | "created_at">;

export default async function BlogPage() {
  const { data } = await supabaseAdmin
    .from("blog_articles")
    .select("id, title, slug, excerpt, category, status, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const articles: PublicArticle[] = data ?? [];
  const featured = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <main className="pt-24 pb-32">
      {/* Header */}
      <section className="px-6 mb-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/20 pb-8">
          <div className="max-w-2xl">
            <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter text-primary leading-[0.9]">
              CENTRO DE<br />DISCIPLINA CAPILAR
            </h1>
            <p className="mt-6 text-on-surface-variant max-w-lg leading-relaxed">
              Explora la interseccion entre la botanica ancestral y la tricologia
              moderna. Guias disenadas para hombres que entienden que el cuidado
              personal es una arquitectura constante.
            </p>
          </div>
          {articles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(articles.map((a) => a.category).filter(Boolean))).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-medium uppercase tracking-widest text-primary cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main article grid */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        {featured.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'wght' 100" }}>article</span>
            <p className="font-headline text-xl font-bold uppercase">Pronto, nuevos articulos</p>
            <p className="font-body text-sm text-center max-w-sm">Estamos preparando contenido sobre ciencia capilar y botanica aplicada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((article, i) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className={`flex flex-col group cursor-pointer ${i === 1 ? "md:mt-12" : ""}`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6 relative">
                  <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline" style={{ fontVariationSettings: "'wght' 100" }}>article</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {article.category ?? "Articulo"}
                  </div>
                </div>
                <h3 className="font-brand text-2xl uppercase leading-tight mb-3 text-primary group-hover:text-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {article.excerpt ?? ""}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary gap-2">
                  <span>Leer mas</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary-container py-20 px-6 relative overflow-hidden mb-24">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-primary-container uppercase tracking-tighter mb-6">
            RECIBE CONSEJOS CIENTIFICOS
          </h2>
          <p className="text-surface-container-low mb-10 max-w-xl mx-auto">
            Unete a nuestra lista de correo para recibir hallazgos exclusivos sobre
            tricologia y botanica aplicada. Sin ruido, solo disciplina.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Secondary articles / static research section */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">
              Investigacion
            </h4>
            <h2 className="font-brand text-4xl uppercase text-primary leading-none mb-6">
              El rigor de lo natural.
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Nuestros articulos son redactados bajo la supervision de expertos en
              salud capilar, asegurando que cada ingrediente mencionado tenga un
              respaldo empirico.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-2"
            >
              Ver todas las guias
              <span className="material-symbols-outlined text-sm">north_east</span>
            </a>
          </div>
          {rest.length > 0 ? (
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {rest.slice(0, 4).map((a) => (
                <Link key={a.id} href={`/blog/${a.slug}`} className="bg-surface-container-low p-8 border-l-4 border-primary hover:border-secondary transition-colors">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 block">
                    {a.category ?? "Articulo"}
                  </span>
                  <h5 className="font-brand text-xl uppercase mb-3">{a.title}</h5>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{a.excerpt ?? ""}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { tag: "SEO & Ciencia", title: "Impacto del Zinc en el cuero cabelludo graso", excerpt: "Analisis sobre la regulacion sebacea y como la suplementacion topica previene la obstruccion folicular." },
                { tag: "Ritual Diario", title: "La temperatura del agua: Mito o realidad?", excerpt: "Por que el choque termico es vital para cerrar la cuticula y mantener la hidratacion natural." },
              ].map((a, i) => (
                <div key={i} className="bg-surface-container-low p-8 border-l-4 border-primary">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 block">{a.tag}</span>
                  <h5 className="font-brand text-xl uppercase mb-3">{a.title}</h5>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{a.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
