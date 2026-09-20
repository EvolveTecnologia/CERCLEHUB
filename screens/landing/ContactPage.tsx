import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Send, CheckCircle, Loader2, Building, ExternalLink, MessageSquare, User, Bot, Check } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

type Step = 'name' | 'email' | 'phone' | 'company' | 'interest' | 'message' | 'summary';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  type?: 'text' | 'options' | 'action';
  options?: string[];
}

const ContactPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de Cercle Hub. Commençons votre échange. Quel est votre nom complet ?',
      sender: 'bot',
      type: 'text'
    }
  ]);
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [userInput, setUserInput] = useState('');
  const [collectedData, setCollectedData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: ''
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    processStep(userInput);
    setUserInput('');
  };

  const processStep = (input: string) => {
    setIsTyping(true);
    let nextStep: Step = currentStep;
    let botResponse: Message = { id: '', text: '', sender: 'bot' };
    
    const newData = { ...collectedData };

    setTimeout(() => {
      switch (currentStep) {
        case 'name':
          newData.name = input;
          setCollectedData(newData);
          nextStep = 'email';
          botResponse = {
            id: Date.now().toString(),
            text: `Ravi de faire votre connaissance, ${input.split(' ')[0]} ! Pour continuer, quelle est votre adresse email professionnelle ?`,
            sender: 'bot',
            type: 'text'
          };
          break;
        case 'email':
          newData.email = input;
          setCollectedData(newData);
          nextStep = 'phone';
          botResponse = {
            id: Date.now().toString(),
            text: 'Parfait ! Quel est votre numéro de téléphone ou WhatsApp (ex : +55 21 98673-8943) ?',
            sender: 'bot',
            type: 'text'
          };
          break;
        case 'phone':
          newData.phone = input;
          setCollectedData(newData);
          nextStep = 'company';
          botResponse = {
            id: Date.now().toString(),
            text: 'Quelle est votre institution, entreprise ou organisme ?',
            sender: 'bot',
            type: 'text'
          };
          break;
        case 'company':
          newData.company = input;
          setCollectedData(newData);
          nextStep = 'interest';
          botResponse = {
            id: Date.now().toString(),
            text: 'Quel est votre principal domaine d\'intérêt avec Cercle Hub ? (Sélectionnez une ou plusieurs options ci-dessous)',
            sender: 'bot',
            type: 'options',
            options: [
              'Université d\'Entreprise & Whitelabel',
              'Partenariat Public / Gouvernement RDC',
              'Programmes de Leadership & Compétences',
              'Production de Contenus & Mentorat',
              'Formation Technique & RSE / ESG',
              'Autre Projet'
            ]
          };
          break;
        case 'message':
          newData.message = input;
          setCollectedData(newData);
          nextStep = 'summary';
          botResponse = {
            id: Date.now().toString(),
            text: 'Merci beaucoup ! Vos informations ont été enregistrées avec succès. Notre équipe à Kinshasa prendra contact avec vous dans les plus brefs délais.',
            sender: 'bot',
            type: 'action'
          };
          break;
        default:
          break;
      }

      setMessages(prev => [...prev, botResponse]);
      setCurrentStep(nextStep);
      setIsTyping(false);
    }, 900);
  };

  const toggleInterest = (interest: string) => {
    let updated: string[];
    if (selectedInterests.includes(interest)) {
      updated = selectedInterests.filter(i => i !== interest);
    } else {
      updated = [...selectedInterests, interest];
    }
    setSelectedInterests(updated);
  };

  const confirmInterests = () => {
    if (selectedInterests.length === 0) return;

    const interestStr = selectedInterests.join(', ');
    const userMsg: Message = {
      id: Date.now().toString(),
      text: interestStr,
      sender: 'user',
      type: 'text'
    };
    setMessages(prev => [...prev, userMsg]);
    
    setCollectedData(prev => ({ ...prev, interest: interestStr }));
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Excellent choix ! Enfin, décrivez brièvement vos objectifs ou vos besoins spécifiques :',
          sender: 'bot',
          type: 'text'
        }
      ]);
      setCurrentStep('message');
      setIsTyping(false);
    }, 800);
  };

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
        <span className="text-xs font-bold text-[#F26522] uppercase tracking-widest">Cercle Hub • RDC</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Institutional Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A7A94]/10 rounded-full text-[#0A7A94] text-xs font-black uppercase tracking-widest mb-4">
                <Building size={14} />
                <span>Siège Institutionnel</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#122C34] tracking-tight leading-tight mb-4">
                Construisons l'Avenir de l'Éducation en <span className="text-[#0A7A94]">RDC</span>
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Amanitech et Cercle Hub déploient des solutions de formation et d'apprentissage à fort impact en République Démocratique du Congo. Prenez contact avec nos équipes opérationnelles à Kinshasa.
              </p>
            </div>

            {/* Coordinates Cards */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A7A94]/10 text-[#0A7A94] flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#122C34]">Adresse & Siège</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    <strong>Immeuble Swiss Mart</strong>, situé sur le Boulevard du 30 Juin<br />
                    (Référence : Arrêt Sabena), Commune de la Gombe<br />
                    Kinshasa, République Démocratique du Congo
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F26522]/10 text-[#F26522] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#122C34]">Téléphone & WhatsApp</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    +55 21 98673-8943
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0E98A8]/10 text-[#0E98A8] flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#122C34]">Email Officiel</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    contact@cerclehub.cd<br />
                    support@cerclehub.cd
                  </p>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Boulevard du 30 Juin • Kinshasa</span>
                <a 
                  href="https://maps.google.com/?q=Boulevard+du+30+Juin+Kinshasa" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-[#0A7A94] font-semibold flex items-center gap-1 hover:underline"
                >
                  Ouvrir <ExternalLink size={12} />
                </a>
              </div>
              <iframe 
                title="Carte Siège Cercle Hub Kinshasa"
                src="https://maps.google.com/maps?q=Boulevard+du+30+Juin+Kinshasa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
              />
            </div>
          </div>

          {/* Right Column: Interactive Chat Assistant */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-md flex flex-col h-[640px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-5 bg-gradient-to-r from-[#0A7A94] to-[#06586B] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Assistant Virtuel Cercle Hub</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-teal-100">
                    <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
                    <span>En direct de Kinshasa</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Support Dédié</span>
            </div>

            {/* Chat Body */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#0A7A94] text-white rounded-br-none shadow-sm' 
                      : 'bg-white text-[#122C34] rounded-bl-none border border-gray-200 shadow-sm'
                  }`}>
                    <p>{m.text}</p>
                    
                    {/* Render Multi-options */}
                    {m.type === 'options' && m.options && currentStep === 'interest' && (
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.options.map((opt, i) => {
                            const isSelected = selectedInterests.includes(opt);
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => toggleInterest(opt)}
                                className={`text-left p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                                  isSelected 
                                    ? 'bg-[#F26522] text-white border-[#F26522]' 
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0A7A94]'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check size={14} />}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={confirmInterests}
                          disabled={selectedInterests.length === 0}
                          className={`w-full mt-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all ${
                            selectedInterests.length > 0
                              ? 'bg-[#0A7A94] hover:bg-[#06586B] cursor-pointer shadow-md'
                              : 'bg-gray-300 cursor-not-allowed'
                          }`}
                        >
                          Confirmer la sélection ({selectedInterests.length})
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                  <Loader2 size={14} className="animate-spin text-[#0A7A94]" />
                  <span>Cercle Hub réfléchit...</span>
                </div>
              )}
            </div>

            {/* Chat Footer Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-3">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={currentStep === 'summary' ? 'Message envoyé ! Nous vous répondrons bientôt.' : 'Écrivez votre réponse ici...'}
                disabled={currentStep === 'summary' || currentStep === 'interest'}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#122C34] focus:outline-none focus:border-[#0A7A94] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || currentStep === 'summary' || currentStep === 'interest'}
                className="bg-[#F26522] hover:bg-[#EE591D] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default ContactPage;
