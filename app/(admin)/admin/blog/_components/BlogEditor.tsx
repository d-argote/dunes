"use client";

import { useState } from "react";
import type { BlogArticle } from "@/lib/types";

const statusConfig: Record<
  BlogArticle["status"],
  { label: string; class: string }
> = {
  published: { label: "Publicado", class: "bg-primary text-on-primary" },
  draft: {
    label: "Borrador",
    class:
      "bg-surface-variant text-on-surface-variant border border-outline-variant",
  },
  design: {
    label: "Diseño",
    class: "bg-secondary-container text-on-surface",
  },
  research: {
    label: "Investigación",
    class:
      "bg-surface-container-highest text-on-surface-variant border border-outline",
  },
};

const seoScore = 82;

interface Props {
  articles: BlogArticle[];
}

export default function BlogEditor({ articles }: Props) {
  const [activeId, setActiveId] = useState(articles[0]?.id ?? "");
  const [titleValue, setTitleValue] = useState(articles[0]?.title ?? "");
  const [contentValue, setContentValue] = useState(
    articles[0]?.content ?? ""
  );
  const [metaTitle, setMetaTitle] = useState(
    articles[0]?.meta_title ?? `${articles[0]?.title ?? ""} | DUNES`
  );
  const [metaDesc, setMetaDesc] = useState(
    articles[0]?.meta_description ?? ""
  );

  const active = articles.find((a) => a.id === activeId) ?? articles[0];

  function loadArticle(article: BlogArticle) {
    setActiveId(article.id);
    setTitleValue(article.title);
    setContentValue(article.content);
    setMetaTitle(article.meta_title ?? `${article.title} | DUNES`);
    setMetaDesc(article.meta_description ?? "");
  }

  async function handleSaveDraft() {
    if (!active) return;
    await fetch(`/api/admin/blog/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleValue,
        content: contentValue,
        meta_title: metaTitle,
        meta_description: metaDesc,
        status: "draft",
      }),
    });
  }

  async function handlePublish() {
    if (!active) return;
    await fetch(`/api/admin/blog/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleValue,
        content: contentValue,
        meta_title: metaTitle,
        meta_description: metaDesc,
        status: "published",
      }),
    });
  }

  const circumference = 2 * Math.PI * 40;
  const strokeDash = (seoScore / 100) * circumference;

  if (articles.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant">
            article
          </span>
          <p className="font-headline text-xl font-bold text-on-surface uppercase">
            Sin artículos todavía
          </p>
          <p className="font-body text-sm text-on-surface-variant">
            Crea una tabla{" "}
            <code className="font-mono">blog_articles</code> en Supabase y
            publica tu primer artículo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* LEFT: Article list */}
      <aside className="w-72 shrink-0 bg-surface-container-low border-r border-outline-variant flex flex-col overflow-hidden">
        <div className="p-6 border-b border-outline-variant">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">
            ARTICULOS
          </p>
          <button className="w-full bg-primary text-on-primary font-brand text-sm font-semibold uppercase tracking-widest px-4 py-3 hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">add</span>
            NUEVO ARTICULO
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {articles.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => loadArticle(article)}
              className={`w-full text-left px-6 py-5 border-b border-outline-variant/30 hover:bg-surface transition-colors ${activeId === article.id ? "bg-surface border-l-4 border-l-primary" : "border-l-4 border-l-transparent"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`font-body text-xs font-bold px-2 py-0.5 uppercase ${statusConfig[article.status].class}`}
                >
                  {statusConfig[article.status].label}
                </span>
                <span className="font-body text-xs text-on-surface-variant">
                  {article.created_at
                    ? new Date(article.created_at).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
              <p
                className={`font-body text-sm font-semibold line-clamp-2 mt-2 ${activeId === article.id ? "text-on-surface" : "text-on-surface-variant"}`}
              >
                {article.title}
              </p>
              <p className="font-body text-xs text-on-surface-variant mt-1 line-clamp-1">
                {article.category}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* CENTER: Editor */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Cover image */}
        <div className="h-56 bg-surface-container-highest relative flex items-center justify-center cursor-pointer group shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-highest/80" />
          <div className="relative z-10 flex flex-col items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">
              add_photo_alternate
            </span>
            <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              Subir imagen de portada
            </p>
          </div>
        </div>

        {/* Editor content */}
        <div className="flex-1 px-8 md:px-16 py-8 flex flex-col gap-6 max-w-[860px] mx-auto w-full">
          <div>
            <span className="font-body text-xs font-bold uppercase border border-primary text-primary px-3 py-1 cursor-pointer hover:bg-primary hover:text-on-primary transition-colors">
              {active?.category ?? "Sin categoría"}
            </span>
          </div>
          <input
            className="w-full bg-transparent border-0 focus:ring-0 px-0 font-headline text-3xl md:text-4xl font-bold text-on-surface placeholder-on-surface-variant outline-none tracking-[-0.02em]"
            placeholder="Titulo del articulo..."
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <div className="flex items-center gap-1 py-2 border-y border-outline-variant/50 flex-wrap">
            {[
              { icon: "format_bold" },
              { icon: "format_italic" },
              { icon: "format_underlined" },
              { divider: true },
              { icon: "format_h1" },
              { icon: "format_h2" },
              { divider: true },
              { icon: "format_list_bulleted" },
              { icon: "format_list_numbered" },
              { icon: "format_quote" },
              { icon: "link" },
              { divider: true },
              { icon: "image" },
              { icon: "videocam" },
            ].map((item, i) =>
              "divider" in item ? (
                <div key={i} className="w-px h-6 bg-outline-variant mx-1" />
              ) : (
                <button
                  key={i}
                  type="button"
                  className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                </button>
              )
            )}
          </div>
          <textarea
            className="flex-1 min-h-[400px] w-full bg-transparent border-0 focus:ring-0 font-body text-base text-on-surface placeholder-on-surface-variant outline-none resize-none leading-relaxed"
            placeholder="Comienza a escribir tu articulo..."
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          />
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-8 py-4 z-30">
          <div className="font-brand font-bold text-primary text-2xl">
            DUNES
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSaveDraft}
              className="bg-surface-container-highest text-on-surface border border-outline-variant font-brand text-sm font-semibold uppercase tracking-widest px-6 py-3 hover:bg-surface-container-high transition-colors"
            >
              GUARDAR BORRADOR
            </button>
            <button
              onClick={handlePublish}
              className="bg-primary text-on-primary font-brand text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-primary-container transition-colors"
            >
              PUBLICAR AHORA
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: SEO sidebar */}
      <aside className="w-80 shrink-0 bg-surface-container-low border-l border-outline-variant flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-outline-variant">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-1">
            SEO ANALYSIS
          </p>
          <p className="font-body text-xs text-on-surface-variant">
            Puntuación en tiempo real
          </p>
        </div>
        <div className="p-6 flex flex-col items-center gap-4 border-b border-outline-variant">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e3dc" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={
                  seoScore >= 80
                    ? "#0b3408"
                    : seoScore >= 50
                    ? "#904c2d"
                    : "#ba1a1a"
                }
                strokeWidth="8"
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-headline text-3xl font-bold text-on-surface">
                  {seoScore}
                </p>
                <p className="font-body text-xs text-on-surface-variant font-semibold">
                  /100
                </p>
              </div>
            </div>
          </div>
          <span
            className={`font-body text-xs font-bold uppercase px-3 py-1 ${seoScore >= 80 ? "bg-primary-container text-on-surface" : "bg-surface-container-highest text-on-surface-variant"}`}
          >
            {seoScore >= 80 ? "Bueno" : seoScore >= 50 ? "Mejorable" : "Bajo"}
          </span>
        </div>
        <div className="p-6 flex flex-col gap-4 border-b border-outline-variant">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            SERP PREVIEW
          </p>
          <div className="bg-surface p-4 border border-outline-variant/50 flex flex-col gap-1">
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="font-body text-sm text-[#1a0dab] w-full bg-transparent border-0 focus:ring-0 outline-none hover:underline cursor-text"
            />
            <p className="font-body text-xs text-[#006621]">
              dunesbotanical.co/blog/{active?.slug ?? ""}
            </p>
            <textarea
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="font-body text-xs text-[#545454] w-full bg-transparent border-0 focus:ring-0 outline-none resize-none h-12"
            />
          </div>
          <p className="font-body text-xs text-on-surface-variant">
            {metaTitle.length}/60 titulo · {metaDesc.length}/160 descripcion
          </p>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
            CHECKLIST SEO
          </p>
          {[
            { ok: titleValue.length > 0, label: "Titulo tiene contenido" },
            { ok: metaDesc.length >= 50, label: "Meta descripción completa" },
            { ok: false, label: "Alt text en todas las imágenes" },
            { ok: active?.slug?.length > 0, label: "URL amigable configurada" },
            { ok: false, label: "Internal linking (min 2 links)" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-xl ${item.ok ? "text-primary" : "text-error"}`}
              >
                {item.ok ? "check_circle" : "cancel"}
              </span>
              <span
                className={`font-body text-sm ${item.ok ? "text-on-surface" : "text-on-surface-variant"}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
