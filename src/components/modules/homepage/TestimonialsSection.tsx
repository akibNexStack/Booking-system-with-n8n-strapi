import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────
interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

// ─── Data ────────────────────────────────────────────────
const testimonials: TestimonialItem[] = [
  {
    id: 't-001',
    name: 'Sarah Mitchell',
    role: 'Regular Customer',
    avatar: 'SM',
    rating: 5,
    text: 'The booking experience was absolutely seamless. I found my favorite stylist, checked her availability in real-time, and had my appointment confirmed within 2 minutes. The reminder notifications are a lifesaver — I have never missed an appointment since I started using this salon.',
    service: 'Hair Styling',
    date: '2 weeks ago',
  },
  {
    id: 't-002',
    name: 'James Chen',
    role: 'Business Professional',
    avatar: 'JC',
    rating: 5,
    text: 'As someone with a packed schedule, I appreciate how easy it is to reschedule appointments when something comes up. The interface is clean, the staff profiles helped me choose the right massage therapist, and the payment process is completely hassle-free.',
    service: 'Deep Tissue Massage',
    date: '1 month ago',
  },
  {
    id: 't-003',
    name: 'Emily Rodriguez',
    role: 'First-time User',
    avatar: 'ER',
    rating: 4,
    text: 'I was skeptical about booking beauty services online, but this salon exceeded my expectations. Being able to see real reviews and portfolio photos before choosing a provider gave me so much confidence. My facial treatment was amazing!',
    service: 'Facial Treatment',
    date: '3 weeks ago',
  },
  {
    id: 't-004',
    name: 'Michael Torres',
    role: 'Monthly Subscriber',
    avatar: 'MT',
    rating: 5,
    text: 'The subscription feature is brilliant. I book my monthly grooming sessions in advance and never have to worry about availability. The loyalty rewards are a nice touch too — I have already earned two free sessions!',
    service: 'Beard Grooming',
    date: '5 days ago',
  },
  {
    id: 't-005',
    name: 'Priya Sharma',
    role: 'Wellness Enthusiast',
    avatar: 'PS',
    rating: 5,
    text: 'I have tried many salons, but this one stands out for its attention to detail. The ability to filter by specific techniques, read detailed therapist bios, and see verified certifications makes all the difference. Highly recommend!',
    service: 'Aromatherapy',
    date: '1 week ago',
  },
  {
    id: 't-006',
    name: 'David Kim',
    role: 'Corporate Client',
    avatar: 'DK',
    rating: 4,
    text: 'We use this salon for our entire office wellness program. The group booking feature and corporate dashboard make managing 50+ monthly appointments effortless. Customer support is responsive and genuinely helpful.',
    service: 'Corporate Wellness',
    date: '2 months ago',
  },
];

const trustStats = [
  { value: '4.9', label: 'Average Rating', suffix: '/5' },
  { value: '12,000+', label: 'Happy Clients', suffix: '' },
  { value: '98%', label: 'Satisfaction Rate', suffix: '' },
  { value: '3.2K+', label: '5-Star Reviews', suffix: '' },
];

// ─── Sub-Components ────────────────────────────────────
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-200 fill-slate-200'
          }`}
        />
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollToCard = (index: number): void => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / testimonials.length;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      });
    }
    setActiveIndex(index);
  };

  const handlePrev = (): void => {
    const newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    scrollToCard(newIndex);
  };

  const handleNext = (): void => {
    const newIndex = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
    scrollToCard(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700 ring-1 ring-inset ring-rose-600/10 mb-6">
            <Sparkles className="h-4 w-4" />
            Client Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            What Our Clients <span className="text-rose-600">Say</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us for their beauty and wellness appointments every single day.
          </p>
        </div>

        {/* Testimonials Grid — Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 h-full hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-100 transition-all duration-500 hover:-translate-y-1 flex flex-col">
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Quote size={18} className="text-rose-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Text */}
                <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Service Tag */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-500">
                    {testimonial.service}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {testimonial.role} · {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="snap-center flex-shrink-0 w-[85vw] sm:w-[400px]"
              >
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Quote size={18} className="text-rose-600" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 leading-relaxed text-sm mb-4 flex-grow">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Service Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-500">
                      {testimonial.service}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {testimonial.role} · {testimonial.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 bg-rose-600'
                      : 'bg-slate-300 hover:bg-rose-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`mt-20 lg:mt-24 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {trustStats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                    <span className="text-rose-400 text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;