"use client";

const boards = [
  {
    title: "Instagram",
    icon: "photo_camera",
    cadence: "4 reels / semana",
    metric: "ER 6.4%",
    bullets: ["UGC disciplinado", "Resultados mes 1", "Ingredientes hero"],
  },
  {
    title: "TikTok",
    icon: "smart_display",
    cadence: "2 hooks / día",
    metric: "Hook rate 38%",
    bullets: ["Before/after", "Rutina nocturna", "Objeciones en comentario"],
  },
  {
    title: "SEO",
    icon: "travel_explore",
    cadence: "3 piezas / sprint",
    metric: "CTR orgánico 5.9%",
    bullets: ["Clúster caída", "Rutina capilar", "Ingredientes botánicos"],
  },
];

export default function AdminSocialPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
        <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Growth content</p>
        <h1 className="mt-2 font-headline text-4xl font-semibold uppercase tracking-[-0.05em] text-primary">
          Social, short-form y SEO
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">
          Planeación editorial orientada a adquisición, autoridad de marca y captura de demanda existente.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {boards.map((board) => (
          <article
            key={board.title}
            className="rounded-[2rem] bg-surface px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-brand text-[11px] tracking-[0.28em] uppercase text-secondary">Canal</p>
                <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
                  {board.title}
                </h2>
              </div>
              <span className="material-symbols-outlined rounded-full bg-surface-container-low px-3 py-3 text-[24px] text-secondary">
                {board.icon}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 rounded-[1.75rem] bg-surface-container-low px-4 py-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Cadencia</p>
                <p className="mt-2 text-sm font-medium text-on-surface">{board.cadence}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Métrica clave</p>
                <p className="mt-2 text-sm font-medium text-on-surface">{board.metric}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {board.bullets.map((item) => (
                <div key={item} className="rounded-[1.4rem] bg-surface-container-highest px-4 py-3 text-sm text-on-surface">
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2.25rem] bg-surface-container-highest px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Pipeline creativo</p>
          <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-primary">
            Semana en curso
          </h2>
          <div className="mt-6 space-y-3">
            {[
              ["Lunes", "Reel de evidencia con romero", "Briefed"],
              ["Martes", "TikTok objeción: no milagros", "Grabando"],
              ["Miércoles", "SEO hub: shampoo natural hombres", "Research"],
              ["Jueves", "Reel before/after disciplina", "En edición"],
            ].map(([day, item, state]) => (
              <div key={day} className="grid gap-3 rounded-[1.6rem] bg-surface px-4 py-4 md:grid-cols-[0.25fr_1fr_0.25fr] md:items-center">
                <p className="font-brand text-[11px] tracking-[0.22em] uppercase text-secondary">{day}</p>
                <p className="text-sm text-on-surface">{item}</p>
                <p className="rounded-full bg-surface-container-highest px-3 py-1 text-[11px] font-brand tracking-[0.18em] uppercase text-secondary">
                  {state}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-primary px-5 py-5 text-white shadow-[0_24px_56px_rgba(35,75,29,0.18)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-white/70">SEO momentum</p>
          <h2 className="mt-2 font-headline text-3xl font-semibold uppercase tracking-[-0.04em] text-white">
            Oportunidades rápidas
          </h2>
          <div className="mt-6 space-y-4">
            {[
              "Expandir FAQ de caída del cabello con schema.",
              "Crear comparativa entre shampoo natural y farmacia.",
              "Conectar blog público con bundles mediante CTA contextual.",
            ].map((item) => (
              <div key={item} className="rounded-[1.6rem] bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-sm leading-6 text-white/90">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}