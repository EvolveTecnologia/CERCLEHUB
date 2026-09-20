import React from 'react';
import { ArrowLeft, Target, TrendingUp, Users, Leaf, Award, MapPin } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const ImpactPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">Impact Social • RDC</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 border border-emerald-300 rounded-full mb-4 sm:mb-6">
            <Leaf size={14} className="text-emerald-700" />
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider sm:tracking-widest">RSE, ESG & Objectifs de Développement Durable</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#122C34] uppercase leading-tight mb-4 sm:mb-6">
            Transformation <br />
            <span className="text-[#0A7A94]">Économique, Sociale</span> & Capital Humain
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Par le biais d'<strong>Amanitech</strong>, la plateforme <strong>Cercle Hub</strong> déploie des méthodologies pédagogiques axées sur l'impact tangible. Nous ne diffusons pas uniquement du contenu : nous favorisons l'émancipation, l'emploi décent et le développement des compétences professionnelles en République Démocratique du Congo.
          </p>
        </div>

        {/* 4 Methodologies */}
        <div className="space-y-4 sm:space-y-6 mb-16 sm:mb-20 md:mb-24 max-w-4xl mx-auto">
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0A7A94] text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              1
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#122C34] mb-1 sm:mb-2">Formation Orientée vers l'Employabilité Directe</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Nos parcours sont conçus en rétro-ingénierie (Backward Design) : nous analysons les besoins réels des entreprises locales à Kinshasa et dans les provinces pour former aux compétences techniques et comportementales recherchées.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F26522] text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#122C34] mb-2">Ancrage dans les Réalités Locales Congolaises</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nous tenons compte des filières économiques clés en RDC (technologies, agro-industrie, logistique, énergies renouvelables et gouvernance). Les cours parlent directement aux réalités des apprenants congolais.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0E98A8] text-white flex items-center justify-center font-bold text-lg shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#122C34] mb-2">Certifications Reconnues & Portfolios Vérifiables</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Chaque étape validée génère une attestation certifiante et un badge de compétence, vérifiables numériquement par les recruteurs et les directions des ressources humaines.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#122C34] mb-2">Indicateurs d'Impact Auditables pour nos Partenaires</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fourniture de tableaux de bord détaillés pour les ONG, bailleurs de fonds et institutions publiques démontrant le taux de complétion, la rétention et l'accès à l'emploi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default ImpactPage;
