"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { hasRole, type AppRole } from "@/lib/roles";

export function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: AppRole[] }) {
  const router = useRouter();
  const { user, isLoading, hydrate } = useAuthStore();
  const allowed = !allowedRoles || hasRole(user, allowedRoles);
  useEffect(() => { void hydrate(); }, [hydrate]);
  useEffect(() => { if (!isLoading && !user) router.replace("/login"); else if (!isLoading && !allowed) router.replace("/unauthorized"); }, [isLoading, user, allowed, router]);
  if (isLoading || !user || !allowed) return <main className="flex min-h-screen items-center justify-center bg-slate-50 pt-16 dark:bg-slate-950"><Loader2 className="animate-spin text-rose-600" /></main>;
  return <>{children}</>;
}
