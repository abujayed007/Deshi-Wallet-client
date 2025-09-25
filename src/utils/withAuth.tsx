import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetUserInfoQuery(undefined);

    if (!isLoading && !data?.data?.data?.role) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && !isLoading && requiredRole !== data?.data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
