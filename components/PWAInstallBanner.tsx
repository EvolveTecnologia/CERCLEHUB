import React, { useState } from 'react';
import { Download, Share2, X, Smartphone, CheckCircle, Sparkles } from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';
import { Logo } from './Logo';

export const PWAInstallBanner: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    install,
  } = usePWAInstall();

  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('pwa_banner_dismissed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);

  // Don't display if already installed as PWA or user dismissed it in this session
  if (isInstalled || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('pwa_banner_dismissed', 'true');
    } catch (e) {}
  };

  const handleDirectInstall = async () => {
    setIsTriggering(true);
    try {
      const result = await install(isIOS ? 'ios' : 'android');
      setIsTriggering(false);
      
      // If native prompt wasn't immediately completed, open modal to guide the user
      if (!result.success && result.mode !== 'already-installed') {
        setShowModal(true);
      }
    } catch (e) {
      setIsTriggering(false);
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Floating Bottom / Top Install Quick Banner */}
      <aside 
        aria-label="Installation de l'application"
        className="fixed bottom-16 md:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-gradient-to-r from-[#122C34]/95 via-[#1A2B32]/95 to-[#0A7A94]/95 backdrop-blur-xl border border-[#0E98A8]/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl animate-in slide-in-from-bottom duration-300 text-white"
      >
        <div className="flex items-center justify-between gap-3">
          
          {/* App Icon + Info */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#0A7A94] p-1.5 border border-white/20 shadow-md shrink-0 flex items-center justify-center">
              <Logo variant="icon-only" className="w-full h-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black uppercase tracking-wide text-white truncate">
                  Installer Cercle Hub
                </h4>
                <span className="text-[9px] bg-[#F26522] text-white px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0">
                  App
                </span>
              </div>
              <p className="text-[10px] text-gray-300 truncate">
                {isIOS ? 'Sur votre iPhone & iPad' : 'Plein écran & Hors-ligne'}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleDirectInstall}
              disabled={isTriggering}
              className="px-3.5 py-2 bg-gradient-to-r from-[#F26522] to-[#EE591D] hover:from-[#EE591D] hover:to-[#D9480F] active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer border border-[#F26522]/40"
            >
              {isTriggering ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isIOS ? (
                <>
                  <Share2 size={13} />
                  <span>Installer</span>
                </>
              ) : (
                <>
                  <Download size={13} className="animate-bounce" />
                  <span>Installer</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer le bandeau d'installation"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Full Modal Helper if needed */}
      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        isAndroid={isAndroid}
        onInstall={install}
      />
    </>
  );
};
