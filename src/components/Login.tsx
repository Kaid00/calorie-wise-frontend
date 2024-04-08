/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "@/constant";
import { useSupabaseSession } from "@/hooks";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

type LoginProps = {
  closeMOdal: () => void;
};
export default function Login({ closeMOdal }: LoginProps) {
  const session = useSupabaseSession();

  useEffect(() => {
    if (session) {
      closeMOdal();
    }
  }, [session]);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        view="sign_up"
        appearance={{
          style: {
            button: { background: "#d95717", color: "white" },
            anchor: { color: "blue" },
          },
          theme: ThemeSupa,
        }}
        providers={["google"]}
      />
    );
  } else {
    return <div>Logged in</div>;
  }
}
