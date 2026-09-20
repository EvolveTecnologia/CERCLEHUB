import React, { useState } from 'react';
import { 
  CreditCard, ShieldCheck, HelpCircle, 
  LogOut, Settings, Award, ChevronLeft, 
  ChevronRight, ExternalLink
} from 'lucide-react';
import { UserProfile, Certificate } from '../types';

import AccountScreen from './profile/AccountScreen';
import LegalScreen from './profile/LegalScreen';
import SupportScreen from './profile/SupportScreen';
import SettingsScreen from './profile/SettingsScreen';

type SubViewType = 'account' | 'certs' | 'privacy' | 'support' | 'settings' | null;

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [activeSubView, setActiveSubView] = useState<SubViewType>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [user, setUser] = useState<UserProfile>({
    name: 'Placide Baundja Ikuba',
    email: 'placide.baundja@cerclehub.cd',
    cpf: 'CD-KN-89241',
    avatar: '/perfil.jpg',
    level: 12,
    badges: ['Certifié', 'Pionnier'],
    plan: 'Abonnement Professionnel'
  });

  const certificates: Certificate[] = [
    { id: '1', title: 'Certificat en Management de Projet Agile', date: '14/01/2026' },
    { id: '2', title: 'Fondements de la Transformation Numérique', date: '20/12/2025' },
    { id: '3', title: 'Leadership Stratégique des Organisations', date: '15/11/2025' }
  ];

  const menuItems = [
    { id: 'account', label: 'Mon Compte', icon: CreditCard, subtitle: 'Données personnelles et statut' },
    { id: 'certs', label: 'Mes Certificats', icon: Award, subtitle: 'Attestations et diplômes numériques' },
    { id: 'privacy', label: 'Mentions Légales & Confidentialité', icon: ShieldCheck, subtitle: 'Protection des données et conformité' },
    { id: 'support', label: 'Support & Assistance', icon: HelpCircle, subtitle: 'Assistance technique et pédagogique' },
    { id: 'settings', label: 'Paramètres de l\'Application', icon: Settings, subtitle: 'Notifications, streaming et préférences' },
  ];

  const renderContent = () => {
    if (!activeSubView && window.innerWidth >= 768) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-10 select-none">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-5 border border-white/10">
            <Settings size={36} className="text-[#0E98A8]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Espace Apprenant Cercle Hub</h3>
          <p className="max-w-xs text-xs text-gray-400 leading-relaxed">
            Sélectionnez une rubrique dans le volet de gauche pour gérer votre profil et vos préférences.
          </p>
        </div>
      );
    }

    switch (activeSubView) {
      case 'account':
        return <AccountScreen user={user} onUpdate={setUser} />;
      case 'privacy':
        return <LegalScreen />;
      case 'support':
        return <SupportScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'certs':
        return (
          <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white">Mes Certificats Numériques</h2>
            <p className="text-gray-300 text-xs leading-relaxed">
              Consultez et téléchargez vos attestations officielles délivrées par Cercle Hub et propulsées par Amanitech. Chaque document dispose d'une clé de vérification cryptographique infalsifiable.
            </p>
            
            <div className="grid grid-cols-1 gap-4 pt-2">
              {certificates.map(cert => (
                <div key={cert.id} className="bg-[#1A2B32] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-[#0A7A94] transition-all">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A7A94] to-[#0E98A8] text-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm leading-tight">{cert.title}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Délivré le : {cert.date}</p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-5 py-2.5 bg-white/5 hover:bg-[#0A7A94] border border-white/10 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
                    <ExternalLink size={14} /> Voir le Diplôme (PDF)
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const MobileHeader = ({ title, onBack }: { title: string, onBack: () => void }) => (
    <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4 bg-[#122C34] sticky top-0 z-50 md:hidden">
      <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
        <ChevronLeft size={20} className="text-white" />
      </button>
      <h2 className="text-sm font-black text-white uppercase tracking-wider">{title}</h2>
    </div>
  );

  if (activeSubView && window.innerWidth < 768) {
    const currentItem = menuItems.find(i => i.id === activeSubView);
    return (
      <div className="fixed inset-0 bg-[#122C34] z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <MobileHeader title={currentItem?.label || ''} onBack={() => setActiveSubView(null)} />
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#122C34] overflow-hidden text-white">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-1/3 lg:w-1/4 md:border-r border-white/10 overflow-y-auto h-full bg-[#122C34] relative z-10 custom-scrollbar">
        
        {/* Profile Header */}
        <div className="pt-24 pb-8 px-6 text-center bg-gradient-to-b from-[#1A2B32] to-[#122C34] border-b border-white/5">
          <div className="relative inline-block mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#0A7A94] shadow-xl mx-auto flex items-center justify-center bg-[#1A2B32]">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-full object-cover object-center aspect-square" 
                alt="Avatar"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-[#F26522] p-1.5 rounded-full text-white shadow-md">
              <Award size={13} />
            </div>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white mb-0.5 uppercase">{user.name}</h1>
          <p className="text-[11px] text-[#0E98A8] font-bold uppercase tracking-wider">{user.plan}</p>
        </div>

        {/* Navigation Items */}
        <div className="px-4 py-5 space-y-2 pb-32">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubView === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveSubView(item.id as SubViewType)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all border group text-left cursor-pointer ${
                  isActive 
                    ? 'bg-[#0A7A94] border-[#0E98A8] shadow-lg' 
                    : 'bg-[#1A2B32]/60 border-white/5 hover:bg-[#1A2B32] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold tracking-wide text-white">
                      {item.label}
                    </span>
                    <span className={`text-[10px] hidden md:block ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
              </button>
            );
          })}

          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 p-3.5 mt-6 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20 group cursor-pointer"
          >
            <div className="p-2 bg-red-500/10 rounded-xl group-hover:bg-red-500/20">
              <LogOut size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Se Déconnecter</span>
          </button>
        </div>
      </div>

      {/* Desktop Right Content */}
      <div className="hidden md:block flex-1 bg-[#122C34] overflow-hidden relative">
        <div className="h-full overflow-y-auto custom-scrollbar relative z-10">
          {renderContent()}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#1A2B32] border border-white/10 p-8 rounded-3xl w-full max-w-sm space-y-6 text-center shadow-2xl text-white">
            <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <LogOut size={26} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold uppercase tracking-tight">Fermer la session ?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Vous devrez vous reconnecter pour accéder à vos formations et sauvegardes.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={() => { setShowLogoutConfirm(false); onLogout(); }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                CONFIRMER LA DÉCONNEXION
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                ANNULER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
