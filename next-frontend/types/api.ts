export type StrapiUser = {
  id?: number;
  username?: string;
  email?: string;
  role?: { type?: string; name?: string };
};

export type StrapiService = {
  documentId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  image?: { url?: string } | null;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
};

export type StaffMember = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  photoUrl: string | null;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  documentId: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  status: BookingStatus;
  service?: { name?: string; price?: number } | null;
  staff?: { name?: string } | null;
};
