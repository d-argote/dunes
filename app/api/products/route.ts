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
