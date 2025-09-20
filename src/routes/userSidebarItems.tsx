// import TransactionHistory from "@/pages/TransactionHistory";
// import SendMoney from "@/pages/User/SendMoney";
// import Withdraw from "@/pages/User/Withdraw";

import { Profile } from "@/pages/Profile";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
const TransactionHistory = lazy(() => import("@/pages/TransactionHistory"));
const SendMoney = lazy(() => import("@/pages/User/SendMoney"));
const Withdraw = lazy(() => import("@/pages/User/Withdraw"));

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Profile",
        url: "profile",
        component: Profile,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "Transactions",
        url: "/user/transactions",
        component: TransactionHistory,
      },
    ],
  },
];
