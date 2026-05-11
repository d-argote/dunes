import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, created_at, status, total, shipping_cost, department, city")
    .eq("customer_email", email)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: "Error al buscar pedidos" }, { status: 500 });
  }

  const orders = (data ?? []).map((o) => ({
    ...o,
    status_label: STATUS_LABEL[o.status] ?? o.status,
  }));

  return NextResponse.json(orders);
}
