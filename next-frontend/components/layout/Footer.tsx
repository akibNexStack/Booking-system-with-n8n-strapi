import Link from "next/link";
import { ArrowRight, Calendar, Clock, Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

const serviceLinks = [{ label: "Hair Styling", path: "/services/hair" }, { label: "Nail Art", path: "/services/nails" }, { label: "Facial Treatment", path: "/services/facial" }, { label: "Massage Therapy", path: "/services/massage" }, { label: "Beard Grooming", path: "/services/beard" }, { label: "Waxing", path: "/services/waxing" }];
const companyLinks = [{ label: "About Us", path: "/about" }, { label: "Our Team", path: "/team" }, { label: "Careers", path: "/careers" }, { label: "Blog", path: "/blog" }, { label: "Press", path: "/press" }];
const supportLinks = [{ label: "Help Center", path: "/help" }, { label: "Contact Us", path: "/contact" }, { label: "Privacy Policy", path: "/privacy" }, { label: "Terms of Service", path: "/terms" }, { label: "FAQ", path: "/faq" }];
const socialLinks = [{ icon: Facebook, label: "Facebook" }, { icon: Instagram, label: "Instagram" }, { icon: Twitter, label: "Twitter" }, { icon: Youtube, label: "YouTube" }];

function FooterLinks({ title, links }: { title: string; links: { label: string; path: string }[] }) {
  return <div className="lg:col-span-2"><h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">{title}</h2><ul className="space-y-3">{links.map((link) => <li key={link.path}><Link href={link.path} className="text-sm text-slate-400 transition-colors duration-200 hover:text-rose-400">{link.label}</Link></li>)}</ul></div>;
}

export function Footer() {
  return <footer className="relative overflow-hidden bg-slate-900">
    <div className="h-1 w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />
    <div className="pointer-events-none absolute inset-0"><div className="absolute left-1/4 top-0 h-[400px] w-[500px] rounded-full bg-rose-600/5 blur-[100px]" /><div className="absolute bottom-0 right-1/4 h-[300px] w-[400px] rounded-full bg-rose-700/5 blur-[80px]" /></div>
    <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4"><Link href="/" className="mb-6 flex items-center gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 text-white"><Calendar size={20} strokeWidth={2} /></span><span className="text-2xl font-bold tracking-tight text-white">Bookly</span></Link><p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">Your trusted destination for premium beauty and wellness services. Book appointments with top-rated professionals in seconds.</p><div className="space-y-3 text-sm text-slate-400"><p className="flex items-center gap-3"><MapPin size={16} className="shrink-0 text-rose-500" />123 Beauty Lane, Suite 100, NY 10001</p><p className="flex items-center gap-3"><Phone size={16} className="shrink-0 text-rose-500" />+1 (555) 123-4567</p><p className="flex items-center gap-3"><Mail size={16} className="shrink-0 text-rose-500" />hello@bookly.com</p><p className="flex items-center gap-3"><Clock size={16} className="shrink-0 text-rose-500" />Mon - Sat: 9AM - 8PM | Sun: 10AM - 6PM</p></div></div>
        <FooterLinks title="Services" links={serviceLinks} /><FooterLinks title="Company" links={companyLinks} /><FooterLinks title="Support" links={supportLinks} />
        <div className="lg:col-span-2"><h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h2><p className="mb-4 text-sm text-slate-400">Get updates on new services and exclusive offers.</p><form className="flex flex-col gap-2"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Enter your email" className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/20" /><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-rose-600 to-rose-700 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-rose-500 hover:to-rose-600">Subscribe <ArrowRight size={14} /></button></form></div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row"><div className="flex items-center gap-1 text-sm text-slate-500"><span>© {new Date().getFullYear()} Bookly.</span><span className="text-rose-500">akibkst</span><span>Made with</span><Heart size={14} className="fill-rose-500 text-rose-500" /><span>for beauty lovers.</span></div><div className="flex items-center gap-3">{socialLinks.map(({ icon: Icon, label }) => <a key={label} href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all duration-300 hover:bg-rose-600 hover:text-white"><Icon size={18} /></a>)}</div></div>
    </div>
  </footer>;
}
