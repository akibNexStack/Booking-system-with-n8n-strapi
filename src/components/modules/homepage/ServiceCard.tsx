import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

export interface ServiceCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  category,
  price,
  duration,
  rating,
  reviewCount,
  imageUrl,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-200 transition-all duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-slate-700">
            {category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-slate-700">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Service Name */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Duration & Reviews */}
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Clock size={14} strokeWidth={2} className="text-slate-400" />
            {duration}
          </span>
          <span>{reviewCount.toLocaleString()} reviews</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">${price}</span>
            <span className="text-xs text-slate-400">/session</span>
          </div>
          <Link
            to={`/booking/${id}`}
            className="px-4 py-2 bg-gradient-to-br from-rose-600 to-rose-800 text-white text-sm font-medium rounded-lg hover:from-rose-700 hover:to-rose-900 transition-all active:scale-95 transform shadow-sm shadow-rose-500/20"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;