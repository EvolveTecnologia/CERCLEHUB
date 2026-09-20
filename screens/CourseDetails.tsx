import React, { useState, useEffect } from 'react';
import { Course, Lesson, Material } from '../types';
import { Play, Download, Star, ChevronLeft, CheckCircle, FileText, AlertCircle, RotateCcw, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import GeminiStudyAssistant from '../components/GeminiStudyAssistant';

interface CourseDetailsProps {
  course: Course;
  downloadedIds: string[];
  myListIds?: string[];
  onBack: () => void;
  onLessonClick: (lesson: Lesson) => void;
  onMaterialClick?: (material: Material) => void;
  onRemoveDownload?: (id: string) => void;
  onToggleMyList?: (id: string) => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ 
  course, 
  downloadedIds, 
  myListIds = [], 
  onBack, 
  onLessonClick, 
  onMaterialClick, 
  onRemoveDownload, 
  onToggleMyList 
}) => {
  const [activeTab, setActiveTab] = useState<'lecons' | 'supports' | 'activites' | 'tuteur'>('lecons');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });

  const isInList = myListIds.includes(course.id);

  useEffect(() => {
    const progress: Record<string, number> = {};
    course.modules?.forEach(m => {
      m.lessons.forEach(l => {
        const saved = localStorage.getItem(`cerclehub_progress_${l.id}`);
        if (saved) progress[l.id] = parseFloat(saved);
      });
    });
    setLessonProgress(progress);
  }, [course]);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const confirmDelete = () => {
    if (deleteConfirmId && onRemoveDownload) {
      onRemoveDownload(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNextQuestion = () => {
    if (course.quiz && currentQuestionIndex < course.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  const calculateScore = () => {
    if (!course.quiz) return 0;
    let score = 0;
    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#122C34] text-white animate-in slide-in-from-right duration-300 relative overflow-x-hidden">
      
      {/* Header Buttons */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="p-2.5 bg-[#122C34]/70 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#122C34] transition-colors pointer-events-auto shadow-lg cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => onToggleMyList && onToggleMyList(course.id)}
          className="p-2.5 bg-[#122C34]/70 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#122C34] transition-colors pointer-events-auto shadow-lg cursor-pointer"
        >
          <Star size={24} className={isInList ? 'fill-[#F26522] text-[#F26522]' : 'text-white'} />
        </button>
      </div>

      {/* Hero Banner Area */}
      <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
        <img src={course.heroImage} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122C34] via-[#122C34]/60 to-transparent" />
      </div>

      {/* Info Area */}
      <div className="w-full -mt-28 relative z-10 px-6 md:px-12 pb-6 max-w-6xl mx-auto">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-2xl break-words">
            {course.title}
          </h1>
          <p className="text-[#0E98A8] text-xs md:text-base font-bold">
            {course.category} • Formateur : {course.instructor}
          </p>
          <p className="text-gray-300 text-xs md:text-sm max-w-3xl leading-relaxed">
            {course.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button 
              onClick={() => course.modules?.[0]?.lessons?.[0] && onLessonClick(course.modules[0].lessons[0])}
              className="flex-1 md:flex-none md:w-72 flex items-center justify-center gap-3 bg-[#F26522] hover:bg-[#EE591D] text-white py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-xl uppercase tracking-wider text-xs cursor-pointer"
            >
              <Play size={18} fill="currentColor" /> REGARDER MAINTENANT
            </button>
            <button 
              onClick={() => setActiveTab('tuteur')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0A7A94] to-[#0E98A8] hover:from-[#0E98A8] hover:to-[#0A7A94] text-white rounded-xl font-bold transition-all shadow-xl uppercase tracking-wider text-xs cursor-pointer border border-white/15"
            >
              <Sparkles size={16} className="text-amber-300" /> Poser une question à l'IA
            </button>
            <button className="w-14 flex-shrink-0 flex items-center justify-center bg-[#1A2B32] border border-white/10 rounded-xl hover:bg-[#1A2B32]/80 transition-colors text-white shadow-xl cursor-pointer">
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex gap-8 overflow-x-auto hide-scrollbar">
          {[
            { id: 'lecons', label: 'Leçons & Modules' },
            { id: 'supports', label: 'Supports Pédagogiques' },
            { id: 'activites', label: 'Évaluation & Quiz' },
            { id: 'tuteur', label: '✨ Tuteur IA Gemini' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs md:text-sm font-bold whitespace-nowrap transition-all relative cursor-pointer ${
                activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F26522] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-24 pt-6 max-w-6xl mx-auto px-6 md:px-12">
        {activeTab === 'lecons' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {course.modules?.map((module, mIdx) => (
              <div key={mIdx} className="space-y-1">
                <button 
                  onClick={() => toggleModule(mIdx)}
                  className="w-full py-4 flex items-center justify-between group active:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-[#0A7A94] rounded-full" />
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300 text-left">
                      {module.title}
                    </h3>
                  </div>
                  {expandedModules[mIdx] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                
                <div className={`space-y-3 transition-all duration-300 overflow-hidden ${expandedModules[mIdx] ? 'max-h-[2000px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {module.lessons.map((lesson) => {
                    const savedTime = lessonProgress[lesson.id] || 0;
                    const totalSecs = (parseInt(lesson.duration) || 15) * 60; 
                    const progressPercent = Math.min((savedTime / totalSecs) * 100, 100);

                    return (
                      <div 
                        key={lesson.id} 
                        onClick={() => onLessonClick(lesson)} 
                        className="flex gap-4 items-center group p-3.5 rounded-2xl bg-[#1A2B32] hover:bg-[#1A2B32]/80 transition-all border border-[#0A7A94]/20 cursor-pointer"
                      >
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-black shadow-lg">
                          <img src={course.thumbnail} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform" alt="" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={14} fill="white" className="text-white opacity-90" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-100 leading-snug">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              {lesson.duration}
                            </span>
                            {progressPercent > 0 && (
                              <span className="text-[10px] font-bold text-[#0E98A8]">
                                {Math.round(progressPercent)}%
                              </span>
                            )}
                          </div>
                          
                          {progressPercent > 0 && (
                            <div className="w-full h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#0A7A94]" 
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'supports' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {course.materials?.map((material) => {
              const isDownloaded = downloadedIds.includes(material.id);
              return (
                <div 
                  key={material.id} 
                  onClick={() => onMaterialClick && onMaterialClick(material)} 
                  className={`flex items-center gap-4 p-4 bg-[#1A2B32] border rounded-2xl transition-all cursor-pointer ${isDownloaded ? 'border-emerald-500/30' : 'border-white/10 hover:border-[#0A7A94]'}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDownloaded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#0A7A94]/20 text-[#0E98A8]'}`}>
                    <FileText size={22} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">{material.title}</h4>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">PDF • Cercle Hub Academy</span>
                  </div>
                  {isDownloaded && <CheckCircle size={18} className="text-emerald-400" />}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'activites' && (
          <div className="space-y-6 animate-in fade-in duration-300 min-h-[350px]">
            {!course.quiz ? (
              <div className="text-center py-16 text-gray-400 text-xs">
                Aucun quiz d'évaluation n'est requis pour cette session.
              </div>
            ) : !quizStarted ? (
              <div className="p-8 bg-[#1A2B32] rounded-3xl border border-white/10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#0A7A94]/20 rounded-full flex items-center justify-center mb-5 text-[#0E98A8]">
                  <RotateCcw size={30} />
                </div>
                <h3 className="text-base font-black uppercase mb-1">Quiz de Validation</h3>
                <p className="text-xs text-gray-300 mb-6 max-w-sm">Testez vos acquis pour valider ce module et débloquer vos badges académiques.</p>
                <button 
                  onClick={() => setQuizStarted(true)} 
                  className="w-full md:w-80 py-3.5 bg-[#F26522] hover:bg-[#EE591D] text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-xl transition-all cursor-pointer"
                >
                  DÉMARRER LE QUIZ
                </button>
              </div>
            ) : quizFinished ? (
              <div className="p-8 bg-[#1A2B32] rounded-3xl border border-white/10 text-center">
                <h3 className="text-xs font-bold text-[#0E98A8] uppercase tracking-wider mb-2">Score Final</h3>
                <div className="text-4xl font-black text-white mb-2">{calculateScore()} / {course.quiz.length}</div>
                <p className="text-xs text-gray-300">
                  {calculateScore() >= (course.quiz.length / 2) ? 'Félicitations, vous avez validé cette étape !' : 'Continuez à réviser et réessayez.'}
                </p>
                <button 
                  onClick={resetQuiz} 
                  className="mt-6 text-[#F26522] hover:text-[#EE591D] font-bold uppercase text-xs tracking-wider cursor-pointer"
                >
                  Refaire le test
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-[#1A2B32] rounded-3xl border border-white/10">
                  <h3 className="text-sm font-bold text-white leading-relaxed mb-6">
                    Question {currentQuestionIndex + 1}/{course.quiz.length} : {course.quiz?.[currentQuestionIndex].question}
                  </h3>
                  <div className="space-y-3">
                    {course.quiz?.[currentQuestionIndex].options.map((opt, oIdx) => (
                      <button 
                        key={oIdx} 
                        onClick={() => handleAnswerSelect(oIdx)} 
                        className={`w-full p-4 rounded-2xl text-left text-xs transition-all flex justify-between items-center cursor-pointer ${
                          selectedAnswers[currentQuestionIndex] === oIdx 
                            ? 'bg-[#0A7A94] text-white font-bold' 
                            : 'bg-[#122C34] text-gray-300 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedAnswers[currentQuestionIndex] === oIdx && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  disabled={selectedAnswers[currentQuestionIndex] === undefined} 
                  onClick={handleNextQuestion} 
                  className="w-full py-4 bg-[#F26522] hover:bg-[#EE591D] text-white rounded-xl font-bold text-xs tracking-wider shadow-xl disabled:opacity-40 cursor-pointer"
                >
                  {currentQuestionIndex < course.quiz.length - 1 ? 'QUESTION SUIVANTE' : 'VALIDER ET TERMINER'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tuteur' && (
          <div className="animate-in fade-in duration-300">
            <div className="h-[680px] rounded-3xl overflow-hidden border border-[#0A7A94]/30 shadow-2xl">
              <GeminiStudyAssistant initialCourse={course} />
            </div>
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#1A2B32] border border-white/10 rounded-3xl p-8 w-full max-w-sm text-center space-y-6">
            <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-base font-black text-white uppercase">Supprimer le téléchargement ?</h3>
            <div className="flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-xs tracking-wider cursor-pointer">
                CONFIRMER
              </button>
              <button onClick={() => setDeleteConfirmId(null)} className="w-full py-3.5 bg-white/10 text-white rounded-xl font-bold text-xs tracking-wider cursor-pointer">
                ANNULER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
