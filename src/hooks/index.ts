/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { supabase } from "@/constant";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchInitialSession();

    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return session;
};
