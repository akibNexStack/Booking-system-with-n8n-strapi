"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ForgotPasswordPage() {
  const { requestPasswordReset, isLoading, error } = useAuthStore();
  const [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); try { await requestPasswordReset(String(new FormData(event.currentTarget).get("email"))); setSent(true); } catch { /* Store exposes error. */ } }
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-16 dark:bg-slate-950"><section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-slate-900"><Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-rose-600"><ArrowLeft size={16} />Back to sign in</Link><span className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/30"><Mail size={26} /></span><h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">Reset your password</h1><p className="mt-2 text-sm leading-relaxed text-slate-500">Enter your email address and we&apos;ll send a reset link if the account exists.</p>{sent ? <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">Check your inbox for the password reset link.</p> : <form onSubmit={submit} className="mt-7 space-y-4"><input name="email" type="email" placeholder="you@example.com" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10" /><button disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-800 px-4 py-3.5 text-sm font-semibold text-white disabled:opacity-60">{isLoading ? "Sending..." : "Send reset link"}<Send size={16} /></button>{error && <p className="rounded-xl bg-rose-50 p-3 text-center text-sm text-rose-700">{error}</p>}</form>}</section></main>;
}
