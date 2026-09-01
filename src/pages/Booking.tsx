import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { useGetStaffQuery } from '@/redux/features/staff/staffApi';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';

// ─── Types ─────────────────────────────────────────────
interface TimeSlot {
  time: string;
  available: boolean;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  specialty: string;
}

interface ServiceRecord {
  documentId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  image?: { url?: string } | null;
}

const strapiApiUrl = import.meta.env.VITE_BASE_URL ?? 'http://localhost:1337/api';
const servicePlaceholder =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const toStrapiTime = (time: string) => {
  const [clock, period] = time.split(' ');
  const [hours, minutes] = clock.split(':').map(Number);
  const normalizedHours = (hours % 12) + (period === 'PM' ? 12 : 0);

  return `${String(normalizedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
};

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
  { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: true },
];

const weekDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + index);

  return {
    day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
    date: String(date.getDate()),
    full: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date),
    value: date.toISOString().slice(0, 10),
  };
});

// ─── Sub-Components ────────────────────────────────────
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Stylist' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Confirm' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {steps.map((step, i) => (
        <React.Fragment key={step.num}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                currentStep >= step.num
                  ? 'bg-gradient-to-br from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {currentStep > step.num ? <CheckCircle2 size={18} /> : step.num}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${currentStep >= step.num ? 'text-rose-600' : 'text-slate-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 sm:w-12 h-0.5 rounded-full transition-all duration-300 ${currentStep > step.num ? 'bg-rose-500' : 'bg-slate-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────
const BookingPage: React.FC = () => {
  const { id: serviceId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isLoadingMyBookings, setIsLoadingMyBookings] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [isServiceLoading, setIsServiceLoading] = useState(true);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const {
    data: staffResponse,
    isLoading: isStaffLoading,
    error: staffRequestError,
  } = useGetStaffQuery();
  const { data: currentUser } = useUserInfoQuery(undefined, {
    skip: !localStorage.getItem('strapi_jwt'),
  });

  useEffect(() => {
    if (currentUser) {
      setCustomerName((value) => value || currentUser.username || '');
      setEmail((value) => value || currentUser.email || '');
    }
  }, [currentUser]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchService = async () => {
      if (!serviceId) {
        setServiceError('No service was selected.');
        setIsServiceLoading(false);
        return;
      }

      try {
        setIsServiceLoading(true);
        setServiceError(null);
        const response = await fetch(`${strapiApiUrl}/services/${serviceId}?populate=*`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Service request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as { data: ServiceRecord };
        setService(payload.data);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setServiceError('Failed to load the selected service. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsServiceLoading(false);
        }
      }
    };

    fetchService();

    return () => controller.abort();
  }, [serviceId]);

  const staffMembers: StaffMember[] = (staffResponse?.data ?? []).map((staff) => ({
    id: staff.documentId,
    name: staff.name,
    role: staff.specialty || 'Salon Professional',
    avatar: getInitials(staff.name),
    rating: 5,
    specialty: staff.specialty || 'Salon Services',
  }));

  const selectedStaffMember = staffMembers.find((s) => s.id === selectedStaff);
  const selectedDateObj = weekDays[selectedDate];
  const serviceImage = service?.image?.url
    ? new URL(service.image.url, strapiApiUrl).toString()
    : servicePlaceholder;

  const handleConfirm = async () => {
    if (!serviceId || !selectedStaff || !selectedTime || !customerName || !phone || !email) {
      setBookingError('Please complete your contact details before confirming.');
      return;
    }

    setIsConfirming(true);
    setBookingError(null);

    try {
      await axiosInstance.post('/bookings', {
        data: {
          customerName,
          phone,
          email,
          date: selectedDateObj.value,
          time: toStrapiTime(selectedTime),
          service: serviceId,
          staff: selectedStaff,
          status: 'pending',
        },
      });
      setBookingComplete(true);
    } catch {
      setBookingError('Unable to create your booking. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleViewMyBookings = async () => {
    setIsLoadingMyBookings(true);

    try {
      // `populate=*` returns every booking field and its related service/staff data.
      const response = await axiosInstance.get('/bookings', {
        params: { populate: '*', sort: 'date:asc' },
      });

      console.log('My bookings (full Strapi response):', response.data.data ?? []);
    } catch (error) {
      console.error('Unable to load my bookings:', error);
    } finally {
      setIsLoadingMyBookings(false);
      navigate('/my-bookings');
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/30">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-8">
            Your appointment for <span className="font-semibold text-slate-700">{service?.name}</span> has been scheduled.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-rose-500" />
              <span className="text-slate-600">{selectedDateObj.full}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-rose-500" />
              <span className="text-slate-600">{selectedTime}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-rose-500" />
              <span className="text-slate-600">{selectedStaffMember?.name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CreditCard size={16} className="text-rose-500" />
              <span className="text-slate-600">${service?.price} · {service?.duration} min</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleViewMyBookings}
              disabled={isLoadingMyBookings}
              className="w-full py-3.5 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl font-semibold text-sm hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-600/20"
            >
              {isLoadingMyBookings ? 'Loading bookings...' : 'View My Bookings'}
            </button>
            <Link
              to="/services"
              className="w-full py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all"
            >
              Book Another Service
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/services/${serviceId}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Book Appointment</h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Service Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-8 flex gap-4 items-start">
          <img
            src={serviceImage}
            alt={service?.name ?? 'Selected service'}
            className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {isServiceLoading ? (
              <p className="text-sm text-slate-500">Loading selected service...</p>
            ) : serviceError ? (
              <p className="text-sm text-rose-600">{serviceError}</p>
            ) : (
              <>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-xs font-medium rounded-full ring-1 ring-rose-600/10">
                Salon Service
              </span>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-medium text-slate-700">5.0</span>
              </div>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">{service?.name}</h2>
            <p className="text-sm text-slate-500 line-clamp-2">{service?.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-lg font-bold text-rose-600">${service?.price}</span>
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <Clock size={14} />
                {service?.duration} min
              </span>
            </div>
              </>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} />

        {/* ─── STEP 2: SELECT STYLIST ───────────────────── */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Choose Your Stylist</h3>
            <p className="text-slate-500 text-sm mb-6">Select a professional who specializes in this service.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {isStaffLoading ? (
                <p className="text-sm text-slate-500">Loading staff...</p>
              ) : staffRequestError ? (
                <p className="text-sm text-rose-600">Failed to load staff. Please try again.</p>
              ) : staffMembers.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.id)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                    selectedStaff === staff.id
                      ? 'border-rose-500 bg-rose-50/50 shadow-md shadow-rose-500/10'
                      : 'border-slate-200 bg-white hover:border-rose-200 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                    selectedStaff === staff.id
                      ? 'bg-gradient-to-br from-rose-500 to-rose-700'
                      : 'bg-gradient-to-br from-slate-400 to-slate-600'
                  }`}>
                    {staff.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">{staff.name}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-medium text-slate-600">{staff.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{staff.role}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {staff.specialty}
                    </span>
                  </div>
                  {selectedStaff === staff.id && (
                    <CheckCircle2 size={20} className="text-rose-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => selectedStaff && setStep(3)}
                disabled={!selectedStaff}
                className="px-8 py-3.5 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl font-semibold text-sm hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SELECT DATE & TIME ─────────────── */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pick a Date & Time</h3>
            <p className="text-slate-500 text-sm mb-6">Choose your preferred slot for {selectedStaffMember?.name}.</p>

            {/* Date Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                {weekDays.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                    className={`flex flex-col items-center min-w-[64px] p-3 rounded-2xl border transition-all duration-300 ${
                      selectedDate === i
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-md shadow-rose-500/10'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200'
                    }`}
                  >
                    <span className="text-xs font-medium uppercase">{day.day}</span>
                    <span className="text-lg font-bold">{day.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Available Times</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedTime === slot.time
                        ? 'bg-gradient-to-br from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-600/20'
                        : slot.available
                        ? 'bg-white border border-slate-200 text-slate-700 hover:border-rose-300 hover:shadow-sm'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any allergies, preferences, or requests..."
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all active:scale-[0.98]"
              >
                Back
              </button>
              <button
                onClick={() => selectedTime && setStep(4)}
                disabled={!selectedTime}
                className="px-8 py-3.5 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl font-semibold text-sm hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: CONFIRM ──────────────────────────── */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Your Booking</h3>
            <p className="text-slate-500 text-sm mb-6">Review your appointment details before confirming.</p>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 space-y-5">
              {/* Service */}
              <div className="flex items-start gap-4 pb-5 border-b border-slate-100">
                <img src={serviceImage} alt={service?.name ?? 'Selected service'} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">{service?.name}</h4>
                  <p className="text-sm text-slate-500">{service?.duration} min · Salon Service</p>
                  <p className="text-lg font-bold text-rose-600 mt-1">${service?.price}</p>
                </div>
              </div>

              {/* Contact details */}
              <div className="pb-5 border-b border-slate-100">
                <p className="text-sm text-slate-500 mb-3">Your contact details</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-500"
                  />
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone number"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Stylist */}
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold text-sm">
                  {selectedStaffMember?.avatar}
                </div>
                <div>
                  <p className="text-sm text-slate-500">With</p>
                  <p className="font-semibold text-slate-900">{selectedStaffMember?.name}</p>
                  <p className="text-xs text-slate-400">{selectedStaffMember?.role}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-rose-500" />
                  <span className="text-sm text-slate-700">{selectedDateObj.full}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-rose-500" />
                  <span className="text-sm text-slate-700">{selectedTime}</span>
                </div>
              </div>

              {/* Notes */}
              {notes && (
                <div className="pb-5 border-b border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">Special Requests</p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{notes}</p>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm text-slate-500">Total Amount</p>
                  <p className="text-2xl font-bold text-slate-900">${service?.price}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck size={16} className="text-rose-500" />
                  Secure payment
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all active:scale-[0.98]"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="px-8 py-3.5 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl font-semibold text-sm hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isConfirming ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard size={16} />
                    Confirm & Pay
                  </>
                )}
              </button>
            </div>
            {bookingError && <p className="mt-4 text-sm text-rose-600">{bookingError}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
