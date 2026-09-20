import React from 'react';
import { ArrowLeft, ShieldCheck, Database, Eye, Server, Lock } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const PrivacyPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#F9F9F6] text-[#122C34] font-sans">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0A7A94]/10 hover:bg-[#0A7A94]/20 rounded-full text-[#0A7A94] font-bold text-xs uppercase tracking-wider transition-all"
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">Confidentialité • Amanitech</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-300 rounded-full mb-6">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Protection des Données Personnelles</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#122C34] uppercase tracking-tight mb-4">
            Votre Confidentialité est <br />
            <span className="text-[#0A7A94]">Notre Priorité</span>
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Chez <strong>Cercle Hub</strong> et <strong>Amanitech</strong>, la transparence et la sécurité de vos données guident l'ensemble de nos choix d'ingénierie.
          </p>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Database className="text-[#0A7A94]" size={28} />
            <h4 className="font-bold text-base text-[#122C34]">Données Collectées</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Nous collectons uniquement les données strictement nécessaires : nom complet, adresse email, numéro de téléphone professionnel et historique de progression dans les cours.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Eye className="text-[#F26522]" size={28} />
            <h4 className="font-bold text-base text-[#122C34]">Finalités du Traitement</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Vos informations servent exclusivement à la délivrance des certificats nominatifs, à l'adaptation de vos parcours pédagogiques et au support technique personnalisé.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Server className="text-emerald-600" size={28} />
            <h4 className="font-bold text-base text-[#122C34]">Hébergement Sécurisé</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Toutes les données sont stockées sur des infrastructures conformes aux normes internationales les plus exigeantes avec sauvegardes chiffrées régulières.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Lock className="text-[#0E98A8]" size={28} />
            <h4 className="font-bold text-base text-[#122C34]">Vos Droits</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Vous disposez à tout moment d'un droit d'accès, de rectification et d'effacement de vos données personnelles sur simple demande à contact@cerclehub.cd.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
          Pour toute question relative au traitement des données : <strong>contact@cerclehub.cd</strong> • Amanitech, Immeuble Swiss Mart, Boulevard du 30 Juin, Kinshasa, RDC.
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default PrivacyPage;
