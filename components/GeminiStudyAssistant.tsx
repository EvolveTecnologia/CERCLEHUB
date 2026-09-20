import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Bot, User, BookOpen, RefreshCw, 
  CheckCircle2, AlertTriangle, ChevronDown, X, 
  HelpCircle, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { COURSES } from '../constants';
import { Course } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  modelUsed?: string;
  modelLabel?: string;
  isFallback?: boolean;
  timestamp: string;
}

interface GeminiStudyAssistantProps {
  initialCourse?: Course | null;
  onClose?: () => void;
  isFloating?: boolean;
}

interface ModelStatus {
  id: string;
  label: string;
  description: string;
  isAvailable: boolean;
  disabledUntil: string | null;
  failureCount: number;
  successCount: number;
}

export const GeminiStudyAssistant: React.FC<GeminiStudyAssistantProps> = ({
  initialCourse = null,
  onClose,
  isFloating = false,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourse ? initialCourse.id : 'all');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: initialCourse 
        ? `Bonjour Placide ! Je suis votre **Tuteur IA Gemini Cercle Hub**, dédié au cours **${initialCourse.title}**.\n\nJe suis à votre disposition pour vous expliquer n'importe quelle leçon, clarifier des concepts techniques, générer un quiz de révision ou vous donner des cas pratiques d'application en entreprise en RDC.\n\nQuelle question souhaitez-vous aborder ?`
        : `Bonjour Placide ! Je suis votre **Tuteur IA Gemini Cercle Hub**.\n\nJe peux vous accompagner dans l'ensemble de vos cours : explications approfondies, préparation aux certifications, études de cas ou synthèses méthodologiques.\n\nSélectionnez une formation ou posez directement votre question d'étude !`,
      modelUsed: 'gemini-3.8-flash',
      modelLabel: 'Gemini 3.8 Flash (Modèle Principal)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelStatusList, setModelStatusList] = useState<ModelStatus[]>([]);
  const [activeModelId, setActiveModelId] = useState<string>('gemini-3.8-flash');
  const [showModelModal, setShowModelModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedCourse = COURSES.find(c => c.id === selectedCourseId);

  // Fetch model status from backend
  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/gemini/status');
      if (res.ok) {
        const data = await res.json();
        if (data.models) setModelStatusList(data.models);
        if (data.activeModel) setActiveModelId(data.activeModel);
      }
    } catch {
      // Offline / resilience mode
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const historyPayload = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      content: m.content
    }));

    const courseContextPayload = selectedCourse ? {
      id: selectedCourse.id,
      title: selectedCourse.title,
      category: selectedCourse.category,
      description: selectedCourse.description,
      modules: selectedCourse.modules?.map(m => ({ title: m.title, lessons: m.lessons.map(l => l.title) }))
    } : null;

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          courseContext: courseContextPayload
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || "Je suis à votre écoute pour continuer.",
        modelUsed: data.modelUsed,
        modelLabel: data.modelLabel,
        isFallback: data.isFallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      if (data.modelUsed) {
        setActiveModelId(data.modelUsed);
      }
      fetchStatus();
    } catch (err: any) {
      // Seamless resilience message
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Pour votre question sur "${query}" :\n\nDans le cadre de votre progression sur Cercle Hub, nous vous conseillons de réviser les notions clés de la leçon et de vérifier l'application concrète des concepts dans le contexte professionnel.\n\n*N'hésitez pas à reformuler ou à préciser un point particulier du cours.*`,
        modelUsed: 'cercle-tutor-offline-resilient',
        modelLabel: 'Tuteur Cercle Hub (Continuité)',
        isFallback: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = selectedCourse ? [
    `Quels sont les points clés de ${selectedCourse.title} ?`,
    `Génère un quiz de 3 questions pour tester mes connaissances.`,
    `Comment appliquer cette formation dans une entreprise en RDC ?`,
    `Explique-moi les concepts les plus importants du Module 1.`
  ] : [
    `Explique-moi la gestion de projet Agile en RDC.`,
    `Quelles sont les compétences les plus demandées à Kinshasa ?`,
    `Comment préparer et réussir mon certificat Cercle Hub ?`,
    `Donne-moi une méthode pour bien mémoriser mes cours.`
  ];

  const formatMarkdown = (text: string) => {
    // Simple fast formatting for bold, bullets, headers
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-bold text-[#0E98A8] mt-2 mb-1">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-base font-bold text-white mt-3 mb-1">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-base font-black text-[#F26522] mt-3 mb-1">{line.replace('# ', '')}</h1>;
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().replace(/^[-*]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#0E98A8] text-xs font-bold leading-5">•</span>
            <p className="text-xs leading-relaxed text-gray-200">{parseBold(bulletText)}</p>
          </div>
        );
      }
      if (/^\d+\.\s+/.test(line.trim())) {
        const match = line.trim().match(/^(\d+)\.\s+(.*)/);
        if (match) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1">
              <span className="text-[#F26522] text-xs font-bold shrink-0">{match[1]}.</span>
              <p className="text-xs leading-relaxed text-gray-200">{parseBold(match[2])}</p>
            </div>
          );
        }
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs leading-relaxed text-gray-200">{parseBold(line)}</p>;
    });
  };

  const parseBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex flex-col bg-[#122C34] text-white ${isFloating ? 'h-full max-h-[85vh] rounded-2xl border border-[#0A7A94]/40 shadow-2xl overflow-hidden' : 'h-full'}`}>
      
      {/* Top Navigation Bar */}
      <div className="bg-[#1A2B32] border-b border-white/10 px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A7A94] via-[#0E98A8] to-[#F26522] flex items-center justify-center text-white shadow-lg shrink-0">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-white">Tuteur IA Gemini</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A7A94]/30 text-[#0E98A8] border border-[#0A7A94]/50">
                Officiel Cercle Hub
              </span>
            </div>
            <p className="text-[11px] text-gray-300">
              Assistance aux études, réponses aux cours & préparation aux certifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Model Indicator Button */}
          <button
            onClick={() => setShowModelModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-all cursor-pointer"
            title="Consulter l'état de la cascade des modèles d'IA"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 -ml-3" />
            <span className="font-bold text-[11px] text-gray-200 hidden sm:inline">
              {activeModelId === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash (Modèle Supérieur)' : activeModelId}
            </span>
            <span className="font-bold text-[11px] text-gray-200 sm:hidden">
              IA Active
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Course Context Picker Banner */}
      <div className="bg-[#122C34] px-5 py-2.5 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-300">
          <BookOpen size={15} className="text-[#F26522]" />
          <span className="font-semibold text-[11px] uppercase tracking-wider text-gray-400">Formation ciblée :</span>
        </div>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="bg-[#1A2B32] text-white border border-white/15 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#0A7A94] cursor-pointer max-w-xs md:max-w-md"
        >
          <option value="all">🌍 Toutes les formations / Général (Orientation Globale)</option>
          {COURSES.map(course => (
            <option key={course.id} value={course.id}>
              📚 {course.title} ({course.category})
            </option>
          ))}
        </select>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-3 max-w-[92%] md:max-w-[78%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className="shrink-0 pt-0.5">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#0A7A94] shadow-md bg-[#1A2B32]">
                    <img src="/perfil.jpg" alt="Placide Baundja Ikuba" className="w-full h-full object-cover aspect-square rounded-full" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0A7A94] to-[#0E98A8] flex items-center justify-center text-white shadow-md">
                    <Bot size={17} />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#F26522] to-[#EE591D] text-white rounded-tr-none'
                    : 'bg-[#1A2B32] border border-white/10 text-gray-200 rounded-tl-none'
                }`}
              >
                {/* Header for Bot */}
                {msg.role === 'assistant' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-[10px]">
                    <span className="font-bold text-[#0E98A8] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={11} /> Tuteur Pédagogique
                    </span>
                    <div className="flex items-center gap-1.5">
                      {msg.isFallback && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          Secours Automatique
                        </span>
                      )}
                      <span className="text-gray-400 font-mono">
                        {msg.modelLabel || msg.modelUsed || 'Gemini'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-1">
                  {formatMarkdown(msg.content)}
                </div>

                {/* Timestamp */}
                <div className={`text-[9px] mt-2 text-right ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0A7A94] to-[#0E98A8] flex items-center justify-center text-white shadow-md">
                <Bot size={17} />
              </div>
              <div className="bg-[#1A2B32] border border-white/10 p-4 rounded-2xl rounded-tl-none space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#0E98A8] font-bold">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Analyse pédagogique en cours avec Gemini...</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Vérification du modèle haute performance et préparation de votre réponse détaillée.
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 bg-[#122C34] border-t border-white/5 flex gap-2 overflow-x-auto custom-scrollbar shrink-0">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sug)}
            className="px-3 py-1.5 rounded-xl bg-[#1A2B32] hover:bg-[#0A7A94]/40 border border-white/10 text-[11px] text-gray-300 hover:text-white whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>{sug}</span>
            <ArrowRight size={11} className="text-[#0E98A8]" />
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 bg-[#1A2B32] border-t border-white/10 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2.5"
        >
          <div className="flex-1 bg-[#122C34] border border-white/15 focus-within:border-[#0A7A94] rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-inner transition-colors">
            <Bot size={18} className="text-[#0E98A8] shrink-0" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={selectedCourse ? `Posez votre question sur "${selectedCourse.title}"...` : "Posez une question sur vos cours ou demandez une explication..."}
              className="w-full bg-transparent text-white text-xs placeholder-gray-400 outline-none"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-[#F26522] hover:bg-[#EE591D] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-lg cursor-pointer shrink-0"
            title="Envoyer la question"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400 px-1">
          <span>Système intelligent avec bascule automatique des modèles d'IA sans interruption.</span>
          <span className="font-semibold text-[#0E98A8]">Cercle Hub AI</span>
        </div>
      </div>

      {/* Model Cascade Architecture Modal */}
      {showModelModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1A2B32] border border-[#0A7A94]/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-5 shadow-2xl text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0A7A94]/20 text-[#0E98A8] rounded-2xl border border-[#0A7A94]/30">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight">Cascade Intelligente Gemini</h3>
                  <p className="text-xs text-gray-300">Architecture de Continuité Pédagogique Résiliente</p>
                </div>
              </div>
              <button
                onClick={() => setShowModelModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-[#122C34] p-4 rounded-2xl border border-white/10 text-xs text-gray-300 leading-relaxed space-y-2">
              <p className="font-semibold text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                Garantie de non-interruption :
              </p>
              <p>
                La plateforme interroge en priorité absolue le modèle d'excellence <strong>Gemini 3.8 Flash</strong>.
                En cas de dépassement temporaire de quota ou d'épuisement de crédits, elle bascule instantanément et sans coupure vers les modèles de secours (Flash Lite), puis réactive automatiquement le modèle supérieur dès le rétablissement de vos quotas.
              </p>
            </div>

            {/* Model Tiers List */}
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Hiérarchie des Modèles Actifs</h4>
              
              <div className="space-y-2">
                {[
                  {
                    id: 'gemini-3.8-flash',
                    title: '1. Gemini 3.8 Flash (Modèle Prioritaire)',
                    tag: 'Haute Performance & Raisonnement Avancé',
                    isTop: true,
                  },
                  {
                    id: 'gemini-3.1-flash-lite',
                    title: '2. Gemini 3.1 Flash Lite',
                    tag: 'Secours Économique Haute Efficience',
                  },
                  {
                    id: 'gemini-2.5-flash',
                    title: '3. Gemini 2.5 Flash',
                    tag: 'Secours Intermédiaire Éprouvé',
                  },
                  {
                    id: 'gemini-2.5-flash-lite',
                    title: '4. Gemini 2.5 Flash Lite',
                    tag: 'Secours Ultime Résilience Maximale',
                  },
                ].map((tier, idx) => {
                  const isActive = activeModelId === tier.id;
                  return (
                    <div
                      key={tier.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-[#0A7A94]/20 border-[#0E98A8] text-white shadow-md'
                          : 'bg-[#122C34] border-white/5 text-gray-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{tier.title}</span>
                          {tier.isTop && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#F26522]/30 text-[#F26522] border border-[#F26522]/40">
                              Top Modèle
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400">{tier.tag}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                            <CheckCircle2 size={12} /> Actif
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-500 font-medium">Prêt</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowModelModal(false)}
              className="w-full py-3 bg-[#0A7A94] hover:bg-[#0E98A8] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Fermer et retourner aux études
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default GeminiStudyAssistant;
