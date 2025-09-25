// import App from "@/App";
// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import { About } from "@/pages/About";

// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import { createBrowserRouter, Navigate } from "react-router";
// import { adminSidebarItems } from "./adminSidebarItems";
// import { generateRoutes } from "@/utils/generateRoutes";
// import { userSidebarItems } from "./userSidebarItems";
// import { agentSidebarItems } from "./agentSidebarItems";

import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constant/role";
import type { TRole } from "@/types";
import Unauthorized from "@/pages/UnAuthorized";
import NotFound from "@/pages/NotFound";
import { Features } from "@/components/modules/Features/Features";
import { FAQ } from "@/components/modules/FAQ/FAQ";
import { About } from "@/components/modules/About/About";
import HomePage from "@/components/modules/HomePage/HomePage";
import Testimonials from "@/components/modules/HomePage/Testmonial";
import SingleUser from "@/components/modules/User/SingleUser";
import TransactionHistory from "@/pages/TransactionHistory";
import GetAllTransactions from "@/pages/Admin/GetAllTransactions";

const App = lazy(() => import("@/App"));
const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);
// const About = lazy(() => import("@/components/modules/About/About"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: FAQ,
        path: "faq",
      },
      {
        Component: Testimonials,
        path: "review",
      },
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      ...generateRoutes(userSidebarItems),
      { index: true, Component: TransactionHistory },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      ...generateRoutes(agentSidebarItems),
      { index: true, Component: TransactionHistory },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      ...generateRoutes(adminSidebarItems),
      { index: true, Component: GetAllTransactions },
      {
        Component: SingleUser,
        path: "/admin/user/:id",
      },
    ],
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: NotFound,
    path: "*",
  },
]);
