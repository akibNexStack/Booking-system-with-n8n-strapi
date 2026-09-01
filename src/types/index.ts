import type { ComponentType } from "react";

// re-exporting types for easier imports from auth
export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

// re-exporting types for easier imports from tour
export type { ITourPackage } from "./tour.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

// Sidebar Item Interface use in generateRoutes.tsx and adminSidebarItems.ts
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

// Zod issue type for error handling
type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

// General error response interface
export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}


// types.ts
export interface RecentBooking {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  property: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface StatCardData {
  title: string;
  value: string;
  change: number;
  icon: 'bookings' | 'revenue' | 'customers' | 'rooms';
}

export interface PropertyRanking {
  rank: number;
  name: string;
  bookings: number;
  revenue: number;
  rating: number;
}

export interface Activity {
  id: string;
  type: 'booking_confirmed' | 'new_customer' | 'checkin_reminder' | 'booking_cancelled' | 'new_review';
  title: string;
  description: string;
  time: string;
}

export interface MonthlyRevenue {
  month: string;
  value: number;
  current: boolean;
}