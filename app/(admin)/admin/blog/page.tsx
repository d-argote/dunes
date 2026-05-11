import { supabaseAdmin } from "@/lib/supabase/server";
import type { BlogArticle } from "@/lib/types";
import BlogEditor from "./_components/BlogEditor";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { data } = await supabaseAdmin
    .from("blog_articles")
    .select(
      "id, title, slug, content, excerpt, category, status, meta_title, meta_description, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  const articles: BlogArticle[] = data ?? [];

  return <BlogEditor articles={articles} />;
}
