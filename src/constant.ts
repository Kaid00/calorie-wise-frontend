import { createClient } from "@supabase/supabase-js";
export const BASE_URL =    "https://8zm9fucasd.execute-api.us-east-1.amazonaws.com/prod/"//import.meta.env.VITE_BASE_URL;
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvaWRla3R5ZGZkeWNuZmhicmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MTU1OTEsImV4cCI6MjAyNzk5MTU5MX0.uPz41hH9sg1AJzey95MmxCPU0dCgmIT0p2tT8yWHL8A" // import.meta.env.VITE_SUPA_BASE_KEY;

export const supabase = createClient(
  "https://zoidektydfdycnfhbrgg.supabase.co",
  SUPABASE_KEY
);
