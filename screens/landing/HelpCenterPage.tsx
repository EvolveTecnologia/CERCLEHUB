import React, { useState } from 'react';
import { ArrowLeft, Search, User, Award, CreditCard, Video, Building2, HelpCircle, ChevronRight, MessageCircle } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const HelpCenterPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: User, title: 'Compte & Accès', desc: 'Connexion, mot de passe, profil et inscription.' },
    { icon: Award, title: 'Certificats & Parcours', desc: 'Délivrance, vérification numérique et heures de cours.' },
    { icon: CreditCard, title: 'Abonnements & Entreprises', desc: 'Facturation, licences d\'équipe et moyens de paiement locaux.' },
    { icon: Video, title: 'Streaming & Supports', desc: 'Lecture vidéo, téléchargement hors-ligne et livrets PDF.' },
    { icon: Building2, title: 'Solutions Corporatives', desc: 'Gestion d\'équipes, rapports de compétences et marque blanche.' },
    { icon: HelpCircle, title: 'Support Technique RDC', desc: 'Assistance en ligne, signalement de bugs et questions fréquentes.' },
  ];

  const faqs = [
    { q: "Comment obtenir une attestation ou un certificat de fin de parcours ?", a: "Après avoir complété l'ensemble des modules d'une formation et réussi le quiz d'évaluation finale (score minimum de 70%), votre certificat officiel Cercle Hub est immédiatement généré dans votre espace profil et téléchargeable au format PDF." },
    { q: "Puis-je visionner les cours sans connexion internet constante ?", a: "Oui, la plateforme permet de télécharger les livrets pédagogiques au format PDF et de précharger les contenus audio et textuels pour continuer votre apprentissage lors de vos déplacements." },
    { q: "Quelles sont les options disponibles pour les entreprises à Kinshasa et en RDC ?", a: "Cercle Hub et Amanitech proposent des formules corporatives dédiées comprenant un portail d'administration RH, des parcours sur mesure et un suivi régulier des indicateurs de progression de vos équipes." },
    { q: "Où se trouvent les locaux de Cercle Hub à Kinshasa ?", a: "Notre siège est situé à l'Immeuble Swiss Mart, sur le Boulevard du 30 Juin (Référence : Arrêt Sabena), à Kinshasa, RDC." },
  ];

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
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">Support • Cercle Hub</span>
      </div>

      {/* Hero Search */}
      <section className="relative py-16 px-6 md:px-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-black text-[#122C34] tracking-tight">
            Comment pouvons-nous vous <span className="text-[#0A7A94]">aider</span> aujourd'hui ?
          </h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Recherchez un sujet, une question ou une configuration..."
              className="w-full bg-[#F9F9F6] border border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-[#122C34] placeholder-gray-400 focus:outline-none focus:border-[#0A7A94] text-base"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-[#122C34] mb-8">Thématiques d'Aide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#0A7A94] transition-all cursor-pointer shadow-sm group">
                <div className="w-12 h-12 rounded-xl bg-[#0A7A94]/10 text-[#0A7A94] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-base text-[#122C34] mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[#122C34] mb-8">Questions Fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h4 className="font-bold text-base text-[#122C34] mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#0A7A94] to-[#06586B] text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Vous n'avez pas trouvé votre réponse ?</h3>
            <p className="text-xs text-teal-100">Notre équipe de support basée à Kinshasa est à votre disposition.</p>
          </div>
          <button 
            onClick={() => { window.scrollTo(0, 0); onViewChange('contact'); }}
            className="bg-[#F26522] hover:bg-[#EE591D] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-md"
          >
            Contacter le Support
          </button>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default HelpCenterPage;
