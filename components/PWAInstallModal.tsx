import React, { useState } from 'react';
import { X, Smartphone, Tablet, CheckCircle, Share2, PlusSquare, Download, Sparkles, ShieldCheck, Zap, WifiOff } from 'lucide-react';
import { Logo } from './Logo';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onInstall: () => Promise<boolean>;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  isAndroid,
  onInstall,
}) => {
  // Default tab based on device detection, but user can freely toggle
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>(
    isIOS ? 'ios' : 'android'
  );
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    setIsInstalling(true);
    const success = await onInstall();
    setIsInstalling(false);
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#122C34] border border-[#0A7A94]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Brand and Close button */}
        <div className="p-5 bg-gradient-to-r from-[#1A2B32] to-[#122C34] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shadow-md">
              <Logo variant="icon-only" className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wide text-white uppercase flex items-center gap-1.5">
                Installer l'Application PWA
                <span className="text-[10px] bg-[#F26522] text-white px-2 py-0.5 rounded-full font-bold">Mobile &amp; Tablette</span>
              </h2>
              <p className="text-[11px] text-gray-300">Cercle Hub sur Android &amp; iOS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Status banner if already installed */}
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle size={22} className="shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold">Application déjà installée !</p>
                <p className="text-[11px] text-emerald-300/80">Vous profitez déjà de l'expérience plein écran et de l'accès direct depuis votre écran d'accueil.</p>
              </div>
            </div>
          ) : installSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
              <CheckCircle size={28} className="mx-auto text-emerald-400" />
              <p className="text-sm font-bold text-emerald-300">Installation réussie !</p>
              <p className="text-xs text-gray-300">L'icône Cercle Hub a été ajoutée à votre écran d'accueil.</p>
            </div>
          ) : (
            <>
              {/* Platform Selector Tabs */}
              <div className="flex bg-[#1A2B32] p-1 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('android')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedPlatform === 'android'
                      ? 'bg-[#0A7A94] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone size={16} />
                  Android (Samsung, Xiaomi...)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('ios')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedPlatform === 'ios'
                      ? 'bg-[#F26522] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Tablet size={16} />
                  iOS (iPhone &amp; iPad)
                </button>
              </div>

              {/* Direct One-Click Install Button if browser supports it */}
              {isInstallable && selectedPlatform === 'android' && (
                <button
                  type="button"
                  onClick={handleDirectInstall}
                  disabled={isInstalling}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#F26522] to-[#EE591D] hover:from-[#EE591D] hover:to-[#D9480F] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {isInstalling ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Download size={18} />
                      <span className="text-xs uppercase tracking-wider">Installer maintenant en 1 clic</span>
                    </>
                  )}
                </button>
              )}

              {/* Step by Step Guide for Selected Platform */}
              {selectedPlatform === 'android' ? (
                <div className="space-y-3 bg-[#1A2B32]/70 border border-[#0A7A94]/20 rounded-2xl p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E98A8] flex items-center gap-2">
                    <Smartphone size={15} />
                    Installation sur Android &amp; Tablettes
                  </h3>
                  <div className="space-y-2.5 text-xs text-gray-200">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0A7A94] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <p>
                        Dans votre navigateur (<strong>Google Chrome</strong> ou <strong>Samsung Internet</strong>), appuyez sur le menu <strong className="text-white">Options (3 points verticaux ⋮)</strong> en haut ou en bas.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0A7A94] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <p>
                        Appuyez sur <strong className="text-white">« Installer l'application »</strong> ou <strong className="text-white">« Ajouter à l'écran d'accueil »</strong>.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0A7A94] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <p>
                        Confirmez en cliquant sur <strong>Installer</strong>. L'icône apparaîtra avec vos applications mobiles avec support hors-ligne !
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-[#1A2B32]/70 border border-[#F26522]/30 rounded-2xl p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF7A30] flex items-center gap-2">
                    <Tablet size={15} />
                    Installation sur iPhone &amp; iPad (Safari)
                  </h3>
                  <div className="space-y-2.5 text-xs text-gray-200">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <p>
                        Ouvrez cette page dans le navigateur officiel <strong>Safari</strong> sur votre iPhone ou iPad.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Touchez l'icône de <strong>Partage</strong>
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded text-white"><Share2 size={12} /></span>
                        (le carré avec la flèche vers le haut dans la barre d'outils).
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Faites défiler vers le bas et touchez <strong className="text-white">« Sur l'écran d'accueil »</strong>
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded text-white"><PlusSquare size={12} /></span>.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                      <p>
                        Touchez <strong>Ajouter</strong> en haut à droite. L'application est prête en plein écran !
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Cards */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <Zap size={16} className="text-[#0E98A8] mb-1" />
                  <span className="text-[10px] font-bold text-white">Ultra-Rapide</span>
                  <span className="text-[9px] text-gray-400">Sans latence</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <WifiOff size={16} className="text-[#F26522] mb-1" />
                  <span className="text-[10px] font-bold text-white">Hors-Ligne</span>
                  <span className="text-[9px] text-gray-400">Cache résilient</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <ShieldCheck size={16} className="text-emerald-400 mb-1" />
                  <span className="text-[10px] font-bold text-white">Certifié RDC</span>
                  <span className="text-[9px] text-gray-400">Amanitech</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1A2B32]/90 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Sparkles size={12} className="text-[#0E98A8]" />
            Application Web Progressive (PWA)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
