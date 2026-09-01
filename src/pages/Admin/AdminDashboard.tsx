// pages/AdminDashboard.tsx
import React from 'react';
import { Sidebar } from '../adminDashboardComponent/SideBar';
import { Header } from '../adminDashboardComponent/Header';
import { StatCard } from '../adminDashboardComponent/StatCard';
import { RevenueChart } from '../adminDashboardComponent/RevenueChart';
import { BookingStatus } from '../adminDashboardComponent/BookingStatus';
import { RecentBookings } from '../adminDashboardComponent/RecentBooking';
import { TopProperties } from '../adminDashboardComponent/TopProperties';
import { ActivityFeed } from '../adminDashboardComponent/ActivityFeed';

const stats = [
  { title: 'Total Bookings', value: '1,284', change: 12.5, icon: 'bookings' as const },
  { title: 'Total Revenue', value: '$48,250', change: 8.2, icon: 'revenue' as const },
  { title: 'Active Customers', value: '892', change: 5.4, icon: 'customers' as const },
  { title: 'Available Rooms', value: '156', change: -2.1, icon: 'rooms' as const },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Header />
        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueChart />
            <BookingStatus />
          </div>

          {/* Recent Bookings Table */}
          <RecentBookings />

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopProperties />
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;