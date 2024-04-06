import { createClient } from "@supabase/supabase-js";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPA_BASE_KEY;

export const supabase = createClient(
  "https://zoidektydfdycnfhbrgg.supabase.co",
  SUPABASE_KEY
);
