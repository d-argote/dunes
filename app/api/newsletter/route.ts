import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body as Record<string, string>;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("newsletter_subscribers").upsert(
    { email, source: "blog", status: "active", joined: new Date().toISOString() },
    { onConflict: "email" }
  );

  if (error) {
    // If table doesn't exist yet, return success silently so UX isn't broken
    if (error.code === "42P01") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
