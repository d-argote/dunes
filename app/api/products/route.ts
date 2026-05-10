import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/products
 * Returns all products with stock > 0 (or all if ?all=true)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get("all") === "true";

  let query = supabaseAdmin
    .from("products")
    .select("id, name, price, stock, image_url, slug, description")
    .order("name");

  if (!showAll) {
    query = query.gt("stock", 0);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/products error:", error.message);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }

  return NextResponse.json(data);
}

/**
 * POST /api/products
 * Crea un nuevo producto.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, price, stock, image_url } = body;

    if (!name || !slug || price === undefined) {
      return NextResponse.json({ error: "name, slug y price son requeridos." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .insert({ name, slug, description: description ?? null, price: Number(price), stock: Number(stock ?? 0), image_url: image_url ?? null })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
