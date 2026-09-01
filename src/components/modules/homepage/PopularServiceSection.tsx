import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceCardProps } from './ServiceCard';
import ServiceCard from './ServiceCard';

interface ServiceRecord {
  documentId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  image?: { url?: string } | null;
}

const strapiApiUrl = import.meta.env.VITE_BASE_URL ?? 'http://localhost:1337/api';
const servicePlaceholder =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80';

const toServiceCard = (service: ServiceRecord): ServiceCardProps => ({
  id: service.documentId,
  name: service.name,
  category: 'Salon Service',
  price: Number(service.price),
  duration: `${service.duration} min`,
  rating: 5,
  reviewCount: 0,
  imageUrl: service.image?.url
    ? new URL(service.image.url, strapiApiUrl).toString()
    : servicePlaceholder,
});

interface PopularServicesSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

const PopularServicesSection: React.FC<PopularServicesSectionProps> = ({
  limit = 8,
  showViewAll = true,
}) => {
  const [services, setServices] = useState<ServiceCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchServices = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${strapiApiUrl}/services?populate=*`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Services request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as { data: ServiceRecord[] };
        setServices(payload.data.slice(0, limit).map(toServiceCard));
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Failed to load services. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => controller.abort();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 size={40} className="animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-slate-500">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-rose-500 text-lg font-medium mb-2">Oops!</div>
            <p className="text-slate-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Popular Services
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg">
            Choose from our curated selection of premium services, each delivered by verified professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors group"
            >
              View All Services
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularServicesSection;
