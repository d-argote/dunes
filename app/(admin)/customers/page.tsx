"use client";

import { useState } from "react";

type Tab = "buyers" | "non-buyers" | "subscribers";

const buyers = [
  { id: "#C-8829", name: "Mateo Restrepo", orders: 12, ltv: "$2,450", segment: "VIP", lastPurchase: "Hace 3 dias" },
  { id: "#C-8814", name: "Valentina Soto", orders: 8, ltv: "$1,890", segment: "VIP", lastPurchase: "Hace 1 semana" },
  { id: "#C-8790", name: "Andres Vargas", orders: 5, ltv: "$1,200", segment: "Regular", lastPurchase: "Hace 2 semanas" },
  { id: "#C-8765", name: "Lucia Medina", orders: 3, ltv: "$840", segment: "Regular", lastPurchase: "Hace 1 mes" },
];

const dropoffs = [
  { stage: "Vista pagina inicio", users: "8,420", pct: "100%", pctClass: "text-on-surface" },
  { stage: "Explorador catalogo", users: "4,210", pct: "50%", pctClass: "text-primary" },
  { stage: "Vista producto unico", users: "2,105", pct: "25%", pctClass: "text-primary" },
  { stage: "Agrego al carrito", users: "840", pct: "10%", pctClass: "text-secondary" },
  { stage: "Inicio checkout", users: "252", pct: "3%", pctClass: "text-error" },
];

const subscribers = [
  { email: "sofia.g@example.com", source: "Instagram Lead", joined: "Hace 2 dias", status: "Activo" },
  { email: "carlos.r@example.com", source: "Pop-up Event", joined: "Hace 4 dias", status: "Activo" },
  { email: "maria.l@example.com", source: "Blog Signup", joined: "Hace 1 semana", status: "Activo" },
  { email: "diego.p@example.com", source: "Referral", joined: "Hace 2 semanas", status: "No abierto" },
];

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("buyers");

  const tabs: { id: Tab; label: string; icon: string; count: string }[] = [
    { id: "buyers", label: "Compradores", icon: "shopping_bag", count: "2,840" },
    { id: "non-buyers", label: "No Compradores", icon: "person_search", count: "5,580" },
    { id: "subscribers", label: "Suscriptores", icon: "mark_email_unread", count: "12,400" },
  ];

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-16 min-h-screen pb-32">

      {/* Header */}
      <div className="border-b border-outline-variant pb-8 flex flex-col gap-4">
        <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">CUSTOMER ANALYTICS</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {[{ label: "LTV PROMEDIO", value: "$850", change: "+12% vs Q2", positive: true }, { label: "REPEAT RATE", value: "42%", change: "+4.2%", positive: true }, { label: "CHURN RATE", value: "2.4%", change: "-0.6%", positive: true }].map((kpi) => (
            <div key={kpi.label} className="bg-surface-container-low p-6 flex-1">
              <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">{kpi.label}</p>
              <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">{kpi.value}</p>
              <div className={`flex items-center gap-1 mt-2 ${kpi.positive ? "text-primary" : "text-error"}`}>
                <span className="material-symbols-outlined text-base">{kpi.positive ? "trending_up" : "trending_down"}</span>
                <span className="font-body text-xs font-semibold">{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-4 p-6 text-left transition-colors border-l-4 ${activeTab === tab.id ? "border-primary bg-surface-container-low" : "border-transparent bg-surface-container-low/50 hover:bg-surface-container-low"}`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeTab === tab.id ? "text-primary" : "text-on-surface-variant"}`} style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{tab.icon}</span>
            <div>
              <p className={`font-headline text-xl font-bold uppercase tracking-[-0.02em] ${activeTab === tab.id ? "text-on-surface" : "text-on-surface-variant"}`}>{tab.label}</p>
              <p className={`font-body text-xs font-semibold ${activeTab === tab.id ? "text-primary" : "text-on-surface-variant"}`}>{tab.count} registros</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content: Compradores */}
      {activeTab === "buyers" && (
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">COHORT � ALTO VALOR</h3>
            <button className="bg-surface-container-highest text-on-surface-variant px-6 py-3 font-brand text-xs font-semibold uppercase tracking-widest hover:bg-surface-container-high transition-colors border border-outline-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-base">file_download</span>
              EXPORTAR
            </button>
          </div>
          <div className="bg-surface-container-low overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/50">
                  {["ID","NOMBRE","PEDIDOS","LTV","SEGMENTO","ULTIMO PEDIDO","ACCIONES"].map((h) => (
                    <th key={h} className="py-4 px-6 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buyers.map((b) => (
                  <tr key={b.id} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                    <td className="py-4 px-6 font-body text-xs font-bold text-on-surface-variant">{b.id}</td>
                    <td className="py-4 px-6 font-body text-base text-on-surface font-semibold">{b.name}</td>
                    <td className="py-4 px-6 font-headline text-xl font-bold text-on-surface">{b.orders}</td>
                    <td className="py-4 px-6 font-headline text-xl font-bold text-primary">{b.ltv}</td>
                    <td className="py-4 px-6">
                      <span className={`font-body text-xs font-bold uppercase px-3 py-1 ${b.segment === "VIP" ? "bg-secondary-container text-on-surface" : "bg-surface-container-highest text-on-surface-variant"}`}>{b.segment}</span>
                    </td>
                    <td className="py-4 px-6 font-body text-sm text-on-surface-variant">{b.lastPurchase}</td>
                    <td className="py-4 px-6">
                      <button className="font-brand text-xs font-semibold uppercase tracking-widest text-primary hover:underline">VER PERFIL</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Segment donut placeholder */}
          <div className="bg-surface-container-low p-8">
            <h4 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-6">SEGMENTACION � TOP 20%</h4>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e3dc" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0b3408" strokeWidth="3" strokeDasharray="80 100" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#904c2d" strokeWidth="3" strokeDasharray="12 100" strokeDashoffset="-80" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#c2c9bc" strokeWidth="3" strokeDasharray="8 100" strokeDashoffset="-92" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-headline text-2xl font-bold text-on-surface">80%</p>
                    <p className="font-body text-xs text-on-surface-variant">Top 20</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[{ color: "bg-primary", label: "VIP (LTV > $1.5K)", pct: "80%" }, { color: "bg-secondary", label: "Regular ($500-$1.5K)", pct: "12%" }, { color: "bg-outline-variant", label: "New (< $500)", pct: "8%" }].map((seg) => (
                  <div key={seg.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${seg.color}`} />
                    <span className="font-body text-sm text-on-surface">{seg.label}</span>
                    <span className="font-body text-sm font-bold text-on-surface-variant ml-auto">{seg.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab Content: No Compradores */}
      {activeTab === "non-buyers" && (
        <section className="flex flex-col gap-8">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ANALISIS DE DROP-OFF</h3>
          <div className="bg-surface-container-low overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/50">
                  {["ETAPA","USUARIOS","% DEL TOTAL"].map((h) => (
                    <th key={h} className="py-4 px-6 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dropoffs.map((row) => (
                  <tr key={row.stage} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                    <td className="py-4 px-6 font-body text-base text-on-surface">{row.stage}</td>
                    <td className="py-4 px-6 font-headline text-xl font-bold text-on-surface">{row.users}</td>
                    <td className={`py-4 px-6 font-headline text-xl font-bold ${row.pctClass}`}>{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <h4 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ACCIONES DE REMARKETING</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "email", label: "Email Campaign", desc: "Secuencia de 3 correos con descuento progresivo", action: "CONFIGURAR" },
                { icon: "ads_click", label: "Meta Ads Sync", desc: "Sincronizar audiencia con Meta Business Manager", action: "SINCRONIZAR" },
                { icon: "chat", label: "WhatsApp Promo", desc: "Enviar promocion personalizada a 380 contactos", action: "LANZAR" },
              ].map((item) => (
                <div key={item.label} className="bg-surface-container-low p-6 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                  <div>
                    <p className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">{item.label}</p>
                    <p className="font-body text-sm text-on-surface-variant mt-1">{item.desc}</p>
                  </div>
                  <button className="font-brand text-xs font-semibold uppercase tracking-widest bg-primary text-on-primary px-4 py-3 hover:bg-primary-container transition-colors self-start">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab Content: Suscriptores */}
      {activeTab === "subscribers" && (
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">LISTA DE SUSCRIPTORES</h3>
            <button className="bg-primary text-on-primary px-6 py-3 font-brand text-xs font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">send</span>
              NUEVA CAMPANA
            </button>
          </div>
          <div className="bg-surface-container-low overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/50">
                  {["EMAIL","FUENTE","REGISTRO","ESTADO"].map((h) => (
                    <th key={h} className="py-4 px-6 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.email} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                    <td className="py-4 px-6 font-body text-base text-on-surface">{sub.email}</td>
                    <td className="py-4 px-6 font-body text-sm text-on-surface-variant">{sub.source}</td>
                    <td className="py-4 px-6 font-body text-sm text-on-surface-variant">{sub.joined}</td>
                    <td className="py-4 px-6">
                      <span className={`font-body text-xs font-bold uppercase px-3 py-1 ${sub.status === "Activo" ? "bg-primary-container text-on-surface" : "bg-surface-container-highest text-on-surface-variant"}`}>{sub.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">2026 DUNES BOTANICAL ARCHITECT</span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary">AUTO-SAVE: ACTIVE</span>
          <span className="text-primary underline">CRM MODE</span>
        </div>
      </footer>
    </div>
  );
}