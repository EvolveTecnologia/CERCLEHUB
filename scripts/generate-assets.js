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

// 2. OpenGraph Card SVG (1200 x 630 px) - Designed for WhatsApp & Social Media Preview
const OG_CARD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#122C34" />
      <stop offset="60%" stop-color="#1A2B32" />
      <stop offset="100%" stop-color="#0A1E24" />
    </linearGradient>

    <linearGradient id="cardGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0E98A8" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#F26522" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0A7A94" stop-opacity="0.1" />
    </linearGradient>

    <!-- Top Ring Gradient -->
    <linearGradient id="ogTop" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6" />
      <stop offset="50%" stop-color="#0E98A8" />
      <stop offset="100%" stop-color="#0A7A94" />
    </linearGradient>
    <!-- Left Ring Gradient -->
    <linearGradient id="ogLeft" x1="0%" y1="10%" x2="100%" y2="90%">
      <stop offset="0%" stop-color="#0A7A94" />
      <stop offset="60%" stop-color="#06586B" />
      <stop offset="100%" stop-color="#043E4B" />
    </linearGradient>
    <!-- Right Ring Gradient -->
    <linearGradient id="ogRight" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF7A30" />
      <stop offset="50%" stop-color="#F26522" />
      <stop offset="100%" stop-color="#D9480F" />
    </linearGradient>

    <filter id="bigShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Ambient Glow circles -->
  <circle cx="280" cy="315" r="260" fill="#0A7A94" opacity="0.18" filter="blur(60px)" />
  <circle cx="780" cy="315" r="280" fill="#F26522" opacity="0.12" filter="blur(70px)" />

  <!-- Outer frame border line -->
  <rect x="24" y="24" width="1152" height="582" rx="32" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
  <rect x="24" y="24" width="1152" height="6" rx="3" fill="url(#cardGlow)" />

  <!-- Left Side: Big 3-Ring Logo Emblem -->
  <g transform="translate(300, 315) scale(1.4)" filter="url(#bigShadow)">
    <!-- Orange Ring -->
    <circle cx="45" cy="38" r="48" fill="none" stroke="url(#ogRight)" stroke-width="22" stroke-linecap="round" />
    <!-- Top Teal Ring -->
    <circle cx="0" cy="-40" r="48" fill="none" stroke="url(#ogTop)" stroke-width="22" stroke-linecap="round" />
    <!-- Deep Cyan Ring -->
    <circle cx="-45" cy="38" r="48" fill="none" stroke="url(#ogLeft)" stroke-width="22" stroke-linecap="round" />

    <!-- Interlocking Overlays -->
    <path d="M -34 -4 A 48 48 0 0 1 12 -86" fill="none" stroke="url(#ogTop)" stroke-width="22" stroke-linecap="round" />
    <path d="M 60 -8 A 48 48 0 0 1 93 38" fill="none" stroke="url(#ogRight)" stroke-width="22" stroke-linecap="round" />
    <path d="M -18 74 A 48 48 0 0 1 -45 86" fill="none" stroke="url(#ogLeft)" stroke-width="22" stroke-linecap="round" />
    <path d="M -2 36 A 48 48 0 0 1 18 78" fill="none" stroke="url(#ogRight)" stroke-width="22" stroke-linecap="round" />
  </g>

  <!-- Right Side: Platform Identity & Typography -->
  <g transform="translate(560, 190)">
    <!-- Category Badge -->
    <rect x="0" y="0" width="310" height="38" rx="19" fill="rgba(14,152,168,0.2)" stroke="rgba(14,152,168,0.4)" stroke-width="1.5" />
    <text x="155" y="24" fill="#0E98A8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2px" text-anchor="middle">PLATEFORME ÉDUCATIVE &amp; LEADERSHIP</text>

    <!-- Brand Name: CERCLE HUB. -->
    <g transform="translate(0, 95)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', Arial, sans-serif" font-size="64" font-weight="900" letter-spacing="2px">
      <text x="0" y="0" fill="#E0F2F5">CERCLE</text>
      <text x="275" y="0" fill="#F26522">HUB<tspan fill="#F26522">.</tspan></text>
    </g>

    <!-- Description Paragraph -->
    <text x="0" y="150" fill="#D1D5DB" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="22" font-weight="500">
      <tspan x="0" dy="0">Formations certifiantes, masterclasses professionnelles</tspan>
      <tspan x="0" dy="32">et mentorat pour les leaders et talents en RDC.</tspan>
    </text>

    <!-- Feature Pills -->
    <g transform="translate(0, 230)">
      <rect x="0" y="0" width="165" height="36" rx="12" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" />
      <text x="82" y="23" fill="#E5E7EB" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="14" font-weight="700" text-anchor="middle">🎓 Certifications</text>

      <rect x="180" y="0" width="180" height="36" rx="12" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" />
      <text x="270" y="23" fill="#E5E7EB" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="14" font-weight="700" text-anchor="middle">✨ Tuteur IA Gemini</text>

      <rect x="375" y="0" width="170" height="36" rx="12" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" />
      <text x="460" y="23" fill="#E5E7EB" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="14" font-weight="700" text-anchor="middle">📱 App PWA Mobile</text>
    </g>

    <!-- Footer Copyright Note -->
    <text x="0" y="315" fill="#9CA3AF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="1px">
      PRODUIT PAR AMANITECH SARL • KINSHASA, RDC
    </text>
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

  // Also og-image.jpg for backward-compatibility
  await sharp(Buffer.from(OG_CARD_SVG))
    .jpeg({ quality: 92 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
  console.log('✔ Generated public/og-image.jpg (1200x630)');

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
