"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/cart-store";

export default function CartBadge() {
  const totalItems = useCartStore((s) => s.totalItems());
  // useSyncExternalStore returns false on the server and true on the client,
  // giving us a reliable hydration guard without useState+useEffect.
  // The empty subscribe function is intentional: this value never changes
  // after mount, so no re-subscription is needed.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <Link
      href="/carrito"
      className="relative text-primary hover:opacity-70 transition-opacity scale-95"
      aria-label="Ver carrito"
    >
      <span className="material-symbols-outlined">shopping_bag</span>
      {mounted && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-on-secondary text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
