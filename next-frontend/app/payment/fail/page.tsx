import Link from "next/link";
import { CircleX } from "lucide-react";

export default function PaymentFailPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-16 dark:bg-slate-950"><section className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900"><CircleX size={64} className="mx-auto text-rose-500" /><h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Payment was not completed</h1><p className="mt-3 text-sm leading-relaxed text-slate-500">No payment was recorded. You can safely try again from your booking page.</p><Link href="/services" className="mt-7 inline-flex rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white">Browse services</Link></section></main>;
}
