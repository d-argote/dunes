"use client";

import { useState } from "react";

const keywords = [
  { kw: "serum facial colombia", pos: 3, vol: "12.4K", trend: "+2" },
  { kw: "cosmetica botanica natural", pos: 7, vol: "8.2K", trend: "+5" },
  { kw: "extracto cacao piel", pos: 12, vol: "5.6K", trend: "-1" },
  { kw: "ritual nocturno botanico", pos: 18, vol: "3.1K", trend: "+8" },
];

const seoActions = [
  { priority: "Urgente", label: "Actualizar meta description de PDP principal", done: false },
  { priority: "Urgente", label: "Optimizar imagenes — alt text faltante (12 img)", done: false },
  { priority: "Media", label: "Crear landing page: 'cosmetica natural colombia'", done: false },
  { priority: "Media", label: "Implementar schema markup Product + Review", done: true },
  { priority: "Baja", label: "Ampliar blog con keywords long-tail", done: false },
];

const hashtags = ["#cosmeticanatural", "#botanicalbeauty", "#colombianaturaleza", "#skincarerutin", "#dunesbotanical", "#amazonicskin"];

export default function SocialPage() {
  const [checks, setChecks] = useState<boolean[]>(seoActions.map((a) => a.done));

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-16 min-h-screen pb-32">

      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">SOCIAL MEDIA + SEO</p>
        <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">INTELLIGENCE</h2>
      </div>

      {/* Social cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Instagram */}
        <div className="bg-surface-container-low p-8 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-1">Instagram</p>
              <p className="font-body text-base font-semibold text-on-surface">@dunesbotanical</p>
            </div>
            <span className="material-symbols-outlined text-3xl text-primary">photo_camera</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: "Seguidores", value: "42.8K" }, { label: "Engagement", value: "4.2%" }, { label: "Sentimiento", value: "88% +" }].map((m) => (
              <div key={m.label} className="bg-surface p-4 text-center">
                <p className="font-headline text-2xl font-bold text-primary tracking-[-0.02em]">{m.value}</p>
                <p className="font-body text-xs text-on-surface-variant font-semibold mt-1 uppercase">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[45, 62, 38, 71].map((h, i) => (
              <div key={i} className="relative h-24 bg-surface-container-highest overflow-hidden flex items-end">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="w-full bg-primary" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <p className="font-body text-xs font-semibold text-on-surface-variant text-center uppercase tracking-wider">Rendimiento ultimas 4 semanas</p>
        </div>

        {/* TikTok */}
        <div className="bg-surface-container-low p-8 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-1">TikTok</p>
              <p className="font-body text-base font-semibold text-on-surface">@dunes_architect</p>
            </div>
            <span className="material-symbols-outlined text-3xl text-on-surface">play_circle</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: "Seguidores", value: "112K" }, { label: "Engagement", value: "8.9%" }, { label: "Alcance", value: "2.4M" }].map((m) => (
              <div key={m.label} className="bg-surface p-4 text-center">
                <p className="font-headline text-2xl font-bold text-on-surface tracking-[-0.02em]">{m.value}</p>
                <p className="font-body text-xs text-on-surface-variant font-semibold mt-1 uppercase">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-surface p-6 border-l-4 border-primary">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">Video mas visto</p>
            <p className="font-body text-base text-on-surface">"El ritual de 3 pasos que cambio mi piel — ingredientes amazonicos"</p>
            <p className="font-body text-xs font-semibold text-primary mt-2">2.4M vistas • 18.2% engagement</p>
          </div>
        </div>
      </section>

      {/* AI Semantic Comment Analysis */}
      <section className="bg-surface-container-low p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ANALISIS SEMANTICO DE COMENTARIOS — IA</h3>
          <span className="flex items-center gap-2 font-brand text-xs font-semibold uppercase tracking-widest text-primary bg-primary-container/20 px-3 py-2">
            <span className="material-symbols-outlined text-sm animate-pulse">sensors</span> AI ACTIVE
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/50">
                {["TOPICO","MENCIONES","SENTIMIENTO","INSIGHT"].map((h) => (
                  <th key={h} className="py-4 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant pr-8">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { topic: "Sostenibilidad empaque", mentions: "1,240", sentiment: "92% +", sentiment_c: "text-primary", insight: "Packaging refill program demand high" },
                { topic: "Textura serum", mentions: "864", sentiment: "78% +", sentiment_c: "text-primary", insight: "Lightweight formula praised" },
                { topic: "Ingredientes amazonicos", mentions: "620", sentiment: "96% +", sentiment_c: "text-primary", insight: "Origin story resonates strongly" },
                { topic: "Precio punto", mentions: "380", sentiment: "44% -", sentiment_c: "text-error", insight: "Starter kit bundle recommended" },
              ].map((row) => (
                <tr key={row.topic} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                  <td className="py-4 font-body text-base text-on-surface font-semibold pr-8">{row.topic}</td>
                  <td className="py-4 font-body text-base text-on-surface pr-8">{row.mentions}</td>
                  <td className={`py-4 font-body text-base font-bold pr-8 ${row.sentiment_c}`}>{row.sentiment}</td>
                  <td className="py-4 font-body text-sm text-on-surface-variant italic">{row.insight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-3">
          {hashtags.map((tag) => (
            <span key={tag} className="bg-surface border border-outline-variant font-body text-sm font-semibold text-on-surface px-4 py-2 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">{tag}</span>
          ))}
        </div>
      </section>

      {/* Content Opportunities */}
      <section className="flex flex-col gap-6">
        <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">CONTENT OPPORTUNITIES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-8 border-l-4 border-primary flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-on-primary font-body text-xs font-bold px-3 py-1 uppercase">Alta Probabilidad</span>
              <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
            </div>
            <p className="font-headline text-xl font-bold text-on-surface tracking-[-0.02em]">Video: Proceso de extraccion del cacao colombiano</p>
            <p className="font-body text-base text-on-surface-variant">Estimated reach: 420K — 580K. Peak window: Lunes 7am / Viernes 6pm.</p>
            <button className="bg-primary text-on-primary font-brand text-sm font-semibold uppercase tracking-widest px-6 py-3 hover:bg-primary-container transition-colors self-start">
              PLANIFICAR CONTENIDO
            </button>
          </div>
          <div className="bg-surface-container-low p-8 border-l-4 border-error flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-error-container text-on-error-container font-body text-xs font-bold px-3 py-1 uppercase border border-error">Atencion Requerida</span>
              <span className="material-symbols-outlined text-error text-xl">warning</span>
            </div>
            <p className="font-headline text-xl font-bold text-on-surface tracking-[-0.02em]">Responder comentarios negativos precio — 48h window</p>
            <p className="font-body text-base text-on-surface-variant">38 comentarios sin respuesta. Impacto potencial en sentiment score.</p>
            <button className="bg-error text-on-error font-brand text-sm font-semibold uppercase tracking-widest px-6 py-3 hover:bg-error-container transition-colors self-start">
              VER COMENTARIOS
            </button>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 flex flex-col gap-6">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">SEO — KEYWORD POSITIONS</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/50">
                  {["KEYWORD","POS","VOL","TREND"].map((h) => (
                    <th key={h} className="py-3 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw) => (
                  <tr key={kw.kw} className="border-b border-outline-variant/20">
                    <td className="py-3 font-body text-sm text-on-surface pr-6">{kw.kw}</td>
                    <td className="py-3 font-headline text-xl font-bold text-primary pr-6">#{kw.pos}</td>
                    <td className="py-3 font-body text-sm text-on-surface-variant pr-6">{kw.vol}</td>
                    <td className={`py-3 font-body text-sm font-bold ${kw.trend.startsWith("+") ? "text-primary" : "text-error"}`}>{kw.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 flex flex-col gap-6">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">SEO ACTIONS</h3>
          <div className="flex flex-col gap-3">
            {seoActions.map((action, i) => (
              <label key={i} className="flex items-center gap-4 cursor-pointer group">
                <div
                  className={`w-6 h-6 border-2 shrink-0 flex items-center justify-center transition-colors ${checks[i] ? "bg-primary border-primary" : "border-outline-variant group-hover:border-primary"}`}
                  onClick={() => setChecks((prev) => prev.map((c, j) => (j === i ? !c : c)))}
                >
                  {checks[i] && <span className="material-symbols-outlined text-on-primary text-base">check</span>}
                </div>
                <div className="flex-1">
                  <span className={`font-body text-xs font-bold uppercase mr-2 ${action.priority === "Urgente" ? "text-error" : action.priority === "Media" ? "text-secondary" : "text-on-surface-variant"}`}>{action.priority}</span>
                  <span className={`font-body text-base ${checks[i] ? "line-through text-on-surface-variant" : "text-on-surface"}`}>{action.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">2026 DUNES BOTANICAL ARCHITECT</span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary">AUTO-SAVE: ACTIVE</span>
          <span className="text-primary underline">INTELLIGENCE MODE</span>
        </div>
      </footer>
    </div>
  );
}