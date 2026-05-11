"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export default function CartBadge() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
