import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Phone, Mail, MapPin, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  action?: 'whatsapp';
}

const SupportScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Bonjour ! Je suis le conseiller virtuel Cercle Hub. Quel est votre nom ?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: '', subject: '', description: '' });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], action?: 'whatsapp', delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, options, action }]);
    }, delay);
  };

  const handleSend = (text: string = inputText) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    setInputText('');

    if (step === 0) {
      setUserData(prev => ({ ...prev, name: text }));
      setStep(1);
      addBotMessage(`Enchanté, ${text} ! Concernant quel sujet pouvons-nous vous assister ?`, [
        'Accès aux Cours', 'Question Pédagogique', 'Attestations & Diplômes', 'Abonnement & Facturation', 'Autre'
      ]);
    } else if (step === 1) {
      setUserData(prev => ({ ...prev, subject: text }));
      setStep(2);
      addBotMessage('Parfait. Veuillez décrire brièvement votre situation ou question.');
    } else if (step === 2) {
      setUserData(prev => ({ ...prev, description: text }));
      setStep(3);
      addBotMessage(
        'Merci pour ces détails. Notre équipe à Kinshasa peut également vous répondre instantanément sur WhatsApp si vous le préférez.',
        undefined,
        'whatsapp'
      );
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`*Support Cercle Hub*\nNom: ${userData.name}\nObjet: ${userData.subject}\nMessage: ${userData.description}`);
    window.open(`https://wa.me/5521986738943?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#122C34] text-white pb-24 md:pb-0">
      
      {/* Top Cards Info */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-white/10 bg-[#1A2B32]">
        <div className="bg-[#122C34] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-[#0A7A94]/20 p-2.5 rounded-xl text-[#0E98A8]"><Mail size={18}/></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Courriel</p>
            <p className="text-white text-xs select-all">support@cerclehub.cd</p>
          </div>
        </div>
        <div className="bg-[#122C34] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400"><Phone size={18}/></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">WhatsApp / Tél</p>
            <p className="text-white text-xs select-all">+55 21 98673-8943</p>
          </div>
        </div>
        <div className="bg-[#122C34] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-[#F26522]/20 p-2.5 rounded-xl text-[#F26522]"><MapPin size={18}/></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Siège Kinshasa</p>
            <p className="text-white text-xs">Immeuble de Swiss Mart, Blvd du 30 Juin</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2.5 max-w-[85%] md:max-w-[65%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-[#F26522]' : 'bg-[#0A7A94]'}`}>
                {msg.type === 'user' ? <User size={13} /> : <Bot size={13} />}
              </div>
              
              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                msg.type === 'user' 
                  ? 'bg-[#F26522] text-white rounded-br-none' 
                  : 'bg-[#1A2B32] text-gray-200 border border-white/10 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                
                {msg.options && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {msg.options.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleSend(opt)}
                        className="bg-white/5 hover:bg-[#0A7A94]/40 border border-white/10 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#0E98A8] transition-colors cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {msg.action === 'whatsapp' && (
                  <button 
                    onClick={openWhatsApp}
                    className="mt-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs tracking-wider uppercase shadow-lg cursor-pointer"
                  >
                    <Phone size={14} /> Ouvrir la discussion WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0A7A94] flex items-center justify-center">
                <Bot size={13} />
              </div>
              <div className="bg-[#1A2B32] border border-white/10 p-3 rounded-2xl rounded-bl-none">
                <Loader2 size={14} className="animate-spin text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#1A2B32] border-t border-white/10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2 bg-[#122C34] border border-white/10 rounded-2xl px-3 py-2"
        >
          <input 
            type="text" 
            placeholder={step === 1 ? "Sélectionnez une option ci-dessus..." : "Écrivez votre message..."}
            disabled={step === 1 || step === 3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent px-2 text-xs text-white placeholder-gray-400 outline-none disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim() || step === 1 || step === 3}
            className="p-2.5 bg-[#0A7A94] hover:bg-[#06586B] rounded-xl text-white transition-colors disabled:opacity-40 cursor-pointer"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportScreen;
