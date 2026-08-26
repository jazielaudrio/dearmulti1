import { createClient } from "@supabase/supabase-js";

// Hardcoded keys for Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tzodiqtdxosltpktglqy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6b2RpcXRkeG9zbHRwa3RnbHF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjQ1ODMsImV4cCI6MjEwMzM0MDU4M30.lNqQ_FaEB50PwDl87k_RvgF8EycefeLT-HA6hSrCYeE";

if (typeof window !== "undefined") {
  console.log("Supabase Config Check -> URL exists:", !!supabaseUrl, "| Key exists:", !!supabaseAnonKey);
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
