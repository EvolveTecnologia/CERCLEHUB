import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 1. Vector SVG of the pure Emblem (3 interlocking rings)
const EMBLEM_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
  <defs>
    <!-- Top Ring Gradient (Teal / Turquoise) -->
    <linearGradient id="chTop" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6" />
      <stop offset="50%" stop-color="#0E98A8" />
      <stop offset="100%" stop-color="#0A7A94" />
    </linearGradient>
    <!-- Bottom Left Ring Gradient (Deep Cyan / Dark Teal) -->
    <linearGradient id="chLeft" x1="0%" y1="10%" x2="100%" y2="90%">
      <stop offset="0%" stop-color="#0A7A94" />
      <stop offset="60%" stop-color="#06586B" />
      <stop offset="100%" stop-color="#043E4B" />
    </linearGradient>
    <!-- Bottom Right Ring Gradient (Vibrant Orange / Tangerine) -->
    <linearGradient id="chRight" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF7A30" />
      <stop offset="50%" stop-color="#F26522" />
      <stop offset="100%" stop-color="#D9480F" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>

  <g transform="translate(120, 120)" filter="url(#shadow)">
    <!-- Orange Ring (Bottom Right) -->
    <circle cx="45" cy="38" r="48" fill="none" stroke="url(#chRight)" stroke-width="22" stroke-linecap="round" />
    
    <!-- Top Teal Ring -->
    <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#chTop)" stroke-width="22" stroke-linecap="round" />

    <!-- Deep Cyan Ring (Bottom Left) -->
    <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#chLeft)" stroke-width="22" stroke-linecap="round" />

    <!-- Interlocking Overlays -->
    <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#chTop)" stroke-width="22" stroke-linecap="round" />
    <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#chRight)" stroke-width="22" stroke-linecap="round" />
    <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#chLeft)" stroke-width="22" stroke-linecap="round" />
    <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#chRight)" stroke-width="22" stroke-linecap="round" />
  </g>
</svg>
`;

// 2. OpenGraph Card SVG (1200 x 630 px) - Specialized for Educational Technology (EdTech) & WhatsApp / Social Sharing
const OG_CARD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradient Deep Navy / Teal -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E232A" />
      <stop offset="40%" stop-color="#122C34" />
      <stop offset="85%" stop-color="#1A3B45" />
      <stop offset="100%" stop-color="#09181D" />
    </linearGradient>

    <!-- Top Accent Bar -->
    <linearGradient id="topBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A7A94" />
      <stop offset="40%" stop-color="#0E98A8" />
      <stop offset="70%" stop-color="#F26522" />
      <stop offset="100%" stop-color="#FF7A30" />
    </linearGradient>

    <!-- Glowing Screen Gradient -->
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A2B32" />
      <stop offset="100%" stop-color="#0F1D22" />
    </linearGradient>

    <!-- Logo Ring Gradients -->
    <linearGradient id="ogTop" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6" />
      <stop offset="50%" stop-color="#0E98A8" />
      <stop offset="100%" stop-color="#0A7A94" />
    </linearGradient>
    <linearGradient id="ogLeft" x1="0%" y1="10%" x2="100%" y2="90%">
      <stop offset="0%" stop-color="#0A7A94" />
      <stop offset="60%" stop-color="#06586B" />
      <stop offset="100%" stop-color="#043E4B" />
    </linearGradient>
    <linearGradient id="ogRight" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF7A30" />
      <stop offset="50%" stop-color="#F26522" />
      <stop offset="100%" stop-color="#D9480F" />
    </linearGradient>

    <filter id="bigShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.65" />
    </filter>
    <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Base Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Subtle EdTech Digital Grid Pattern -->
  <g stroke="rgba(14,152,168,0.06)" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="220" y1="0" x2="220" y2="630" />
    <line x1="340" y1="0" x2="340" y2="630" />
    <line x1="460" y1="0" x2="460" y2="630" />
    <line x1="580" y1="0" x2="580" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="820" y1="0" x2="820" y2="630" />
    <line x1="940" y1="0" x2="940" y2="630" />
    <line x1="1060" y1="0" x2="1060" y2="630" />

    <line x1="0" y1="100" x2="1200" y2="100" />
    <line x1="0" y1="200" x2="1200" y2="200" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="400" x2="1200" y2="400" />
    <line x1="0" y1="500" x2="1200" y2="500" />
  </g>

  <!-- Ambient Light Halos -->
  <circle cx="240" cy="300" r="220" fill="#0A7A94" opacity="0.16" />
  <circle cx="960" cy="320" r="260" fill="#F26522" opacity="0.13" />

  <!-- Top Multi-tone Bar -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#topBar)" />

  <!-- Outer Rounded Clean Border -->
  <rect x="28" y="28" width="1144" height="574" rx="28" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />

  <!-- LEFT SIDE: High-Tech Educational Illustration Mockup -->
  <g transform="translate(68, 90)">
    <!-- Main Interactive Learning Screen Card -->
    <rect x="0" y="0" width="460" height="340" rx="20" fill="url(#screenGrad)" stroke="rgba(14,152,168,0.3)" stroke-width="2" filter="url(#bigShadow)" />
    
    <!-- Screen Header Bar with Browser/Player Dots -->
    <rect x="0" y="0" width="460" height="42" rx="20" fill="#122C34" />
    <rect x="0" y="24" width="460" height="18" fill="#122C34" />
    <circle cx="24" cy="21" r="5" fill="#EF4444" opacity="0.8" />
    <circle cx="40" cy="21" r="5" fill="#F59E0B" opacity="0.8" />
    <circle cx="56" cy="21" r="5" fill="#10B981" opacity="0.8" />
    <rect x="130" y="12" width="200" height="18" rx="9" fill="rgba(255,255,255,0.06)" />
    <text x="230" y="25" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" text-anchor="middle">cerclehub.cd • Streaming Pédagogique</text>

    <!-- Digital Classroom Stage inside screen -->
    <rect x="18" y="56" width="424" height="200" rx="14" fill="#0B1A1F" stroke="rgba(255,255,255,0.05)" />
    
    <!-- Live Video Lesson Simulated Waveform & Play Button -->
    <circle cx="230" cy="156" r="32" fill="#F26522" filter="url(#glowEffect)" />
    <polygon points="224,142 244,156 224,170" fill="#FFFFFF" />

    <!-- Badges inside player -->
    <rect x="32" y="70" width="82" height="22" rx="6" fill="rgba(14,152,168,0.3)" stroke="#0E98A8" stroke-width="1" />
    <text x="73" y="85" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">🔴 EN DIRECT</text>

    <rect x="122" y="70" width="94" height="22" rx="6" fill="rgba(242,101,34,0.25)" stroke="#F26522" stroke-width="1" />
    <text x="169" y="85" fill="#FF8A48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">4K ULTRA HD</text>

    <!-- Progress / Learning Metrics Bar -->
    <rect x="18" y="270" width="424" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
    <rect x="18" y="270" width="310" height="8" rx="4" fill="url(#topBar)" />
    <text x="20" y="300" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Progression : 78% complété</text>
    <text x="440" y="300" fill="#0E98A8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" text-anchor="end">Module 4 / 6</text>

    <!-- Floating Badge 1: Tuteur IA Gemini (Top Right of screen) -->
    <g transform="translate(320, -18)" filter="url(#bigShadow)">
      <rect width="160" height="46" rx="14" fill="#1A2B32" stroke="#0E98A8" stroke-width="1.5" />
      <circle cx="24" cy="23" r="14" fill="url(#ogTop)" />
      <text x="24" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" text-anchor="middle">✨</text>
      <text x="46" y="21" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">TUTEUR IA 24/7</text>
      <text x="46" y="34" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600">Gemini Interactif</text>
    </g>

    <!-- Floating Badge 2: Certifications Vérifiées (Bottom Left of screen) -->
    <g transform="translate(-18, 305)" filter="url(#bigShadow)">
      <rect width="210" height="52" rx="16" fill="#1A2B32" stroke="#F26522" stroke-width="1.5" />
      <circle cx="28" cy="26" r="16" fill="url(#ogRight)" />
      <text x="28" y="32" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" text-anchor="middle">🎓</text>
      <text x="54" y="23" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">CERTIFICATION RDC</text>
      <text x="54" y="38" fill="#FCA5A5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600">Vérification Numérique</text>
    </g>
  </g>

  <!-- RIGHT SIDE: Brand Identity, Typography & EdTech Vision -->
  <g transform="translate(565, 85)">
    
    <!-- Top Category Tag -->
    <rect x="0" y="0" width="370" height="38" rx="19" fill="rgba(14,152,168,0.18)" stroke="#0E98A8" stroke-width="1.5" />
    <circle cx="20" cy="19" r="5" fill="#F26522" />
    <text x="35" y="24" fill="#E0F2FE" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5px">TECHNOLOGIE ÉDUCATIVE &amp; LEADERSHIP</text>

    <!-- Logo & Main Brand Title -->
    <g transform="translate(0, 52)">
      <!-- 3 Interlocking Rings Official Emblem -->
      <g transform="translate(55, 52) scale(0.72)" filter="url(#bigShadow)">
        <circle cx="45" cy="38" r="48" fill="none" stroke="url(#ogRight)" stroke-width="22" stroke-linecap="round" />
        <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#ogTop)" stroke-width="22" stroke-linecap="round" />
        <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#ogLeft)" stroke-width="22" stroke-linecap="round" />
        <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#ogTop)" stroke-width="22" stroke-linecap="round" />
        <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#ogRight)" stroke-width="22" stroke-linecap="round" />
        <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#ogLeft)" stroke-width="22" stroke-linecap="round" />
        <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#ogRight)" stroke-width="22" stroke-linecap="round" />
      </g>

      <!-- Brand Title Text -->
      <g transform="translate(140, 68)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" letter-spacing="1px">
        <text x="0" y="0" fill="#FFFFFF" font-size="56">CERCLE</text>
        <text x="245" y="0" fill="#F26522" font-size="56">HUB<tspan fill="#F26522">.</tspan></text>
      </g>
    </g>

    <!-- Value Proposition Punchline -->
    <g transform="translate(0, 185)">
      <text fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="700">
        <tspan x="0" dy="0">La première plateforme de streaming éducatif</tspan>
        <tspan x="0" dy="30">et de développement des compétences en RDC.</tspan>
      </text>
      <text fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500">
        <tspan x="0" dy="36">Formations certifiantes animées par des experts &amp; tuteur IA intégré</tspan>
        <tspan x="0" dy="22">pour accélérer l'employabilité et le leadership numérique.</tspan>
      </text>
    </g>

    <!-- 3 EdTech Feature Pills -->
    <g transform="translate(0, 310)">
      <!-- Pill 1: Parcours & Certificats -->
      <rect x="0" y="0" width="170" height="42" rx="14" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
      <text x="85" y="26" fill="#F3F4F6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" text-anchor="middle">🎓 Diplômes Officiels</text>

      <!-- Pill 2: IA Tuteur -->
      <rect x="182" y="0" width="168" height="42" rx="14" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
      <text x="266" y="26" fill="#F3F4F6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" text-anchor="middle">⚡ IA Gemini Pro</text>

      <!-- Pill 3: PWA Mobile / Offline -->
      <rect x="362" y="0" width="178" height="42" rx="14" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
      <text x="451" y="26" fill="#F3F4F6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" text-anchor="middle">📱 App Android &amp; iOS</text>
    </g>

    <!-- Official Signature Footnote -->
    <g transform="translate(0, 395)">
      <line x1="0" y1="0" x2="540" y2="0" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
      <text x="0" y="25" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" letter-spacing="1px">
        INNOVATION PAR AMANITECH SARL • KINSHASA, RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
      </text>
    </g>
  </g>
</svg>
`;

// 3. App Icon SVG (512 x 512 px) - Full bleed rounded container with 3-ring emblem
const ICON_512_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#122C34" />
      <stop offset="100%" stop-color="#0B1A1F" />
    </linearGradient>

    <!-- Top Ring Gradient -->
    <linearGradient id="iTop" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6" />
      <stop offset="50%" stop-color="#0E98A8" />
      <stop offset="100%" stop-color="#0A7A94" />
    </linearGradient>
    <!-- Left Ring Gradient -->
    <linearGradient id="iLeft" x1="0%" y1="10%" x2="100%" y2="90%">
      <stop offset="0%" stop-color="#0A7A94" />
      <stop offset="60%" stop-color="#06586B" />
      <stop offset="100%" stop-color="#043E4B" />
    </linearGradient>
    <!-- Right Ring Gradient -->
    <linearGradient id="iRight" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF7A30" />
      <stop offset="50%" stop-color="#F26522" />
      <stop offset="100%" stop-color="#D9480F" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="115" fill="url(#iconBg)" />
  <rect width="512" height="512" rx="115" fill="none" stroke="rgba(14,152,168,0.3)" stroke-width="6" />

  <!-- 3 Interlocking Rings Emblem Centered -->
  <g transform="translate(256, 256) scale(1.65)" filter="url(#glow)">
    <!-- Orange Ring -->
    <circle cx="45" cy="38" r="48" fill="none" stroke="url(#iRight)" stroke-width="22" stroke-linecap="round" />
    <!-- Top Teal Ring -->
    <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#iTop)" stroke-width="22" stroke-linecap="round" />
    <!-- Deep Cyan Ring -->
    <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#iLeft)" stroke-width="22" stroke-linecap="round" />

    <!-- Interlocking Overlays -->
    <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#iTop)" stroke-width="22" stroke-linecap="round" />
    <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#iRight)" stroke-width="22" stroke-linecap="round" />
    <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#iLeft)" stroke-width="22" stroke-linecap="round" />
    <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#iRight)" stroke-width="22" stroke-linecap="round" />
  </g>
</svg>
`;

// 4. Maskable Icon SVG (512 x 512 px) - Safe zone within 80% circle
const MASKABLE_512_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="maskBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#122C34" />
      <stop offset="100%" stop-color="#0B1A1F" />
    </linearGradient>

    <!-- Top Ring Gradient -->
    <linearGradient id="mTop" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6" />
      <stop offset="50%" stop-color="#0E98A8" />
      <stop offset="100%" stop-color="#0A7A94" />
    </linearGradient>
    <!-- Left Ring Gradient -->
    <linearGradient id="mLeft" x1="0%" y1="10%" x2="100%" y2="90%">
      <stop offset="0%" stop-color="#0A7A94" />
      <stop offset="60%" stop-color="#06586B" />
      <stop offset="100%" stop-color="#043E4B" />
    </linearGradient>
    <!-- Right Ring Gradient -->
    <linearGradient id="mRight" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF7A30" />
      <stop offset="50%" stop-color="#F26522" />
      <stop offset="100%" stop-color="#D9480F" />
    </linearGradient>
  </defs>

  <!-- Solid bleed background -->
  <rect width="512" height="512" fill="url(#maskBg)" />

  <!-- 3 Interlocking Rings Emblem safely inside 70% bounds -->
  <g transform="translate(256, 256) scale(1.35)">
    <!-- Orange Ring -->
    <circle cx="45" cy="38" r="48" fill="none" stroke="url(#mRight)" stroke-width="22" stroke-linecap="round" />
    <!-- Top Teal Ring -->
    <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#mTop)" stroke-width="22" stroke-linecap="round" />
    <!-- Deep Cyan Ring -->
    <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#mLeft)" stroke-width="22" stroke-linecap="round" />

    <!-- Interlocking Overlays -->
    <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#mTop)" stroke-width="22" stroke-linecap="round" />
    <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#mRight)" stroke-width="22" stroke-linecap="round" />
    <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#mLeft)" stroke-width="22" stroke-linecap="round" />
    <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#mRight)" stroke-width="22" stroke-linecap="round" />
  </g>
</svg>
`;

async function generate() {
  console.log('Generating high-resolution brand assets for PWA and Social Share...');

  // Save icon.svg
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon.svg'), EMBLEM_SVG.trim());

  // 1. Generate og-image.png (1200 x 630 px)
  await sharp(Buffer.from(OG_CARD_SVG))
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
  console.log('✔ Generated public/og-image.png (1200x630)');

  // Also og-image.jpg for backward-compatibility & WhatsApp optimum rendering (<150KB)
  await sharp(Buffer.from(OG_CARD_SVG))
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
  console.log('✔ Generated public/og-image.jpg (1200x630)');

  // Duplicate as og-edtech.jpg and og-edtech.png
  await sharp(Buffer.from(OG_CARD_SVG))
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-edtech.jpg'));
  await sharp(Buffer.from(OG_CARD_SVG))
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-edtech.png'));
  console.log('✔ Generated public/og-edtech.jpg & public/og-edtech.png (1200x630)');

  // Also sync logoog.png and logoog.jpg
  await sharp(Buffer.from(OG_CARD_SVG))
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'logoog.jpg'));
  await sharp(Buffer.from(OG_CARD_SVG))
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'logoog.png'));
  console.log('✔ Generated public/logoog.jpg & public/logoog.png');

  // Square format for compact WhatsApp chat bubbles (800x800)
  await sharp(Buffer.from(ICON_512_SVG))
    .resize(800, 800)
    .jpeg({ quality: 92 })
    .toFile(path.join(PUBLIC_DIR, 'og-square.jpg'));
  await sharp(Buffer.from(ICON_512_SVG))
    .resize(800, 800)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-square.png'));
  console.log('✔ Generated public/og-square.jpg & public/og-square.png (800x800)');

  // 2. Generate pwa-512x512.png
  await sharp(Buffer.from(ICON_512_SVG))
    .resize(512, 512)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'pwa-512x512.png'));
  console.log('✔ Generated public/pwa-512x512.png (512x512)');

  // 3. Generate pwa-192x192.png
  await sharp(Buffer.from(ICON_512_SVG))
    .resize(192, 192)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'pwa-192x192.png'));
  console.log('✔ Generated public/pwa-192x192.png (192x192)');

  // 4. Generate pwa-maskable-512x512.png
  await sharp(Buffer.from(MASKABLE_512_SVG))
    .resize(512, 512)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'pwa-maskable-512x512.png'));
  console.log('✔ Generated public/pwa-maskable-512x512.png (512x512)');

  // 5. Generate apple-touch-icon.png (180x180)
  await sharp(Buffer.from(ICON_512_SVG))
    .resize(180, 180)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('✔ Generated public/apple-touch-icon.png (180x180)');

  // 6. Generate favicon-32x32.png
  await sharp(Buffer.from(ICON_512_SVG))
    .resize(32, 32)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('✔ Generated public/favicon-32x32.png (32x32)');

  console.log('All image assets generated successfully!');
}

generate().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
