import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail } from 'lucide-react';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface LandingFooterProps {
  onViewChange: (view: LandingView) => void;
}

const LandingFooter: React.FC<LandingFooterProps> = ({ onViewChange }) => {
  const handleNav = (view: LandingView) => {
    window.scrollTo(0, 0);
    onViewChange(view);
  };

  return (
    <footer className="bg-[#122C34] text-gray-300 py-16 px-6 md:px-16 border-t border-[#0A7A94]/20 text-xs relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand & Address Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="cursor-pointer" onClick={() => handleNav('home')}>
            <Logo inverted={true} className="h-10" />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm pt-2">
            La plateforme éducative premium de streaming conçue pour former et autonomiser les leaders, professionnels et acteurs du changement en RDC et à travers le continent africain.
          </p>
          <div className="pt-2 space-y-2 text-gray-300">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#F26522] shrink-0 mt-0.5" />
              <span>Immeuble Swiss Mart, Boulevard du 30 Juin (Réf. : Arrêt Sabena), Kinshasa, RDC</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#0E98A8] shrink-0" />
              <span>+55 21 98673-8943</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#F26522] shrink-0" />
              <span>contact@cerclehub.cd</span>
            </div>
          </div>
        </div>

        {/* Menu Plateforme */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#0A7A94]/30 pb-2">Plateforme</h4>
          <button onClick={() => handleNav('categories')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Catégories & Écosystème</button>
          <button onClick={() => handleNav('technology')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Technologie Adaptative</button>
          <button onClick={() => handleNav('impact')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Impact Social & RDC</button>
        </div>

        {/* Menu Support */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#0A7A94]/30 pb-2">Support</h4>
          <button onClick={() => handleNav('help')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Centre d'Assistance</button>
          <button onClick={() => handleNav('terms')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Conditions d'Utilisation</button>
          <button onClick={() => handleNav('privacy')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Politique de Confidentialité</button>
        </div>

        {/* Menu À Propos */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#0A7A94]/30 pb-2">À Propos</h4>
          <button onClick={() => handleNav('about')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Qui Sommes-Nous</button>
          <button onClick={() => handleNav('partners')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Partenaires & Alliances</button>
          <button onClick={() => handleNav('contact')} className="block text-gray-300 hover:text-[#0E98A8] cursor-pointer transition-colors text-left">Contactez-Nous</button>
        </div>
      </div>

      {/* Bottom Bar without cookies button */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
        <p>Copyright © 2026 Amanitech. Tous droits réservés.</p>
        <p className="text-gray-400 text-[11px]">
          Propulsé par <span className="text-white font-semibold">Amanitech</span> pour le développement de la RDC.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
