import type { Metadata } from "next";
import NewsletterForm from "./_components/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog — Ciencia Capilar y Rutinas para Hombres",
  description:
    "Guías y artículos sobre la caída del cabello en hombres, ingredientes botánicos naturales y rutinas de cuidado capilar sin químicos. Basado en tricología moderna.",
  alternates: { canonical: "https://www.dunesbotanical.com/blog" },
  openGraph: {
    title: "Blog DUNES | Shampoo Natural, Caída del Cabello y Cuidado Masculino",
    description:
      "Aprende sobre shampoo natural sin químicos, romero para el crecimiento del cabello y rutinas capilares para hombres.",
    url: "https://www.dunesbotanical.com/blog",
    type: "website",
  },
};

const ARTICLES = [
  {
    tag: "Mitos",
    tagColor: "bg-secondary",
    title: "Mitos de la caída del cabello a los 20s",
    excerpt:
      "Desmitificando los factores genéticos y ambientales que afectan la densidad capilar en la juventud temprana.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-LH24Fm2tH_NHo4NtjJMuecKO9wXZJroCIr0o1HbN_mtnT1c_hxAhp1H2k3cqoTyW4E66zwd-hTMZSvkUn6kV3rXlRw9NCEidux9IrdohpeXdRAvliqH9ZXncinftzCwTDoifwtfSyXIobFc-i9Y7p3ETxjr4o4oGwqq6lajmX36KRJnj6G1Vr3mBGz9ENZwOO9dl3HjHu9r7pYlX2cePpoHbZrXqZRAsMC9YfBdEejUK8TeT1G1C8Jw6PhlPOkHS-voIf-uo0A",
    stagger: false,
  },
  {
    tag: "Ciencia",
    tagColor: "bg-secondary",
    title: "Por qué el romero es ciencia y no solo tradición",
    excerpt:
      "Análisis clínico de los terpenos del romero y su capacidad para estimular la microcirculación del folículo piloso.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBlszsqgLYNEfTP_bXQixSeDCgPd3z0LAPiXdd6K_KDT_oUpwhjhKp5tTs3hdONv2Avc2rgZZLFeBSla6yPyCUT8Y-2ZPSUbQkEq_zmD6kie996ZPEphQayQRgN3z3RPkmhB30cih_hG-zYC9RuArPkYq0zSgrCovVtRIllr-1N-Ndn1Ihe15LqRnRBnS65jVKRRpQo80yFIll-hDMvip8tVmBKWSXGYTNksZO4C49yH7v97rdZ8rF5ICy1L9dWO5y7PILKlWU13s",
    stagger: true,
  },
  {
    tag: "Rutina",
    tagColor: "bg-secondary",
    title: "Disciplina: La base de tu nueva imagen",
    excerpt:
      "Cómo la consistencia en el ritual de cuidado capilar redefine la autopercepción y la presencia masculina.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgNzDXuAIe1idHm3pmjjEWxlh47i58C3CDWuuXPb-F_ovcjQGhGIMBQTacofk1NlIwqAQFdYRJ7t8-OCLnJV810ZXnLnzPPfWSuPhvFNVuVYgDzOYn9mfI0P0sKVIMNBKCvb9ZwGWdvaJwU3VFK-t_vdSSt1Kp0c_1QEqoU_LifrSa5XMeVCZ9BU07ibWTPsjpqJYRXUyBShOViQ-himgjyGdk0mLR05xoGFIzrKEzmY-zs2zG0PD401VEte-n_ywP5Gs5Crn4oJo",
    stagger: false,
  },
];

const SECONDARY_ARTICLES = [
  {
    tag: "SEO & Ciencia",
    title: "Impacto del Zinc en el cuero cabelludo graso",
    excerpt:
      "Análisis sobre la regulación sebácea y cómo la suplementación tópica previene la obstrucción folicular.",
  },
  {
    tag: "Ritual Diario",
    title: "La temperatura del agua: ¿Mito o realidad?",
    excerpt:
      "Por qué el choque térmico es vital para cerrar la cutícula y mantener la hidratación natural.",
  },
];

export default function BlogPage() {
  return (
    <main className="pt-24 pb-32">
      {/* ── Header ── */}
      <section className="px-6 mb-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/20 pb-8">
          <div className="max-w-2xl">
            <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter text-primary leading-[0.9]">
              CENTRO DE<br />DISCIPLINA CAPILAR
            </h1>
            <p className="mt-6 text-on-surface-variant max-w-lg leading-relaxed">
              Explora la intersección entre la botánica ancestral y la tricología
              moderna. Guías diseñadas para hombres que entienden que el cuidado
              personal es una arquitectura constante.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Mitos", "Ciencia", "Rutina"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-medium uppercase tracking-widest text-primary cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search ── */}
      <section className="px-6 mb-12 max-w-7xl mx-auto">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 pl-12 pr-4 font-headline tracking-wider uppercase text-sm rounded-none outline-none"
            placeholder="BUSCAR POR INGREDIENTE O PREOCUPACIÓN..."
            type="text"
          />
        </div>
      </section>

      {/* ── Main article grid ── */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <article
              key={i}
              className={`flex flex-col group cursor-pointer ${article.stagger ? "md:mt-12" : ""}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt={article.title}
                  src={article.img}
                />
                <div
                  className={`absolute top-4 left-4 ${article.tagColor} text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}
                >
                  {article.tag}
                </div>
              </div>
              <h3 className="font-brand text-2xl uppercase leading-tight mb-3 text-primary group-hover:text-secondary transition-colors">
                {article.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary gap-2">
                <span>Leer más</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="bg-primary-container py-20 px-6 relative overflow-hidden mb-24">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-primary-container uppercase tracking-tighter mb-6">
            RECIBE CONSEJOS CIENTÍFICOS
          </h2>
          <p className="text-surface-container-low mb-10 max-w-xl mx-auto">
            Únete a nuestra lista de correo para recibir hallazgos exclusivos sobre
            tricología y botánica aplicada. Sin ruido, solo disciplina.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* ── Secondary grid ── */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h4 className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">
              Investigación
            </h4>
            <h2 className="font-brand text-4xl uppercase text-primary leading-none mb-6">
              El rigor de lo natural.
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Nuestros artículos son redactados bajo la supervisión de expertos en
              salud capilar, asegurando que cada ingrediente mencionado tenga un
              respaldo empírico.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-2"
            >
              Ver todas las guías
              <span className="material-symbols-outlined text-sm">north_east</span>
            </a>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SECONDARY_ARTICLES.map((a, i) => (
              <div key={i} className="bg-surface-container-low p-8 border-l-4 border-primary">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 block">
                  {a.tag}
                </span>
                <h5 className="font-brand text-xl uppercase mb-3">{a.title}</h5>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  {a.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
