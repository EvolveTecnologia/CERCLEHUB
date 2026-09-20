import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Phone, FileText, Shield, Check, Home, AlertCircle, Sparkles, Smartphone, Tablet, Download } from 'lucide-react';
import { Logo } from '../components/Logo';
import { usePWAInstall } from '../components/usePWAInstall';
import { PWAInstallModal } from '../components/PWAInstallModal';

interface AuthScreenProps {
  onLogin: () => void;
  onBack?: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot' | 'terms' | 'privacy';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const pwa = usePWAInstall();
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('apprenant@cerclehub.cd');
  const [loginPassword, setLoginPassword] = useState('@123456@');
  const [loginError, setLoginError] = useState('');

  // Register State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    password: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Register Logic
    if (mode === 'register') {
      if (!termsAccepted) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1200);
      return;
    }

    // Login Logic
    if (mode === 'login') {
      // Validate credentials (accepts both demo and any well-formed login for smooth demo experience)
      if (
        (loginEmail === 'apprenant@cerclehub.cd' && loginPassword === '@123456@') ||
        (loginEmail === 'aluno@educaflix.app.br' && loginPassword === '@123456@') ||
        (loginEmail.includes('@') && loginPassword.length >= 6)
      ) {
        setLoginError('');
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          onLogin();
        }, 1200);
      } else {
        setLoginError('Adresse email ou mot de passe incorrect (utilisez les identifiants démo).');
        setIsLoading(false);
      }
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('apprenant@cerclehub.cd');
    setLoginPassword('@123456@');
    setLoginError('');
  };

  const renderLogin = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">Accéder à votre compte</h1>
        <p className="text-[11px] text-gray-300">Renseignez vos identifiants professionnels</p>
      </div>

      {loginError && (
        <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-[11px] font-semibold text-red-300">{loginError}</p>
        </div>
      )}

      {/* Demo Credentials Helper Pill */}
      <button 
        type="button"
        onClick={fillDemoCredentials}
        className="w-full py-2 px-3 bg-[#0A7A94]/20 hover:bg-[#0A7A94]/30 border border-[#0A7A94]/40 rounded-xl flex items-center justify-between text-left text-[11px] text-[#0E98A8] transition-colors"
      >
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles size={13} className="text-[#F26522]" />
          Identifiants Démo (cliquez pour remplir)
        </span>
        <span className="text-gray-400 font-mono text-[10px]">apprenant@cerclehub.cd</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Email professionnel</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="votre.nom@entreprise.cd"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Mot de passe</label>
            <button 
              type="button" 
              onClick={() => setMode('forgot')}
              className="text-[10px] text-[#0E98A8] hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#F26522] hover:bg-[#EE591D] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Se connecter'
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-[11px] text-gray-400">
          Nouvel apprenant ?{' '}
          <button 
            type="button" 
            onClick={() => setMode('register')}
            className="text-[#0E98A8] font-bold hover:underline"
          >
            Créer un compte
          </button>
        </p>
      </div>

      {/* Bouton d'Installation PWA Mobile & Tablette (Android / iOS) */}
      <div className="pt-2 border-t border-white/10">
        <button
          type="button"
          onClick={() => setIsInstallModalOpen(true)}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-[#0A7A94]/25 via-[#0E98A8]/15 to-[#F26522]/20 hover:from-[#0A7A94]/40 hover:to-[#F26522]/30 border border-[#0E98A8]/35 hover:border-[#F26522]/50 rounded-2xl flex items-center justify-between transition-all group shadow-md hover:shadow-cyan-950/30 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0A7A94] to-[#0E98A8] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow">
              <Smartphone size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide">Installer l'Application</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-[#F26522] text-white rounded-md">PWA</span>
              </div>
              <p className="text-[10px] text-gray-300">Sur votre mobile ou tablette (Android &amp; iOS)</p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-[#0A7A94] transition-colors">
            <Download size={14} />
          </div>
        </button>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">Inscription Apprenant</h1>
        <p className="text-[11px] text-gray-300">Rejoignez l'écosystème Cercle Hub en RDC</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Nom complet</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="text" 
              required
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              placeholder="Ex : Jean-Marc Tshisekedi"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Email professionnel</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              placeholder="nom@domaine.cd"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Téléphone / WhatsApp</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="tel" 
              required
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              placeholder="+55 21 98673-8943"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Mot de passe</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input 
            type="checkbox"
            id="termsCheck"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 accent-[#F26522]"
          />
          <label htmlFor="termsCheck" className="text-[10px] text-gray-300 leading-tight">
            J'accepte les{' '}
            <button type="button" onClick={() => setMode('terms')} className="text-[#0E98A8] underline">
              Conditions d'utilisation
            </button>{' '}
            et la{' '}
            <button type="button" onClick={() => setMode('privacy')} className="text-[#0E98A8] underline">
              Politique de confidentialité
            </button>
            .
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !termsAccepted}
          className="w-full bg-[#0A7A94] hover:bg-[#06586B] disabled:opacity-50 text-white font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          ) : (
            'Finaliser l\'inscription'
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-[11px] text-gray-400">
          Vous avez déjà un compte ?{' '}
          <button 
            type="button" 
            onClick={() => setMode('login')}
            className="text-[#0E98A8] font-bold hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );

  const renderForgot = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">Réinitialisation</h1>
        <p className="text-[11px] text-gray-300">Recevez un lien de réinitialisation par email</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setMode('login'); }} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Votre email</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              placeholder="nom@domaine.cd"
              className="w-full bg-[#122C34]/80 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7A94]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#F26522] hover:bg-[#EE591D] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md cursor-pointer"
        >
          Envoyer le lien
        </button>
      </form>

      <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={() => setMode('login')}
          className="text-[11px] text-gray-300 hover:text-white"
        >
          ← Retour à la connexion
        </button>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="h-full flex flex-col justify-between text-xs space-y-4 text-gray-300">
      <h2 className="text-base font-bold text-white uppercase border-b border-white/10 pb-2">Conditions Générales d'Utilisation</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-justify">
        <p>L'utilisation de la plateforme Cercle Hub par Amanitech implique l'adhésion pleine et entière aux présentes conditions régies par le droit de la République Démocratique du Congo.</p>
        <p>Les identifiants sont strictement personnels. Tout partage d'accès non autorisé est prohibé.</p>
      </div>
      <button 
        type="button" 
        onClick={() => setMode('register')} 
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl"
      >
        Fermer et retourner
      </button>
    </div>
  );

  const renderPrivacy = () => (
    <div className="h-full flex flex-col justify-between text-xs space-y-4 text-gray-300">
      <h2 className="text-base font-bold text-white uppercase border-b border-white/10 pb-2">Politique de Confidentialité</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-justify">
        <p>Amanitech veille à la stricte protection des données personnelles de ses apprenants en conformité avec les réglementations en vigueur.</p>
        <p>Vos informations servent à la gestion de vos certificats et à l'accès aux cours.</p>
      </div>
      <button 
        type="button" 
        onClick={() => setMode('register')} 
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl"
      >
        Fermer et retourner
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#122C34] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,122,148,0.25)_0%,transparent_60%)] pointer-events-none" />

      {/* Button to Back to Home (Landing Page) */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all"
        >
          <Home size={14} /> Accueil
        </button>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[380px] space-y-6 relative z-10 flex flex-col items-center px-4">
        {mode !== 'terms' && mode !== 'privacy' && (
          <div className="flex justify-center mb-1 animate-in fade-in duration-300">
            <Logo inverted={true} className="h-14 w-auto" />
          </div>
        )}

        {/* Card */}
        <div className={`w-full bg-[#1A2B32]/90 backdrop-blur-xl border border-[#0A7A94]/25 p-6 rounded-3xl shadow-2xl transition-all duration-500 ${mode === 'terms' || mode === 'privacy' ? 'h-[60vh]' : ''}`}>
          {mode === 'login' && renderLogin()}
          {mode === 'register' && renderRegister()}
          {mode === 'forgot' && renderForgot()}
          {mode === 'terms' && renderTerms()}
          {mode === 'privacy' && renderPrivacy()}
        </div>

        {mode !== 'terms' && mode !== 'privacy' && (
          <div className="text-center pt-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Amanitech • Cercle Hub RDC
            </p>
          </div>
        )}
      </div>

      {/* Modal d'installation PWA Android & iOS */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        isInstallable={pwa.isInstallable}
        isInstalled={pwa.isInstalled}
        isIOS={pwa.isIOS}
        isAndroid={pwa.isAndroid}
        onInstall={pwa.install}
      />
    </div>
  );
};

export default AuthScreen;
