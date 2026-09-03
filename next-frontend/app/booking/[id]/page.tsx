"use client";

import { useParams } from "next/navigation";
import { BookingFlow } from "@/components/booking/BookingFlow";

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  return <BookingFlow serviceId={params.id} />;
}
