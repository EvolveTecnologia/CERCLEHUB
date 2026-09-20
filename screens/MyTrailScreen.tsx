import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Target, Award, Zap, TrendingUp, BookOpen, Clock, 
  Brain, ChevronRight, Lock, Check, Edit2, X, Star, Calendar as CalendarIcon,
  Filter, BarChart2, MapPin, Users, MessageSquare, Send, Bot, Sparkles, MoreHorizontal, ArrowUpRight, Crown, Medal, Flame,
  FileText, Video, Download, Paperclip, Bell, ChevronDown, GraduationCap, Layout, CheckCircle, Trash2, ShieldAlert, MoreVertical, Plus, Image as ImageIcon
} from 'lucide-react';

// --- Types & Interfaces ---

interface LearningNode {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'project';
  status: 'locked' | 'current' | 'completed';
  xp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  level: number;
  maxLevel: number;
  progress: number;
  total: number;
  icon: React.ElementType;
  color: string;
}

interface RankingUser {
  id: number;
  name: string;
  xp: number;
  avatar: string;
  region: string;
  trend: 'up' | 'down' | 'same';
  isMe?: boolean;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  text: string;
  suggestions?: string[];
}

interface CourseOption {
  id: string;
  title: string;
  instructor: string;
  type: 'Certifiant' | 'En ligne';
  progress: number;
}

// --- Data ---

const COURSES_LIST: CourseOption[] = [
  { id: '1', title: 'Industrie 4.0 & Automatisation', instructor: 'Prof. Anderson Kabamba', type: 'Certifiant', progress: 45 },
  { id: '2', title: 'Anglais Professionnel des Affaires', instructor: 'Coach Sarah Lumumba', type: 'En ligne', progress: 15 },
  { id: '3', title: 'Management Agile & Leadership', instructor: 'Anaëlle Mbuyi', type: 'En ligne', progress: 80 },
];

const LEARNING_PATH: LearningNode[] = [
  { id: '1', title: 'Fondements de l\'Industrie 4.0', type: 'video', status: 'completed', xp: 500 },
  { id: '2', title: 'Quiz : Transformation Numérique', type: 'quiz', status: 'completed', xp: 200 },
  { id: '3', title: 'Terminologie & Systèmes Intelligents', type: 'video', status: 'completed', xp: 350 },
  { id: '4', title: 'Projet d\'Application en Entreprise', type: 'project', status: 'current', xp: 1000 },
  { id: '5', title: 'Mesures & Analyse de Données', type: 'video', status: 'locked', xp: 400 },
  { id: '6', title: 'Évaluation Globale : Module 1', type: 'quiz', status: 'locked', xp: 800 },
  { id: '7', title: 'Leadership & Conduite du Changement', type: 'video', status: 'locked', xp: 300 },
  { id: '8', title: 'RSE & Éco-responsabilité en RDC', type: 'video', status: 'locked', xp: 350 },
];

const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: '1', title: 'Constance', description: 'Maintenez une assiduité de 30 jours consécutifs', level: 2, maxLevel: 3, progress: 14, total: 30, icon: Flame, color: 'text-[#F26522]' },
  { id: '2', title: 'Érudit', description: 'Gagnez 1000 XP en une seule journée', level: 3, maxLevel: 3, progress: 1000, total: 1000, icon: Brain, color: 'text-[#0E98A8]' },
  { id: '3', title: 'Leader', description: 'Atteignez le Top 3 du classement mensuel', level: 1, maxLevel: 5, progress: 1, total: 3, icon: Crown, color: 'text-amber-400' },
  { id: '4', title: 'Polyglotte', description: 'Suivez des modules en 2 langues différentes', level: 1, maxLevel: 2, progress: 2, total: 2, icon: BookOpen, color: 'text-emerald-400' },
];

const MOCK_PERFORMANCE_DATA: any = {
  '7d': {
    Geral: { videoHours: 12.5, quizAccuracy: 88, focus: 'Haute' },
    Tecnologia: { videoHours: 8.0, quizAccuracy: 92, focus: 'Excellente' },
    Idiomas: { videoHours: 2.5, quizAccuracy: 70, focus: 'Moyenne' },
    Gestao: { videoHours: 2.0, quizAccuracy: 75, focus: 'Bonne' },
  },
  '30d': {
    Geral: { videoHours: 45.0, quizAccuracy: 82, focus: 'Moyenne' },
    Tecnologia: { videoHours: 30.0, quizAccuracy: 89, focus: 'Haute' },
    Idiomas: { videoHours: 10.0, quizAccuracy: 75, focus: 'Moyenne' },
    Gestao: { videoHours: 5.0, quizAccuracy: 70, focus: 'Moyenne' },
  },
  'semestre': {
    Geral: { videoHours: 120.0, quizAccuracy: 85, focus: 'Haute' },
    Tecnologia: { videoHours: 80.0, quizAccuracy: 92, focus: 'Excellente' },
    Idiomas: { videoHours: 25.0, quizAccuracy: 78, focus: 'Moyenne' },
    Gestao: { videoHours: 15.0, quizAccuracy: 82, focus: 'Haute' },
  }
};

const MOCK_RANKING_DATA = {
  global: [
    { id: 1, name: 'Grace Kalombo', xp: 2950, avatar: 'https://i.pravatar.cc/150?u=12', region: 'Kinshasa', trend: 'up' },
    { id: 2, name: 'Patrick Mukendi', xp: 2720, avatar: 'https://i.pravatar.cc/150?u=22', region: 'Lubumbashi', trend: 'same' },
    { id: 3, name: 'Placide Baundja Ikuba (Vous)', xp: 2450, avatar: '/perfil.jpg', region: 'Kinshasa', trend: 'up', isMe: true },
    { id: 4, name: 'Dorcas Ilunga', xp: 2150, avatar: 'https://i.pravatar.cc/150?u=34', region: 'Goma', trend: 'down' },
    { id: 5, name: 'Serge Tshilombo', xp: 1980, avatar: 'https://i.pravatar.cc/150?u=45', region: 'Matadi', trend: 'up' },
  ],
  region: [
    { id: 1, name: 'Grace Kalombo', xp: 2950, avatar: 'https://i.pravatar.cc/150?u=12', region: 'Kinshasa', trend: 'up' },
    { id: 2, name: 'Placide Baundja Ikuba (Vous)', xp: 2450, avatar: '/perfil.jpg', region: 'Kinshasa', trend: 'up', isMe: true },
    { id: 3, name: 'Fiston Banza', xp: 1850, avatar: 'https://i.pravatar.cc/150?u=8', region: 'Kinshasa', trend: 'same' },
  ],
  friends: [
    { id: 1, name: 'Placide Baundja Ikuba (Vous)', xp: 2450, avatar: '/perfil.jpg', region: 'Kinshasa', trend: 'up', isMe: true },
    { id: 2, name: 'Alain Kanku', xp: 1750, avatar: 'https://i.pravatar.cc/150?u=20', region: 'Kinshasa', trend: 'up' },
  ]
};

const ASSESSMENTS = [
  { id: 1, title: 'Évaluation Module 1 - Principes Numériques', type: 'Examen', status: 'pending', dueDate: '25 Mars 2026', grade: null },
  { id: 2, title: 'Étude de Cas Pratique d\'Entreprise', type: 'Projet', status: 'graded', dueDate: '15 Fév. 2026', grade: 9.5 },
  { id: 3, title: 'Test Hebdomadaire de Vocabulaire Technique', type: 'Quiz', status: 'late', dueDate: '10 Fév. 2026', grade: null },
];

const CALENDAR_EVENTS = [
  { id: 1, title: 'Session Live : Questions & Réponses', date: '24 Fév 18:30', type: 'live', link: '#' },
  { id: 2, title: 'Rendu du Projet d\'Application', date: '28 Fév 23:59', type: 'deadline', link: '#' },
  { id: 3, title: 'Atelier de Mentorat Collectif', date: '05 Mar 15:00', type: 'live', link: '#' },
];

interface Recipient {
  id: string;
  name: string;
  role: 'Formateur' | 'Coordination' | 'Apprenant' | 'Collègue';
  avatar?: string;
}

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderRole: 'Formateur' | 'Coordination' | 'Apprenant' | 'Collègue' | 'Système' | 'Moi';
  avatar?: string;
  text: string;
  time: string;
  read: boolean;
  isMe: boolean;
  attachment?: string;
}

const RECIPIENTS: Recipient[] = [
  { id: 'prof1', name: 'Prof. Anderson Kabamba', role: 'Formateur', avatar: 'https://i.pravatar.cc/150?u=50' },
  { id: 'coord1', name: 'Coordination Pédagogique Amanitech', role: 'Coordination', avatar: '' },
  { id: 'aluno1', name: 'Patrick Mukendi', role: 'Apprenant', avatar: 'https://i.pravatar.cc/150?u=22' },
  { id: 'amigo1', name: 'Alain Kanku', role: 'Collègue', avatar: 'https://i.pravatar.cc/150?u=20' },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 1, senderId: 'prof1', senderName: 'Prof. Anderson', senderRole: 'Formateur', avatar: 'https://i.pravatar.cc/150?u=50', text: 'N\'oubliez pas de finaliser votre projet avant vendredi. Je reste disponible pour vos questions.', time: '10:30', read: false, isMe: false },
  { id: 2, senderId: 'sys', senderName: 'Système Cercle Hub', senderRole: 'Système', avatar: '', text: 'Votre note de l\'Étude de Cas Pratique a été publiée : 9.5 / 10.', time: 'Hier', read: true, isMe: false },
  { id: 3, senderId: 'me', senderName: 'Placide Baundja Ikuba', senderRole: 'Moi', avatar: '/perfil.jpg', text: 'Professeur, merci pour vos précieux retours sur le module.', time: '10:45', read: true, isMe: true },
];

const LIBRARY_ITEMS = [
  { id: 1, title: 'Livret Pédagogique Complet (PDF)', type: 'pdf', url: '#' },
  { id: 2, title: 'Enregistrement de la Séance Live', type: 'video', url: '#' },
  { id: 3, title: 'Support de Synthèse & Fiches Métiers', type: 'doc', url: '#' },
];

// --- Subcomponents ---

const GoalModal = ({ 
  isOpen, 
  onClose, 
  currentDailyGoal,
  currentWeeklyGoal,
  onSave 
}: { isOpen: boolean; onClose: () => void; currentDailyGoal: number; currentWeeklyGoal: number; onSave: (d: number, w: number) => void }) => {
  const [dailyVal, setDailyVal] = useState(currentDailyGoal);
  const [weeklyVal, setWeeklyVal] = useState(currentWeeklyGoal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-[#1A2B32] border border-[#0A7A94]/30 rounded-3xl p-8 w-full max-w-md space-y-6 shadow-2xl relative overflow-hidden text-white">
        <div className="flex justify-between items-center relative z-10">
          <h3 className="text-lg font-black uppercase tracking-tight">Modifier mes objectifs</h3>
          <button onClick={onClose}><X className="text-gray-400 hover:text-white" /></button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-[#0E98A8] uppercase tracking-wider">Temps quotidien</label>
            <span className="text-2xl font-black">{dailyVal} <span className="text-xs text-gray-400">min/jour</span></span>
          </div>
          <input 
            type="range" 
            min="15" 
            max="120" 
            step="15" 
            value={dailyVal} 
            onChange={(e) => setDailyVal(Number(e.target.value))}
            className="w-full accent-[#F26522] h-2 bg-[#122C34] rounded-lg cursor-pointer"
          />
        </div>
        <div className="h-px bg-white/10 w-full" />
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-[#F26522] uppercase tracking-wider">Leçons par semaine</label>
            <span className="text-2xl font-black">{weeklyVal} <span className="text-xs text-gray-400">leçons</span></span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            step="1" 
            value={weeklyVal} 
            onChange={(e) => setWeeklyVal(Number(e.target.value))}
            className="w-full accent-[#0A7A94] h-2 bg-[#122C34] rounded-lg cursor-pointer"
          />
        </div>
        <button 
          onClick={() => { onSave(dailyVal, weeklyVal); onClose(); }}
          className="w-full py-3.5 bg-[#F26522] hover:bg-[#EE591D] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check size={16} /> Enregistrer
        </button>
      </div>
    </div>
  );
};

const PathNode: React.FC<{ node: LearningNode; index: number; isLast: boolean }> = ({ node, index, isLast }) => {
  const alignment = index % 2 === 0 ? 'md:ml-0' : 'md:ml-28'; 
  
  let statusColor = 'bg-[#1A2B32] border-[#122C34] text-gray-500'; 
  let Icon = Lock;

  if (node.status === 'completed') {
    statusColor = 'bg-[#0A7A94] border-[#0E98A8] text-white shadow-md'; 
    Icon = Check;
  } else if (node.status === 'current') {
    statusColor = 'bg-[#F26522] border-orange-400 text-white shadow-[0_0_20px_rgba(242,101,34,0.6)] animate-pulse';
    Icon = Star;
  }

  return (
    <div className={`relative flex flex-col items-center ${alignment} mb-12 z-10 group`}>
      {!isLast && (
        <div className="absolute top-16 w-2 h-20 bg-white/10 -z-10 rounded-full">
          <div className={`w-full bg-[#0A7A94] transition-all duration-1000 rounded-full ${node.status === 'completed' ? 'h-full' : 'h-0'}`} />
        </div>
      )}
      <button 
        disabled={node.status === 'locked'}
        className={`w-18 h-18 md:w-22 md:h-22 rounded-full border-4 flex items-center justify-center transition-all duration-300 transform active:scale-95 ${statusColor} cursor-pointer`}
      >
        <Icon size={28} strokeWidth={3} />
      </button>
      <div className="absolute -bottom-7 w-44 text-center">
        <h4 className={`font-bold text-xs leading-tight ${node.status === 'locked' ? 'text-gray-500' : 'text-gray-200'}`}>
          {node.title}
        </h4>
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const Icon = achievement.icon;
  const isLocked = achievement.level === 0;
  return (
    <div className={`p-3 rounded-2xl border ${isLocked ? 'bg-[#122C34]/40 border-white/5 opacity-50' : 'bg-[#1A2B32] border-[#0A7A94]/20'} flex flex-col items-center text-center gap-2 relative group`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLocked ? 'bg-gray-800 text-gray-500' : 'bg-white/5 ' + achievement.color}`}>
        <Icon size={20} />
      </div>
      <div className="w-full">
        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{achievement.title}</h4>
        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0A7A94] to-[#F26522]" 
            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }} 
          />
        </div>
        <p className="text-[9px] text-gray-400 font-bold mt-1">{achievement.progress}/{achievement.total}</p>
      </div>
      <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 bg-[#122C34] text-white text-[10px] p-2 rounded-xl w-36 pointer-events-none transition-opacity z-50 shadow-xl border border-white/10">
        {achievement.description}
      </div>
    </div>
  );
};

const CoachAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      role: 'ai', 
      text: 'Bonjour ! Je suis votre Assistant Pédagogique Cercle Hub. 🤖\n\nJ\'ai analysé votre progression : vous avancez remarquablement en Technologie ! Avez-vous besoin d\'un conseil pour aborder le prochain module ?',
      suggestions: ['Conseils de révision', 'Mes performances actuelles', 'Planning d\'étude recommandé'] 
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      let response = '';
      if (text.includes('Conseils') || text.includes('révision')) {
        response = 'Pour ce module, consacrez 20 minutes par jour à la pratique des quiz et téléchargez le livret PDF pour annoter les définitions clés.';
      } else if (text.includes('performances')) {
        response = 'Vous avez déjà 14 jours de présence consécutive ! 🔥 Continuez ainsi pour décrocher le badge « Constance ».';
      } else {
        response = `Très bien noté. Je prépare les ressources ciblées sur "${text}" pour enrichir votre parcours d'apprentissage.`;
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: response }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-[100] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 cursor-pointer ${isOpen ? 'bg-[#F26522] rotate-90' : 'bg-gradient-to-tr from-[#0A7A94] to-[#F26522]'}`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <Sparkles size={24} className="text-white fill-white" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-6 z-[99] w-[90vw] md:w-[380px] h-[480px] bg-[#1A2B32] border border-[#0A7A94]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          <div className="p-4 bg-[#122C34] border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0A7A94]/30 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-[#0E98A8]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wide">Assistant Pédagogique IA</h3>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Cercle Hub • En ligne
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#122C34]/80">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#F26522] text-white rounded-br-none' 
                    : 'bg-[#1A2B32] text-gray-200 border border-white/10 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                {msg.suggestions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {msg.suggestions.map(sug => (
                      <button 
                        key={sug} 
                        onClick={() => handleSend(sug)}
                        className="text-[10px] bg-[#0A7A94]/20 hover:bg-[#0A7A94]/40 text-[#0E98A8] border border-[#0A7A94]/40 px-3 py-1 rounded-full transition-colors font-semibold cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-[#122C34] border-t border-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 bg-[#1A2B32] border border-white/10 rounded-xl px-2 py-1.5 focus-within:border-[#0A7A94]"
            >
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Posez une question sur vos cours..."
                className="flex-1 bg-transparent px-2 text-xs text-white placeholder-gray-500 outline-none"
              />
              <button type="submit" className="p-2 bg-[#0A7A94] rounded-lg text-white hover:bg-[#06586B] transition-colors cursor-pointer">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// --- Main Screen Component ---

const MyTrailScreen: React.FC = () => {
  const [dailyGoal, setDailyGoal] = useState(45);
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  
  const [perfPeriod, setPerfPeriod] = useState<'7d' | '30d' | 'semestre'>('7d');
  const [perfDiscipline, setPerfDiscipline] = useState('Geral');
  const [rankFilter, setRankFilter] = useState<'global' | 'region' | 'friends'>('global');
  
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES_LIST[0].id);
  const [activeTab, setActiveTab] = useState('trilha');

  const selectedCourse = useMemo(() => COURSES_LIST.find(c => c.id === selectedCourseId) || COURSES_LIST[0], [selectedCourseId]);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessageText, setNewMessageText] = useState('');
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>('all');
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: 'me',
      senderName: 'Placide Baundja Ikuba',
      senderRole: 'Moi',
      avatar: '/perfil.jpg',
      text: newMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      isMe: true
    };

    setMessages(prev => [...prev, newMessage]);
    setNewMessageText('');
    setIsNewMessageModalOpen(false);
  };

  const filteredMessages = useMemo(() => {
    if (selectedRecipientId === 'all') return messages;
    return messages.filter(msg => msg.senderId === selectedRecipientId || msg.isMe); 
  }, [messages, selectedRecipientId]);

  const currentStats = useMemo(() => {
    return MOCK_PERFORMANCE_DATA[perfPeriod][perfDiscipline] || MOCK_PERFORMANCE_DATA['7d']['Geral'];
  }, [perfPeriod, perfDiscipline]);

  const currentRanking = useMemo(() => {
    return (MOCK_RANKING_DATA as any)[rankFilter] || MOCK_RANKING_DATA.global;
  }, [rankFilter]);

  const tabs = [
    { id: 'trilha', label: 'Mon Parcours', icon: Target },
    { id: 'avaliacoes', label: 'Évaluations', icon: Edit2 },
    { id: 'calendario', label: 'Calendrier', icon: CalendarIcon },
    { id: 'comunicacao', label: 'Communication', icon: MessageSquare, badge: 2 },
    { id: 'biblioteca', label: 'Bibliothèque', icon: BookOpen },
    { id: 'frequencia', label: 'Assiduité', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#122C34] text-white px-4 md:px-8 lg:px-12 pt-20 pb-32 animate-in fade-in duration-500 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="mb-8 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
              Portail Académique
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-lg">
              Suivez votre progression pédagogique, vos validations de compétences et vos échanges avec vos tuteurs.
            </p>
          </div>

          {/* Course Selector */}
          <div className="w-full lg:w-auto">
            <div className="relative group">
              <div className="bg-[#1A2B32] border border-[#0A7A94]/30 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer hover:border-[#0E98A8] transition-all min-w-[280px]">
                <div className="w-9 h-9 bg-gradient-to-tr from-[#0A7A94] to-[#0E98A8] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {selectedCourse.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Formation Active</p>
                  <h3 className="text-white font-bold text-xs truncate">{selectedCourse.title}</h3>
                </div>
                <ChevronDown className="text-gray-400" size={16} />
              </div>
              
              <div className="absolute top-full left-0 w-full mt-2 bg-[#1A2B32] border border-[#0A7A94]/30 rounded-2xl shadow-2xl overflow-hidden hidden group-hover:block z-50">
                {COURSES_LIST.map(course => (
                  <div 
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors ${selectedCourseId === course.id ? 'bg-[#0A7A94]/20' : ''}`}
                  >
                    <div className="flex-1">
                      <h4 className={`text-xs font-bold ${selectedCourseId === course.id ? 'text-[#0E98A8]' : 'text-white'}`}>{course.title}</h4>
                      <p className="text-[10px] text-gray-400">{course.instructor} • {course.type}</p>
                    </div>
                    {selectedCourseId === course.id && <Check size={14} className="text-[#0E98A8]" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 border-b border-white/10 pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'border-[#F26522] text-white bg-white/5 font-bold' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#F26522]' : ''} />
                <span className="text-xs tracking-wide">{tab.label}</span>
                {tab.badge && (
                  <span className="bg-[#F26522] text-white text-[9px] font-bold px-1.5 rounded-full">{tab.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COL: Content */}
        <div className="lg:col-span-8 min-h-[500px]">
          
          {/* Tab 1: Mon Parcours */}
          {activeTab === 'trilha' && (
            <div className="flex flex-col items-center pt-2 relative animate-in fade-in duration-300">
              <div className="w-full flex justify-between items-center mb-10 px-6 py-4 bg-[#1A2B32] rounded-2xl border border-white/10 shadow-lg">
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Module en cours</h3>
                  <span className="text-white font-bold text-sm block mt-0.5">{selectedCourse.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Complétion</span>
                    <span className="text-[#0E98A8] font-black text-base">{selectedCourse.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center w-full relative pb-16 mt-4">
                {LEARNING_PATH.map((node, i) => (
                  <PathNode key={node.id} node={node} index={i} isLast={i === LEARNING_PATH.length - 1} />
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Évaluations */}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {ASSESSMENTS.map(item => (
                <div key={item.id} className="bg-[#1A2B32] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0A7A94]/20 text-[#0E98A8] flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                      <p className="text-gray-400 text-xs">{item.type} • Échéance : {item.dueDate}</p>
                    </div>
                  </div>
                  <div>
                    {item.grade ? (
                      <span className="text-lg font-black text-[#0E98A8]">{item.grade} / 10</span>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-amber-500/20 text-amber-300">
                        {item.status === 'pending' ? 'En attente' : 'À rattraper'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Calendrier */}
          {activeTab === 'calendario' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-[#1A2B32] border border-white/10 p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <CalendarIcon size={18} className="text-[#F26522]" /> Événements & Échéances à venir
                </h3>
                <div className="space-y-3">
                  {CALENDAR_EVENTS.map(event => (
                    <div key={event.id} className="flex items-center gap-4 p-3.5 bg-[#122C34]/80 rounded-xl border border-white/5">
                      <div className="text-center min-w-[60px] bg-white/5 p-2 rounded-lg">
                        <span className="block text-xs font-bold text-[#0E98A8] uppercase">{event.date.split(' ')[0]}</span>
                        <span className="block text-sm font-black text-white">{event.date.split(' ')[1]}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">{event.title}</h4>
                        <p className="text-gray-400 text-xs">{event.type === 'live' ? 'Séance Synchrone en Direct' : 'Date Limite de Rendu'}</p>
                      </div>
                      {event.type === 'live' && (
                        <button className="px-4 py-2 bg-[#F26522] hover:bg-[#EE591D] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer">
                          Rejoindre
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Communication */}
          {activeTab === 'comunicacao' && (
            <div className="bg-[#1A2B32] border border-white/10 rounded-3xl overflow-hidden h-[540px] flex flex-col animate-in fade-in duration-300">
              <div className="p-4 border-b border-white/10 bg-[#122C34] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-bold text-xs uppercase tracking-wider">Messages</h3>
                  <select 
                    value={selectedRecipientId}
                    onChange={(e) => setSelectedRecipientId(e.target.value)}
                    className="bg-[#1A2B32] text-xs text-white px-3 py-1.5 rounded-xl border border-white/10 outline-none cursor-pointer"
                  >
                    <option value="all">Toutes les conversations</option>
                    {RECIPIENTS.map(r => (
                      <option key={r.id} value={r.id}>{r.name} ({r.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#122C34]/40">
                {filteredMessages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 p-3.5 rounded-2xl border ${msg.read ? 'bg-transparent border-white/5' : 'bg-[#0A7A94]/10 border-[#0A7A94]/30'}`}>
                    <div className="w-9 h-9 rounded-full bg-white/10 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs">
                      {msg.avatar ? <img src={msg.avatar} alt="" className="w-full h-full object-cover" /> : 'SYS'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-white">{msg.senderName} ({msg.senderRole})</span>
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#122C34] border-t border-white/5">
                <div className="flex gap-2">
                  <input 
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Écrivez votre message..."
                    className="flex-1 bg-[#1A2B32] border border-white/10 rounded-xl px-4 text-xs text-white outline-none focus:border-[#0A7A94]" 
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="p-3 bg-[#F26522] hover:bg-[#EE591D] rounded-xl text-white transition-colors cursor-pointer"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Bibliothèque */}
          {activeTab === 'biblioteca' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
              {LIBRARY_ITEMS.map(item => (
                <div key={item.id} className="bg-[#1A2B32] border border-white/10 p-5 rounded-2xl hover:border-[#0E98A8] transition-all group cursor-pointer flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#0A7A94]/20 flex items-center justify-center text-[#0E98A8]">
                      {item.type === 'pdf' ? <FileText size={20} /> : <Video size={20} />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs md:text-sm">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">{item.type}</p>
                    </div>
                  </div>
                  <Download size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* Tab 6: Assiduité */}
          {activeTab === 'frequencia' && (
            <div className="bg-[#1A2B32] border border-white/10 p-6 rounded-3xl animate-in fade-in duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                  <CheckCircle size={18} className="text-emerald-400" /> Taux d'Assiduité Global
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Conforme aux Exigences
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Présence constatée</span>
                <span className="text-white font-black">92%</span>
              </div>
              <div className="w-full h-3 bg-[#122C34] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0A7A94] to-emerald-400 w-[92%]" />
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COL: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Performance Widget */}
          <div className="bg-[#1A2B32] p-5 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={18} className="text-[#0E98A8]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Performances</h3>
            </div>

            <div className="flex gap-2 mb-4">
              <select 
                value={perfPeriod}
                onChange={(e) => setPerfPeriod(e.target.value as any)}
                className="bg-[#122C34] text-[10px] text-white px-2.5 py-1.5 rounded-lg border border-white/10 outline-none cursor-pointer uppercase font-bold"
              >
                <option value="7d">7 Jours</option>
                <option value="30d">30 Jours</option>
                <option value="semestre">Semestre</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="bg-[#122C34]/80 p-3 rounded-xl border border-white/5">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Heures d'apprentissage</span>
                  <span className="text-base font-black text-white">{currentStats.videoHours}h</span>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A7A94]" style={{ width: `${Math.min(currentStats.videoHours * 2, 100)}%` }} />
                </div>
              </div>

              <div className="bg-[#122C34]/80 p-3 rounded-xl border border-white/5">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Précision aux quiz</span>
                  <span className="text-base font-black text-[#0E98A8]">{currentStats.quizAccuracy}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0E98A8]" style={{ width: `${currentStats.quizAccuracy}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Badges / Collection */}
          <div className="bg-[#1A2B32] p-5 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Medal size={16} className="text-amber-400" /> Badges & Distinctions
              </h3>
              <span className="text-[10px] text-gray-400 font-bold">4 / 4</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ACHIEVEMENTS_DATA.map((badge) => (
                <AchievementCard key={badge.id} achievement={badge} />
              ))}
            </div>
          </div>

          {/* Ranking */}
          <div className="bg-[#1A2B32] p-5 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users size={16} className="text-[#F26522]" /> Classement
              </h3>
              <div className="flex bg-[#122C34] rounded-lg p-1 gap-1">
                {(['global', 'region', 'friends'] as const).map((filter) => (
                  <button 
                    key={filter}
                    onClick={() => setRankFilter(filter)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer ${rankFilter === filter ? 'bg-[#0A7A94] text-white' : 'text-gray-400'}`}
                  >
                    {filter === 'region' ? 'RDC' : filter === 'friends' ? 'Amis' : 'Global'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {currentRanking.map((user: RankingUser, index: number) => (
                <div key={user.id} className={`flex items-center gap-2.5 p-2 rounded-xl ${user.isMe ? 'bg-[#0A7A94]/20 border border-[#0A7A94]/40' : 'hover:bg-white/5'}`}>
                  <span className={`text-xs font-black w-5 text-center ${index === 0 ? 'text-amber-400' : 'text-gray-400'}`}>#{index + 1}</span>
                  <img src={user.avatar} className="w-7 h-7 rounded-full object-cover" alt={user.name} />
                  <div className="flex-1">
                    <h4 className={`text-xs font-bold ${user.isMe ? 'text-[#0E98A8]' : 'text-white'}`}>{user.name}</h4>
                    <p className="text-[9px] text-gray-400">{user.region}</p>
                  </div>
                  <span className="text-xs font-black text-white">{user.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-gradient-to-r from-[#0A7A94]/30 to-[#F26522]/30 p-5 rounded-3xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-[10px] font-black text-[#0E98A8] uppercase tracking-wider mb-1">Objectifs d'étude</h4>
              <div className="flex gap-4">
                <p className="text-lg font-black text-white">{dailyGoal} <span className="text-xs text-gray-300 font-normal">min/j</span></p>
                <div className="w-px h-6 bg-white/20" />
                <p className="text-lg font-black text-white">{weeklyGoal} <span className="text-xs text-gray-300 font-normal">leçons/sem</span></p>
              </div>
            </div>
            <button 
              onClick={() => setIsGoalModalOpen(true)}
              className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white cursor-pointer"
            >
              <Edit2 size={15} />
            </button>
          </div>

        </div>
      </div>

      <CoachAIChat />

      <GoalModal 
        isOpen={isGoalModalOpen} 
        onClose={() => setIsGoalModalOpen(false)} 
        currentDailyGoal={dailyGoal}
        currentWeeklyGoal={weeklyGoal}
        onSave={(d, w) => { setDailyGoal(d); setWeeklyGoal(w); }}
      />
    </div>
  );
};

export default MyTrailScreen;
