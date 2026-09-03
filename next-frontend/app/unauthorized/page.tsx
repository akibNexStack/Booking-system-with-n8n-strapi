import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export default function UnauthorizedPage() {
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-16 dark:bg-slate-950"><section className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/30"><LockKeyhole size={30} /></span><h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Access restricted</h1><p className="mt-3 text-sm leading-relaxed text-slate-500">This page is only available to salon administrators.</p><Link href="/" className="mt-7 inline-flex rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white">Return home</Link></section></main>;
}
