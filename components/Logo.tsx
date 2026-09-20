import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  inverted?: boolean; // For dark backgrounds or light backgrounds
  size?: 'sm' | 'md' | 'lg' | 'xl';
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  inverted = false,
  size = 'md',
  useImage = true,
}) => {
  const textColorCercle = inverted ? '#FFFFFF' : '#0A6B83';
  const textColorHub = '#F26522';

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img 
          src="/pwa-512x512.png" 
          alt="Cercle Hub Icon" 
          className="w-full h-full object-contain filter drop-shadow-md"
          loading="eager"
          onError={(e) => {
            // fallback to apple-touch-icon
            (e.target as HTMLImageElement).src = '/apple-touch-icon.png';
          }}
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        <img 
          src="/og-square.png" 
          alt="Cercle Hub Logo" 
          className="w-24 h-24 object-contain filter drop-shadow-lg"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/pwa-maskable-512x512.png';
          }}
        />
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <img 
        src="/pwa-512x512.png" 
        alt="Cercle Hub Emblem" 
        className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-md shrink-0"
        loading="eager"
      />
      <div className="flex items-center font-black tracking-tight text-xl leading-none">
        <span style={{ color: textColorCercle }} className="tracking-wide mr-1 font-black text-xl md:text-2xl">CERCLE</span>
        <span style={{ color: textColorHub }} className="tracking-wide font-black text-xl md:text-2xl">HUB.</span>
      </div>
    </div>
  );
};

export default Logo;

