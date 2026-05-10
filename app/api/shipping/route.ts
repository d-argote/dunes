import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/shipping?department=Antioquia
 * Returns the shipping rate for the given Colombian department.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");

  if (!department) {
    return NextResponse.json({ error: "Se requiere el parámetro 'department'" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("shipping_rates")
    .select("department, rate")
    .eq("department", department)
    .single();

  if (error || !data) {
    // Default rate if department is not in the table yet
    return NextResponse.json({ department, rate: 15000 });
  }

  return NextResponse.json(data);
}
