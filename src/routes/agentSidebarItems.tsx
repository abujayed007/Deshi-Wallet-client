import AddMoney from "@/pages/Agent/AddMoney";
import { Profile } from "@/pages/Profile";
import TransactionHistory from "@/pages/TransactionHistory";
import type { ISidebarItems } from "@/types";

export const agentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Profile",
        url: "profile",
        component: Profile,
      },
      {
        title: "Transactions",
        url: "transactions",
        component: TransactionHistory,
      },
      {
        title: "Add Money",
        url: "add-money",
        component: AddMoney,
      },
    ],
  },
];
