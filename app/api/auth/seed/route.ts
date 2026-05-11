import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { hashPassword } from "@/lib/auth";

/**
 * Ruta de utilidad SOLO para desarrollo.
 * Crea el primer usuario administrador.
 * Requiere el header X-Seed-Token con el valor de ADMIN_SEED_SECRET.
 * En producción esta ruta devuelve 404 (bloqueada también en middleware).
 *
 * Uso: POST /api/auth/seed
 * Headers: X-Seed-Token: <ADMIN_SEED_SECRET>
 * Body: { "email": "admin@dunes.co", "password": "MiClave123!", "name": "Admin" }
 */
export async function POST(request: Request) {
  // Double-guard: middleware blocks in production, but we check again here.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const seedSecret = process.env.ADMIN_SEED_SECRET;
  if (!seedSecret) {
    return NextResponse.json(
      { error: "ADMIN_SEED_SECRET no configurado." },
      { status: 503 }
    );
  }

  const providedToken = request.headers.get("x-seed-token") ?? "";
  if (providedToken !== seedSecret) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "email y password son requeridos." },
        { status: 400 }
      );
    }

    const password_hash = await hashPassword(password);

    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .insert({ email: email.toLowerCase().trim(), password_hash, name: name ?? null })
      .select("id, email, name")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, user: data });
  } catch {
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
