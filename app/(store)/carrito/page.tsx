"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  return (
    <main className="pt-24 pb-32 px-4 md:px-12 max-w-4xl mx-auto">
      <h1 className="font-brand text-5xl text-primary uppercase tracking-tighter mb-12">
        MI CARRITO
      </h1>

      {items.length === 0 ? (
        <div className="bg-surface-container-low p-16 text-center flex flex-col items-center gap-6">
          <span className="material-symbols-outlined text-primary opacity-30 text-8xl">
            shopping_bag
          </span>
          <p className="font-headline text-lg text-on-surface-variant uppercase tracking-widest">
            Tu carrito está vacío
          </p>
          <Link
            href="/tienda"
            className="bg-primary text-on-primary font-brand px-10 py-4 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            IR A LA TIENDA
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Items ── */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-outline-variant/20">
            {items.map((item) => {
              const key = `${item.product_id}-${item.purchase_type}`;
              return (
                <div key={key} className="flex gap-6 py-6">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-surface-container-high">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary opacity-30">spa</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-sm mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-4">
                      Compra única
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.purchase_type, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors text-lg font-bold"
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-headline font-bold text-primary text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.purchase_type, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors text-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-headline font-bold text-primary text-lg">
                      ${(item.price * item.quantity).toLocaleString("es-CO")}
                    </span>
                    <button
                      onClick={() => removeItem(item.product_id, item.purchase_type)}
                      className="text-xs text-outline hover:text-secondary transition-colors uppercase tracking-widest flex items-center gap-1"
                      aria-label="Eliminar del carrito"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Summary ── */}
          <div className="bg-surface-container-low p-8 flex flex-col gap-6 sticky top-24">
            <h2 className="font-brand text-2xl uppercase tracking-widest text-primary">
              RESUMEN
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-CO")}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Envío</span>
                <span className="text-xs text-right">Se calcula en el checkout</span>
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-baseline">
              <span className="font-brand text-lg uppercase tracking-widest text-primary">Total</span>
              <span className="font-headline font-bold text-2xl text-primary">
                ${total.toLocaleString("es-CO")}
              </span>
            </div>

            <Link
              href="/checkout"
              className="bg-primary text-on-primary font-brand text-center py-5 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              IR AL CHECKOUT →
            </Link>

            <Link
              href="/tienda"
              className="text-center text-xs text-primary underline underline-offset-4 uppercase tracking-widest hover:text-secondary transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

