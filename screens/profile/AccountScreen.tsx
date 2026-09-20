import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Save, Camera, CreditCard, MapPin, Phone, Mail, User, Clock, CheckCircle } from 'lucide-react';

interface AccountScreenProps {
  user: UserProfile;
  onUpdate: (u: UserProfile) => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...user,
    phone: '+55 21 98673-8943',
    address: 'Immeuble de Swiss Mart, Boulevard du 30 Juin (Arrêt Sabena)',
    city: 'Kinshasa',
    state: 'Gombe',
    zip: 'CD-KN-01'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
    }, 1000);
  };

  const paymentHistory = [
    { id: 1, date: '01/02/2026', plan: 'Abonnement Professionnel', amount: '29,00 $', status: 'Payé', method: 'Carte Bancaire •••• 4421' },
    { id: 2, date: '01/01/2026', plan: 'Renouvellement Mensuel', amount: '29,00 $', status: 'Payé', method: 'M-Pesa / Mobile Money' },
    { id: 3, date: '01/12/2025', plan: 'Renouvellement Mensuel', amount: '29,00 $', status: 'Payé', method: 'Orange Money' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-300 pb-32 text-white">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <div className="relative group cursor-pointer w-28 h-28 rounded-full overflow-hidden border-4 border-[#0A7A94] shadow-2xl bg-[#1A2B32]">
            <img 
              src={formData.avatar} 
              className="w-full h-full rounded-full object-cover object-center aspect-square" 
              alt="Avatar" 
            />
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Camera className="text-white" size={26} />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A7A94]/20 border border-[#0A7A94]/40 rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E98A8]">Niveau {user.level}</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full space-y-7">
          
          {/* Données Personnelles */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-[#0E98A8] uppercase tracking-wider border-b border-white/10 pb-2">
              <User size={15} /> Données Personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Nom Complet</label>
                <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0A7A94]">
                  <User size={15} className="text-gray-500" />
                  <input 
                    className="bg-transparent text-white text-xs w-full outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Identifiant National / NIF</label>
                <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 opacity-70">
                  <CreditCard size={15} className="text-gray-500" />
                  <input 
                    className="bg-transparent text-gray-400 text-xs w-full outline-none"
                    value={formData.cpf}
                    disabled
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-[#0E98A8] uppercase tracking-wider border-b border-white/10 pb-2">
              <Phone size={15} /> Coordonnées de Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Adresse E-mail</label>
                <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0A7A94]">
                  <Mail size={15} className="text-gray-500" />
                  <input 
                    className="bg-transparent text-white text-xs w-full outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Numéro de Téléphone / WhatsApp</label>
                <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0A7A94]">
                  <Phone size={15} className="text-gray-500" />
                  <input 
                    className="bg-transparent text-white text-xs w-full outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Adresse */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-[#0E98A8] uppercase tracking-wider border-b border-white/10 pb-2">
              <MapPin size={15} /> Localisation & Adresse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-3 bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0A7A94]">
                <MapPin size={15} className="text-gray-500" />
                <input 
                  className="bg-transparent text-white text-xs w-full outline-none"
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3">
                <input className="bg-transparent text-white text-xs w-full outline-none" placeholder="Ville" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              </div>
              <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3">
                <input className="bg-transparent text-white text-xs w-full outline-none" placeholder="Commune" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
              </div>
              <div className="bg-[#1A2B32] border border-white/10 rounded-xl px-4 py-3">
                <input className="bg-transparent text-white text-xs w-full outline-none" placeholder="Code Postal" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
              </div>
            </div>
          </section>

          {/* Historique de Paiement */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-[#0E98A8] uppercase tracking-wider border-b border-white/10 pb-2">
              <Clock size={15} /> Historique des Règlements
            </h3>
            <div className="space-y-2">
              {paymentHistory.map(pay => (
                <div key={pay.id} className="bg-[#1A2B32] border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{pay.plan}</p>
                      <p className="text-[10px] text-gray-400">{pay.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">{pay.amount}</p>
                    <p className="text-[10px] text-gray-400">{pay.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-[#F26522] hover:bg-[#EE591D] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          >
            {isSaving ? <span className="animate-pulse">Enregistrement en cours...</span> : <><Save size={16} /> Enregistrer les modifications</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountScreen;
