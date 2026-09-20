import React from 'react';
import { ArrowLeft, Brain, Lock, WifiOff, Smartphone, Server, Layers, Zap } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const TechnologyPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">Technologie • Cercle Hub</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A7A94]/10 border border-[#0A7A94]/20 rounded-full mb-6">
              <Brain size={14} className="text-[#0A7A94]" />
              <span className="text-[11px] font-bold text-[#0A7A94] uppercase tracking-wider">Moteur d'Apprentissage Adaptatif</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#122C34] uppercase leading-tight mb-6">
              Apprentissage <br />
              <span className="text-[#0A7A94]">Intelligent</span> & Données d'Impact
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Bien plus que des vidéos, nous déployons une architecture technologique avancée conçue par <strong>Amanitech</strong>. Notre système analyse la progression des apprenants en temps réel pour recommander les modules ciblés, valider les acquis et accélérer l'insertion sur le marché du travail en RDC.
            </p>
            
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#122C34] block">99.9%</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Disponibilité</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#F26522] block">HD/4K</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Flux Adaptatif</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#0A7A94] block">LMS</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Intégré</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
              className="rounded-3xl border border-gray-200 shadow-xl w-full object-cover"
              alt="Technologie Cercle Hub"
            />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#122C34]">Chiffrement de Bout en Bout</p>
                <p className="text-[10px] text-gray-500">Protection rigoureuse des données</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A7A94]/10 text-[#0A7A94] flex items-center justify-center">
              <Smartphone size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#122C34]">Expérience Multi-Écrans</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Interface responsive de type streaming pensée pour smartphones, tablettes et ordinateurs, adaptée aux réalités d'infrastructure en RDC.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F26522]/10 text-[#F26522] flex items-center justify-center">
              <WifiOff size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#122C34]">Mode Hors-Ligne & Supports PDF</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Téléchargement des cours et des livrets pédagogiques pour continuer à apprendre sans consommer de data mobile supplémentaire.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0E98A8]/10 text-[#0E98A8] flex items-center justify-center">
              <Server size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#122C34]">Serveurs & CDN Dédiés</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Diffusion ultra-rapide optimisée pour les débits variables, avec compression dynamique et basculement automatique de qualité.
            </p>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default TechnologyPage;
