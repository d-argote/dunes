import { supabaseAdmin } from "@/lib/supabase/server";
import CustomersClient, { type Buyer, type Subscriber } from "./_components/CustomersClient";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("customer_name, customer_email, total, status, created_at")
    .neq("status", "cancelled")
    .order("created_at", { ascending: false });

  // Group by email to compute LTV and order count per customer
  const customerMap = new Map<string, Buyer>();
  for (const order of orders ?? []) {
    const existing = customerMap.get(order.customer_email);
    if (!existing) {
      customerMap.set(order.customer_email, {
        email: order.customer_email,
        name: order.customer_name,
        orders: 1,
        ltv: order.total ?? 0,
        lastPurchase: order.created_at,
      });
    } else {
      existing.orders++;
      existing.ltv += order.total ?? 0;
      if (order.created_at > existing.lastPurchase) {
        existing.lastPurchase = order.created_at;
      }
    }
  }

  const buyers: Buyer[] = Array.from(customerMap.values()).sort(
    (a, b) => b.ltv - a.ltv
  );

  const totalCustomers = buyers.length;
  const avgLtv =
    buyers.length > 0
      ? buyers.reduce((s, b) => s + b.ltv, 0) / buyers.length
      : 0;
  const repeatBuyers = buyers.filter((b) => b.orders > 1).length;
  const repeatRate =
    buyers.length > 0 ? Math.round((repeatBuyers / buyers.length) * 100) : 0;

  // Newsletter subscribers — empty until newsletter_subscribers table is created in Supabase
  const { data: subsData } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("email, source, created_at, status")
    .order("created_at", { ascending: false })
    .limit(50);

  const subscribers: Subscriber[] = (subsData ?? []).map((s) => ({
    email: s.email,
    source: s.source ?? "Web",
    joined: new Date(s.created_at).toLocaleDateString("es-CO"),
    status: s.status ?? "Activo",
  }));

  return (
    <CustomersClient
      buyers={buyers}
      totalCustomers={totalCustomers}
      avgLtv={avgLtv}
      repeatRate={repeatRate}
      subscribers={subscribers}
    />
  );
}
