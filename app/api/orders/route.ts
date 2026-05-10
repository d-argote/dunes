import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { OrderItem } from "@/lib/types";

interface CreateOrderBody {
  customer_name: string;
  customer_email: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  items: OrderItem[];
}

/**
 * POST /api/orders
 * Creates a new order in Supabase and returns the Wompi checkout URL.
 */
export async function POST(request: Request) {
  let body: CreateOrderBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const { customer_name, customer_email, phone, department, city, address, items } = body;

  // Basic validation
  if (!customer_name || !customer_email || !department || !address || !city || !phone) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 422 });
  }

  // Get shipping rate
  const { data: shippingRate } = await supabaseAdmin
    .from("shipping_rates")
    .select("rate")
    .eq("department", department)
    .single();

  const shipping_cost = shippingRate?.rate ?? 0;

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );
  const total = subtotal + shipping_cost;

  // Insert order
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_name,
      customer_email,
      phone,
      department,
      city,
      address,
      total,
      shipping_cost,
      status: "pending",
      items,
    })
    .select("id")
    .single();

  if (error || !order) {
    console.error("POST /api/orders error:", error?.message);
    return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });
  }

  // TODO: Build Wompi checkout URL (implemented in fase Wompi)
  const wompi_url = buildWompiUrl({
    orderId: order.id,
    amountInCents: Math.round(total * 100),
    customerEmail: customer_email,
  });

  return NextResponse.json({ order_id: order.id, wompi_url }, { status: 201 });
}

function buildWompiUrl(params: {
  orderId: string;
  amountInCents: number;
  customerEmail: string;
}): string {
  const { orderId, amountInCents, customerEmail } = params;
  const currency = "COP";
  const publicKey = process.env.WOMPI_PUBLIC_KEY ?? "";
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET ?? "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const isLocalhost = baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1");

  // Integrity hash: SHA256(reference + amountInCents + currency + integritySecret)
  const integrityInput = `${orderId}${amountInCents}${currency}${integritySecret}`;
  const integrity = createHash("sha256").update(integrityInput).digest("hex");

  // Build query string manually — URLSearchParams percent-encodes the ':' in
  // 'signature:integrity' and 'customer-data:email', which Wompi's WAF rejects.
  const parts = [
    `public-key=${encodeURIComponent(publicKey)}`,
    `currency=${currency}`,
    `amount-in-cents=${amountInCents}`,
    `reference=${encodeURIComponent(orderId)}`,
    `signature:integrity=${integrity}`,
    `customer-data:email=${encodeURIComponent(customerEmail)}`,
  ];

  // Wompi's WAF rejects redirect-url pointing to localhost — only include in production
  if (!isLocalhost) {
    parts.push(`redirect-url=${encodeURIComponent(`${baseUrl}/mis-pedidos`)}`);
  }

  const url = `https://checkout.wompi.co/p/?${parts.join("&")}`;
  console.log("[Wompi] checkout URL →", url);
  return url;
}
