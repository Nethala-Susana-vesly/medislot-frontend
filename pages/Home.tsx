
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, HeartPulse, Brain, UserRound, Bone, ChevronRight, CheckCircle, Clock, Building2, MapPin, ShieldCheck } from 'lucide-react';
import { categories } from '../data';

const Home = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-blue-600" />;
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-rose-600" />;
      case 'Brain': return <Brain className="w-8 h-8 text-purple-600" />;
      case 'UserRound': return <UserRound className="w-8 h-8 text-pink-600" />;
      case 'Bone': return <Bone className="w-8 h-8 text-emerald-600" />;
      default: return <Stethoscope className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
              Official Hospital Pre-Booking Portal
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Your Health, <br />
              <span className="text-blue-600">On Your Schedule.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Pre-book your hospital visits to avoid long waiting room times. Get priority access at the department desk with our smart QR check-in system.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Schedule My Visit
              </button>
              <button 
                onClick={() => navigate('/receptionist/login')}
                className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Staff Registry
              </button>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 font-medium">Verified Medical Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 font-medium">Smart Queue Management</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
             <img 
               src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
               alt="Hospital Building" 
               className="rounded-3xl shadow-2xl border-8 border-white object-cover w-full h-[500px]"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100">
               <div className="bg-blue-100 p-3 rounded-full">
                 <Building2 className="text-blue-600 w-6 h-6" />
               </div>
               <div>
                 <p className="font-bold text-slate-900">Priority Entrance</p>
                 <p className="text-sm text-slate-500">QR Check-in Available</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Choose Your Specialty</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Directly book into the schedule of our top hospital departments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => navigate(`/category/${encodeURIComponent(cat.id)}`)}
              className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer text-center"
            >
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 group-hover:scale-110 transition-all">
                {getIcon(cat.icon)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">{cat.description}</p>
              <div className="flex items-center justify-center text-blue-600 font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Select <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-20 px-4 text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-600/20 p-4 rounded-2xl mb-6 border border-blue-500/30">
              <Clock className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Time-Strict Slots</h3>
            <p className="text-slate-400">Arrive just before your time and walk right in. We manage hospital flow so you don't have to wait.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-600/20 p-4 rounded-2xl mb-6 border border-emerald-500/30">
              <MapPin className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Hospital Navigation</h3>
            <p className="text-slate-400">Direct mapping to your specific department desk upon arrival.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-amber-600/20 p-4 rounded-2xl mb-6 border border-amber-500/30">
              <CheckCircle className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Fast-Track Pass</h3>
            <p className="text-slate-400">Your digital pass ensures you are seen at your requested time by our medical professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
