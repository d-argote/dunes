import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

/**
 * GET /api/products/[id]
 */
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
  }

  return NextResponse.json(data);
}

/**
 * PUT /api/products/[id]
 * Actualiza un producto. Acepta actualización parcial (solo los campos enviados).
 */
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, slug, description, price, stock, image_url } = body;

    // Build update object with only provided fields
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (slug !== undefined) updates.slug = slug;
    if (description !== undefined) updates.description = description ?? null;
    if (price !== undefined) updates.price = Number(price);
    if (stock !== undefined) updates.stock = Number(stock);
    if (image_url !== undefined) updates.image_url = image_url ?? null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No hay campos para actualizar." }, { status: 400 });
    }

    // Full update requires name + slug + price
    if ((name !== undefined || slug !== undefined || price !== undefined) &&
        (!updates.name || !updates.slug || updates.price === undefined)) {
      return NextResponse.json({ error: "name, slug y price son requeridos para actualización completa." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

/**
 * DELETE /api/products/[id]
 */
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
