// components/RecentBookings.tsx
import type { RecentBooking } from '@/types';
import React from 'react';

const bookings: RecentBooking[] = [
  {
    id: '#BK-2841',
    customer: { name: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff&size=32' },
    property: 'Ocean View Suite',
    checkIn: 'Aug 02, 2026',
    checkOut: 'Aug 07, 2026',
    amount: 1250,
    status: 'confirmed',
  },
  {
    id: '#BK-2840',
    customer: { name: 'Michael Chen', avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff&size=32' },
    property: 'Mountain Cabin',
    checkIn: 'Aug 05, 2026',
    checkOut: 'Aug 10, 2026',
    amount: 890,
    status: 'pending',
  },
  {
    id: '#BK-2839',
    customer: { name: 'Emma Davis', avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=ec4899&color=fff&size=32' },
    property: 'City Loft Deluxe',
    checkIn: 'Jul 30, 2026',
    checkOut: 'Aug 02, 2026',
    amount: 650,
    status: 'completed',
  },
  {
    id: '#BK-2838',
    customer: { name: 'James Wilson', avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=10b981&color=fff&size=32' },
    property: 'Garden Villa',
    checkIn: 'Aug 12, 2026',
    checkOut: 'Aug 18, 2026',
    amount: 2100,
    status: 'confirmed',
  },
  {
    id: '#BK-2837',
    customer: { name: 'Olivia Brown', avatar: 'https://ui-avatars.com/api/?name=Olivia+Brown&background=8b5cf6&color=fff&size=32' },
    property: 'Beachfront Bungalow',
    checkIn: 'Aug 08, 2026',
    checkOut: 'Aug 14, 2026',
    amount: 1780,
    status: 'cancelled',
  },
];

const statusStyles: Record<RecentBooking['status'], string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

export const RecentBookings: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
          <p className="text-sm text-gray-500">Latest reservation activities</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Booking ID', 'Customer', 'Property', 'Check In', 'Check Out', 'Amount', 'Status', 'Action'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-emerald-600">{booking.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={booking.customer.avatar} className="w-8 h-8 rounded-full" alt={booking.customer.name} />
                    <span className="text-sm font-medium text-gray-900">{booking.customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.property}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.checkIn}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.checkOut}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${booking.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusStyles[booking.status]}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 5 of 1,284 bookings</p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
            Previous
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1.5 text-sm rounded-lg ${
                page === 1 ? 'bg-gray-100 text-gray-700 font-medium' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
};