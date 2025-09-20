import type { ComponentType } from "react";

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  role: string;
  status: string;
}

export type ApiError = {
  data?: {
    message?: string;
  };
};

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "ADMIN" | "USER" | "AGENT";
