import React, { useState, useEffect, useRef } from 'react';
import { COURSES } from '../constants';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import { GraduationCap, Leaf, Cpu, Utensils, Briefcase, Globe, Check, Plus, Play, Sparkles, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomeScreenProps {
  onCourseClick: (id: string) => void;
  onCategoryClick: (category: Category) => void;
  myListIds?: string[];
  onToggleMyList?: (id: string) => void;
  onOpenAiTutor?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onCourseClick, onCategoryClick, myListIds = [], onToggleMyList, onOpenAiTutor }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    {
      id: 'eja-medio-profissional',
      title: 'DIGITALISATION & LEADERSHIP',
      subtitle: 'Nouveauté',
      description: 'Développez les compétences managériales et numériques clés recherchées par les entreprises en RDC.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
      category: 'Formation Professionnelle'
    },
    {
      id: 'ingles-industria',
      title: 'ANGLAIS PROFESSIONNEL',
      subtitle: 'Carrière',
      description: 'La langue internationale des affaires et du commerce panafricain, du niveau débutant à avancé.',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
      category: 'Langues & Affaires'
    },
    {
      id: 'industria-40',
      title: 'INDUSTRIE 4.0 & IA',
      subtitle: 'Technologie',
      description: 'Préparez-vous à l\'automatisation, aux outils d\'IA et à la transformation des entreprises à Kinshasa.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      category: 'Innovation Technologique'
    },
    {
      id: 'educacao-ambiental',
      title: 'ENVIRONNEMENT & RSE EN RDC',
      subtitle: 'Durabilité',
      description: 'Maîtrisez les normes écologiques, l\'énergie verte et l\'impact socio-environnemental.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
      category: 'Développement Durable'
    }
  ];

  const categories = [
    { id: Category.Educacao, label: 'Éducation', icon: GraduationCap, color: 'from-[#0A7A94]/40 to-[#06586B]/70' },
    { id: Category.Idiomas, label: 'Langues', icon: Globe, color: 'from-[#0A6B83]/40 to-[#122C34]/80' },
    { id: Category.Sustentabilidade, label: 'Durabilité', icon: Leaf, color: 'from-emerald-800/40 to-[#0A7A94]/60' },
    { id: Category.Tecnologia, label: 'Technologie', icon: Cpu, color: 'from-[#0A7A94]/40 to-[#F26522]/50' },
    { id: Category.Alimentos, label: 'Agroalimentaire', icon: Utensils, color: 'from-amber-700/40 to-[#F26522]/60' },
    { id: Category.Gestao, label: 'Gestion', icon: Briefcase, color: 'from-[#122C34]/60 to-[#0A7A94]/60' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
  };

  const CONTENT_PADDING = "px-4 sm:px-6 md:px-10";

  const SectionRow = ({ title, category }: { title: string, category: Category }) => {
    const courses = COURSES.filter(c => c.category === category);
    if (courses.length === 0) return null;

    return (
      <section className="group/section animate-in fade-in slide-in-from-bottom-4 duration-700 mb-5 md:mb-6">
        <h2 className={`text-xs sm:text-sm md:text-base font-bold text-gray-200 mb-2 uppercase tracking-wide ${CONTENT_PADDING}`}>
          {title}
        </h2>
        <div className="relative">
          <div className={`flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar py-2 ${CONTENT_PADDING} scroll-smooth items-start`}>
            {courses.map(course => (
              <div key={course.id} className="w-36 sm:w-48 md:w-60 lg:w-64 flex-shrink-0">
                <CourseCard course={course} onClick={onCourseClick} />
              </div>
            ))}
            <div className="w-4 flex-shrink-0" />
          </div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#122C34] to-transparent pointer-events-none hidden md:block z-20" />
        </div>
      </section>
    );
  };

  return (
    <div className="pb-24 bg-[#122C34] min-h-screen font-sans relative text-white">
      
      {/* Mobile Logo Header */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 py-3 flex justify-between items-center md:hidden bg-gradient-to-b from-[#122C34] via-[#122C34]/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <Logo inverted={true} className="h-8 w-auto drop-shadow-md" />
        </div>
      </div>

      {/* Hero Banner Area */}
      <div 
        className="relative w-full h-[52vh] sm:h-[60vh] md:h-[70vh] overflow-hidden group mb-5 md:mb-7"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isInList = myListIds.includes(slide.id);

          return (
            <div
              key={`${slide.id}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  className="w-full h-full object-cover select-none animate-ken-burns"
                  alt={slide.title}
                  draggable={false}
                  onClick={() => onCourseClick(slide.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#122C34] via-[#122C34]/80 to-transparent w-[95%] md:w-3/4 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122C34] via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Text Content */}
              <div className={`absolute bottom-12 md:top-0 md:bottom-0 left-0 w-full md:w-[55%] flex flex-col justify-end md:justify-center z-20 ${CONTENT_PADDING}`}>
                <div className="animate-in slide-in-from-left-10 fade-in duration-700 delay-100 space-y-2.5 md:space-y-4">
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#0A7A94] text-white rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                      {slide.subtitle}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#0E98A8] uppercase tracking-widest pl-1">
                      {slide.category}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.05] drop-shadow-xl max-w-xl">
                    {slide.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-gray-200 font-medium max-w-md leading-relaxed line-clamp-2 md:line-clamp-3">
                    {slide.description}
                  </p>
                  
                  <div className="flex items-center gap-2.5 pt-1">
                    <button 
                      onClick={() => onCourseClick(slide.id)}
                      className="flex items-center gap-2 bg-[#F26522] hover:bg-[#EE591D] text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all uppercase tracking-wider text-xs md:text-sm hover:scale-[1.03] active:scale-95 shadow-md shadow-[#F26522]/30 cursor-pointer"
                    >
                      <Play size={15} className="fill-white" /> Regarder
                    </button>
                    <button 
                      onClick={() => onToggleMyList && onToggleMyList(slide.id)}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 sm:px-5 py-2.5 rounded-xl font-bold transition-all uppercase tracking-wider text-xs md:text-sm hover:scale-[1.03] active:scale-95 cursor-pointer"
                    >
                      {isInList ? <Check size={15} /> : <Plus size={15} />}
                      {isInList ? 'Dans ma liste' : 'Ma Liste'}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i} 
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                i === currentSlide ? 'w-6 sm:w-8 bg-[#F26522]' : 'w-2 bg-gray-500 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Row */}
      <div className={`mb-6 md:mb-8 relative z-20 ${CONTENT_PADDING}`}>
        <h3 className="text-xs font-bold text-gray-400 mb-2.5 uppercase tracking-wider">Parcourir par Catégories</h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.id}
                onClick={() => onCategoryClick(cat.id)}
                className={`relative h-16 sm:h-20 md:h-24 bg-gradient-to-br ${cat.color} border border-white/15 rounded-2xl hover:border-[#0E98A8] hover:scale-[1.02] transition-all duration-300 group shadow-md flex items-center justify-center overflow-hidden w-full cursor-pointer`}
              >
                <div className="z-10 flex flex-col items-center gap-1 px-1.5">
                  <Icon size={20} className="text-white group-hover:scale-110 transition-transform sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white text-center leading-tight">{cat.label}</span>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tuteur IA Gemini Banner */}
      {onOpenAiTutor && (
        <div className={`mb-6 md:mb-8 relative z-20 ${CONTENT_PADDING}`}>
          <div className="bg-gradient-to-r from-[#1A2B32] via-[#0A7A94]/25 to-[#122C34] border border-[#0A7A94]/40 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#0A7A94] to-[#F26522] flex items-center justify-center text-white shadow-lg shrink-0">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white">
                    Tuteur IA Gemini Cercle Hub
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Actif 24/7
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-300 max-w-2xl leading-relaxed">
                  Une question sur un module, une formule ou un examen ? Votre tuteur intelligent répond en temps réel sur tous vos cours.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenAiTutor}
              className="w-full sm:w-auto px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#F26522] to-[#EE591D] hover:from-[#EE591D] hover:to-[#F26522] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02] active:scale-95"
            >
              <span>Consulter le Tuteur IA</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="space-y-4">
        <SectionRow title="Éducation & Qualification" category={Category.Educacao} />
        <SectionRow title="Technologie & Innovation Digitale" category={Category.Tecnologia} />
        <SectionRow title="Langues & Communication Internationale" category={Category.Idiomas} />
        <SectionRow title="Environnement & Responsabilité Sociétale" category={Category.Sustentabilidade} />
        <SectionRow title="Agroalimentaire & Production Locale" category={Category.Alimentos} />
        <SectionRow title="Gestion, Management & Entrepreneuriat" category={Category.Gestao} />
      </div>

      <style>{`
        .animate-ken-burns {
          animation: kenBurns 20s infinite alternate;
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
