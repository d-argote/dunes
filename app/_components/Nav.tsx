import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Nav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f2]/95 backdrop-blur-xl border-b border-stone-200/20">
      {/* ── Announcement bar ── */}
      <div className="bg-primary text-on-primary text-center py-2 px-4 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
        <p className="font-body text-[11px] md:text-xs tracking-[0.15em] uppercase">
          Envío <span className="font-bold">GRATIS</span> comprando 4 o más productos
          <Link
            href="/tienda"
            className="ml-3 underline underline-offset-2 hover:no-underline transition-all hidden sm:inline"
          >
            Ver tienda →
          </Link>
        </p>
      </div>

      {/* ── Main nav ── */}
      <nav className="flex justify-between items-center px-6 h-14 w-full max-w-7xl mx-auto">
        {/* Hamburger */}
        <button
          className="text-primary hover:opacity-70 transition-opacity scale-95"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="font-brand text-2xl font-bold tracking-widest text-primary"
        >
          DUNES
        </Link>

        {/* Cart */}
        <CartBadge />
      </nav>
    </header>
  );
}
