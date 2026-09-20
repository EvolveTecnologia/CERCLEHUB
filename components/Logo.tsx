import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  inverted?: boolean; // For dark backgrounds or light backgrounds
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  inverted = false,
  size = 'md',
}) => {
  const textColorCercle = inverted ? '#E0F2F5' : '#0A6B83';
  const textColorHub = '#F26522';

  if (variant === 'icon-only') {
    return (
      <svg
        viewBox="0 0 240 220"
        className={`inline-block select-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chTopGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="50%" stopColor="#0E98A8" />
            <stop offset="100%" stopColor="#0A7A94" />
          </linearGradient>
          <linearGradient id="chLeftGrad" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#0A7A94" />
            <stop offset="60%" stopColor="#06586B" />
            <stop offset="100%" stopColor="#043E4B" />
          </linearGradient>
          <linearGradient id="chRightGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#FF7A30" />
            <stop offset="50%" stopColor="#F26522" />
            <stop offset="100%" stopColor="#D9480F" />
          </linearGradient>
        </defs>

        <g transform="translate(120, 105)">
          {/* Orange Ring */}
          <circle cx="45" cy="38" r="48" fill="none" stroke="url(#chRightGrad)" strokeWidth="21" strokeLinecap="round" />
          {/* Top Teal Ring */}
          <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#chTopGrad)" strokeWidth="21" strokeLinecap="round" />
          {/* Deep Cyan Ring */}
          <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#chLeftGrad)" strokeWidth="21" strokeLinecap="round" />

          {/* Interlocking overlays */}
          <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#chTopGrad)" strokeWidth="21" strokeLinecap="round" />
          <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#chRightGrad)" strokeWidth="21" strokeLinecap="round" />
          <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#chLeftGrad)" strokeWidth="21" strokeLinecap="round" />
          <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#chRightGrad)" strokeWidth="21" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <svg
          viewBox="0 0 240 200"
          className="w-24 h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chTopGradS" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#0E98A8" />
              <stop offset="100%" stopColor="#0A7A94" />
            </linearGradient>
            <linearGradient id="chLeftGradS" x1="0%" y1="10%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="#0A7A94" />
              <stop offset="60%" stopColor="#06586B" />
              <stop offset="100%" stopColor="#043E4B" />
            </linearGradient>
            <linearGradient id="chRightGradS" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FF7A30" />
              <stop offset="50%" stopColor="#F26522" />
              <stop offset="100%" stopColor="#D9480F" />
            </linearGradient>
          </defs>
          <g transform="translate(120, 100)">
            <circle cx="45" cy="38" r="48" fill="none" stroke="url(#chRightGradS)" strokeWidth="21" strokeLinecap="round" />
            <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#chTopGradS)" strokeWidth="21" strokeLinecap="round" />
            <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#chLeftGradS)" strokeWidth="21" strokeLinecap="round" />

            <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#chTopGradS)" strokeWidth="21" strokeLinecap="round" />
            <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#chRightGradS)" strokeWidth="21" strokeLinecap="round" />
            <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#chLeftGradS)" strokeWidth="21" strokeLinecap="round" />
            <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#chRightGradS)" strokeWidth="21" strokeLinecap="round" />
          </g>
        </svg>
        <div className="mt-2 text-center font-black tracking-wider flex items-center justify-center gap-1.5 text-xl">
          <span style={{ color: textColorCercle }}>CERCLE</span>
          <span style={{ color: textColorHub }}>HUB.</span>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 240 210"
        className="h-9 w-auto shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chTopGradH" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="50%" stopColor="#0E98A8" />
            <stop offset="100%" stopColor="#0A7A94" />
          </linearGradient>
          <linearGradient id="chLeftGradH" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#0A7A94" />
            <stop offset="60%" stopColor="#06586B" />
            <stop offset="100%" stopColor="#043E4B" />
          </linearGradient>
          <linearGradient id="chRightGradH" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#FF7A30" />
            <stop offset="50%" stopColor="#F26522" />
            <stop offset="100%" stopColor="#D9480F" />
          </linearGradient>
        </defs>
        <g transform="translate(120, 105)">
          <circle cx="45" cy="38" r="48" fill="none" stroke="url(#chRightGradH)" strokeWidth="21" strokeLinecap="round" />
          <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#chTopGradH)" strokeWidth="21" strokeLinecap="round" />
          <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#chLeftGradH)" strokeWidth="21" strokeLinecap="round" />

          <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#chTopGradH)" strokeWidth="21" strokeLinecap="round" />
          <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#chRightGradH)" strokeWidth="21" strokeLinecap="round" />
          <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#chLeftGradH)" strokeWidth="21" strokeLinecap="round" />
          <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#chRightGradH)" strokeWidth="21" strokeLinecap="round" />
        </g>
      </svg>
      <div className="flex items-center font-black tracking-tight text-xl leading-none">
        <span style={{ color: textColorCercle }} className="tracking-wide mr-1 font-extrabold">CERCLE</span>
        <span style={{ color: textColorHub }} className="tracking-wide font-extrabold">HUB.</span>
      </div>
    </div>
  );
};

export default Logo;
