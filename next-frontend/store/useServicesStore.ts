"use client";

import { create } from "zustand";
import { strapiApi } from "@/lib/strapi";
import type { Service, StrapiService } from "@/types/api";

const fallbackImage = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80";

type ServicesState = {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
};

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  isLoading: false,
  error: null,
  fetchServices: async () => {
    if (get().isLoading || get().services.length) return;
    set({ isLoading: true, error: null });
    try {
      const { data } = await strapiApi.get<{ data?: StrapiService[] }>("/services?populate=*");
      const baseUrl = strapiApi.defaults.baseURL ?? "";
      const services = (data.data ?? []).map((service) => ({
        id: service.documentId,
        name: service.name,
        description: service.description ?? "A premium beauty and wellness service.",
        price: Number(service.price),
        duration: Number(service.duration),
        imageUrl: service.image?.url ? new URL(service.image.url, baseUrl).toString() : fallbackImage,
      }));
      set({ services, isLoading: false });
    } catch {
      set({ isLoading: false, error: "Services are unavailable right now. Please try again shortly." });
    }
  },
}));
