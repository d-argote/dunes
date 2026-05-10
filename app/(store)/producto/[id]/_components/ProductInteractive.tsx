"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

interface Props {
  productId: string;
  productName: string;
  productImageUrl: string | null;
  price: number;
  stock: number;
}

export default function ProductInteractive({
  productId,
  productName,
  productImageUrl,
  price,
  stock,
}: Props) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    addItem({
      product_id: productId,
      name: productName,
      price,
      image_url: productImageUrl,
      purchase_type: "once",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* ── Precio ── */}
      <div className="flex items-center justify-between p-5 bg-surface-container-low">
        <span className="font-headline font-medium text-primary uppercase tracking-widest text-sm">
          Precio
        </span>
        <span className="font-headline font-bold text-2xl text-primary">
          ${price.toLocaleString("es-CO")}
        </span>
      </div>

      {/* ── Botón añadir al carrito ── */}
      {stock > 0 ? (
        <button
          onClick={handleAddToCart}
          className={`w-full font-headline py-5 rounded-xl text-lg font-bold tracking-widest transition-all duration-200 uppercase flex items-center justify-center gap-3 ${
            added
              ? "bg-tertiary text-on-primary scale-[0.98]"
              : "bg-primary text-on-primary hover:scale-[1.02] active:scale-95"
          }`}
        >
          {added ? (
            <>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              AGREGADO AL CARRITO
            </>
          ) : (
            "AÑADIR AL CARRITO"
          )}
        </button>
      ) : (
        <button
          disabled
          className="w-full bg-surface-container-highest text-on-surface-variant py-5 rounded-xl text-lg font-bold tracking-widest cursor-not-allowed uppercase"
        >
          AGOTADO
        </button>
      )}

      {/* ── Link al checkout directo ── */}
      {stock > 0 && (
        <Link
          href="/checkout"
          className="block w-full text-center text-sm text-primary underline underline-offset-4 hover:text-secondary transition-colors pt-2"
        >
          Comprar ahora →
        </Link>
      )}
    </div>
  );
}
