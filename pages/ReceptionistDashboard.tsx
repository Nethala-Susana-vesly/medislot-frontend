
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Clock, Search, LogOut, LayoutDashboard, ChevronRight, Hash } from 'lucide-react';
import { doctors } from '../data';
import { Appointment } from '../types';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Basic auth check
    const auth = localStorage.getItem('receptionist_auth');
    if (!auth) {
      navigate('/receptionist/login');
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/appointments`);
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        // Fallback to localStorage
        const saved = JSON.parse(localStorage.getItem('medislot_appointments') || '[]');
        setAppointments(saved);
      }
    };
    fetchAppointments();
    
    // Default to first doctor if none selected
    if (doctors.length > 0) setSelectedDoctorId(doctors[0].id);
  }, [navigate]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => apt.doctorId === selectedDoctorId);
  }, [appointments, selectedDoctorId]);

  const selectedDoctor = useMemo(() => {
    return doctors.find(d => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  const handleLogout = () => {
    localStorage.removeItem('receptionist_auth');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">MediSlot</h2>
            <p className="text-xs text-slate-400">Reception Desk</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Select Department Expert</p>
          {doctors.map(doc => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoctorId(doc.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                selectedDoctorId === doc.id 
                ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <img src={doc.photo} className="w-10 h-10 rounded-full object-cover border border-slate-200" alt="" />
              <div className="text-left">
                <p className="text-sm font-bold line-clamp-1">{doc.name}</p>
                <p className="text-[10px] opacity-70">{doc.category}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Doctor Select */}
          <div className="lg:hidden mb-8">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Viewing Schedule For</label>
            <select 
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold"
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name} ({doc.category})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Patient Registry</h1>
              <p className="text-slate-500 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-blue-500" />
                Current list for <span className="font-bold text-slate-900">{selectedDoctor?.name}</span>
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-6 shadow-sm">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Bookings</p>
                <p className="text-2xl font-black text-blue-600">{filteredAppointments.length}</p>
              </div>
              <div className="h-10 w-px bg-slate-100"></div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Next Patient</p>
                <p className="text-sm font-bold text-slate-900">{filteredAppointments[0]?.patientName || 'None'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient Name</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Appointment ID</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Info</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Slot</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                              {apt.patientName.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-900">{apt.patientName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Hash className="w-3 h-3" />
                            <span className="font-mono">{apt.id}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-medium text-slate-700">{apt.phoneNumber}</p>
                          <p className="text-[10px] text-slate-400">{apt.address}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            {apt.timeSlot}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            Scheduled
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="text-slate-300 w-10 h-10" />
                        </div>
                        <p className="text-slate-500 font-medium">No patients found for this doctor yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReceptionistDashboard;
