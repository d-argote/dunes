import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * POST /api/webhook/wompi
 * Wompi sends a signed event after a transaction completes.
 * Docs: https://docs.wompi.co/docs/en/widget-checkout-web#6-handling-events
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-event-checksum") ?? "";

  // ── Verify HMAC-SHA256 signature ──────────────────────────────
  const secret = process.env.WOMPI_EVENTS_SECRET;
  if (!secret) {
    console.error("WOMPI_EVENTS_SECRET not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const expectedSig = createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  try {
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSig, "hex");
    if (
      sigBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  // ── Parse event ───────────────────────────────────────────────
  let event: {
    event: string;
    data: {
      transaction: {
        id: string;
        reference: string;
        status: string;
        amount_in_cents: number;
      };
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { transaction } = event.data;

  if (event.event !== "transaction.updated") {
    // Acknowledge but ignore other event types
    return NextResponse.json({ received: true });
  }

  const wompiStatus = transaction.status; // APPROVED | DECLINED | VOIDED | ERROR
  const orderId = transaction.reference;

  const statusMap: Record<string, string> = {
    APPROVED: "paid",
    DECLINED: "pending",
    VOIDED: "cancelled",
    ERROR: "pending",
  };

  const newStatus = statusMap[wompiStatus];
  if (!newStatus) {
    return NextResponse.json({ received: true });
  }

  // ── Update order in DB ────────────────────────────────────────
  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      status: newStatus,
      wompi_transaction_id: transaction.id,
    })
    .eq("id", orderId);

  if (error) {
    console.error("Webhook DB update error:", error.message);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
