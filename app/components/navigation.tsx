import { Form, Link } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
const baseNavigation = [
  { name: "Home", href: "/" },
  /* { name: "Notes", href: "/notes" }, */
  { name: "About Us", href: "/about-us" },
];

export default function Navbar() {
  return (
    <>
      <NavigationMenu className="my-2 min-w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="flex flex-shrink-0 items-center">
              <img
                className="w-auto h-10 rounded-full"
                src="/logo.svg"
                alt="Logo"
              />
            </div>
          </NavigationMenuItem>

          {baseNavigation.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link to={item.href}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
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
