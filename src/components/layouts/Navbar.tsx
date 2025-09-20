import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "../ui/Logo";
import { ModeToggle } from "../modeToggler/mode-toggler";
import { Link } from "react-router";
import {
  authApi,
  useGetUserInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import type { ApiError } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constant/role";
import { Skeleton } from "../ui/skeleton";

// Navigation links array to be used in both desktop and mobile menus
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
  const dispatch = useAppDispatch();
  console.log(data?.data?.data._id);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
    } catch (err) {
      toast.error((err as ApiError)?.data?.message ?? "Something went wrong");
    }
  };
  return (
    <header className="border-b px-4 md:px-6 container sticky top-0">
      <div className="flex h-16 justify-between  gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <>
                        {link.role === "PUBLIC" && (
                          <NavigationMenuItem key={index} className="h-full">
                            <NavigationMenuLink
                              asChild
                              href={link.href}
                              className=" hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                            >
                              {isLoading ? (
                                <Skeleton />
                              ) : (
                                <Link to={link.href}>{link.label}</Link>
                              )}
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                        {link.role === data?.data?.data?.role && (
                          <NavigationMenuItem key={index} className="h-full">
                            <NavigationMenuLink
                              asChild
                              href={link.href}
                              className=" hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                      </>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/">
              <Logo />
            </Link>

            {/* Navigation menu */}
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index} className="h-full ">
                        <NavigationMenuLink
                          asChild
                          href={link.href}
                          className=" hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                        >
                          {isLoading ? (
                            <Skeleton />
                          ) : (
                            <Link to={link.href}>{link.label}</Link>
                          )}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.data?.role && (
                      <NavigationMenuItem key={index} className="h-full flex">
                        <NavigationMenuLink
                          asChild
                          href={link.href}
                          className=" hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                        >
                          {isLoading ? (
                            <Skeleton />
                          ) : (
                            <Link to={link.href}>{link.label}</Link>
                          )}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
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
