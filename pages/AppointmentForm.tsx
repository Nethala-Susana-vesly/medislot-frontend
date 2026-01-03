import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Phone, MapPin, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { doctors } from '../data';
import { Appointment } from '../types';

const SLOT_CAPACITY_LIMIT = 30;

const AppointmentForm = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const doctor = useMemo(() => {
    return doctors.find(d => d.id === doctorId);
  }, [doctorId]);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  /* ---------------- Load Slot Counts ---------------- */
  useEffect(() => {
    const loadCounts = async () => {
      const counts: Record<string, number> = {};

      try {
        const url = `${API_BASE}/api/appointments${doctorId ? `?doctorId=${doctorId}` : ''}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Network response not ok');

        const savedAppointments: Appointment[] = await resp.json();

        savedAppointments.forEach(apt => {
          counts[apt.timeSlot] = (counts[apt.timeSlot] || 0) + 1;
        });

        setSlotCounts(counts);
      } catch (err) {
        console.error('Error loading appointments:', err);
        setSlotCounts({});
      }
    };

    loadCounts();
  }, [doctorId, API_BASE]);

  if (!doctor) {
    return <div className="p-20 text-center">Doctor not found</div>;
  }

  /* ---------------- Submit Handler ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    if ((slotCounts[selectedSlot] || 0) >= SLOT_CAPACITY_LIMIT) {
      alert('This slot has just reached full capacity. Please select another time.');
      return;
    }

    setIsSubmitting(true);

    (async () => {
      try {
        const appointmentId = `APT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const newAppointment: Appointment = {
          id: appointmentId,
          patientName: formData.fullName,
          phoneNumber: formData.phone,
          address: formData.address,
          categoryId: doctor.category,
          doctorId: doctor.id,
          doctorName: doctor.name,
          timeSlot: selectedSlot,
          amount: doctor.consultationFee,
          bookingDate: new Date().toLocaleDateString(),
          qrCodeData: JSON.stringify({
            id: appointmentId,
            patient: formData.fullName,
            doctor: doctor.name,
            slot: selectedSlot
          })
        };

        const resp = await fetch(`${API_BASE}/api/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAppointment)
        });

        if (!resp.ok) throw new Error('Failed to save');

        const created = await resp.json();

        setIsSubmitting(false);

        // backend + frontend id are SAME now
        navigate(`/confirmation/${created.id}`);

      } catch (err) {
        console.error('Error saving appointment:', err);
        alert('Failed to book appointment. Please try again.');
        setIsSubmitting(false);
      }
    })();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Selection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ---------------- Left Summary ---------------- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Visit Summary</h3>

              <div className="flex items-center gap-4 mb-6">
                <img src={doctor.photo} className="w-16 h-16 rounded-2xl object-cover" alt={doctor.name} />
                <div>
                  <p className="font-bold text-slate-900">{doctor.name}</p>
                  <p className="text-xs text-slate-400 font-semibold">{doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Department</span>
                  <span className="font-semibold text-slate-900">{doctor.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Consultation Fee</span>
                  <span className="font-bold text-blue-600">₹{doctor.consultationFee}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
                <p className="text-xs text-blue-700 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Arrival Slot:
                </p>
                <p className="text-sm font-bold text-blue-900 mt-1">
                  {selectedSlot || 'Not selected yet'}
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- Right Form ---------------- */}
          <div className="lg:col-span-2 space-y-8">

            {/* Slots */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Select Time Slot</h3>
                </div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Max 30 Per Slot
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {doctor.availableTimings.map(time => {
                  const count = slotCounts[time] || 0;
                  const isFull = count >= SLOT_CAPACITY_LIMIT;

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isFull}
                      onClick={() => setSelectedSlot(time)}
                      className={`p-4 rounded-xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-1 ${
                        isFull
                          ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                          : selectedSlot === time
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                      }`}
                    >
                      <span>{time}</span>

                      {isFull ? (
                        <span className="text-[10px] text-rose-400 uppercase flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" /> Full
                        </span>
                      ) : (
                        <span className={`text-[10px] ${count > 25 ? 'text-amber-500' : 'text-slate-400'}`}>
                          {SLOT_CAPACITY_LIMIT - count} seats left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Patient Details */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Patient Details</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter patient full name"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Home Address
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="City, State"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    disabled={isSubmitting || !selectedSlot}
                    type="submit"
                    className={`w-full py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 ${
                      isSubmitting || !selectedSlot
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    }`}
                  >
                    {isSubmitting ? 'Processing Booking…' : <>Confirm Hospital Slot <CheckCircle2 className="w-6 h-6" /></>}
                  </button>

                  <p className="text-center text-slate-400 text-sm mt-4">
                    Please arrive 5–10 minutes before your selected time slot.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
