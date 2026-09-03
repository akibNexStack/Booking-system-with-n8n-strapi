export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  documentId: string;
  status: BookingStatus;
}
