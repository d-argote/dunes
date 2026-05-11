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
  { priority: "Urgente", label: "Optimizar imagenes - alt text faltante (12 img)", done: false },
  { priority: "Media", label: "Crear landing page: 'cosmetica natural colombia'", done: false },
  { priority: "Media", label: "Implementar schema markup Product + Review", done: true },
  { priority: "Baja", label: "Ampliar blog con keywords long-tail", done: false },
];

export default function SocialPage() {
  const [checks, setChecks] = useState<boolean[]>(seoActions.map((a) => a.done));

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-16 min-h-screen pb-32">

      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">SOCIAL MEDIA + SEO</p>
        <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">INTELLIGENCE</h2>
      </div>

      {/* Social integration placeholders */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { platform: "Instagram", handle: "@dunesbotanical", icon: "photo_camera" },
          { platform: "TikTok", handle: "@dunes_architect", icon: "play_circle" },
        ].map(({ platform, handle, icon }) => (
          <div key={platform} className="bg-surface-container-low p-8 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-1">{platform}</p>
                <p className="font-body text-base font-semibold text-on-surface">{handle}</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
            </div>
            <div className="flex items-center gap-4 py-6 border border-dashed border-outline-variant">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant ml-4">link_off</span>
              <div>
                <p className="font-body text-sm font-semibold text-on-surface">Integracion requerida</p>
                <p className="font-body text-xs text-on-surface-variant mt-1">
                  Conecta la API de {platform} para ver metricas reales en tiempo real.
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* AI Comment Analysis placeholder */}
      <section className="bg-surface-container-low p-8 flex flex-col gap-6">
        <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ANALISIS SEMANTICO DE COMENTARIOS - IA</h3>
        <div className="flex items-center gap-4 py-6 border border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant ml-4">psychology</span>
          <div>
            <p className="font-body text-sm font-semibold text-on-surface">Requiere integracion con APIs sociales</p>
            <p className="font-body text-xs text-on-surface-variant mt-1">
              Conecta las APIs de Instagram y TikTok para activar el analisis semantico de comentarios con IA.
            </p>
          </div>
        </div>
      </section>

      {/* Content Opportunities placeholder */}
      <section className="flex flex-col gap-6">
        <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">CONTENT OPPORTUNITIES</h3>
        <div className="flex items-center gap-4 py-8 border border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant ml-6">trending_up</span>
          <p className="font-body text-sm text-on-surface-variant">
            Las oportunidades de contenido se generan automaticamente cuando se conecten las APIs sociales.
          </p>
        </div>
      </section>

      {/* SEO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 flex flex-col gap-6">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">SEO - KEYWORD POSITIONS</h3>
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
          <p className="font-body text-xs text-on-surface-variant">Datos de ejemplo - conecta Google Search Console para datos reales.</p>
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
    </div>
  );
}
