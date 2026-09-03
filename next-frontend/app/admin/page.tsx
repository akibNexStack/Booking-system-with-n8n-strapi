"use client";

import { CalendarDays, Scissors, Users } from "lucide-react";
import { useEffect } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useServicesStore } from "@/store/useServicesStore";
import { useBookingFlowStore } from "@/store/useBookingFlowStore";

function AdminDashboard() {
  const { services, fetchServices } = useServicesStore();
  const { staff } = useBookingFlowStore();
  useEffect(() => { void fetchServices(); }, [fetchServices]);
  return <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 dark:bg-slate-950"><div className="mx-auto max-w-6xl"><header><p className="text-sm font-medium text-rose-600">Salon overview</p><h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1><p className="mt-2 text-slate-500">Manage the salon catalog and monitor booking operations.</p></header><section className="mt-8 grid gap-5 sm:grid-cols-3"><article className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900"><Scissors className="text-rose-600" /><p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">{services.length}</p><p className="text-sm text-slate-500">Published services</p></article><article className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900"><Users className="text-rose-600" /><p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">{staff.length || "—"}</p><p className="text-sm text-slate-500">Staff members</p></article><article className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900"><CalendarDays className="text-rose-600" /><p className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Endpoint needed</p><p className="text-sm text-slate-500">Global booking metrics</p></article></section><section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Booking administration needs one Strapi endpoint.</strong><p className="mt-2">The current API returns only the signed-in user&apos;s bookings. Add a restricted admin endpoint before showing global booking totals, approvals, and revenue here.</p></section></div></main>;
}

export default function AdminPage() { return <RequireAuth allowedRoles={["admin", "manager"]}><AdminDashboard /></RequireAuth>; }
