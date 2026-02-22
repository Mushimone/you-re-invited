"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/supabaseClient";
import { usePathname } from "next/navigation";

export function HeaderNavItems() {
  const [slug, setSlug] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

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
    // Use the session already provided by the event — avoids a redundant getUser() round-trip
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          setLoggedIn(false);
          setSlug(null);
          return;
        }
        setLoggedIn(true);
        supabase
          .from("configurations")
          .select("slug, published")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data }) => {
            setSlug(data?.published && data.slug ? data.slug : null);
          });
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [pathname]);

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
