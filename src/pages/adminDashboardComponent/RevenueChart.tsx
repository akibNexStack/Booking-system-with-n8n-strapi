// components/RevenueChart.tsx
import React, { useState } from 'react';

interface MonthlyData {
  month: string;
  value: number;
  current: boolean;
}

const revenueData: MonthlyData[] = [
  { month: 'Jan', value: 45, current: false },
  { month: 'Feb', value: 62, current: false },
  { month: 'Mar', value: 55, current: false },
  { month: 'Apr', value: 78, current: false },
  { month: 'May', value: 85, current: false },
  { month: 'Jun', value: 70, current: false },
  { month: 'Jul', value: 92, current: true },
  { month: 'Aug', value: 30, current: false },
  { month: 'Sep', value: 25, current: false },
  { month: 'Oct', value: 20, current: false },
  { month: 'Nov', value: 15, current: false },
  { month: 'Dec', value: 10, current: false },
];

type Period = 'yearly' | 'monthly' | 'weekly';

export const RevenueChart: React.FC = () => {
  const [period, setPeriod] = useState<Period>('yearly');

  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Monthly revenue for 2026</p>
        </div>
        <div className="flex gap-2">
          {(['yearly', 'monthly', 'weekly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                period === p
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 flex items-end gap-3">
        {revenueData.map((item) => (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-lg transition-all duration-500 ${
                item.current ? 'bg-emerald-600' : item.value > 40 ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
              style={{ height: `${item.value}%` }}
            />
            <span className={`text-xs ${item.current ? 'font-semibold text-emerald-600' : 'text-gray-500'}`}>
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};