import { Form, Link } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
const baseNavigation = [
  { name: "Home", href: "/" },
  /* { name: "Notes", href: "/notes" }, */
  { name: "About Us", href: "/about-us" },
  { name: "Error", href: "/error" },
];

export default function Navbar() {
  return (
    <>
      <NavigationMenu className="mx-auto my-6 min-w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="flex flex-shrink-0 items-center">
              <img className="w-auto h-10 rounded-full" src="/logo.svg" alt="Logo" />
            </div>
          </NavigationMenuItem>

          {baseNavigation.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to={item.href}>{item.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
