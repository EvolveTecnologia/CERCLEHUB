import React, { useState } from 'react';
import { Bell, Wifi, Monitor, PlayCircle, Trash2, Smartphone, ShieldCheck, ChevronRight } from 'lucide-react';

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    promoEmails: true,
    pushNotifs: true,
    wifiOnly: false,
    autoplay: true,
    quality: 'auto'
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
  };

  const SettingRow = ({ icon: Icon, title, subtitle, value, onClick, type = 'toggle' }: any) => (
    <div 
      className="flex items-center justify-between p-4 bg-[#1A2B32] border border-white/10 rounded-2xl hover:border-[#0A7A94]/40 transition-colors group cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5">
        <div className="p-2 bg-white/5 rounded-xl text-gray-400 group-hover:text-white transition-colors">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">{title}</h4>
          <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>
        </div>
      </div>
      
      {type === 'toggle' && (
        <div className={`w-10 h-5 rounded-full relative transition-colors ${value ? 'bg-[#0A7A94]' : 'bg-gray-700'}`}>
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all ${value ? 'left-5' : 'left-0.5'}`} />
        </div>
      )}

      {type === 'select' && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0E98A8]">
          {value} <ChevronRight size={14} />
        </div>
      )}
      
      {type === 'action' && (
        <ChevronRight size={15} className="text-gray-400 group-hover:text-white" />
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-10 pb-32 space-y-7 animate-in fade-in duration-300 text-white">
      
      {/* Notifications */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#0E98A8] uppercase tracking-wider px-1">Préférences de Notification</h3>
        <div className="space-y-2.5">
          <SettingRow 
            icon={Bell} 
            title="Courriels d'actualités et opportunités" 
            subtitle="Nouveaux cours, webinaires et masterclasses recommandés."
            value={settings.promoEmails}
            onClick={() => toggle('promoEmails')}
          />
          <SettingRow 
            icon={Smartphone} 
            title="Notifications Push d'apprentissage" 
            subtitle="Rappels d'objectifs, alertes d'évaluation et nouveaux contenus."
            value={settings.pushNotifs}
            onClick={() => toggle('pushNotifs')}
          />
        </div>
      </section>

      {/* Streaming & Données */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#0E98A8] uppercase tracking-wider px-1">Lecture & Économie de Données</h3>
        <div className="space-y-2.5">
          <SettingRow 
            icon={Wifi} 
            title="Téléchargement Wi-Fi uniquement" 
            subtitle="Économisez vos données mobiles lors du stockage hors-ligne."
            value={settings.wifiOnly}
            onClick={() => toggle('wifiOnly')}
          />
          <SettingRow 
            icon={PlayCircle} 
            title="Lecture continue (Autoplay)" 
            subtitle="Lancer automatiquement la prochaine leçon du module."
            value={settings.autoplay}
            onClick={() => toggle('autoplay')}
          />
          <SettingRow 
            icon={Monitor} 
            title="Qualité vidéo par défaut" 
            subtitle="Définissez la résolution optimale de lecture vidéo."
            value={settings.quality === 'auto' ? 'Automatique (Optimisé)' : 'Haute Définition (1080p)'}
            type="select"
            onClick={() => setSettings(prev => ({...prev, quality: prev.quality === 'auto' ? 'high' : 'auto'}))}
          />
        </div>
      </section>

      {/* Stockage & Sécurité */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#0E98A8] uppercase tracking-wider px-1">Maintenance & Sécurité</h3>
        <div className="space-y-2.5">
          <SettingRow 
            icon={Trash2} 
            title="Vider le cache local" 
            subtitle="Libérer l'espace de stockage temporaire (420 Mo)."
            type="action"
            onClick={() => alert('Cache de l\'application vidé avec succès.')}
          />
          <SettingRow 
            icon={ShieldCheck} 
            title="Sessions et appareils connectés" 
            subtitle="Consulter et révoquer les accès actifs sur vos terminaux."
            type="action"
            onClick={() => {}}
          />
        </div>
      </section>

      <div className="text-center pt-6">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Cercle Hub v2.5.0 • Propulsé par Amanitech SARL (Kinshasa, RDC)
        </p>
      </div>
    </div>
  );
};

export default SettingsScreen;
