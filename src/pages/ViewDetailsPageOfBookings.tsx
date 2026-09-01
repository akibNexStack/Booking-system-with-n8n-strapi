import React from 'react';
import {
  Calendar,
  MapPin,
  CreditCard,
  ArrowLeft,
  Phone,
  Mail,
  FileText,
  Star,
  Printer,
  Share2,
  X,
  CheckCircle,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  service: string;
  provider: string;
  providerPhone: string;
  providerEmail: string;
  date: string;
  time: string;
  endTime: string;
  status: BookingStatus;
  price: number;
  location: string;
  address: string;
  category: string;
  notes?: string;
  rating: number | null;
  bookingRef: string;
  createdAt: string;
  paymentMethod: string;
}

interface BookingDetailProps {
  booking: Booking;
  onBack: () => void;
}

const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const styles: Record<BookingStatus, string> = {
    upcoming: 'bg-rose-50 text-rose-700 border-rose-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  const icons = {
    upcoming: <AlertCircle className="w-3 h-3 mr-1" />,
    completed: <CheckCircle className="w-3 h-3 mr-1" />,
    cancelled: <X className="w-3 h-3 mr-1" />,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function BookingDetail({ booking, onBack }: BookingDetailProps) {
  const renderActionButtons = () => {
    switch (booking.status) {
      case 'upcoming':
        return (
          <>
            <button className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Reschedule
            </button>
            <button className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-white bg-rose-600 hover:bg-rose-700 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600">
              <X className="w-4 h-4 mr-2" />
              Cancel Booking
            </button>
          </>
        );
      case 'completed':
        return (
          <>
            <button className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-rose-600 text-rose-600 bg-white hover:bg-rose-50 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600">
              <Star className="w-4 h-4 mr-2" />
              Leave Review
            </button>
            <button className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-white bg-rose-600 hover:bg-rose-700 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600">
              <CalendarDays className="w-4 h-4 mr-2" />
              Book Again
            </button>
          </>
        );
      case 'cancelled':
        return (
          <button className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-white bg-rose-600 hover:bg-rose-700 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600">
            <CalendarDays className="w-4 h-4 mr-2" />
            Rebook Service
          </button>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to My Bookings
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StatusBadge status={booking.status} />
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {booking.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {booking.service}
              </h1>
              <p className="mt-2 text-lg text-gray-600">{booking.provider}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Booking Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.time} - {booking.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-500">{booking.location}</p>
                      <p className="text-sm text-gray-500">{booking.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Payment</p>
                      <p className="text-sm text-gray-500">${booking.price}</p>
                      <p className="text-sm text-gray-500">{booking.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Provider Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-500">{booking.providerPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-500">{booking.providerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Booking Reference
                </h3>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.bookingRef}
                    </p>
                    <p className="text-sm text-gray-500">
                      Booked on{' '}
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-900">Important Notes</p>
                  <p className="mt-1 text-sm text-amber-800">{booking.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Rating (if completed) */}
          {booking.rating && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    You rated this service
                  </p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= booking.rating!
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-green-800">
                      {booking.rating}.0 out of 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}