import React from 'react';
import Navbar from '@/components/layout/Navbar';
import PopularServicesSection from './PopularServiceSection';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Page Header */}
      <div className="bg-gradient-to-br from-rose-600 to-rose-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            All Services
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Browse our complete collection of professional services.
          </p>
        </div>
      </div>
      <PopularServicesSection  limit={12} showViewAll={false} />
    </div>
  );
};

export default ServicesPage;