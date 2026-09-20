import React from 'react';
import { ArrowLeft, Scale, Shield, FileText } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const TermsPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mise à jour : Fév. 2026</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <div className="w-14 h-14 bg-[#0A7A94]/10 rounded-2xl flex items-center justify-center text-[#0A7A94] mb-6">
            <Scale size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#122C34] uppercase tracking-tight mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-gray-600 text-sm">
            Plateforme technologique exploitée par <strong>Amanitech</strong> • Siège : Immeuble Swiss Mart, Boulevard du 30 Juin (Arrêt Sabena), Kinshasa, République Démocratique du Congo.
          </p>
        </div>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed bg-white p-8 md:p-12 rounded-3xl border border-gray-200">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#122C34] uppercase tracking-wide">1. Objet & Définitions</h3>
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation de la plateforme numérique <strong>Cercle Hub</strong>, développée et gérée par la société <strong>Amanitech</strong>. En accédant aux services ou en créant un compte apprenant ou entreprise, vous acceptez sans réserve ces termes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#122C34] uppercase tracking-wide">2. Inscription & Sécurité des Comptes</h3>
            <p>
              L'accès à certains cours et parcours certifiants requiert la création préalable d'un compte. Vous vous engagez à fournir des informations exactes et à préserver la stricte confidentialité de vos identifiants d'accès. Toute activité effectuée depuis votre compte est réputée réalisée par vous-même.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#122C34] uppercase tracking-wide">3. Propriété Intellectuelle & Droits d'Auteur</h3>
            <p>
              L'ensemble des contenus vidéos, textes, modules interactifs, graphismes, logos et marques (notamment Cercle Hub et Amanitech) sont protégés par le droit de la propriété intellectuelle applicable en République Démocratique du Congo et les traités internationaux. Toute reproduction, diffusion ou exploitation non autorisée sans accord écrit préalable est strictement prohibée.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#122C34] uppercase tracking-wide">4. Certificats & Validations Académiques</h3>
            <p>
              Les certificats de formation délivrés par Cercle Hub attestent de la complétion des modules et de la réussite aux évaluations. Ils sont horodatés et authentifiables numériquement auprès d'Amanitech et de ses partenaires institutionnels.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#122C34] uppercase tracking-wide">5. Droit Applicable & Juridiction Compétente</h3>
            <p>
              Les présentes conditions sont soumises à la législation en vigueur en République Démocratique du Congo. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux compétents de Kinshasa / Gombe.
            </p>
          </section>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default TermsPage;
