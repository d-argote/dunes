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
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    addItem({
      product_id: productId,
      name: productName,
      price,
      image_url: productImageUrl,
      purchase_type: "once",
      quantity: qty,
      stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Precio Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className="flex items-center justify-between p-5 bg-surface-container-low">
        <span className="font-headline font-medium text-primary uppercase tracking-widest text-sm">
          Precio
        </span>
        <span className="font-headline font-bold text-2xl text-primary">
          ${price.toLocaleString("es-CO")}
        </span>
      </div>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Selector de cantidad Ã¢â€â‚¬Ã¢â€â‚¬ */}
      {stock > 0 && (
        <div className="flex items-center gap-0">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="w-10 h-10 flex items-center justify-center bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors text-lg font-bold disabled:opacity-40"
            aria-label="Reducir cantidad"
          >
            −
          </button>
          <span className="w-12 text-center font-headline font-bold text-primary text-sm">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            disabled={qty >= stock}
            className="w-10 h-10 flex items-center justify-center bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors text-lg font-bold disabled:opacity-40"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
          <span className="ml-3 font-body text-xs text-on-surface-variant uppercase tracking-widest">
            {stock === 1 ? "Último disponible" : `${stock} disponibles`}
          </span>
        </div>
      )}

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ BotÃƒÂ³n aÃƒÂ±adir al carrito Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Link al checkout directo Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

