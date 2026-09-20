import React, { useState, useMemo } from 'react';
import { Search, History, TrendingUp, X } from 'lucide-react';
import { Category } from '../types';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';

interface SearchScreenProps {
  onCourseClick: (id: string) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onCourseClick }) => {
  const [query, setQuery] = useState('');
  
  const categories = Object.values(Category);
  
  const filteredCourses = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return COURSES.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) || 
      course.category.toLowerCase().includes(lowerQuery) ||
      course.instructor.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const trending = [
    'Gestion de Projet Agile',
    'Intelligence Artificielle & Outils',
    'Leadership & Entrepreneuriat en RDC',
    'Anglais des Affaires Internationales'
  ];

  return (
    <div className="min-h-screen bg-[#122C34] text-white px-6 md:px-16 pt-12 md:pt-16 pb-24 animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#0A7A94]/20 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E98A8] transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
            className="w-full bg-[#1A2B32] text-white py-4 md:py-5 pl-16 pr-14 rounded-2xl font-medium placeholder-gray-400 outline-none border border-[#0A7A94]/30 focus:border-[#0E98A8] transition-all text-base md:text-lg shadow-xl relative z-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-20 cursor-pointer"
            >
              <X size={22} />
            </button>
          )}
        </div>
      </div>

      {!query ? (
        <div className="max-w-6xl mx-auto space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <History size={16} className="text-[#0E98A8]" /> Recherches Fréquentes
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {['durabilité', 'leadership', 'python', 'anglais', 'gestion', 'finance', 'agroalimentaire'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:bg-[#0A7A94]/20 hover:border-[#0A7A94]/40 hover:text-white transition-all cursor-pointer capitalize"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#F26522]" /> Tendances en RDC
              </h2>
              <div className="space-y-2">
                {trending.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setQuery(item)}
                    className="w-full flex items-center gap-4 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all group text-left cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <span className="text-xl font-black text-gray-500 group-hover:text-[#F26522] transition-colors italic">#{idx + 1}</span>
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white">{item}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Explorer par Catégorie</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.slice(0, 6).map(cat => (
                <div 
                  key={cat} 
                  onClick={() => setQuery(cat)}
                  className="aspect-video relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#0E98A8] transition-all shadow-md bg-[#1A2B32]"
                >
                  <img src={`https://picsum.photos/seed/${encodeURIComponent(cat)}/300/200`} alt={cat} className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#122C34] via-[#122C34]/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-xs font-bold uppercase tracking-wider text-white leading-tight">{cat}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300 max-w-[1600px] mx-auto">
          <h2 className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-3">
            Résultats pour <span className="text-white font-black">"{query}"</span> ({filteredCourses.length})
          </h2>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="flex justify-center">
                  <CourseCard course={course} onClick={onCourseClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-[#0E98A8]">
                <Search size={28} />
              </div>
              <p className="text-lg font-bold text-white mb-1">Aucun résultat trouvé</p>
              <p className="text-xs text-gray-400 max-w-sm">Essayez des termes plus généraux ou explorez les catégories thématiques.</p>
              <button 
                onClick={() => setQuery('')}
                className="mt-6 text-[#0E98A8] font-bold text-xs uppercase tracking-wider hover:text-white border border-[#0A7A94]/40 px-5 py-2.5 rounded-xl hover:bg-[#0A7A94]/20 transition-all cursor-pointer"
              >
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
