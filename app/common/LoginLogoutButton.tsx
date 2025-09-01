"use client";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-action";
import { createClient } from "@/utils/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginLogoutButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log("User:", user);
    };
    fetchUser();
  }, []);
  if (user) {
    return (
      <Button
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
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
}
