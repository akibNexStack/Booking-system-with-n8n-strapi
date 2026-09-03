"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Chrome, Eye, EyeOff, Github, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { useAuthStore } from "@/store/useAuthStore";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await login(String(form.get("identifier")), String(form.get("password")));
      router.push("/my-bookings");
    } catch { /* Store supplies the user-facing message. */ }
  }

  return <AuthShell mode="login"><div className="w-full"><span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600"><Sparkles size={13} />Secure Login</span><h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Sign in to your account</h2><p className="mt-2 text-sm text-slate-500">Don&apos;t have an account? <Link href="/register" className="font-semibold text-rose-600 hover:text-rose-700">Create one now</Link></p><div className="mt-8 grid grid-cols-2 gap-3"><button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"><Chrome size={18} />Google</button><button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"><Github size={18} />GitHub</button></div><div className="my-8 flex items-center gap-4 text-[11px] font-medium uppercase tracking-wider text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">or continue with email</div><form onSubmit={handleSubmit} className="space-y-5"><label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email Address<span className="relative mt-2 block"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="identifier" type="email" placeholder="you@example.com" required className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10" /></span></label><label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password<span className="relative mt-2 block"><LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-rose-600" aria-label="Show or hide password">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label><div className="flex items-center justify-between"><label className="flex items-center gap-2 text-sm text-slate-500"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />Remember me</label><button type="button" className="text-sm font-medium text-rose-600 hover:text-rose-700">Forgot password?</button></div><button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-800 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:from-rose-700 hover:to-rose-900 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? "Signing in..." : "Sign In"}<span aria-hidden>→</span></button>{error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-center text-sm text-rose-600">{error}</p>}</form><p className="mt-7 text-center text-xs leading-relaxed text-slate-400">By signing in, you agree to our <a href="#terms" className="text-rose-600">Terms of Service</a> and <a href="#privacy" className="text-rose-600">Privacy Policy</a>.</p></div></AuthShell>;
}
