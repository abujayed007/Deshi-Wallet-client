// import AllUsers from "@/pages/Admin/AllUsers";
// import GetAllTransactions from "@/pages/Admin/GetAllTransactions";

import AllAgents from "@/pages/Admin/AllAgents";
import { Profile } from "@/pages/Profile";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
const AllUsers = lazy(() => import("@/pages/Admin/AllUsers"));
const GetAllTransactions = lazy(
  () => import("@/pages/Admin/GetAllTransactions")
);

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Profile",
        url: "profile",
        component: Profile,
      },
      {
        title: "Users",
        url: "/admin/users",
        component: AllUsers,
      },
      {
        title: "Agents",
        url: "/admin/agents",
        component: AllAgents,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        component: GetAllTransactions,
      },
    ],
  },
];
