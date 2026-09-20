import React, { useState } from 'react';
import { 
  X, Smartphone, Tablet, CheckCircle, Share2, 
  PlusSquare, Download, Sparkles, ShieldCheck, 
  Zap, WifiOff, Copy, Check, ArrowRight, ExternalLink 
} from 'lucide-react';
import { Logo } from './Logo';
import { InstallResult } from './usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onInstall: (platform?: 'android' | 'ios') => Promise<InstallResult>;
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
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>(
    isIOS ? 'ios' : 'android'
  );
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [showIOSShareGuide, setShowIOSShareGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleActionClick = async () => {
    setIsInstalling(true);
    setShowIOSShareGuide(false);
    setShowAndroidGuide(false);

    try {
      const result = await onInstall(selectedPlatform);
      setIsInstalling(false);

      if (result.success) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        if (result.mode === 'ios-share' || result.mode === 'ios-guide' || selectedPlatform === 'ios') {
          setShowIOSShareGuide(true);
        } else {
          setShowAndroidGuide(true);
        }
      }
    } catch (e) {
      setIsInstalling(false);
      if (selectedPlatform === 'ios') {
        setShowIOSShareGuide(true);
      } else {
        setShowAndroidGuide(true);
      }
    }
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto hide-scrollbar">
      <div 
        className="w-full max-w-md bg-[#122C34] border border-[#0A7A94]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with clean non-colliding layout */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1A2B32] to-[#122C34] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shadow-md shrink-0">
              <Logo variant="icon-only" className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase flex items-center gap-2">
                Installer l'Application PWA
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] bg-[#F26522] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Mobile &amp; Tablette
                </span>
                <span className="text-[10px] text-gray-300">Cercle Hub</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body with hide-scrollbar */}
        <div className="p-4 sm:p-5 overflow-y-auto hide-scrollbar space-y-4 max-h-[75vh]">
          {/* Status banner if already installed */}
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle size={24} className="shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold">Application déjà installée !</p>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">
                  Vous profitez déjà du mode plein écran et de l'accès direct depuis votre écran d'accueil.
                </p>
              </div>
            </div>
          ) : installSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle size={32} className="mx-auto text-emerald-400" />
              <p className="text-sm font-bold text-emerald-300">Installation confirmée !</p>
              <p className="text-xs text-gray-300">L'application Cercle Hub a été configurée sur votre appareil.</p>
            </div>
          ) : (
            <>
              {/* Platform Selector Tabs */}
              <div className="flex bg-[#1A2B32] p-1 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('android'); setShowIOSShareGuide(false); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlatform === 'android'
                      ? 'bg-[#0A7A94] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone size={15} />
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('ios'); setShowAndroidGuide(false); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlatform === 'ios'
                      ? 'bg-[#F26522] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Tablet size={15} />
                  iOS (iPhone / iPad)
                </button>
              </div>

              {/* PRIMARY REAL ACTION BUTTON - ALWAYS VISIBLE AND CLICKABLE */}
              <div className="pt-1">
                {selectedPlatform === 'android' ? (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0A7A94] to-[#0E98A8] hover:from-[#0E98A8] hover:to-[#0A7A94] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer border border-[#0E98A8]/40"
                  >
                    {isInstalling ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download size={18} className="animate-bounce" />
                        <span className="text-xs uppercase tracking-wider">
                          Installer l'Application Android (1 Clic)
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#F26522] to-[#EE591D] hover:from-[#EE591D] hover:to-[#D9480F] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer border border-[#F26522]/40"
                  >
                    {isInstalling ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Share2 size={18} />
                        <span className="text-xs uppercase tracking-wider">
                          Installer sur iPhone / iPad (iOS)
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Interactive Step by Step Guide */}
              {selectedPlatform === 'android' ? (
                <div className={`space-y-3 bg-[#1A2B32]/80 border ${showAndroidGuide ? 'border-[#0E98A8] ring-2 ring-[#0E98A8]/30' : 'border-[#0A7A94]/20'} rounded-2xl p-4 transition-all`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E98A8] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Smartphone size={15} />
                      Guide Android (Chrome / Samsung)
                    </span>
                    {showAndroidGuide && (
                      <span className="text-[9px] bg-[#0E98A8]/20 text-[#38BDF8] px-2 py-0.5 rounded-full font-bold">
                        Étape suivante
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2 text-xs text-gray-200">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0A7A94] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <p>
                        Appuyez sur le bouton vert ci-dessus ou sur le menu <strong>Options (⋮)</strong> en haut à droite de Chrome.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0A7A94] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <p>
                        Choisissez <strong className="text-white">« Installer l'application »</strong> ou <strong className="text-white">« Ajouter à l'écran d'accueil »</strong>.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0A7A94] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <p>
                        Validez pour obtenir l'icône Cercle Hub sur votre écran d'accueil avec support hors-ligne.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`space-y-3 bg-[#1A2B32]/80 border ${showIOSShareGuide ? 'border-[#F26522] ring-2 ring-[#F26522]/30' : 'border-[#F26522]/30'} rounded-2xl p-4 transition-all`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF7A30] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Tablet size={15} />
                      Guide iPhone &amp; iPad (Safari)
                    </span>
                    {showIOSShareGuide && (
                      <span className="text-[9px] bg-[#F26522]/20 text-[#FF7A30] px-2 py-0.5 rounded-full font-bold animate-pulse">
                        Touchez Partager ci-dessous
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2 text-xs text-gray-200">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Dans <strong>Safari</strong>, touchez l'icône de <strong>Partage</strong>
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded text-white"><Share2 size={12} /></span>
                        (au bas de l'écran de l'iPhone).
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Faites glisser vers le bas et touchez <strong className="text-white">« Sur l'écran d'accueil »</strong>
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded text-white"><PlusSquare size={12} /></span>.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <p>
                        Touchez <strong>Ajouter</strong> en haut à droite. L'application est installée en plein écran !
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Copy link fallback for WebView users */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
                <span className="text-[11px] truncate mr-2 text-gray-400">
                  Ouvrir directement dans Safari ou Chrome
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-white font-bold text-[10px] flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copiedLink ? 'Lien Copié !' : 'Copier le lien'}
                </button>
              </div>

              {/* Benefits Cards */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <Zap size={15} className="text-[#0E98A8] mb-1" />
                  <span className="text-[10px] font-bold text-white">Ultra-Rapide</span>
                  <span className="text-[8px] text-gray-400">Sans latence</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <WifiOff size={15} className="text-[#F26522] mb-1" />
                  <span className="text-[10px] font-bold text-white">Hors-Ligne</span>
                  <span className="text-[8px] text-gray-400">Cache résilient</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <ShieldCheck size={15} className="text-emerald-400 mb-1" />
                  <span className="text-[10px] font-bold text-white">Certifié RDC</span>
                  <span className="text-[8px] text-gray-400">Amanitech</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-[#1A2B32]/90 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Sparkles size={12} className="text-[#0E98A8]" />
            Application Web Progressive (PWA)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
