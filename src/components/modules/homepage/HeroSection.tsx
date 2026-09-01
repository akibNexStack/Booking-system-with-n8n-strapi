import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '12K+', label: 'Happy Clients' },
  { value: '48K+', label: 'Bookings Made' },
  { value: '150+', label: 'Top Professionals' },
  { value: '3.2K+', label: '5-Star Reviews' },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-slate-900 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/90 to-slate-900" />
      </div>

      {/* Decorative Rose Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-rose-500/8 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-rose-700/10 rounded-full blur-[90px]" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-300 text-xs font-medium mb-6 animate-fade-in-up backdrop-blur-sm">
          <Sparkles size={14} strokeWidth={2} />
          <span>New: Instant booking confirmations</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 animate-fade-in-up animation-delay-100">
          Book Your Next <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">
            Appointment
          </span>{' '}
          in Seconds
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Discover top-rated professionals, view real-time availability, and book
          appointments with confidence. No calls, no waiting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-300">
          <Link
            to="/register"
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl font-semibold hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Book Now
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm active:scale-[0.98]"
          >
            Explore Services
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;