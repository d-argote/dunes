/**
 * Store route group layout.
 * Nav, Footer y BottomNav están en el root layout (app/layout.tsx).
 * Este layout puede usarse en el futuro para inyectar providers de carrito, etc.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
