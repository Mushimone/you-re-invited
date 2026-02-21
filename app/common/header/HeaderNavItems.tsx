"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/supabaseClient";

export function HeaderNavItems() {
  const [slug, setSlug] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const fetchState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoggedIn(false);
        setSlug(null);
        return;
      }
      setLoggedIn(true);
      const { data } = await supabase
        .from("configurations")
        .select("slug, published")
        .eq("user_id", user.id)
        .single();
      setSlug(data?.published && data.slug ? data.slug : null);
    };

    fetchState();

    // Re-run whenever auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchState();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      {loggedIn && (
        <Link
          href="/configuration"
          className="px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          My Memorial
        </Link>
      )}
      {slug && (
        <Link
          href={`/${slug}`}
          target="_blank"
          className="px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          View Page ↗
        </Link>
      )}
    </>
  );
}
