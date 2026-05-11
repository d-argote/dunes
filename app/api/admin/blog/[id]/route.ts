import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("dunes-admin-session");
  if (!sessionCookie || !verifySession(sessionCookie.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, content, excerpt, meta_title, meta_description, status } =
    body as Record<string, string>;

  const allowed = ["published", "draft", "design", "research"];
  if (status && !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const update: Record<string, string> = { updated_at: new Date().toISOString() };
  if (title !== undefined) update.title = title;
  if (content !== undefined) update.content = content;
  if (excerpt !== undefined) update.excerpt = excerpt;
  if (meta_title !== undefined) update.meta_title = meta_title;
  if (meta_description !== undefined) update.meta_description = meta_description;
  if (status !== undefined) update.status = status;

  const { data, error } = await supabaseAdmin
    .from("blog_articles")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
