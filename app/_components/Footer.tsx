import Link from "next/link";

const TRUST_BADGES = [
  { icon: "credit_card", label: "Múltiples métodos de pago" },
  { icon: "local_shipping", label: "Envíos a todo Colombia" },
  { icon: "verified_user", label: "Compra 100% segura" },
  { icon: "eco", label: "Ingredientes botánicos certificados" },
];

const FOOTER_COLS = [
  {
    heading: "Productos",
    links: [
      { label: "Shampoo de Crecimiento Natural", href: "/tienda" },
      { label: "Tónico Capilar", href: "/tienda" },
      { label: "Ver toda la tienda", href: "/tienda" },
    ],
  },
  {
    heading: "Información",
    links: [
      { label: "Sobre DUNES", href: "/comunidad" },
      { label: "Blog Capilar", href: "/blog" },
      { label: "Mis pedidos", href: "/mis-pedidos" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Política de privacidad", href: "#" },
      { label: "Términos y condiciones", href: "#" },
      { label: "Política de devoluciones", href: "#" },
      { label: "Política de envío", href: "#" },
    ],
  },
  {
    heading: "Contacto",
    links: [
      { label: "WhatsApp", href: "https://wa.me/573000000000", external: true },
      { label: "PQRS", href: "#" },
      { label: "Contáctanos", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/dunesbotanical" },
  { label: "TikTok", href: "https://tiktok.com/@dunesbotanical" },
  { label: "YouTube", href: "https://youtube.com/@dunesbotanical" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low">
      {/* ── Trust badges ── */}
      <div className="border-y border-outline-variant/20 bg-surface-container">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl shrink-0">
                {b.icon}
              </span>
              <span className="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-wide leading-tight">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main columns ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <p className="font-brand text-2xl tracking-tighter text-primary uppercase font-bold">
            DUNES
          </p>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            Laboratorio botánico colombiano. Ciencia ancestral para el cuidado capilar masculino.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns — accordion on mobile, normal on desktop */}
        {FOOTER_COLS.map((col) => (
          <div key={col.heading} className="col-span-1">
            {/* Mobile accordion */}
            <details className="md:hidden group border-b border-outline-variant/20">
              <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                <p className="font-brand text-xs tracking-[0.2em] uppercase text-secondary font-bold">
                  {col.heading}
                </p>
                <span className="material-symbols-outlined text-primary text-lg transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <ul className="space-y-3 pb-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </details>

            {/* Desktop normal */}
            <div className="hidden md:block space-y-4">
              <p className="font-brand text-xs tracking-[0.2em] uppercase text-secondary font-bold">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-outline-variant/20 bg-surface-container">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-on-surface-variant/60 tracking-widest uppercase">
            © {new Date().getFullYear()} DUNES BOTANICAL LAB. HECHO EN COLOMBIA.
          </p>
          {/* Payment methods */}
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "PSE", "Wompi"].map((pm) => (
              <span
                key={pm}
                className="px-2 py-1 bg-surface-container-highest text-[10px] font-bold text-on-surface-variant rounded tracking-widest uppercase"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
