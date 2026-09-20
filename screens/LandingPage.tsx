import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Tablet, Tv, ChevronDown, GraduationCap, Leaf, Cpu, Utensils, Briefcase, Globe } from 'lucide-react';
import { COURSES } from '../constants';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import LandingFooter from '../components/LandingFooter';
import { Logo } from '../components/Logo';

// Importing Sub-pages
import CategoriesPage from './landing/CategoriesPage';
import TechnologyPage from './landing/TechnologyPage';
import ImpactPage from './landing/ImpactPage';
import AboutPage from './landing/AboutPage';
import PartnersPage from './landing/PartnersPage';
import ContactPage from './landing/ContactPage';
import HelpCenterPage from './landing/HelpCenterPage';
import TermsPage from './landing/TermsPage';
import PrivacyPage from './landing/PrivacyPage';

interface LandingPageProps {
  onEnter: () => void;
}

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

// --- MAIN LANDING PAGE COMPONENT ---

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [currentView, setCurrentView] = useState<LandingView>('home');
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sliderIntervalRef = useRef<number | null>(null);

  // Scroll to top whenever currentView changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // --- SLIDES DATA (Hero Section) ---
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop',
      title: 'TECHNOLOGIE & INNOVATION DIGITALE',
      description: 'Maîtrisez les outils de pointe et l\'intelligence artificielle. Du niveau fondamental aux compétences avancées, préparez-vous aux métiers du futur en République Démocratique du Congo.',
      category: 'Exclusivité Cercle Hub'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop',
      title: 'FORMATION PROFESSIONNELLE & LEADERSHIP',
      description: 'Accélérez votre trajectoire managériale. Une pédagogie sur mesure conçue pour répondre aux attentes réelles des entreprises à Kinshasa et à travers l\'Afrique.',
      category: 'Leadership & Compétences'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop',
      title: 'DÉVELOPPEMENT DURABLE & RSE',
      description: 'Comprenez les leviers de la transition écologique, de la préservation des ressources et des pratiques ESG indispensables aux organisations contemporaines.',
      category: 'Environnement & Durabilité'
    }
  ];

  // --- CATEGORIES DATA (6 Items) ---
  const brandCategories = [
    { id: Category.Educacao, label: 'Éducation', icon: GraduationCap, grad: 'from-[#0A7A94] to-[#06586B]' },
    { id: Category.Idiomas, label: 'Langues & Cultures', icon: Globe, grad: 'from-[#0A6B83] to-[#122C34]' },
    { id: Category.Sustentabilidade, label: 'Durabilité & RSE', icon: Leaf, grad: 'from-emerald-800 to-[#0A7A94]' },
    { id: Category.Tecnologia, label: 'Technologie & IA', icon: Cpu, grad: 'from-[#0A7A94] to-[#F26522]' },
    { id: Category.Alimentos, label: 'Agroalimentaire', icon: Utensils, grad: 'from-amber-700 to-[#F26522]' },
    { id: Category.Gestao, label: 'Gestion & Business', icon: Briefcase, grad: 'from-[#122C34] to-[#0A7A94]' },
  ];

  // --- SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SLIDER LOGIC ---
  const startSlider = () => {
    if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    sliderIntervalRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    if (currentView === 'home') {
      startSlider();
    }
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [currentView]);

  const handleManualSlide = (index: number) => {
    setCurrentSlide(index);
    startSlider(); 
  };

  // --- ROUTING LOGIC ---
  if (currentView === 'categories') return <CategoriesPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'technology') return <TechnologyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'impact') return <ImpactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'about') return <AboutPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'partners') return <PartnersPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'contact') return <ContactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'help') return <HelpCenterPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'terms') return <TermsPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'privacy') return <PrivacyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;

  // --- CONTENT FILTERING ---
  const techCourses = COURSES.filter(c => c.category === Category.Tecnologia).slice(0, 4);
  const ejaCourses = COURSES.filter(c => c.category === Category.Educacao).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#122C34] font-sans text-white overflow-x-hidden animate-in fade-in duration-500">
      
      {/* --- NAVBAR (Sticky) --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-3 flex justify-between items-center ${scrolled ? 'bg-[#122C34]/95 backdrop-blur-md shadow-lg border-b border-[#0A7A94]/20' : 'bg-gradient-to-b from-[#122C34]/90 to-transparent'}`}>
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo inverted={true} className="h-10 md:h-12" />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onEnter}
            className="px-6 py-2.5 bg-[#F26522] hover:bg-[#EE591D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            Connexion
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION (Disney+ Style) --- */}
      <section className="relative h-[85vh] w-full overflow-hidden group">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#122C34] via-[#122C34]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122C34] via-transparent to-transparent" />
            
            <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-6 md:px-16 max-w-2xl pt-20">
              <div className="inline-flex items-center gap-2 mb-3 animate-in slide-in-from-left-4 fade-in duration-700 delay-100">
                <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
                <span className="text-[#0E98A8] font-bold tracking-widest uppercase text-[11px] md:text-xs">
                  {slide.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 drop-shadow-2xl animate-in slide-in-from-left-4 fade-in duration-700 delay-200">
                {slide.title}
              </h1>
              <p className="text-gray-200 text-xs md:text-base mb-8 leading-relaxed line-clamp-3 md:line-clamp-none animate-in slide-in-from-left-4 fade-in duration-700 delay-300">
                {slide.description}
              </p>
              <div className="flex items-center gap-4 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
                <button 
                  onClick={onEnter}
                  className="bg-[#F26522] hover:bg-[#EE591D] text-white px-8 py-3.5 md:py-4 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(242,101,34,0.4)] cursor-pointer"
                >
                  COMMENCER MAINTENANT
                </button>
                <button 
                  onClick={() => setCurrentView('about')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 md:py-4 rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm transition-all cursor-pointer"
                >
                  Découvrir Amanitech
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators (Right aligned) */}
        <div className="absolute bottom-20 right-6 md:right-16 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => handleManualSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#F26522]' : 'w-4 bg-gray-500 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      </section>

      {/* --- BRAND HUBS (6 Categories) --- */}
      <section className="px-6 md:px-16 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandCategories.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <div 
                key={idx} 
                onClick={() => onEnter()} 
                className={`h-24 md:h-32 rounded-2xl bg-gradient-to-br ${hub.grad} border border-white/15 flex flex-col items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon size={28} className="text-white drop-shadow-md" />
                <span className="font-bold text-xs md:text-xs tracking-wider uppercase text-center px-2">{hub.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CONTENT PREVIEW --- */}
      <div className="space-y-14 pb-20">
        <section className="px-6 md:px-16">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Formations à la Une en Technologie</h2>
              <p className="text-xs text-gray-400 mt-1">Acquérez les compétences numériques clés les plus recherchées en RDC</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#0E98A8] hover:text-white uppercase tracking-wider">
              Tout voir →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCourses.map(course => (
              <div key={course.id} onClick={onEnter} className="cursor-pointer transform hover:scale-[1.02] transition-all">
                <CourseCard course={course} onClick={onEnter} />
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-16">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Fondamentaux & Éducation Continue</h2>
              <p className="text-xs text-gray-400 mt-1">Modules structurés pour la qualification des jeunes et des adultes</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#0E98A8] hover:text-white uppercase tracking-wider">
              Tout voir →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ejaCourses.map(course => (
              <div key={course.id} onClick={onEnter} className="cursor-pointer transform hover:scale-[1.02] transition-all">
                <CourseCard course={course} onClick={onEnter} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- DEVICES SECTION --- */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-[#122C34] to-[#0A6B83]/30 border-y border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0A7A94]/20 border border-[#0A7A94]/30 rounded-full text-xs font-bold text-[#0E98A8] uppercase tracking-wider">
              <span>Multi-Plateforme Fluide</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">Apprenez où et quand vous voulez.</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Sur smartphone, tablette, ordinateur portable ou Smart TV. Cercle Hub s'adapte à votre rythme d'apprentissage avec synchronisation automatique de votre progression.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Tv size={32} className="text-[#0E98A8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Télévision</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Monitor size={32} className="text-[#0E98A8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Ordinateur</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Tablet size={32} className="text-[#F26522]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Tablette</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Smartphone size={32} className="text-[#F26522]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Smartphone</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800&auto=format&fit=crop" 
              alt="Multi-écrans Cercle Hub" 
              className="rounded-3xl shadow-2xl border border-white/15 relative z-10 w-full" 
            />
            <div className="absolute inset-0 bg-[#0A7A94]/20 blur-[100px] z-0" />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">Questions Fréquentes</h2>
        <div className="space-y-4">
          {[
            { 
              q: 'Qu\'est-ce que Cercle Hub ?', 
              a: 'Cercle Hub est la plateforme d\'apprentissage et de streaming éducatif premium créée par Amanitech. Elle offre des formations en leadership, technologies, langues et métiers d\'avenir, adaptées aux réalités de la RDC et du continent africain.' 
            },
            { 
              q: 'Les cours délivrent-ils des certificats reconnus ?', 
              a: 'Oui. Chaque formation complétée délivre un certificat officiel doté d\'une clé numérique d\'authentification unique, valable pour attester de vos compétences auprès des employeurs et partenaires institutionnels.' 
            },
            { 
              q: 'Puis-je suivre les cours hors-ligne ?', 
              a: 'Absolument. La plateforme vous permet de télécharger les livrets pédagogiques au format PDF et d\'accéder aux contenus pour continuer d\'étudier partout en RDC sans surcoût de données mobiles.' 
            },
            { 
              q: 'Comment fonctionne l\'accès à la plateforme ?', 
              a: 'L\'accès est ouvert aux apprenants individuels, ainsi qu\'aux équipes d\'entreprises et institutions partenaires. Si vous disposez d\'un identifiant, connectez-vous directement avec vos coordonnées pour débuter.' 
            }
          ].map((item, idx) => (
            <div key={idx} className="border-b border-white/10 pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 flex justify-between items-center text-left hover:text-[#0E98A8] transition-colors"
              >
                <span className="text-base md:text-lg font-bold">{item.q}</span>
                <ChevronDown className={`text-[#F26522] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LandingFooter onViewChange={setCurrentView} />

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

export default LandingPage;
