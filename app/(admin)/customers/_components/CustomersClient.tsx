"use client";

import { useState } from "react";

type Tab = "buyers" | "non-buyers" | "subscribers";

export interface Buyer {
  email: string;
  name: string;
  orders: number;
  ltv: number;
  lastPurchase: string;
}

export interface Subscriber {
  email: string;
  source: string;
  joined: string;
  status: string;
}

interface Props {
  buyers: Buyer[];
  totalCustomers: number;
  avgLtv: number;
  repeatRate: number;
  subscribers: Subscriber[];
}

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} semana(s)`;
  return `Hace ${Math.floor(days / 30)} mes(es)`;
}

export default function CustomersClient({
  buyers,
  totalCustomers,
  avgLtv,
  repeatRate,
  subscribers,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("buyers");
  const [buyerPage, setBuyerPage] = useState(1);
  const BUYER_PAGE_SIZE = 25;
  const buyerTotalPages = Math.max(1, Math.ceil(buyers.length / BUYER_PAGE_SIZE));
  const paginatedBuyers = buyers.slice((buyerPage - 1) * BUYER_PAGE_SIZE, buyerPage * BUYER_PAGE_SIZE);

  const tabs: { id: Tab; label: string; icon: string; count: string }[] = [
    { id: "buyers", label: "Compradores", icon: "shopping_bag", count: String(buyers.length) },
    { id: "non-buyers", label: "No Compradores", icon: "person_search", count: "—" },
    { id: "subscribers", label: "Suscriptores", icon: "mark_email_unread", count: String(subscribers.length) },
  ];

  const vipBuyers = buyers.filter((b) => b.ltv >= 500000);
  const maxLtv = buyers[0]?.ltv ?? 1;

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-16 min-h-screen pb-32">

      {/* Header */}
      <div className="border-b border-outline-variant pb-8 flex flex-col gap-4">
        <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">CUSTOMER ANALYTICS</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {[
            { label: "LTV PROMEDIO", value: formatCOP(avgLtv) },
            { label: "CLIENTES ÚNICOS", value: String(totalCustomers) },
            { label: "REPEAT RATE", value: `${repeatRate}%` },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-surface-container-low p-6 flex-1">
              <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">{kpi.label}</p>
              <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">{kpi.value}</p>
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
            <span
              className={`material-symbols-outlined text-2xl ${activeTab === tab.id ? "text-primary" : "text-on-surface-variant"}`}
              style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {tab.icon}
            </span>
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
            <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">COMPRADORES — ALTO VALOR</h3>
            <button className="bg-surface-container-highest text-on-surface-variant px-6 py-3 font-brand text-xs font-semibold uppercase tracking-widest hover:bg-surface-container-high transition-colors border border-outline-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-base">file_download</span>
              EXPORTAR
            </button>
          </div>
          {buyers.length === 0 ? (
            <p className="font-body text-sm text-on-surface-variant">Sin compradores todavía.</p>
          ) : (
            <div className="bg-surface-container-low overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/50">
                    {["NOMBRE", "EMAIL", "PEDIDOS", "LTV", "SEGMENTO", "ÚLTIMO PEDIDO"].map((h) => (
                      <th key={h} className="py-4 px-6 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedBuyers.map((b) => {
                    const isVip = b.ltv >= 500000;
                    return (
                      <tr key={b.email} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                        <td className="py-4 px-6 font-body text-base text-on-surface font-semibold">{b.name}</td>
                        <td className="py-4 px-6 font-body text-xs text-on-surface-variant">{b.email}</td>
                        <td className="py-4 px-6 font-headline text-xl font-bold text-on-surface">{b.orders}</td>
                        <td className="py-4 px-6 font-headline text-xl font-bold text-primary">{formatCOP(b.ltv)}</td>
                        <td className="py-4 px-6">
                          <span className={`font-body text-xs font-bold uppercase px-3 py-1 ${isVip ? "bg-secondary-container text-on-surface" : "bg-surface-container-highest text-on-surface-variant"}`}>
                            {isVip ? "VIP" : "Regular"}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-body text-sm text-on-surface-variant">{timeAgo(b.lastPurchase)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Buyers pagination */}
          {buyerTotalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
              <p className="font-body text-sm text-on-surface-variant">
                Mostrando {(buyerPage - 1) * BUYER_PAGE_SIZE + 1}–{Math.min(buyerPage * BUYER_PAGE_SIZE, buyers.length)} de {buyers.length} compradores
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setBuyerPage((p) => Math.max(1, p - 1))} disabled={buyerPage === 1} className="p-2 text-on-surface-variant hover:text-primary disabled:opacity-30">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="font-body text-sm text-on-surface">{buyerPage} / {buyerTotalPages}</span>
                <button onClick={() => setBuyerPage((p) => Math.min(buyerTotalPages, p + 1))} disabled={buyerPage === buyerTotalPages} className="p-2 text-on-surface-variant hover:text-primary disabled:opacity-30">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          )}

          {/* Segment donut placeholder */}
          <div className="bg-surface-container-low p-8">
            <h4 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-6">SEGMENTACIÓN — TOP 20%</h4>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e3dc" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0b3408" strokeWidth="3"
                    strokeDasharray={`${vipBuyers.length > 0 ? Math.round((vipBuyers.length / buyers.length) * 100) : 0} 100`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-headline text-2xl font-bold text-on-surface">
                      {buyers.length > 0 ? Math.round((vipBuyers.length / buyers.length) * 100) : 0}%
                    </p>
                    <p className="font-body text-xs text-on-surface-variant">VIP</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { color: "bg-primary", label: `VIP (LTV ≥ $500K)`, count: vipBuyers.length },
                  { color: "bg-outline-variant", label: "Regular (< $500K)", count: buyers.length - vipBuyers.length },
                ].map((seg) => (
                  <div key={seg.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${seg.color}`} />
                    <span className="font-body text-sm text-on-surface">{seg.label}</span>
                    <span className="font-body text-sm font-bold text-on-surface-variant ml-auto">{seg.count}</span>
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
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ANÁLISIS DE DROP-OFF</h3>
          <div className="bg-surface-container-low p-8 flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">analytics</span>
            <p className="font-body text-sm text-on-surface-variant text-center">
              El análisis de visitantes sin compra requiere integración con Google Analytics 4 o un servicio de analytics de comportamiento.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ACCIONES DE REMARKETING</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "email", label: "Email Campaign", desc: "Secuencia de 3 correos con descuento progresivo", action: "CONFIGURAR" },
                { icon: "ads_click", label: "Meta Ads Sync", desc: "Sincronizar audiencia con Meta Business Manager", action: "SINCRONIZAR" },
                { icon: "chat", label: "WhatsApp Promo", desc: "Enviar promoción personalizada a contactos", action: "LANZAR" },
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
              NUEVA CAMPAÑA
            </button>
          </div>
          {subscribers.length === 0 ? (
            <div className="bg-surface-container-low p-8 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                Sin suscriptores todavía. Agrega una tabla <code className="font-mono">newsletter_subscribers</code> en Supabase para gestionar la lista.
              </p>
            </div>
          ) : (
            <div className="bg-surface-container-low overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/50">
                    {["EMAIL", "FUENTE", "REGISTRO", "ESTADO"].map((h) => (
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
                        <span className={`font-body text-xs font-bold uppercase px-3 py-1 ${sub.status === "Activo" ? "bg-primary-container text-on-surface" : "bg-surface-container-highest text-on-surface-variant"}`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">2026 DUNES BOTANICAL ARCHITECT</span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary">CRM MODE</span>
        </div>
      </footer>
    </div>
  );
}
