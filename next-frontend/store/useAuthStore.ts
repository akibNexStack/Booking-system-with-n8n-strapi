"use client";

import axios from "axios";
import { create } from "zustand";
import { strapiApi } from "@/lib/strapi";
import type { StrapiUser } from "@/types/api";

type StrapiErrorResponse = { error?: { message?: string } };

function apiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<StrapiErrorResponse>(error)) return fallback;
  return error.response?.data?.error?.message || fallback;
}

async function fetchCurrentUser() {
  const { data } = await strapiApi.get<StrapiUser>("/users/me", {
    params: { populate: "role" },
  });
  return data;
}

type AuthState = {
  user: StrapiUser | null;
  isLoading: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  startOAuth: (provider: "google" | "github") => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  hydrate: async () => {
    if (typeof window === "undefined" || !window.localStorage.getItem("strapi_jwt")) {
      set({ user: null, isLoading: false, error: null });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      set({ user: await fetchCurrentUser(), isLoading: false });
    } catch {
      window.localStorage.removeItem("strapi_jwt");
      set({ user: null, isLoading: false, error: "Your session has expired. Please sign in again." });
    }
  },
  login: async (identifier, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await strapiApi.post<{ jwt?: string; user?: StrapiUser }>("/auth/local", { identifier: identifier.trim().toLowerCase(), password });
      if (!data.jwt) throw new Error("Login response did not include a token.");
      window.localStorage.setItem("strapi_jwt", data.jwt);
    } catch (error) {
      set({ user: null, isLoading: false, error: apiErrorMessage(error, "Unable to sign in. Check your email and password.") });
      throw new Error("Unable to sign in.");
    }
    try {
      const user = await fetchCurrentUser();
      set({ user, isLoading: false });
    } catch {
      window.localStorage.removeItem("strapi_jwt");
      set({ user: null, isLoading: false, error: "Your account was accepted, but the booking service is unavailable. Please try again shortly." });
      throw new Error("Unable to load the signed-in account.");
    }
  },
  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await strapiApi.post<{ jwt?: string; user?: StrapiUser }>("/auth/local/register", { username: name.trim(), email: email.trim().toLowerCase(), password });
      if (!data.jwt) throw new Error("Registration response did not include a token.");
      window.localStorage.setItem("strapi_jwt", data.jwt);
    } catch (error) {
      set({ user: null, isLoading: false, error: apiErrorMessage(error, "Unable to create your account. Please try a different email.") });
      throw new Error("Unable to create your account.");
    }
    try {
      set({ user: await fetchCurrentUser(), isLoading: false });
    } catch {
      window.localStorage.removeItem("strapi_jwt");
      set({ user: null, isLoading: false, error: "Your account was created, but the booking service is unavailable. Please sign in again shortly." });
      throw new Error("Unable to load the new account.");
    }
  },
  requestPasswordReset: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await strapiApi.post("/auth/forgot-password", { email });
      set({ isLoading: false });
    } catch {
      set({ isLoading: false, error: "We could not start a password reset. Please try again." });
      throw new Error("Unable to request password reset.");
    }
  },
  startOAuth: (provider) => {
    if (typeof window === "undefined") return;
    const baseUrl = strapiApi.defaults.baseURL?.replace(/\/$/, "");
    if (baseUrl) window.location.assign(`${baseUrl}/connect/${provider}`);
  },
  logout: () => {
    if (typeof window !== "undefined") window.localStorage.removeItem("strapi_jwt");
    set({ user: null, isLoading: false, error: null });
  },
}));
