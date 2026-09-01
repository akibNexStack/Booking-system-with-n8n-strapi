import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Heart,
} from 'lucide-react';

interface FooterLink {
  label: string;
  path: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const serviceLinks: FooterLink[] = [
  { label: 'Hair Styling', path: '/services/hair' },
  { label: 'Nail Art', path: '/services/nails' },
  { label: 'Facial Treatment', path: '/services/facial' },
  { label: 'Massage Therapy', path: '/services/massage' },
  { label: 'Beard Grooming', path: '/services/beard' },
  { label: 'Waxing', path: '/services/waxing' },
];

const companyLinks: FooterLink[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Team', path: '/team' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
  { label: 'Press', path: '/press' },
];

const supportLinks: FooterLink[] = [
  { label: 'Help Center', path: '/help' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'FAQ', path: '/faq' },
];

const socialLinks: SocialLink[] = [
  { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
  { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 overflow-hidden">
      {/* Top Rose Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />

      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-rose-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-rose-700/5 rounded-full blur-[80px]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-800 rounded-xl flex items-center justify-center text-white">
                <Calendar size={20} strokeWidth={2} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Bookly
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted destination for premium beauty and wellness services. 
              Book appointments with top-rated professionals in seconds.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-rose-500 flex-shrink-0" />
                <span>123 Beauty Lane, Suite 100, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-rose-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-rose-500 flex-shrink-0" />
                <span>hello@bookly.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Clock size={16} className="text-rose-500 flex-shrink-0" />
                <span>Mon - Sat: 9AM - 8PM | Sun: 10AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 text-sm hover:text-rose-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 text-sm hover:text-rose-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 text-sm hover:text-rose-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Newsletter
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Get updates on new services and exclusive offers.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20 transition-all"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-gradient-to-br from-rose-600 to-rose-700 text-white text-sm font-medium rounded-lg hover:from-rose-500 hover:to-rose-600 transition-all flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <span>&copy; {new Date().getFullYear()} Bookly.</span>
              <span className='text-rose-500 fill-rose-500'>akibkst</span>
              <span>Made with</span>
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              <span>for beauty lovers.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;