import Link from "next/link";
import { BadgeCheck, Mail } from "lucide-react";

export default function VerifyPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-16 dark:bg-slate-950"><section className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/30"><Mail size={30} /></span><h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Verify your email</h1><p className="mt-3 text-sm leading-relaxed text-slate-500">We&apos;ve sent a verification link to your email address. Open it to activate your Bookly account.</p><p className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700"><BadgeCheck size={15} />Verification keeps your account secure</p><Link href="/login" className="mt-7 inline-flex rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white">Go to sign in</Link></section></main>;
}
