import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // ✅ instead of Popover
import Logo from "../ui/Logo";
import { ModeToggle } from "../modeToggler/mode-toggler";
import { Link } from "react-router";
import {
  authApi,
  useGetUserInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constant/role";
import { Skeleton } from "../ui/skeleton";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/review", label: "Review", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/user", label: "Dashboard", role: role.user },
  { href: "/agent", label: "Dashboard", role: role.agent },
];

export default function Navbar() {
  const { data, isLoading } = useGetUserInfoQuery(undefined);
  const [logout] = useLogoutMutation(undefined);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-background">
      <div className="flex h-16 items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <nav className="flex flex-col gap-4">
                  {navigationLinks.map((link, index) => {
                    const isAllowed =
                      link.role === "PUBLIC" ||
                      link.role === data?.data?.data?.role;
                    return (
                      isAllowed && (
                        <Link
                          key={index}
                          to={link.href}
                          className="text-lg font-medium hover:text-primary"
                        >
                          {isLoading ? <Skeleton /> : link.label}
                        </Link>
                      )
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
                const isAllowed =
                  link.role === "PUBLIC" ||
                  link.role === data?.data?.data?.role;
                return (
                  isAllowed && (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <Link
                            to={link.href}
                            className="px-3 py-2 font-medium hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Auth + Theme */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data ? (
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="text-sm cursor-pointer"
            >
              Log out
            </Button>
          ) : (
            <div className="space-x-2">
              <Button asChild className="text-sm">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild className="text-sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
