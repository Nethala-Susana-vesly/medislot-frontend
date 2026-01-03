
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight, Stethoscope, Search, Trash2 } from 'lucide-react';
import { Appointment } from '../types';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/appointments`);
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data.sort((a: any, b: any) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()));
      } catch (error) {
        console.error('Error fetching appointments:', error);
        // Fallback to localStorage if API fails
        const saved = JSON.parse(localStorage.getItem('medislot_appointments') || '[]');
        setAppointments(saved.sort((a: any, b: any) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()));
      }
    };
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/appointments/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete appointment');
        const updated = appointments.filter(a => a.id !== id);
        setAppointments(updated);
      } catch (error) {
        console.error('Error deleting appointment:', error);
        // Fallback to localStorage update
        const updated = appointments.filter(a => a.id !== id);
        setAppointments(updated);
        localStorage.setItem('medislot_appointments', JSON.stringify(updated));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My Bookings</h1>
            <p className="text-slate-500">Manage your upcoming and past medical consultations.</p>
          </div>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
            Book New Appointment
          </Link>
        </div>

        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {appointments.map((apt) => (
              <div 
                key={apt.id} 
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Icon & ID */}
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Stethoscope className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Appointment ID</p>
                      <p className="font-mono font-bold text-slate-900">{apt.id}</p>
                    </div>
                  </div>

                  {/* Doctor & Patient Info */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Medical Expert</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-slate-900">{apt.doctorName}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{apt.categoryId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Patient</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-700">{apt.patientName}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Time & Date</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-slate-900">{apt.timeSlot}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{apt.bookingDate}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => deleteAppointment(apt.id)}
                      className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <Link 
                      to={`/confirmation/${apt.id}`}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                    >
                      View Receipt <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-200 border-dashed">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Appointments Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8">You haven't booked any medical consultations yet.</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              Start Booking Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
