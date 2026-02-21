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
    <header className="bg-gray-900 text-white p-4 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">You're Invited</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="px-4 py-2 rounded hover:bg-gray-800 transition"
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
