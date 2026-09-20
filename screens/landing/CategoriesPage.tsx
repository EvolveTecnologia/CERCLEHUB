import React from 'react';
import { ArrowLeft, Briefcase, ShieldCheck, Users, GraduationCap, Globe, Leaf, Cpu, Utensils, Target, Layers } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const CategoriesPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">Écosystème • Cercle Hub</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0A7A94]/10 rounded-full text-[#0A7A94] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Infrastructure Pédagogique Intégrée</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#122C34] uppercase tracking-tight mb-6">
            Écosystème Éducatif <br />
            <span className="text-[#0A7A94]">Complet & Innovant</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl leading-relaxed">
            La plateforme <strong>Cercle Hub</strong> transcende le simple streaming vidéo. Elle constitue un environnement d'apprentissage intégré articulant technologie adaptative, intelligence des compétences et production de modules alignés sur les priorités économiques et sociétales de la République Démocratique du Congo.
          </p>
        </div>

        {/* 3 Pillars of the Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-[#0A7A94] transition-all shadow-sm">
            <div className="w-14 h-14 bg-[#0A7A94]/10 rounded-2xl flex items-center justify-center text-[#0A7A94] mb-6">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#122C34] mb-3">Pour les Entreprises</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Déploiement d'universités d'entreprise sur mesure en marque blanche (Whitelabel). Formez vos collaborateurs avec des parcours personnalisés et des indicateurs de montée en compétences en temps réel.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0A7A94] rounded-full"/> Intégration Digitale (Onboarding)</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0A7A94] rounded-full"/> Conformité & Normes Sectorielles</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0A7A94] rounded-full"/> Leadership & Gestion Stratégique</li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-[#F26522] transition-all shadow-sm">
            <div className="w-14 h-14 bg-[#F26522]/10 rounded-2xl flex items-center justify-center text-[#F26522] mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#122C34] mb-3">Gouvernement & Secteur Public</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Programmes de formation massive pour la jeunesse et les agents de l'État en RDC. Métriques auditables d'impact citoyen, qualification professionnelle certifiante et réduction de la fracture numérique.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#F26522] rounded-full"/> Alphabétisation & Numérique Citoyen</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#F26522] rounded-full"/> Métiers Techniques & Artisanat</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#F26522] rounded-full"/> Politiques Publiques & ESG</li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-[#0E98A8] transition-all shadow-sm">
            <div className="w-14 h-14 bg-[#0E98A8]/10 rounded-2xl flex items-center justify-center text-[#0E98A8] mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#122C34] mb-3">Créateurs & Enseignants</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Monétisez et distribuez votre savoir auprès de milliers d'apprenants à travers la RDC et l'Afrique. Studios partenaires, outils pédagogiques interactifs et hébergement haute performance.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0E98A8] rounded-full"/> Édition & Quiz Interactifs</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0E98A8] rounded-full"/> Rémunération Équitable</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0E98A8] rounded-full"/> Communauté Active d'Apprenants</li>
            </ul>
          </div>
        </div>

        {/* Secteurs d'Apprentissage */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-black text-[#122C34] uppercase tracking-tight mb-2">Nos Domaines de Formation</h2>
            <p className="text-sm text-gray-600">Des parcours structurés pour stimuler la compétitivité en République Démocratique du Congo.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-gray-200 text-center space-y-2">
              <GraduationCap className="mx-auto text-[#0A7A94]" size={24} />
              <div className="text-xs font-bold text-[#122C34]">Éducation & Base</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-gray-200 text-center space-y-2">
              <Globe className="mx-auto text-[#0E98A8]" size={24} />
              <div className="text-xs font-bold text-[#122C34]">Langues & Cultures</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-gray-200 text-center space-y-2">
              <Leaf className="mx-auto text-emerald-600" size={24} />
              <div className="text-xs font-bold text-[#122C34]">Environnement & RSE</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-gray-200 text-center space-y-2">
              <Cpu className="mx-auto text-[#F26522]" size={24} />
              <div className="text-xs font-bold text-[#122C34]">Technologie & IA</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-gray-200 text-center space-y-2">
              <Utensils className="mx-auto text-amber-600" size={24} />
              <div className="text-xs font-bold text-[#122C34]">Agroalimentaire</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-gray-200 text-center space-y-2">
              <Briefcase className="mx-auto text-[#0A6B83]" size={24} />
              <div className="text-xs font-bold text-[#122C34]">Gestion & Business</div>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default CategoriesPage;
