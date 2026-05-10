import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-only Supabase client.
 * Uses the service role key — bypasses RLS.
 * Import ONLY in Server Components and Route Handlers.
 * Never expose this to the browser.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});
