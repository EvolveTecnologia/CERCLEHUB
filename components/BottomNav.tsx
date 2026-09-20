import React from 'react';
import { Home, Search, Layout, Download, User, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'search', label: 'Recherche', icon: Search },
    { id: 'ai-tutor', label: 'Tuteur IA', icon: Sparkles, isAi: true },
    { id: 'trail', label: 'Parcours', icon: Layout },
    { id: 'downloads', label: 'Télécharg.', icon: Download },
    { id: 'profile', label: 'Compte', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#122C34] border-t border-[#0A7A94]/20 z-50 flex justify-around items-center py-2 safe-area-inset-bottom md:hidden shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-gray-400'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#0E98A8]' : ''} />
            <span className={`text-[10px] font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>{tab.label}</span>
            {isActive && <div className="w-1.5 h-1.5 bg-[#F26522] rounded-full mt-0.5" />}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
