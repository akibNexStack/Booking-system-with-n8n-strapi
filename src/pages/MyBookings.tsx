import { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, Search, Scissors, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface BookingRecord {
  documentId: string;
  id?: number;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
  service?: { name?: string; price?: number } | null;
  staff?: { name?: string } | null;
}

const statusStyles: Record<BookingStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isSignedIn = Boolean(localStorage.getItem('strapi_jwt'));

  useEffect(() => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    const loadBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings', {
          // Keep the complete booking record available to the page, including
          // populated service and staff relations.
          params: { populate: '*', sort: 'date:asc' },
        });
        setBookings(response.data.data ?? []);
      } catch {
        setError('Unable to load your bookings. Please sign in again.');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [isSignedIn]);

  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase();
    return bookings.filter((booking) =>
      [booking.service?.name, booking.staff?.name, booking.customerName]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }, [bookings, search]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-sm">
          <Calendar className="mx-auto mb-4 text-rose-600" size={40} />
          <h1 className="text-2xl font-bold text-slate-900">Sign in to see your bookings</h1>
          <p className="mt-2 text-sm text-slate-500">Bookings made while signed in are saved to your account.</p>
          <Link to="/login" className="mt-6 inline-flex rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-700">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
            <p className="mt-1 text-slate-500">Your appointments from Strapi.</p>
          </div>
          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bookings" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-rose-500" />
          </div>
        </div>

        {loading && <p className="text-slate-500">Loading your bookings...</p>}
        {error && <p className="rounded-xl bg-rose-50 p-4 text-rose-700">{error}</p>}
        {!loading && !error && filteredBookings.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-semibold text-slate-900">No bookings found</p>
            <Link to="/services" className="mt-4 inline-block text-sm font-semibold text-rose-600">Book a service</Link>
          </div>
        )}

        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <article key={booking.documentId} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Scissors size={20} className="text-rose-600" />
                    <h2 className="text-lg font-bold text-slate-900">{booking.service?.name ?? 'Salon service'}</h2>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                    <span className="flex items-center gap-2"><Calendar size={16} />{booking.date}</span>
                    <span className="flex items-center gap-2"><Clock size={16} />{booking.time.slice(0, 5)}</span>
                    <span className="flex items-center gap-2"><User size={16} />{booking.staff?.name ?? 'Stylist pending'}</span>
                  </div>
                </div>
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>{booking.status}</span>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between text-sm">
                <span className="text-slate-400">Reference: {booking.documentId}</span>
                {booking.service?.price != null && <span className="font-bold text-slate-900">${booking.service.price}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
