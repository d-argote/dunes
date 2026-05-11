/* ─────────────────────────────────────────────────────────
   DUNES — Shared TypeScript Types
   Mirrors the Supabase schema (products, orders, shipping_rates)
───────────────────────────────────────────────────────── */

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
  images: string[];
  video_url: string | null;
  slug: string;
  description: string | null;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  department: string;
  address: string;
  city: string;
  phone: string;
  total: number;
  shipping_cost: number;
  status: OrderStatus;
  wompi_transaction_id: string | null;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface ShippingRate {
  department: string;
  rate: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  status: "published" | "draft" | "design" | "research";
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

/* Cart (client-side only, no DB) */
export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  image_url: string | null;
  purchase_type: "once";
  quantity: number;
  stock: number;
}
