import type { StrapiUser } from "@/types/api";

export type AppRole = "customer" | "staff" | "manager" | "admin";

export function getAppRole(user: StrapiUser | null | undefined): AppRole {
  const value = String(user?.role?.type ?? user?.role?.name ?? "authenticated").toLowerCase();
  if (value.includes("admin")) return "admin";
  if (value.includes("manager")) return "manager";
  if (value.includes("staff")) return "staff";
  return "customer";
}

export function hasRole(user: StrapiUser | null | undefined, allowed: AppRole[]) {
  return allowed.includes(getAppRole(user));
}
