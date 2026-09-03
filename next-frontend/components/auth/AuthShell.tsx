import { Calendar, CheckCircle2, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { ReactNode } from "react";

type AuthShellProps = { mode: "login" | "register"; children: ReactNode };

const content = {
  login: {
    heading: "Welcome back to your beauty journey",
    description: "Sign in to access your appointments, manage bookings, and discover new services tailored just for you.",
    benefits: ["Over 12,000 happy clients trust Bookly", "Book appointments in under 2 minutes", "4.9 average rating from verified reviews"],
    icons: [CheckCircle2, CheckCircle2, CheckCircle2],
  },
  register: {
    heading: "Start your beauty journey today",
    description: "Join thousands of happy clients who book their favorite beauty and wellness services with ease.",
    benefits: ["Free first appointment for new members", "Secure payments & data protection", "Cancel or reschedule anytime"],
    icons: [Star, ShieldCheck, CheckCircle2],
  },
};

export function AuthShell({ mode, children }: AuthShellProps) {
  const details = content[mode];
  return <div className="auth-page relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950"><div className="pointer-events-none absolute inset-0"><div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rose-100/60 blur-3xl dark:bg-rose-950/20" /><div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" /></div><div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-300/40 lg:min-h-[760px] lg:grid-cols-2 dark:bg-slate-900"><aside className="hidden flex-col bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 p-12 text-white lg:flex"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20"><Calendar size={21} /></span><span className="text-2xl font-bold tracking-tight">Bookly</span></div><div className="mt-16"><h1 className="max-w-sm text-4xl font-bold leading-tight">{details.heading}</h1><p className="mt-7 max-w-sm text-lg leading-8 text-rose-100">{details.description}</p></div><div className="mt-auto space-y-4">{details.benefits.map((benefit, index) => { const Icon = details.icons[index]; return <div key={benefit} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-sm text-rose-50"><Icon size={19} className="shrink-0 text-amber-300" />{benefit}</div>; })}</div></aside><section className="flex items-center px-6 py-10 sm:px-12 lg:px-12">{children}</section></div></div>;
}
