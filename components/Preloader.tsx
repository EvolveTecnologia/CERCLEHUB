import React from 'react';
import { Logo } from './Logo';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#122C34] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,122,148,0.18)_0%,transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-10 animate-logo-pulse">
          <Logo inverted={true} className="h-20 w-auto" />
        </div>
        
        {/* Cinematic Progress Bar with Cercle Hub brand colors */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#0A7A94] via-[#0E98A8] to-[#F26522] shadow-[0_0_15px_rgba(242,101,34,0.6)] animate-load-progress" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0E98A8] animate-pulse">
              Chargement de l'expérience...
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes load-progress {
          0% { width: 0%; }
          30% { width: 45%; }
          70% { width: 80%; }
          100% { width: 100%; }
        }
        .animate-logo-pulse {
          animation: logo-pulse 2.5s ease-in-out infinite;
        }
        .animate-load-progress {
          animation: load-progress 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
