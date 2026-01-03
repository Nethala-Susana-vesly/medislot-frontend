
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Printer, Home, Calendar, User, CreditCard, Hash, Phone, MapPin } from 'lucide-react';
import { Appointment } from '../types';

const Confirmation = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/appointments/${appointmentId}`);
        if (!response.ok) throw new Error('Failed to fetch appointment');
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        // Fallback to localStorage
        const saved = JSON.parse(localStorage.getItem('medislot_appointments') || '[]');
        const found = saved.find((a: Appointment) => a.id === appointmentId);
        if (found) setAppointment(found);
      }
    };
    if (appointmentId) fetchAppointment();
  }, [appointmentId]);

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center animate-pulse">
          <CheckCircle className="w-20 h-20 text-blue-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-400">Finalizing your booking...</h2>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 animate-in zoom-in duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 print:shadow-none print:border-none">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-12 px-8 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle className="w-32 h-32" />
             </div>
             <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
               <CheckCircle className="w-12 h-12" />
             </div>
             <h1 className="text-4xl font-extrabold mb-2">Hospital Slot Confirmed!</h1>
             <p className="text-emerald-50 opacity-90 text-lg">Your priority access is ready. Arrive on time to skip the wait.</p>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column: Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Patient Profile</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg"><User className="w-4 h-4 text-slate-600" /></div>
                      <div>
                        <p className="text-xs text-slate-500">Full Name</p>
                        <p className="font-bold text-slate-900">{appointment.patientName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg"><Phone className="w-4 h-4 text-slate-600" /></div>
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <p className="font-bold text-slate-900">{appointment.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Hospital Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-lg"><Calendar className="w-4 h-4 text-blue-600" /></div>
                      <div>
                        <p className="text-xs text-slate-500">Department & Slot</p>
                        <p className="font-bold text-slate-900">{appointment.doctorName}</p>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter">{appointment.timeSlot}, {appointment.bookingDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-lg"><Hash className="w-4 h-4 text-blue-600" /></div>
                      <div>
                        <p className="text-xs text-slate-500">Reference ID</p>
                        <p className="font-mono font-bold text-slate-900">{appointment.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code */}
              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <div className="bg-white p-4 rounded-3xl shadow-lg mb-6">
                  <QRCodeSVG value={appointment.qrCodeData} size={200} />
                </div>
                <p className="text-slate-900 text-sm font-bold text-center mb-2">Priority Entrance QR</p>
                <p className="text-slate-500 text-xs text-center leading-relaxed">
                  Scan this code at the Hospital Reception or Department Desk to activate your priority slot and skip the general waiting queue.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4 justify-center print:hidden">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
              >
                <Printer className="w-5 h-5" /> Print Priority Pass
              </button>
              <Link 
                to="/"
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex items-start gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-100 text-amber-800 text-sm print:hidden">
          <div className="bg-amber-200 p-1.5 rounded-full mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <p>
            <strong>Note:</strong> Your slot is held for exactly 15 minutes after the start time. Please ensure you are at the department desk before {appointment.timeSlot} starts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
