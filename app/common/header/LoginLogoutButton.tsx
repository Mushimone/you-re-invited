"use client";
import { createClient } from "@/utils/supabase/supabaseClient";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginLogoutButton({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Shared classes for the mobile dropdown row style
  const mobileClass =
    "px-6 py-3 hover:bg-stone-800 transition text-left w-full";
  // Shared classes for the desktop compact button style
  const desktopClass =
    "rounded px-4 py-2 hover:bg-stone-800 hover:text-white transition";
  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      // console.log("User:", user);
    };
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // console.log("Auth state changed:", _event, session);
        setUser(session?.user ?? null);
      },
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [pathname]);

  if (user) {
    return (
      <button
        className={mobile ? mobileClass : desktopClass}
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signOut();
          router.push("/logout");
        }}
      >
        Log out
      </button>
    );
  }
  return (
    <button
      className={mobile ? mobileClass : desktopClass}
      onClick={() => router.push("/login")}
    >
      Sign in
    </button>
  );
}
