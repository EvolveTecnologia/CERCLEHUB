import React from 'react';
import { ArrowLeft, Target, Globe, Award, TrendingUp, Users, Leaf, ShieldCheck, Cpu, Building2, MapPin } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const AboutPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#F9F9F6] text-[#122C34] font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0A7A94]/10 hover:bg-[#0A7A94]/20 rounded-full text-[#0A7A94] font-bold text-xs uppercase tracking-wider transition-all"
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">À Propos • Amanitech</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-white to-[#F9F9F6] border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A7A94]/10 border border-[#0A7A94]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A7A94]">Amanitech • Cercle Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tight text-[#122C34]">
            Un Écosystème Éducatif qui Transforme <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A7A94] via-[#0E98A8] to-[#F26522]">
              les Compétences en Avenir Durable
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Cercle Hub, initiative technologique d'<strong>Amanitech</strong>, est une infrastructure numérique dédiée à l'autonomisation des professionnels, des leaders et des jeunes en République Démocratique du Congo et sur tout le continent africain.
          </p>
        </div>
      </section>

      {/* Qui Sommes-Nous */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#F26522] uppercase tracking-widest">
              <span>Notre Identité & Ambition</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#122C34] leading-tight">
              Une infrastructure permanente de développement du capital humain.
            </h2>
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                <strong>Amanitech</strong> a conçu la plateforme <strong>Cercle Hub</strong> pour répondre aux défis majeurs de la formation continue, de l'employabilité et de la transformation numérique en RDC.
              </p>
              <p>
                En combinant des formats de streaming immersifs à haute valeur pédagogique, un système d'apprentissage adaptatif intelligent et des partenariats stratégiques avec les entreprises locales et internationales, nous convertissons la formation en opportunités d'emploi concrètes.
              </p>
              <p>
                Implantés à Kinshasa, au cœur de la capitale congolaise, nous accompagnons les entreprises dans la création d'universités d'entreprise, formons les talents aux métiers de demain et bâtissons des passerelles d'excellence.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-gray-600 bg-white p-4 rounded-xl border border-gray-200">
              <MapPin size={18} className="text-[#F26522] shrink-0" />
              <span>Immeuble Swiss Mart, Boulevard du 30 Juin (Arrêt Sabena), Kinshasa, RDC</span>
            </div>
          </div>

          {/* Cards Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:border-[#0A7A94] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0A7A94]/10 text-[#0A7A94] flex items-center justify-center mb-4">
                <Target size={26} />
              </div>
              <h3 className="text-xl font-bold text-[#122C34] mb-2">Notre Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accélérer l'émancipation économique et professionnelle par une éducation technologique de pointe, accessible partout, adaptée au marché de l'emploi congolais et africain.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:border-[#F26522] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F26522]/10 text-[#F26522] flex items-center justify-center mb-4">
                <Globe size={26} />
              </div>
              <h3 className="text-xl font-bold text-[#122C34] mb-2">Notre Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Être le pôle de référence panafricain pour le streaming éducatif, l'innovation managériale et la transmission des savoirs stratégiques d'ici 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Piliers Fondamentaux */}
      <section className="py-16 px-6 md:px-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#122C34] mb-4">Nos Piliers Stratégiques</h2>
            <p className="text-sm text-gray-600">Des fondations solides au service de l'impact collectif</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#F9F9F6] border border-gray-200 space-y-3">
              <Cpu className="text-[#0A7A94]" size={28} />
              <h4 className="font-bold text-base text-[#122C34]">Technologie & Data</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Streaming ultra-rapide optimisé pour tous les débits de connexion et apprentissage adaptatif.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F6] border border-gray-200 space-y-3">
              <Award className="text-[#F26522]" size={28} />
              <h4 className="font-bold text-base text-[#122C34]">Excellence Pédagogique</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Cours dirigés par des experts reconnus du secteur privé, universitaire et institutionnel.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F6] border border-gray-200 space-y-3">
              <Leaf className="text-emerald-600" size={28} />
              <h4 className="font-bold text-base text-[#122C34]">Durabilité & ESG</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Intégration systématique des enjeux environnementaux, de la gouvernance et de la responsabilité sociétale.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F6] border border-gray-200 space-y-3">
              <Users className="text-[#0A6B83]" size={28} />
              <h4 className="font-bold text-base text-[#122C34]">Impact Mesurable</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Suivi analytique précis des compétences acquises, des certifications et de l'insertion sur le marché.</p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default AboutPage;
