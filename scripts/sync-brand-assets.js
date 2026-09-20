import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function syncAssets() {
  console.log('🔄 Sincronizando imagens oficiais e gerando variantes completas...');

  const pwa512Path = path.join(PUBLIC_DIR, 'pwa-512x512.png');
  const ogSquarePath = path.join(PUBLIC_DIR, 'og-square.png');
  const maskable512Path = path.join(PUBLIC_DIR, 'pwa-maskable-512x512.png');
  const appleTouchPath = path.join(PUBLIC_DIR, 'apple-touch-icon.png');

  // 1. Gerar pwa-192x192.png a partir do pwa-512x512 oficial
  if (fs.existsSync(pwa512Path)) {
    await sharp(pwa512Path)
      .resize(192, 192)
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'pwa-192x192.png'));
    console.log('✔ public/pwa-192x192.png gerado');

    await sharp(pwa512Path)
      .resize(32, 32)
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));
    console.log('✔ public/favicon-32x32.png gerado');
  }

  // 2. Gerar og-square.jpg em 800x800 e 600x600 otimizado para WhatsApp
  if (fs.existsSync(ogSquarePath)) {
    // Compor com fundo para JPEG (sem transparência preta)
    await sharp(ogSquarePath)
      .flatten({ background: '#FFFFFF' })
      .resize(800, 800)
      .jpeg({ quality: 92 })
      .toFile(path.join(PUBLIC_DIR, 'og-square.jpg'));
    console.log('✔ public/og-square.jpg gerado (800x800 JPEG com fundo branco)');
  }

  // 3. Gerar Banner OpenGraph Panorâmico Oficial (1200 x 630 px) para Redes Sociais
  // Usando o logo oficial maskable / og-square composto sobre o canvas de alta tecnologia
  const logoBuffer = await sharp(maskable512Path)
    .resize(420, 420, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ogCardSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E232A" />
        <stop offset="40%" stop-color="#122C34" />
        <stop offset="85%" stop-color="#1A3B45" />
        <stop offset="100%" stop-color="#08151A" />
      </linearGradient>
      <linearGradient id="brandBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0A7A94" />
        <stop offset="35%" stop-color="#0E98A8" />
        <stop offset="70%" stop-color="#F26522" />
        <stop offset="100%" stop-color="#FF7A30" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#F3F8F9" />
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.6" />
      </filter>
      <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="1200" height="10" fill="url(#brandBar)" />

    <!-- Subtle Tech Grid Background Pattern -->
    <g stroke="rgba(14, 152, 168, 0.08)" stroke-width="1">
      <line x1="0" y1="120" x2="1200" y2="120" />
      <line x1="0" y1="240" x2="1200" y2="240" />
      <line x1="0" y1="360" x2="1200" y2="360" />
      <line x1="0" y1="480" x2="1200" y2="480" />
      <line x1="200" y1="0" x2="200" y2="630" />
      <line x1="400" y1="0" x2="400" y2="630" />
      <line x1="600" y1="0" x2="600" y2="630" />
      <line x1="800" y1="0" x2="800" y2="630" />
      <line x1="1000" y1="0" x2="1000" y2="630" />
    </g>

    <!-- Ambient Glowing Orbs -->
    <circle cx="1000" cy="180" r="280" fill="#0A7A94" opacity="0.22" filter="blur(60px)" />
    <circle cx="200" cy="500" r="260" fill="#F26522" opacity="0.14" filter="blur(70px)" />

    <!-- Left Content Column -->
    <g transform="translate(80, 80)">
      
      <!-- Category Pill -->
      <g filter="url(#badgeShadow)">
        <rect x="0" y="0" width="370" height="42" rx="21" fill="#0A7A94" fill-opacity="0.3" stroke="#0E98A8" stroke-width="1.5" />
        <circle cx="22" cy="21" r="6" fill="#F26522" />
        <text x="38" y="27" fill="#E0F2F5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="2">
          STREAMING PÉDAGOGIQUE • RDC
        </text>
      </g>

      <!-- Main Headline -->
      <text x="0" y="115" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">
        Formation &amp; Diplômes
      </text>
      <text x="0" y="168" fill="#F26522" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">
        En Ligne &amp; Hors-Ligne
      </text>

      <!-- Subtitle & Value Proposition -->
      <text x="0" y="230" fill="#B0C4DE" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500">
        La première plateforme EdTech panafricaine certifiée
      </text>
      <text x="0" y="258" fill="#B0C4DE" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500">
        pour acquérir des compétences concrètes et certifiées.
      </text>

      <!-- Feature Badges Row -->
      <g transform="translate(0, 310)">
        <!-- Badge 1: IA Tutor -->
        <g>
          <rect x="0" y="0" width="165" height="48" rx="14" fill="#1A2B32" stroke="#0E98A8" stroke-width="1" />
          <text x="18" y="24" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">✦ TUTEUR IA</text>
          <text x="18" y="39" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">Assistance 24/7</text>
        </g>

        <!-- Badge 2: Certificats -->
        <g transform="translate(180, 0)">
          <rect x="0" y="0" width="175" height="48" rx="14" fill="#1A2B32" stroke="#F26522" stroke-width="1" />
          <text x="18" y="24" fill="#F26522" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">✓ CERTIFICATIONS</text>
          <text x="18" y="39" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">Reconnues en RDC</text>
        </g>

        <!-- Badge 3: Multi-plateforme -->
        <g transform="translate(370, 0)">
          <rect x="0" y="0" width="160" height="48" rx="14" fill="#1A2B32" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="18" y="24" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">📱 APP MOBILE</text>
          <text x="18" y="39" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">Android &amp; iOS PWA</text>
        </g>
      </g>

      <!-- Footer Info Line -->
      <g transform="translate(0, 420)">
        <text x="0" y="0" fill="#0E98A8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="1">
          cerclehub.cd • Propulsé par Amanitech SARL • Kinshasa
        </text>
      </g>
    </g>

    <!-- Right Side: Official Brand Emblem Container -->
    <g transform="translate(730, 85)" filter="url(#cardShadow)">
      <!-- White Clean Card Framing the Official Logo -->
      <rect width="390" height="450" rx="36" fill="url(#cardGrad)" stroke="#0E98A8" stroke-width="2" />
      
      <!-- Subtle Decorative Top Tab inside card -->
      <rect x="145" y="16" width="100" height="4" rx="2" fill="#0A7A94" opacity="0.3" />
    </g>
  </svg>
  `;

  // Render SVG base and composite the official logo image on top of the right card
  const ogCanvasBuffer = await sharp(Buffer.from(ogCardSvg))
    .png()
    .toBuffer();

  const finalOgBuffer = await sharp(ogCanvasBuffer)
    .composite([
      {
        input: logoBuffer,
        top: 100,
        left: 715,
      },
    ])
    .png({ quality: 95 })
    .toBuffer();

  // Save in all required formats & paths
  await sharp(finalOgBuffer)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));

  await sharp(finalOgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));

  await sharp(finalOgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-edtech.jpg'));

  await sharp(finalOgBuffer)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-edtech.png'));

  await sharp(finalOgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'logoog.jpg'));

  await sharp(finalOgBuffer)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'logoog.png'));

  console.log('✔ public/og-image.jpg, public/og-image.png, public/og-edtech.jpg, public/logoog.jpg gerados com sucesso!');
}

syncAssets().catch(console.error);
