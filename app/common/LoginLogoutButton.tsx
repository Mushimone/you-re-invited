"use client";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-action";
import { createClient } from "@/utils/supabase/supabaseClient";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React, { useEffect, useState } from "react";

export default function LoginLogoutButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log("User:", user);
    };
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth state changed:", _event, session);
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [pathname]);

  if (user) {
    return (
      <Button
        variant="ghost"
        className="rounded hover:bg-gray-800 hover:text-white transition"
        onClick={() => {
          signout();
          setUser(null);
        }}
      >
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant="ghost"
      className="rounded hover:bg-gray-800 hover:text-white transition"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
}
