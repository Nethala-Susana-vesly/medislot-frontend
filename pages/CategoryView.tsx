
import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Star, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { doctors, categories } from '../data';
import { Category } from '../types';

const CategoryView = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const decodedCategory = decodeURIComponent(categoryId || '') as Category;
  const categoryInfo = categories.find(c => c.id === decodedCategory);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => doc.category === decodedCategory);
  }, [decodedCategory]);

  if (!categoryInfo) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Category not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-4 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Categories
            </button>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{categoryInfo.title}</h1>
            <p className="text-slate-600">{categoryInfo.description}</p>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Verified Experts</p>
              <p className="text-sm opacity-80">{filteredDoctors.length} Doctors Available</p>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDoctors.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-64 sm:h-auto overflow-hidden">
                  <img 
                    src={doc.photo} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      4.9 (120+ reviews)
                    </div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{doc.specialization}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{doc.name}</h3>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{doc.experience} Years Experience</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-600">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900 mb-1">Available slots:</p>
                        <div className="flex flex-wrap gap-2">
                          {doc.availableTimings.slice(0, 3).map(time => (
                            <span key={time} className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-medium text-slate-600">{time}</span>
                          ))}
                          {doc.availableTimings.length > 3 && <span className="text-xs text-blue-600 font-bold self-center">+{doc.availableTimings.length - 3} more</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Consultation Fee</p>
                      <p className="text-2xl font-bold text-slate-900">₹{doc.consultationFee}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/book/${doc.id}`)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                      Book Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-lg">No doctors currently listed for this category. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
