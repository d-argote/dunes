import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { hashPassword } from "@/lib/auth";

/**
 * Ruta de utilidad SOLO para desarrollo.
 * Crea el primer usuario administrador.
 * Desactívala o elimínala antes de ir a producción.
 *
 * Uso: POST /api/auth/seed
 * Body: { "email": "admin@dunes.co", "password": "MiClave123!", "name": "Admin" }
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "No disponible en producción." }, { status: 403 });
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
