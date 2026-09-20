import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Play, Pause, 
  Settings, Check, X, Minimize, Maximize, Languages, Gauge, Globe, Sparkles
} from 'lucide-react';
import { Lesson } from '../types';
import { COURSES } from '../constants';
import GeminiStudyAssistant from '../components/GeminiStudyAssistant';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoPlayerScreenProps {
  lesson: Lesson;
  courseTitle: string;
  moduleTitle: string;
  onBack: () => void;
  onProgressUpdate?: (lessonId: string, time: number) => void;
}

const LANGUAGES = [
  { id: 'fr', label: 'Français (RDC)', flag: '🇨🇩', code: 'fr' },
  { id: 'en', label: 'Anglais', flag: '🇬🇧', code: 'en' },
  { id: 'pt', label: 'Portugais', flag: '🇵🇹', code: 'pt' },
  { id: 'es', label: 'Espagnol', flag: '🇪🇸', code: 'es' },
  { id: 'sw', label: 'Swahili', flag: '🇨🇩', code: 'sw' },
  { id: 'ln', label: 'Lingala', flag: '🇨🇩', code: 'ln' },
];

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ lesson, courseTitle, onBack, onProgressUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedLang, setSelectedLang] = useState('fr');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [showAiTutor, setShowAiTutor] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setIsFullscreen(!!document.fullscreenElement);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && isReady) {
      if (subtitlesEnabled) {
        playerRef.current.loadModule('captions'); 
        playerRef.current.setOption('captions', 'track', { languageCode: selectedLang });
      } else {
        playerRef.current.unloadModule('captions');
        playerRef.current.setOption('captions', 'track', {});
      }
    }
  }, [subtitlesEnabled, selectedLang, isReady]);

  const getYTId = (url: string = '') => {
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split(/[?&]/)[0];
    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
    return 'p3Qec3Rl_s4'; 
  };

  const videoId = getYTId(lesson.videoUrl);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const initPlayer = () => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          cc_load_policy: 1, 
          enablejsapi: 1,
          fs: 0,
          disablekb: 1,
          showinfo: 0,
          playsinline: 1
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setDuration(event.target.getDuration());
            
            const savedProgress = localStorage.getItem(`cerclehub_progress_${lesson.id}`);
            if (savedProgress) {
              const startTime = parseFloat(savedProgress);
              if (startTime < event.target.getDuration() - 10) {
                event.target.seekTo(startTime, true);
              }
            }
            
            event.target.playVideo();
            
            progressIntervalRef.current = window.setInterval(() => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                const time = playerRef.current.getCurrentTime();
                setCurrentTime(time);
                localStorage.setItem(`cerclehub_progress_${lesson.id}`, time.toString());
                if (onProgressUpdate) onProgressUpdate(lesson.id, time);
              }
            }, 1000);
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === 1);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }
    handleUserActivity();
    return () => {
      if (playerRef.current) playerRef.current.destroy();
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, [videoId]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!playerRef.current || !isReady) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current && isReady) playerRef.current.seekTo(newTime, true);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (playerRef.current && isReady) playerRef.current.setPlaybackRate(speed);
  };

  const handleUserActivity = () => {
    if (showSettings) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying && !showSettings) setShowControls(false);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden select-none ${isPortrait ? 'force-landscape' : ''}`}
      onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* IFrame Container */}
        <div className="absolute inset-0 z-0 bg-black flex items-center justify-center pointer-events-none">
          <div className="w-full h-full scale-[1.05]">
            <div id="youtube-player" className="w-full h-full"></div>
          </div>
        </div>
        
        {/* Transparent overlay */}
        <div className="absolute inset-0 z-10 w-full h-full bg-transparent" onClick={handleUserActivity}></div>

        {/* Controls Overlay */}
        <div className={`absolute inset-0 z-50 flex flex-col justify-between transition-opacity duration-300 bg-gradient-to-t from-black/85 via-transparent to-black/60 ${showControls && !showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="p-5 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="p-2.5 bg-white/10 rounded-full text-white backdrop-blur-xl border border-white/10 cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-xs md:text-sm font-bold text-white uppercase tracking-tight line-clamp-1">{lesson.title}</h1>
                <p className="text-[9px] md:text-[10px] text-[#0E98A8] font-bold uppercase tracking-wider">{courseTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setShowAiTutor(true); 
                  if (playerRef.current && isReady && isPlaying) playerRef.current.pauseVideo(); 
                }} 
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#0A7A94] to-[#0E98A8] hover:from-[#0E98A8] hover:to-[#0A7A94] rounded-full text-white text-xs font-bold border border-white/20 shadow-lg cursor-pointer pointer-events-auto"
                title="Poser une question à l'IA sur cette leçon"
              >
                <Sparkles size={14} className="text-amber-300" />
                <span className="hidden sm:inline">Tuteur IA</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setShowSettings(true); }} className="p-2.5 bg-white/10 rounded-full text-white border border-white/10 cursor-pointer pointer-events-auto">
                <Settings size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center pointer-events-auto">
            <button 
              onClick={togglePlay} 
              className={`w-16 h-16 bg-[#0A7A94]/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-xl ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
            >
              {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-3">
            <div className="px-2 pointer-events-auto">
              <input 
                type="range" 
                min="0" 
                max={duration || 100} 
                step="0.1" 
                value={currentTime} 
                onClick={(e) => e.stopPropagation()}
                onChange={handleSeek} 
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#F26522]" 
              />
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5 text-[10px] font-bold text-white bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-[#0E98A8]">{formatTime(currentTime)}</span>
                <span className="opacity-30">/</span>
                <span className="opacity-70">{formatTime(duration)}</span>
                {playbackSpeed !== 1 && <span className="text-[#F26522] ml-1">{playbackSpeed}x</span>}
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (containerRef.current) {
                    document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen();
                  }
                }} 
                className="p-2 bg-white/10 rounded-xl text-white border border-white/10 cursor-pointer pointer-events-auto"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Drawer */}
        <div className={`absolute inset-0 z-[300] bg-black/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-end ${showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`w-full max-w-[280px] h-full bg-[#122C34]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col space-y-6 transition-transform duration-300 ${showSettings ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Paramètres de Lecture</h2>
              <button onClick={(e) => { e.stopPropagation(); setShowSettings(false); }} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-6 flex-1 overflow-y-auto hide-scrollbar text-white">
              {/* Vitesse */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Gauge size={13} /> Vitesse de lecture
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SPEEDS.map(speed => (
                    <button 
                      key={speed}
                      onClick={(e) => { e.stopPropagation(); handleSpeedChange(speed); }}
                      className={`py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                        playbackSpeed === speed 
                          ? 'bg-[#0A7A94] border-[#0E98A8] text-white shadow-md' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe size={13} /> Langue des sous-titres
                </h3>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 bg-white/5 rounded-2xl p-2 border border-white/5">
                  {LANGUAGES.map(lang => (
                    <button 
                      key={lang.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedLang(lang.id); }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                        selectedLang === lang.id 
                          ? 'bg-[#0A7A94]/40 border-[#0A7A94] text-white' 
                          : 'bg-transparent border-transparent text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-xs font-medium">{lang.label}</span>
                      </div>
                      {selectedLang === lang.id && <Check size={14} className="text-[#0E98A8]" />}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sous-titres Toggle */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Languages size={13} /> Sous-titres
                </h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSubtitlesEnabled(!subtitlesEnabled); }}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                    subtitlesEnabled ? 'bg-[#0A7A94]/20 border-[#0A7A94] text-[#0E98A8]' : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">Activer les sous-titres</span>
                  <div className={`w-9 h-5 rounded-full relative transition-colors ${subtitlesEnabled ? 'bg-[#0A7A94]' : 'bg-gray-700'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${subtitlesEnabled ? 'left-4.5' : 'left-0.5'}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {showAiTutor && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-[#0A7A94]/40">
            <GeminiStudyAssistant 
              initialCourse={COURSES.find(c => c.title === courseTitle || c.modules?.some(m => m.lessons.some(l => l.id === lesson.id))) || null} 
              onClose={() => setShowAiTutor(false)}
              isFloating={true}
            />
          </div>
        </div>
      )}

      <style>{`
        .force-landscape {
          width: 100vh !important;
          height: 100vw !important;
          transform: translate(-50%, -50%) rotate(90deg);
          transform-origin: center center;
          position: fixed;
          top: 50%;
          left: 50%;
        }

        #youtube-player iframe {
          width: 100% !important;
          height: 100% !important;
          border: none;
          pointer-events: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayerScreen;
