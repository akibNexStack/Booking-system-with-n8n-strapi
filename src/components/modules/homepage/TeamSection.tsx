import React, { useState } from 'react';
import { Instagram, Phone, Clock, Star, Scissors, Sparkles, Award, MapPin } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────
interface Stylist {
  id: number;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  experience: string;
  availability: string;
  services: string[];
  socials: {
    instagram?: string;
    phone?: string;
  };
  isTopRated?: boolean;
}

// ─── Data ────────────────────────────────────────────────
const stylists: Stylist[] = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Senior Stylist",
    specialty: "Color Specialist",
    bio: "With 12 years of experience, Maria is our go-to expert for balayage, ombre, and creative color transformations. Trained at Vidal Sassoon.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 328,
    experience: "12 Years",
    availability: "Mon-Sat",
    services: ["Hair Color", "Highlights", "Balayage"],
    socials: { instagram: "#", phone: "+1 (555) 123-4567" },
    isTopRated: true
  },
  {
    id: 2,
    name: "James Chen",
    role: "Master Barber",
    specialty: "Precision Cuts",
    bio: "James brings 8 years of barbering expertise with a focus on fades, undercuts, and classic gentlemen's styles. Known for his attention to detail.",
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=500&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 256,
    experience: "8 Years",
    availability: "Tue-Sun",
    services: ["Men's Cuts", "Beard Trim", "Hot Towel"],
    socials: { instagram: "#", phone: "+1 (555) 234-5678" }
  },
  {
    id: 3,
    name: "Aisha Johnson",
    role: "Nail Artist",
    specialty: "Nail Art & Extensions",
    bio: "Aisha transforms nails into miniature works of art. From gel extensions to intricate hand-painted designs, she makes every set unique.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 412,
    experience: "6 Years",
    availability: "Mon-Sat",
    services: ["Gel Nails", "Acrylics", "Nail Art"],
    socials: { instagram: "#", phone: "+1 (555) 345-6789" },
    isTopRated: true
  },
  {
    id: 4,
    name: "Sophie Laurent",
    role: "Hair Stylist",
    specialty: "Bridal & Events",
    bio: "Sophie specializes in elegant updos, bridal styling, and event-ready looks. Her work has been featured in Vogue and Harper's Bazaar.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 189,
    experience: "10 Years",
    availability: "Wed-Sun",
    services: ["Updos", "Bridal", "Blowouts"],
    socials: { instagram: "#", phone: "+1 (555) 456-7890" }
  },
  {
    id: 5,
    name: "David Park",
    role: "Colorist",
    specialty: "Fashion Color",
    bio: "David is passionate about bold, fashion-forward colors. From pastel pinks to vivid blues, he helps clients express their personality through hair.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 145,
    experience: "5 Years",
    availability: "Mon-Fri",
    services: ["Fashion Color", "Bleach", "Toning"],
    socials: { instagram: "#", phone: "+1 (555) 567-8901" }
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "Esthetician",
    specialty: "Skincare & Waxing",
    bio: "Elena provides relaxing facials, professional waxing, and brow shaping. Her gentle touch and expertise keep clients coming back.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 203,
    experience: "7 Years",
    availability: "Tue-Sat",
    services: ["Facials", "Waxing", "Brows"],
    socials: { instagram: "#", phone: "+1 (555) 678-9012" }
  }
];

// ─── Sub-Components ────────────────────────────────────
const ServiceTag: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/10">
    {text}
  </span>
);

const StarRating: React.FC<{ rating: number; count: number }> = ({ rating, count }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : star - 0.5 <= rating
              ? 'fill-amber-400/50 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
    <span className="text-sm font-semibold text-slate-900">{rating}</span>
    <span className="text-xs text-slate-400">({count})</span>
  </div>
);

// ─── Main Component ──────────────────────────────────────
const TeamSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Hair', 'Nails', 'Color', 'Barber', 'Skincare'];

  const filteredStylists = selectedFilter === 'All'
    ? stylists
    : stylists.filter(s => 
        s.specialty.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        s.services.some(sv => sv.toLowerCase().includes(selectedFilter.toLowerCase())) ||
        s.role.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-stone-50/50 py-20 sm:py-28 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-rose-100/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-pink-100/20 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-800 ring-1 ring-inset ring-rose-700/10 mb-6">
            <Scissors className="h-4 w-4" />
            Our Artists
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Meet Your <span className="relative">
              <span className="relative z-10 text-rose-600">Stylists</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Our talented team of certified professionals is dedicated to making you look and feel your best. 
            Each stylist brings unique expertise and a passion for their craft.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mx-auto max-w-4xl mb-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '15+', label: 'Expert Stylists', icon: Scissors },
              { value: '4.9', label: 'Avg. Rating', icon: Star },
              { value: '10K+', label: 'Happy Clients', icon: Sparkles },
              { value: '8+', label: 'Years Experience', icon: Award },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center rounded-2xl bg-white/80 backdrop-blur-sm p-4 shadow-sm ring-1 ring-stone-200/60 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <stat.icon className="h-5 w-5 text-rose-500 mb-2" />
                <span className="text-2xl font-bold text-stone-900">{stat.value}</span>
                <span className="text-xs font-medium text-stone-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-white/80 text-stone-600 ring-1 ring-stone-200 hover:bg-white hover:text-stone-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStylists.map((stylist) => (
            <div
              key={stylist.id}
              onMouseEnter={() => setHoveredId(stylist.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60 transition-all duration-500 ${
                hoveredId === stylist.id
                  ? 'shadow-xl shadow-rose-500/10 -translate-y-2 ring-rose-500/20'
                  : 'hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {/* Top Rated Badge */}
              {stylist.isTopRated && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                  <Award className="h-3 w-3" />
                  Top Rated
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent transition-opacity duration-300 ${
                  hoveredId === stylist.id ? 'opacity-100' : 'opacity-60'
                }`} />

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {stylist.name}
                      </h3>
                      <p className="text-sm font-medium text-rose-300">
                        {stylist.role}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {stylist.socials.instagram && (
                        <a
                          href={stylist.socials.instagram}
                          aria-label={`${stylist.name}'s Instagram`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-rose-500 hover:scale-110"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {stylist.socials.phone && (
                        <a
                          href={`tel:${stylist.socials.phone}`}
                          aria-label={`Call ${stylist.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-rose-500 hover:scale-110"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Rating & Specialty */}
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={stylist.rating} count={stylist.reviewCount} />
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10">
                    {stylist.specialty}
                  </span>
                </div>

                {/* Bio */}
                <p className="mb-4 text-sm leading-relaxed text-stone-600 line-clamp-3">
                  {stylist.bio}
                </p>

                {/* Meta Info */}
                <div className="mb-4 flex flex-wrap gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-stone-400" />
                    {stylist.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-stone-400" />
                    {stylist.availability}
                  </span>
                </div>

                {/* Services */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {stylist.services.map((service) => (
                    <ServiceTag key={service} text={service} />
                  ))}
                </div>

                {/* Book Button */}
                <button
                  className="mt-auto w-full rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/25 active:scale-[0.98]"
                >
                  Book Appointment
                </button>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-b-2xl bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500 group-hover:w-full`} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-white px-8 py-5 shadow-sm ring-1 ring-stone-200/60">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-rose-500" />
              <span className="text-stone-600">Can't decide? We'll match you with the perfect stylist.</span>
            </div>
            <a
              href="#consultation"
              className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition-all duration-300 hover:bg-rose-700 hover:shadow-lg"
            >
              Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;