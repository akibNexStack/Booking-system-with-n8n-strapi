"use client";

import { create } from "zustand";
import { strapiApi } from "@/lib/strapi";
import type { Service, StaffMember, StrapiService } from "@/types/api";

type StrapiStaff = { documentId: string; name: string; specialty?: string; bio?: string; photo?: { url?: string } | null };
const fallbackImage = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop";

type BookingFlowState = {
  service: Service | null;
  staff: StaffMember[];
  selectedStaffId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  notes: string;
  customerName: string;
  phone: string;
  email: string;
  isLoading: boolean;
  error: string | null;
  load: (serviceId: string) => Promise<void>;
  setSelectedStaffId: (id: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setContact: (contact: Partial<Pick<BookingFlowState, "customerName" | "phone" | "email">>) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
};

const initialState = { service: null, staff: [], selectedStaffId: null, selectedDate: null, selectedTime: null, notes: "", customerName: "", phone: "", email: "", isLoading: false, error: null };

export const useBookingFlowStore = create<BookingFlowState>((set) => ({
  ...initialState,
  load: async (serviceId) => {
    set({ ...initialState, isLoading: true });
    try {
      const [serviceResponse, staffResponse] = await Promise.all([
        strapiApi.get<{ data: StrapiService }>(`/services/${serviceId}?populate=*`),
        strapiApi.get<{ data?: StrapiStaff[] }>("/staff-members?populate=photo"),
      ]);
      const baseUrl = strapiApi.defaults.baseURL ?? "";
      const rawService = serviceResponse.data.data;
      const service: Service = { id: rawService.documentId, name: rawService.name, description: rawService.description ?? "A premium beauty and wellness service.", price: Number(rawService.price), duration: Number(rawService.duration), imageUrl: rawService.image?.url ? new URL(rawService.image.url, baseUrl).toString() : fallbackImage };
      const staff = (staffResponse.data.data ?? []).map((member) => ({ id: member.documentId, name: member.name, specialty: member.specialty ?? "Salon Professional", bio: member.bio ?? "Dedicated to making every appointment exceptional.", photoUrl: member.photo?.url ? new URL(member.photo.url, baseUrl).toString() : null }));
      set({ service, staff, isLoading: false });
    } catch {
      set({ isLoading: false, error: "We could not load this service. Please return to Services and try again." });
    }
  },
  setSelectedStaffId: (selectedStaffId) => set({ selectedStaffId }),
  setSelectedDate: (selectedDate) => set({ selectedDate, selectedTime: null }),
  setSelectedTime: (selectedTime) => set({ selectedTime }),
  setContact: (contact) => set(contact),
  setNotes: (notes) => set({ notes }),
  reset: () => set(initialState),
}));
