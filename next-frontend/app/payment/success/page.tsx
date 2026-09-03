import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-16 dark:bg-slate-950"><section className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900"><CheckCircle2 size={64} className="mx-auto text-emerald-500" /><h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Payment successful</h1><p className="mt-3 text-sm leading-relaxed text-slate-500">Your payment was received successfully. Check My Bookings for your appointment status.</p><Link href="/my-bookings" className="mt-7 inline-flex rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white">View My Bookings</Link></section></main>;
}
