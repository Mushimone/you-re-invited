import Link from "next/link";
import LoginLogoutButton from "./common/header/LoginLogoutButton";
import { HeaderNavItems } from "./common/header/HeaderNavItems";
import { MobileNav } from "./common/header/MobileNav";

export function Header() {
  return (
    <header className="relative bg-stone-950 text-stone-100 px-6 py-3 border-b border-stone-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          You&apos;re Invited
        </h1>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 rounded hover:bg-stone-800 transition"
          >
            Home
          </Link>
          <HeaderNavItems />
          <LoginLogoutButton />
        </nav>

        {/* Mobile nav — hamburger button + dropdown */}
        <MobileNav />
      </div>
    </header>
  );
}
