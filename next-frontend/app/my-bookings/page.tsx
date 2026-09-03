"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock, Scissors, Search, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useBookingsStore } from "@/store/useBookingsStore";
import type { BookingStatus } from "@/types/api";

const statusStyles: Record<BookingStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cancelled: "border-slate-200 bg-slate-100 text-slate-600",
};

export default function MyBookingsPage() {
  const [search, setSearch] = useState("");
  const { user, isLoading: isAuthLoading, hydrate } = useAuthStore();
  const { bookings, isLoading: isBookingsLoading, error, fetchBookings } = useBookingsStore();
  useEffect(() => { void hydrate(); }, [hydrate]);
  useEffect(() => { if (user?.email) void fetchBookings(); }, [user?.email, fetchBookings]);
  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter((booking) => [booking.service?.name, booking.staff?.name, booking.customerName].filter(Boolean).some((value) => value?.toLowerCase().includes(query)));
  }, [bookings, search]);

  if (isAuthLoading) return <main className="flex min-h-screen items-center justify-center bg-slate-50 pt-16 dark:bg-slate-950"><div className="h-32 w-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" /></main>;
  if (!user?.email) return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-16 dark:bg-slate-950"><section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"><span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/30"><Calendar size={28} /></span><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign in to see your bookings</h1><p className="mt-2 text-sm leading-relaxed text-slate-500">Bookings made while signed in are saved to your account.</p><Link href="/login" className="mt-6 inline-flex rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20">Sign In</Link></section></main>;

  return <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 dark:bg-slate-950"><div className="mx-auto max-w-5xl"><header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/30"><CheckCircle2 size={14} />Appointment dashboard</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Bookings</h1><p className="mt-1 text-slate-500">Track every appointment and its confirmation status.</p></div><label className="relative block sm:w-72"><span className="sr-only">Search bookings</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bookings" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></label></header>{isBookingsLoading && <div className="grid gap-4">{[1, 2, 3].map((item) => <div key={item} className="h-36 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div>}{error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}{!isBookingsLoading && !error && filteredBookings.length === 0 && <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900"><Scissors className="mx-auto mb-4 text-rose-600" size={36} /><h2 className="text-lg font-bold text-slate-900 dark:text-white">No bookings found</h2><p className="mt-2 text-sm text-slate-500">Choose a service to create your first appointment.</p><Link href="/services" className="mt-5 inline-flex text-sm font-semibold text-rose-600">Browse services →</Link></section>}<div className="grid gap-4">{filteredBookings.map((booking) => <article key={booking.documentId} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/30"><Scissors size={20} /></span><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{booking.service?.name ?? "Salon service"}</h2><p className="text-xs text-slate-400">Reference: {booking.documentId}</p></div></div><div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300"><span className="flex items-center gap-2"><Calendar size={16} className="text-rose-500" />{booking.date}</span><span className="flex items-center gap-2"><Clock size={16} className="text-rose-500" />{booking.time.slice(0, 5)}</span><span className="flex items-center gap-2"><User size={16} className="text-rose-500" />{booking.staff?.name ?? "Stylist pending"}</span></div></div><span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>{booking.status}</span></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800"><span className="text-slate-400">Slack approval updates this status automatically.</span>{booking.service?.price != null && <span className="font-bold text-slate-900 dark:text-white">${booking.service.price}</span>}</div></article>)}</div></div></main>;
}
