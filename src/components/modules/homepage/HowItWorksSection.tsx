import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  UserCircle,
  CalendarCheck,
  PartyPopper,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface StepItem {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const steps: StepItem[] = [
  {
    stepNumber: '01',
    title: 'Choose a Service',
    description:
      'Explore our wide range of professional services. Use filters to find the perfect match for your needs, budget, and schedule.',
    icon: <Search size={24} strokeWidth={2} />,
    features: ['50+ services', 'Category filters', 'Price comparison'],
  },
  {
    stepNumber: '02',
    title: 'Select Your Provider',
    description:
      'Browse verified professional profiles. View ratings, portfolios, and specialties to pick your favorite service provider.',
    icon: <UserCircle size={24} strokeWidth={2} />,
    features: ['Verified profiles', 'Real reviews', 'Portfolio gallery'],
  },
  {
    stepNumber: '03',
    title: 'Pick Date & Time',
    description:
      'See real-time availability for your chosen provider. Select a date and time slot that works perfectly for your calendar.',
    icon: <CalendarCheck size={24} strokeWidth={2} />,
    features: ['Live calendar', 'Instant slots', 'Easy rescheduling'],
  },
  {
    stepNumber: '04',
    title: 'Confirm & Relax',
    description:
      'Complete your booking with secure payment. Receive confirmation, calendar invites, and reminders — then just show up and enjoy.',
    icon: <PartyPopper size={24} strokeWidth={2} />,
    features: ['Secure payment', 'Auto reminders', 'Calendar sync'],
  },
];

const HowItWorksSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-rose-50/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-amber-50/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-rose-100 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <CheckCircle2 size={14} />
            Simple Booking Flow
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            How It <span className="text-rose-600">Works</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Four simple steps from discovery to confirmation. Book your appointment in under two minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-[88px] left-[12.5%] right-[12.5%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.stepNumber}
                ref={(el) => { cardRefs.current[index] = el; }}
                data-index={index}
                className={`relative transition-all duration-700 ${
                  visibleCards.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Step Number Badge */}
                <div className="flex justify-center mb-6 lg:mb-8">
                  <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg shadow-rose-600/25 group-hover:scale-110 transition-transform duration-300 border-4 border-slate-50">
                    {step.stepNumber}
                  </div>
                </div>

                {/* Card */}
                <div className="group bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-100 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-rose-600 group-hover:to-rose-800 group-hover:text-white transition-all duration-500 shadow-sm">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 leading-relaxed text-sm mb-6 flex-grow">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2.5 text-sm text-slate-600"
                      >
                        <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={12} className="text-rose-500" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Accent */}
                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <div className="h-1 w-10 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-rose-800 transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-20 lg:mt-24">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: '< 2 min', label: 'Average booking time' },
                { value: '100%', label: 'Instant confirmation' },
                { value: '24/7', label: 'Online booking' },
                { value: '0$', label: 'Booking fees' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-rose-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-5">
            Ready to book your first appointment?
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-xl font-semibold text-sm hover:from-rose-700 hover:to-rose-900 transition-all shadow-lg shadow-rose-600/20 group"
          >
            Start Booking Now
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;