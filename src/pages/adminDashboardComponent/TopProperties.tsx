// components/TopProperties.tsx
import type { PropertyRanking } from '@/types';
import React from 'react';

const properties: PropertyRanking[] = [
  { rank: 1, name: 'Ocean View Suite', bookings: 42, revenue: 52500, rating: 4.9 },
  { rank: 2, name: 'Garden Villa', bookings: 38, revenue: 48200, rating: 4.8 },
  { rank: 3, name: 'City Loft Deluxe', bookings: 31, revenue: 35800, rating: 4.7 },
  { rank: 4, name: 'Mountain Cabin', bookings: 25, revenue: 28400, rating: 4.6 },
];

const rankColors: Record<number, string> = {
  1: 'bg-emerald-100 text-emerald-600',
  2: 'bg-blue-100 text-blue-600',
  3: 'bg-purple-100 text-purple-600',
  4: 'bg-amber-100 text-amber-600',
};

export const TopProperties: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Top Properties</h3>
        <p className="text-sm text-gray-500">Most booked this month</p>
      </div>
      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.rank} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${rankColors[property.rank]}`}>
              {property.rank}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{property.name}</p>
              <p className="text-xs text-gray-500">{property.bookings} bookings · ${property.revenue.toLocaleString()} revenue</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold">{property.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};