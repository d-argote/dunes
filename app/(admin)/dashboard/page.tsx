export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-16 flex flex-col gap-12 min-h-screen pb-32">

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">VENTAS HOY</p>
          <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">$2.847.000</p>
          <div className="mt-4 flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span className="font-body text-xs font-semibold">+12.5% vs ayer</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">PEDIDOS ACTIVOS</p>
          <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">34</p>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base">pending_actions</span>
            <span className="font-body text-xs font-semibold">8 en preparacion</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">TASA CONVERSION</p>
          <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">3.8%</p>
          <div className="mt-4 flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span className="font-body text-xs font-semibold">+0.4% vs mes anterior</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-[2px]">
          <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">VISITANTES</p>
          <p className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">1.247</p>
          <div className="mt-4 flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-base">trending_down</span>
            <span className="font-body text-xs font-semibold">-2.1% vs ayer</span>
          </div>
        </div>
      </section>

      {/* Chart: Ventas 30 dias */}
      <section className="bg-surface-container-low p-8 rounded-[2px] min-h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">VENTAS � ULTIMOS 30 DIAS</h2>
          <button className="font-brand text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2 hover:underline">
            VER REPORTE DETALLADO <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="flex-1 relative w-full border-b border-l border-outline-variant/30 flex items-end overflow-hidden pb-4 pl-4">
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-primary/20 to-transparent" />
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,80 Q10,70 20,80 T40,60 T60,70 T80,30 T100,40" fill="none" stroke="#0b3408" strokeWidth="2" />
          </svg>
          <div className="absolute left-[-40px] top-0 h-full flex flex-col justify-between font-body text-xs text-on-surface-variant py-4">
            <span>$5M</span>
            <span>$2.5M</span>
            <span>$0</span>
          </div>
        </div>
      </section>

      {/* Bottom: Table + Top Products */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Orders table */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 rounded-[2px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">ULTIMOS PEDIDOS</h2>
            <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/50">
                  {["ORDEN","CLIENTE","PRODUCTO","MONTO","ESTADO"].map((h) => (
                    <th key={h} className="py-4 font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-body text-base text-on-surface">
                {[
                  { id:"#ORD-9082", cliente:"Carlos M.", producto:"Extracto Cacao Puro", monto:"$125.000", estado:"Completado", estadoClass:"bg-primary-container text-on-primary-container" },
                  { id:"#ORD-9081", cliente:"Ana R.", producto:"Bruma Amazonica", monto:"$89.500", estado:"En Proceso", estadoClass:"bg-surface-variant text-on-surface-variant" },
                  { id:"#ORD-9080", cliente:"Felipe J.", producto:"Set Ritual Nocturno", monto:"$340.000", estado:"En Proceso", estadoClass:"bg-surface-variant text-on-surface-variant" },
                  { id:"#ORD-9079", cliente:"Diana V.", producto:"Balsamo Andino", monto:"$65.000", estado:"Cancelado", estadoClass:"bg-error-container text-on-error-container" },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-outline-variant/20 hover:bg-surface transition-colors">
                    <td className="py-4 font-body text-xs font-semibold">{row.id}</td>
                    <td className="py-4">{row.cliente}</td>
                    <td className="py-4">{row.producto}</td>
                    <td className="py-4 text-right">{row.monto}</td>
                    <td className="py-4 text-right">
                      <span className={`inline-block px-3 py-1 rounded-[2px] font-body text-xs font-semibold uppercase ${row.estadoClass}`}>{row.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-[2px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">TOP PRODUCTOS</h2>
            <span className="material-symbols-outlined text-on-surface-variant">trending_up</span>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { name:"1. Extracto Cacao Puro", units:"420 Und.", pct:"85%" },
              { name:"2. Bruma Amazonica", units:"315 Und.", pct:"65%" },
              { name:"3. Set Ritual Nocturno", units:"190 Und.", pct:"40%" },
              { name:"4. Balsamo Andino", units:"124 Und.", pct:"25%" },
            ].map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between font-body text-base text-on-surface mb-2">
                  <span>{item.name}</span>
                  <span className="font-body text-xs font-bold text-primary">{item.units}</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: item.pct, opacity: 1 - i * 0.15 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="sticky bottom-0 w-full border-t-2 border-primary bg-surface-container-high flex justify-between items-center px-6 py-4 z-30 mt-auto">
        <span className="font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          2026 DUNES BOTANICAL ARCHITECT
        </span>
        <div className="flex gap-6 font-brand text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          <span className="hover:text-primary transition-colors cursor-default">AUTO-SAVE: ACTIVE</span>
          <span className="hover:text-primary transition-colors cursor-default">EDITOR MODE</span>
          <span className="hover:text-primary transition-colors cursor-default">SYSTEM STATUS</span>
        </div>
      </footer>
    </div>
  );
}