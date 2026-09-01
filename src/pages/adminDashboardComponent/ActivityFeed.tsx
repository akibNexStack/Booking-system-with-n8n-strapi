// components/ActivityFeed.tsx
import type { Activity } from '@/types';
import React from 'react';

const activities: Activity[] = [
  {
    id: '1',
    type: 'booking_confirmed',
    title: 'New booking confirmed',
    description: 'Sarah Johnson booked Ocean View Suite for 5 nights',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'new_customer',
    title: 'New customer registered',
    description: 'Michael Chen created a new account',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'checkin_reminder',
    title: 'Check-in reminder sent',
    description: 'Automated reminder sent to 12 guests for tomorrow',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'booking_cancelled',
    title: 'Booking cancelled',
    description: 'Olivia Brown cancelled Beachfront Bungalow reservation',
    time: '3 hours ago',
  },
  {
    id: '5',
    type: 'new_review',
    title: 'New review received',
    description: 'Emma Davis left a 5-star review for City Loft Deluxe',
    time: '5 hours ago',
  },
];

const activityIcons: Record<Activity['type'], { bg: string; icon: React.ReactNode }> = {
  booking_confirmed: {
    bg: 'bg-emerald-100',
    icon: <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  new_customer: {
    bg: 'bg-blue-100',
    icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
  },
  checkin_reminder: {
    bg: 'bg-amber-100',
    icon: <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  booking_cancelled: {
    bg: 'bg-red-100',
    icon: <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  },
  new_review: {
    bg: 'bg-purple-100',
    icon: <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  },
};

export const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-500">Latest system events</p>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activityIcons[activity.type].bg}`}>
              {activityIcons[activity.type].icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};