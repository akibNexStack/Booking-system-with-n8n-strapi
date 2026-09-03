import { ServicesSection } from "@/components/marketing/ServicesSection";
export default function ServicesPage() {
  return <div className="min-h-screen bg-slate-50 pt-16 dark:bg-slate-950"><header className="bg-gradient-to-br from-rose-600 to-rose-800 px-4 py-16 text-center"><h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">All Services</h1><p className="mx-auto max-w-xl text-rose-100">Browse our complete collection of professional services.</p></header><ServicesSection showViewAll={false} /></div>;
}
