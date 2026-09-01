// components/BookingStatus.tsx
import React from 'react';

interface StatusItem {
  label: string;
  percentage: number;
  color: string;
  bgColor: string;
}

const statusData: StatusItem[] = [
  { label: 'Confirmed', percentage: 68, color: 'bg-emerald-500', bgColor: 'bg-emerald-100 text-emerald-700' },
  { label: 'Pending', percentage: 22, color: 'bg-amber-500', bgColor: 'bg-amber-100 text-amber-700' },
  { label: 'Cancelled', percentage: 7, color: 'bg-red-500', bgColor: 'bg-red-100 text-red-700' },
  { label: 'Completed', percentage: 3, color: 'bg-blue-500', bgColor: 'bg-blue-100 text-blue-700' },
];

export const BookingStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Booking Status</h3>
      <p className="text-sm text-gray-500 mb-6">Current month distribution</p>

      <div className="space-y-5">
        {statusData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className={`${item.color} h-2.5 rounded-full transition-all duration-700`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {[
            { value: '342', label: 'New' },
            { value: '28', label: 'Today' },
            { value: '94%', label: 'Rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};