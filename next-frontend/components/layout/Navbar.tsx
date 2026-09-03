"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { getAppRole } from "@/lib/roles";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Team", path: "/team" },
  { label: "About", path: "/about" },
];

function ThemeToggle({ lightSurface }: { lightSurface: boolean }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const preference = window.localStorage.getItem("bookly-theme");
    const dark = preference ? preference === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("bookly-theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${lightSurface ? "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" : "border-white/20 text-white hover:bg-white/10"}`}>{isDark ? <Sun size={17} /> : <Moon size={17} />}</button>;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoading: isUserLoading, hydrate, logout } = useAuthStore();
  const isHomePage = pathname === "/";
  const lightSurface = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => { void hydrate(); }, [hydrate]);

  const userName = user?.username ?? user?.email?.split("@")[0] ?? "Account";
  const initials = userName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const role = getAppRole(user);
  const canManageBookings = role === "admin" || role === "manager";
  const accountPath = canManageBookings ? "/admin" : "/my-bookings";
  const isSignedIn = Boolean(user?.email);
  const navTextClass = lightSurface ? "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" : "text-white/80 hover:text-white";

  function handleLogout() {
    logout();
    router.push("/");
    router.refresh();
  }

  return <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${lightSurface ? "bg-white/90 shadow-sm backdrop-blur-md dark:bg-slate-950/90" : "bg-transparent"}`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-2" aria-label="Bookly home"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 text-white"><Calendar size={18} strokeWidth={2} /></span><span className={`text-xl font-bold tracking-tight ${lightSurface ? "text-slate-900 dark:text-white" : "text-white"}`}>Bookly</span></Link>
      <div className="hidden items-center gap-8 md:flex">{navLinks.map((link) => <Link key={link.path} href={link.path} className={`text-sm font-medium transition-colors ${pathname === link.path ? "text-rose-600" : navTextClass}`}>{link.label}</Link>)}</div>
      <div className="hidden items-center gap-3 md:flex"><ThemeToggle lightSurface={lightSurface} />{isUserLoading ? <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200/70" /> : isSignedIn ? <><Link href={accountPath} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${lightSurface ? "hover:bg-slate-100 dark:hover:bg-slate-800" : "hover:bg-white/10"}`}><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-xs font-bold text-white">{initials}</span><span className={`max-w-28 truncate text-sm font-semibold ${lightSurface ? "text-slate-700 dark:text-slate-200" : "text-white"}`}>{canManageBookings ? `${role === "admin" ? "Admin" : "Manager"} ${userName}` : userName}</span></Link><button type="button" onClick={handleLogout} className={`rounded-lg p-2 ${lightSurface ? "text-slate-500 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800" : "text-white/80 hover:bg-white/10 hover:text-white"}`} aria-label="Sign out"><LogOut size={18} /></button></> : <><Link href="/login" className={`rounded-lg px-4 py-2 text-sm font-medium ${lightSurface ? "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" : "text-white hover:bg-white/10"}`}>Sign In</Link><Link href="/register" className="rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-600/20 hover:from-rose-700 hover:to-rose-900">Get Started</Link></>}</div>
      <button type="button" className="rounded-lg p-2 md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={mobileOpen}>{mobileOpen ? <X size={24} className={lightSurface ? "text-slate-900 dark:text-white" : "text-white"} /> : <Menu size={24} className={lightSurface ? "text-slate-900 dark:text-white" : "text-white"} />}</button>
    </div></div>
    {mobileOpen && <div className="border-t border-slate-100 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950 md:hidden"><div className="space-y-1 px-4 py-3">{navLinks.map((link) => <Link key={link.path} href={link.path} className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${pathname === link.path ? "bg-rose-50 text-rose-600 dark:bg-rose-950/30" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"}`}>{link.label}</Link>)}<div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 dark:border-slate-800"><ThemeToggle lightSurface />{isSignedIn ? <><Link href={accountPath} className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-xs font-bold text-white">{initials}</span>{canManageBookings ? `${role === "admin" ? "Admin" : "Manager"} ${userName}` : userName}</Link><button type="button" onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"><LogOut size={16} />Sign Out</button></> : <><Link href="/login" className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-200">Sign In</Link><Link href="/register" className="rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 px-4 py-2.5 text-center text-sm font-medium text-white">Get Started</Link></>}</div></div></div>}
  </nav>;
}
