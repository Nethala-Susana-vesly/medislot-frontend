
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, Stethoscope, MapPin, Phone, Mail, UserCog } from 'lucide-react';
import Home from './pages/Home';
import CategoryView from './pages/CategoryView';
import AppointmentForm from './pages/AppointmentForm';
import Confirmation from './pages/Confirmation';
import AppointmentsList from './pages/AppointmentsList';
import ReceptionistLogin from './pages/ReceptionistLogin';
import ReceptionistDashboard from './pages/ReceptionistDashboard';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Stethoscope className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                MediSlot
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link to="/appointments" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">My Bookings</Link>
            <Link to="/receptionist/login" className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors">
              <UserCog className="w-4 h-4" />
              <span className="text-sm font-medium">Receptionist</span>
            </Link>
            <Link to="/" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
              Book Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-blue-600 transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Home</Link>
            <Link to="/appointments" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">My Bookings</Link>
            <Link to="/receptionist/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Receptionist Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Stethoscope className="text-blue-400" /> MediSlot
        </h3>
        <p className="text-slate-400">
          Transforming hospital visits. Book your time slot and arrive just in time for your consultation.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
        <ul className="space-y-2 text-slate-400">
          <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
          <li><Link to="/appointments" className="hover:text-blue-400 transition-colors">My Appointments</Link></li>
          <li><Link to="/receptionist/login" className="hover:text-blue-400 transition-colors">Staff Login</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
        <ul className="space-y-3 text-slate-400">
          <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> 123 Health Ave, Medical District</li>
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> +1 (555) 000-1111</li>
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> hospital-support@medislot.com</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
      <p>&copy; {new Date().getFullYear()} MediSlot Healthcare Services. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/book/:doctorId" element={<AppointmentForm />} />
            <Route path="/confirmation/:appointmentId" element={<Confirmation />} />
            <Route path="/appointments" element={<AppointmentsList />} />
            <Route path="/receptionist/login" element={<ReceptionistLogin />} />
            <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
