import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import LoginLogoutButton from "./common/header/LoginLogoutButton";
import { HeaderNavItems } from "./common/header/HeaderNavItems";

export function Header() {
  return (
    <header className="bg-stone-950 text-stone-100 px-6 py-3 border-b border-stone-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">You're Invited</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="px-4 py-2 rounded hover:bg-stone-800 transition"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <HeaderNavItems />

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <LoginLogoutButton />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
