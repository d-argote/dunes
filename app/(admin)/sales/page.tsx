export default function SalesPage() {
  const channels = [
    { name: "Directo", pct: 75, amount: "$3.1M" },
    { name: "Retail", pct: 45, amount: "$1.9M" },
    { name: "Pop-up Events", pct: 20, amount: "$840K" },
    { name: "B2B", pct: 15, amount: "$630K" },
  ];

  const funnel = [
    { label: "Visitors", value: "8,420", pct: 100 },
    { label: "Add to Cart", value: "1,684", pct: 80 },
    { label: "Checkout", value: "1,010", pct: 60 },
    { label: "Purchased", value: "320", pct: 30 },
  ];

  const behaviors = [
    { segment: "Nuevos Visitantes Mobile", visits: "5,210", bounce: "62%", bounceClass: "text-error", conversion: "1.8%", revenue: "$320K" },
    { segment: "Recurrentes sin cuenta", visits: "1,840", bounce: "28%", bounceClass: "text-primary", conversion: "8.4%", revenue: "$1.2M" },
    { segment: "Abandono en Checkout", visits: "690", bounce: "N/A", bounceClass: "", conversion: "0%", revenue: "$0" },
    { segment: "Clientes Recurrentes", visits: "980", bounce: "12%", bounceClass: "text-primary", conversion: "11.2%", revenue: "$2.7M" },
  ];

  return (
    <div className="p-6 lg:p-16 flex flex-col gap-12 min-h-screen pb-32">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-outline-variant pb-8">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">SALES ANALYTICS</h2>
          <p className="font-brand text-sm font-semibold tracking-widest uppercase text-on-surface-variant mt-2">Q3 2026: JUL 01 — SEP 30</p>
        </div>
        <button className="bg-primary text-on-primary px-8 py-4 font-brand text-sm font-semibold uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">file_download</span>
          EXPORT REPORT
        </button>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: "$4.2M", change: "+12.4%", positive: true, icon: "payments" },
          { label: "TICKET PROMEDIO", value: "$285", change: "-1.2%", positive: false, icon: "receipt" },
          { label: "NEW vs RECURRENTE", value: "32% / 68%", change: "+4.1% recurrentes", positive: true, icon: "group" },
          { label: "TASA CHURN", value: "2.4%", change: "-0.6% vs Q2", positive: true, icon: "person_remove" },
          { label: "CUSTOMER LTV", value: "$1,840", change: "+8.7% vs Q2", positive: true, icon: "loyalty" },
          { label: "MARKETING ROI", value: "4.8x", change: "+0.6x vs Q2", positive: true, icon: "campaign" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-low p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{kpi.label}</p>
              <span className="material-symbols-outlined text-2xl text-primary">{kpi.icon}</span>
            </div>
            <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">{kpi.value}</p>
            <div className={`flex items-center gap-1 ${kpi.positive ? "text-primary" : "text-error"}`}>
              <span className="material-symbols-outlined text-base">{kpi.positive ? "trending_up" : "trending_down"}</span>
              <span className="font-body text-xs font-semibold">{kpi.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Channels + Funnel */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Ventas por Canal */}
        <div className="bg-surface-container-low p-8">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-8">VENTAS POR CANAL</h3>
          <div className="flex flex-col gap-6">
            {channels.map((ch) => (
              <div key={ch.name} className="flex flex-col gap-2">
                <div className="flex justify-between font-body text-base text-on-surface">
                  <span>{ch.name}</span>
                  <span className="font-semibold text-primary">{ch.amount}</span>
                </div>
                <div className="w-full bg-surface-container-highest h-8 overflow-hidden relative">
                  <div className="h-full bg-primary transition-all duration-700" style={{ width: `${ch.pct}%` }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-brand text-xs font-semibold text-on-surface-variant tracking-widest">{ch.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-surface-container-low p-8">
          <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-8">CONVERSION FUNNEL</h3>
          <div className="flex flex-col items-center gap-0">
            {funnel.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center w-full">
                <div
                  className="bg-primary text-on-primary flex items-center justify-between px-4 py-4 mx-auto transition-all duration-700"
                  style={{ width: `${step.pct}%` }}
                >
                  <span className="font-brand text-sm font-semibold uppercase tracking-widest truncate">{step.label}</span>
                  <span className="font-headline text-xl font-bold shrink-0">{step.value}</span>
                </div>
                {i < funnel.length - 1 && (
                  <div className="h-4 w-8 bg-primary/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/60 text-sm">arrow_downward</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behavior Table */}
      <section className="bg-surface-container-low p-8">
        <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em] mb-8">ANALISIS DE COMPORTAMIENTO</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/50">
                {["SEGMENTO","SESIONES","TASA DE REBOTE","CONVERSION","INGRESOS"].map((h) => (
                  <th key={h} className="py-4 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant pr-8">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {behaviors.map((row) => (
                <tr key={row.segment} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                  <td className="py-4 font-body text-base text-on-surface font-semibold pr-8">{row.segment}</td>
                  <td className="py-4 font-body text-base text-on-surface pr-8">{row.visits}</td>
                  <td className={`py-4 font-body text-base font-semibold pr-8 ${row.bounceClass}`}>{row.bounce}</td>
                  <td className="py-4 font-body text-base text-on-surface pr-8">{row.conversion}</td>
                  <td className="py-4 font-body text-base text-on-surface font-bold">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <div className="font-brand font-bold text-primary text-2xl">DUNES</div>
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">2026 DUNES BOTANICAL ARCHITECT</span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant cursor-default">
          <span className="hover:text-primary">AUTO-SAVE: ACTIVE</span>
          <span className="text-primary underline">ANALYTICS MODE</span>
        </div>
      </footer>
    </div>
  );
}