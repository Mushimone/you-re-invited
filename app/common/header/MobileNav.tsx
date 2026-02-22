"use client";
import { useState } from "react";
import Link from "next/link";
import { HeaderNavItems } from "./HeaderNavItems";
import LoginLogoutButton from "./LoginLogoutButton";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger / X button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded hover:bg-stone-800 transition"
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          {open ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            />
          )}
        </svg>
      </button>

      {/* Dropdown — always in DOM */}
      <div
        className={`absolute top-full left-0 right-0 bg-stone-950 border-t border-stone-800 flex-col py-2 z-50 ${
          open ? "flex" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      >
        <Link href="/" className="px-6 py-3 hover:bg-stone-800 transition">
          Home
        </Link>
        <HeaderNavItems mobile />
        <LoginLogoutButton mobile />
      </div>
    </div>
  );
}
