import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Heart, Award, Users, Sparkles, MapPin, Clock, Phone, ChevronRight, Star, CheckCircle2 } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────
interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────
const milestones: Milestone[] = [
  {
    year: '2016',
    title: 'The Beginning',
    description: 'Opened our first studio with just two chairs and a dream to redefine the salon experience.'
  },
  {
    year: '2018',
    title: 'Growing Family',
    description: 'Expanded to a team of 8 talented stylists and introduced our signature color services.'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Launched our online booking platform and virtual consultations during challenging times.'
  },
  {
    year: '2022',
    title: 'Award Recognition',
    description: 'Named "Best Salon in the City" by Beauty Magazine and reached 10,000 happy clients.'
  },
  {
    year: '2024',
    title: 'New Location',
    description: 'Opened our flagship studio with 15 styling stations, spa rooms, and a nail art bar.'
  },
  {
    year: '2026',
    title: 'Industry Leaders',
    description: 'Training academy launched. Now mentoring the next generation of beauty professionals.'
  }
];

const values: Value[] = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Client First',
    description: 'Every visit is tailored to you. We listen, advise, and deliver results that make you feel confident.'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Excellence',
    description: 'Our team trains continuously with industry leaders to bring you the latest techniques and trends.'
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Creativity',
    description: 'We believe hair and beauty are art forms. Every style is a unique expression of your personality.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community',
    description: 'More than a salon — we are a welcoming space where everyone belongs and leaves feeling uplifted.'
  }
];

const stats = [
  { value: '10K+', label: 'Happy Clients', suffix: '' },
  { value: '15', label: 'Expert Stylists', suffix: '+' },
  { value: '50K+', label: 'Services Done', suffix: '' },
  { value: '4.9', label: 'Average Rating', suffix: '/5' }
];

const features = [
  'Premium organic products',
  'Online booking 24/7',
  'Complimentary consultations',
  'Loyalty rewards program',
  'Private styling suites',
  'Same-day appointments'
];

// ─── Animated Counter ────────────────────────────────────
const AnimatedCounter: React.FC<{ target: string; suffix: string; duration?: number }> = ({ 
  target, 
  suffix, 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
    const isDecimal = target.includes('.');
    // const prefix = target.match(/^[^0-9]*/)?.[0] || '';

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = numericValue * eased;

      if (isDecimal) {
        setCount(parseFloat(current.toFixed(1)));
      } else {
        setCount(Math.floor(current));
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  const displayValue = target.includes('.') 
    ? count.toFixed(1) 
    : count.toLocaleString();

  return (
    <span ref={ref}>
      {target.match(/^[^0-9]*/)?.[0]}{displayValue}{suffix}
    </span>
  );
};

// ─── Main Component ──────────────────────────────────────
const AboutSection: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* ─── Hero Split Section ─────────────────────────── */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2">
            {/* Left: Content */}
            <div className="flex flex-col justify-center px-4 py-20 sm:px-6 lg:px-12 lg:py-32">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700 ring-1 ring-inset ring-rose-600/10 mb-6">
                  <Scissors className="h-4 w-4" />
                  About Us
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                  Where Beauty
                  <span className="block text-rose-600">Meets Passion</span>
                </h2>

                <p className="mt-6 text-lg leading-8 text-stone-600 max-w-xl">
                  Since 2016, we have been more than just a salon — we are a destination for transformation. 
                  Our mission is to help every client discover their best look and leave feeling radiant, 
                  confident, and truly cared for.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#book"
                    className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:bg-rose-700 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Book Now
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 transition-all duration-300 hover:bg-stone-50 hover:ring-stone-300"
                  >
                    Our Services
                  </a>
                </div>
              </div>

              {/* Features List */}
              <div className={`mt-12 grid grid-cols-2 gap-3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-rose-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image Grid */}
            <div className={`relative hidden lg:block transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-amber-100/30" />
              <div className="relative h-full min-h-[600px] p-8">
                <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl row-span-2">
                    <img
                      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop"
                      alt="Salon interior"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop"
                      alt="Hair styling"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop"
                      alt="Nail art"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Floating Card */}
                <div className="absolute bottom-12 left-12 right-12 rounded-2xl bg-white/95 backdrop-blur-sm p-5 shadow-xl ring-1 ring-stone-200/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <Star className="h-6 w-6 fill-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Trusted by 10,000+ Clients</p>
                      <p className="text-xs text-stone-500">Consistently rated 4.9 stars across all platforms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stats Bar ──────────────────────────────────── */}
      <div className="border-y border-stone-100 bg-stone-50/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${400 + i * 100}ms` }}
              >
                <div className="text-3xl font-bold text-stone-900 sm:text-4xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm font-medium text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Values Section ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-stone-900 sm:text-4xl">Our Values</h3>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            The principles that guide everything we do, from the products we choose to the way we treat every guest.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200/60 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:ring-rose-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-500/25">
                {value.icon}
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">{value.title}</h4>
              <p className="text-sm leading-relaxed text-stone-600">{value.description}</p>
              <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-b-2xl bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Timeline / Story Section ───────────────────── */}
      <div className="relative bg-stone-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-rose-500 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white sm:text-4xl">Our Journey</h3>
            <p className="mt-4 text-lg text-stone-400 max-w-2xl mx-auto">
              From a small two-chair studio to an award-winning destination — here's how we got here.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 to-amber-500 sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 sm:items-center ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-0 z-10 sm:left-1/2 sm:-translate-x-1/2">
                    <button
                      onClick={() => setActiveMilestone(i)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                        activeMilestone === i
                          ? 'border-rose-500 bg-white scale-125'
                          : 'border-stone-700 bg-stone-800 hover:border-rose-500/50'
                      }`}
                    >
                      <div className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        activeMilestone === i ? 'bg-rose-500' : 'bg-stone-500'
                      }`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className={`ml-12 sm:ml-0 sm:w-5/12 ${i % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}>
                    <div
                      onClick={() => setActiveMilestone(i)}
                      className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                        activeMilestone === i
                          ? 'bg-white/10 backdrop-blur-sm ring-1 ring-white/20'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="inline-block rounded-full bg-rose-500/20 px-3 py-1 text-sm font-bold text-rose-400 mb-2">
                        {milestone.year}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-2">{milestone.title}</h4>
                      <p className={`text-sm leading-relaxed text-stone-400 transition-all duration-500 ${
                        activeMilestone === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 sm:max-h-40 sm:opacity-100'
                      }`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden sm:block sm:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Contact / Location CTA ─────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 to-rose-800 px-6 py-16 sm:px-12 lg:px-16">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-300 blur-3xl" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white sm:text-4xl">
                Ready for Your Transformation?
              </h3>
              <p className="mt-4 text-lg text-rose-100">
                Visit us today and experience the difference. Walk-ins welcome, but booking ahead guarantees your preferred time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-rose-700 shadow-lg transition-all duration-300 hover:bg-rose-50 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Appointment
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl bg-white/10 backdrop-blur-sm p-5 ring-1 ring-white/20">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Visit Our Studio</p>
                  <p className="text-sm text-rose-100">123 Beauty Lane, Suite 100<br />Downtown District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-white/10 backdrop-blur-sm p-5 ring-1 ring-white/20">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Opening Hours</p>
                  <p className="text-sm text-rose-100">Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-white/10 backdrop-blur-sm p-5 ring-1 ring-white/20">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  <p className="text-sm text-rose-100">+1 (555) 123-4567<br />hello@glamourstudio.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;