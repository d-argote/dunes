import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  verifyPassword,
  signSession,
  COOKIE_NAME,
  SESSION_MAX_AGE,
  SESSION_REMEMBER_AGE,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password, remember } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Correo y contraseña son requeridos." },
        { status: 400 }
      );
    }

    // Buscar el usuario por email
    const { data: user, error } = await supabaseAdmin
      .from("admin_users")
      .select("id, email, password_hash, name")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error || !user) {
      // Respuesta genérica para no revelar si el email existe
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos." },
        { status: 401 }
      );
    }

    const token = signSession(user.id, remember === true);
    const maxAge = remember ? SESSION_REMEMBER_AGE : SESSION_MAX_AGE;

    const response = NextResponse.json({ ok: true, name: user.name });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
