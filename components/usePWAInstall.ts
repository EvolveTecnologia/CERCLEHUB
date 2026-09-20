import { useEffect, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    deferredPWAInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

export type InstallResult = {
  success: boolean;
  mode: 'native-prompt' | 'ios-share' | 'ios-guide' | 'android-guide' | 'already-installed';
};

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    typeof window !== 'undefined' ? window.deferredPWAInstallPrompt || null : null
  );
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker if supported
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker active with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration info:', err);
        });
    }

    // 2. Check standalone mode (already installed as PWA on home screen)
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsInstalled(isStandalone);
    };
    checkStandalone();

    // 3. Precise device and environment detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(ua) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(ua);
    const isMobile = isIOSDevice || isAndroidDevice || /mobile|tablet/.test(ua) || window.innerWidth <= 1024;

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsMobileOrTablet(isMobile);
    setCanShare(typeof navigator.share === 'function');

    // 4. Capture native beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.deferredPWAInstallPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
      console.log('[PWA] Native installation prompt ready');
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      window.deferredPWAInstallPrompt = null;
      setDeferredPrompt(null);
      console.log('[PWA] App successfully installed on device');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * Real installation triggering for both Android and iOS
   */
  const install = async (preferredPlatform?: 'android' | 'ios'): Promise<InstallResult> => {
    // If already installed
    if (isInstalled) {
      return { success: true, mode: 'already-installed' };
    }

    // Haptic feedback if supported on device
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate([40, 60, 40]);
      }
    } catch (e) {
      // Ignore vibration error
    }

    const targetPlatform = preferredPlatform || (isIOS ? 'ios' : 'android');

    // CASE A: iOS (iPhone / iPad)
    if (targetPlatform === 'ios') {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({
            title: 'Cercle Hub - App PWA',
            text: 'Ajoutez l\'application Cercle Hub sur votre écran d\'accueil iOS',
            url: window.location.origin,
          });
          return { success: true, mode: 'ios-share' };
        } catch (err: unknown) {
          // User closed share sheet or unsupported
          return { success: false, mode: 'ios-guide' };
        }
      }
      return { success: false, mode: 'ios-guide' };
    }

    // CASE B: Android / Chrome native prompt available
    const activePrompt = deferredPrompt || window.deferredPWAInstallPrompt;
    if (activePrompt) {
      try {
        await activePrompt.prompt();
        const choice = await activePrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          window.deferredPWAInstallPrompt = null;
          setDeferredPrompt(null);
          return { success: true, mode: 'native-prompt' };
        }
        return { success: false, mode: 'native-prompt' };
      } catch (err) {
        console.warn('[PWA] Error launching prompt:', err);
      }
    }

    // CASE C: Android fallback guided mode
    return { success: false, mode: 'android-guide' };
  };

  return {
    isInstallable: !!deferredPrompt || !!window.deferredPWAInstallPrompt,
    isInstalled,
    isIOS,
    isAndroid,
    isMobileOrTablet,
    canShare,
    install,
    deferredPrompt: deferredPrompt || window.deferredPWAInstallPrompt,
    promptEvent: deferredPrompt || window.deferredPWAInstallPrompt,
  };
}
