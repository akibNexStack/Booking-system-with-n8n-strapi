"use client";

import { create } from "zustand";
import { strapiApi } from "@/lib/strapi";
import type { Booking } from "@/types/api";

type BookingPayload = Omit<Booking, "documentId" | "status" | "service" | "staff"> & { service: string; staff: string; status?: "pending" };

type BookingsState = {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  createBooking: (booking: BookingPayload) => Promise<Booking>;
  clear: () => void;
};

export const useBookingsStore = create<BookingsState>((set) => ({
  bookings: [],
  isLoading: false,
  error: null,
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await strapiApi.get<{ data?: Booking[] }>("/bookings", { params: { populate: "*", sort: "date:asc" } });
      set({ bookings: data.data ?? [], isLoading: false });
    } catch {
      set({ isLoading: false, error: "Unable to load your bookings. Please sign in again." });
    }
  },
  createBooking: async (booking) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await strapiApi.post<{ data: Booking }>("/bookings", { data: { ...booking, status: booking.status ?? "pending" } });
      set((state) => ({ bookings: [...state.bookings, data.data], isLoading: false }));
      return data.data;
    } catch {
      set({ isLoading: false, error: "Unable to create your booking. Please try again." });
      throw new Error("Unable to create booking.");
    }
  },
  clear: () => set({ bookings: [], error: null, isLoading: false }),
}));
