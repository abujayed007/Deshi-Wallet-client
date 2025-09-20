import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./ui/Logo";
import { Link } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useGetUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(user?.data?.data?.role),
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="shadow-2xl">
        {/* We create a SidebarGroup for each parent. */}
        {data?.navMain?.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-2xl font-bold">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link className="text-md font-bold gap-3" to={item.url}>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
