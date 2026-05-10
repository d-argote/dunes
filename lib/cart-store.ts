import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, purchaseType: "once" | "subscription") => void;
  updateQuantity: (
    productId: string,
    purchaseType: "once" | "subscription",
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (incoming) => {
        const quantity = incoming.quantity ?? 1;
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.product_id === incoming.product_id &&
              i.purchase_type === incoming.purchase_type
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product_id === incoming.product_id &&
                i.purchase_type === incoming.purchase_type
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...incoming, quantity }] };
        });
      },

      removeItem: (productId, purchaseType) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.product_id === productId && i.purchase_type === purchaseType)
          ),
        })),

      updateQuantity: (productId, purchaseType, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, purchaseType);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === productId && i.purchase_type === purchaseType
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "dunes-cart",
    }
  )
);
