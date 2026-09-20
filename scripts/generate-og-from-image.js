import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOgImages() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Exact reproduction of the user's uploaded logoog.png in SVG:
  // Clean white background, 3 interlocking gradient rings, bold CERCLE HUB. and CONNECTER • PARTAGER • GRANDIR
  const generateLogoSvg = (width, height, isLandscape = false) => {
    // If landscape (1200x630), place the logo centered
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradients matching the logoog.png image -->
        <linearGradient id="ringTeal" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#2DD4BF" />
          <stop offset="40%" stop-color="#0E98A8" />
          <stop offset="100%" stop-color="#0A7A94" />
        </linearGradient>

        <linearGradient id="ringDeepBlue" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stop-color="#0E98A8" />
          <stop offset="50%" stop-color="#0A7A94" />
          <stop offset="100%" stop-color="#064E5E" />
        </linearGradient>

        <linearGradient id="ringOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FB923C" />
          <stop offset="50%" stop-color="#F26522" />
          <stop offset="100%" stop-color="#C2410C" />
        </linearGradient>

        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.08" flood-color="#000000" />
        </filter>
      </defs>

      <!-- Crisp Clean White Background as in user's logoog.png -->
      <rect width="${width}" height="${height}" fill="#FFFFFF" />

      <!-- Centered Content -->
      <g transform="translate(${width / 2}, ${height / 2})">
        <!-- Rings Emblem (scale 1.8) -->
        <g transform="translate(0, -55) scale(1.65)" filter="url(#subtleShadow)">
          <!-- Bottom Right Orange Ring -->
          <circle cx="34" cy="28" r="42" fill="none" stroke="url(#ringOrange)" stroke-width="17" stroke-linecap="round" />
          <!-- Top Teal Ring -->
          <circle cx="0" cy="-32" r="42" fill="none" stroke="url(#ringTeal)" stroke-width="17" stroke-linecap="round" />
          <!-- Bottom Left Deep Blue Ring -->
          <circle cx="-34" cy="28" r="42" fill="none" stroke="url(#ringDeepBlue)" stroke-width="17" stroke-linecap="round" />

          <!-- Interlocking ring segment overlays -->
          <path d="M -26 -5 A 42 42 0 0 1 10 -72" fill="none" stroke="url(#ringTeal)" stroke-width="17" stroke-linecap="round" />
          <path d="M 46 -6 A 42 42 0 0 1 72 28" fill="none" stroke="url(#ringOrange)" stroke-width="17" stroke-linecap="round" />
          <path d="M -14 58 A 42 42 0 0 1 -34 70" fill="none" stroke="url(#ringDeepBlue)" stroke-width="17" stroke-linecap="round" />
          <path d="M -1 26 A 42 42 0 0 1 14 62" fill="none" stroke="url(#ringOrange)" stroke-width="17" stroke-linecap="round" />
        </g>

        <!-- Brand Text: CERCLE HUB. -->
        <text x="0" y="125" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="64" letter-spacing="2">
          <tspan fill="#0A7A94">CERCLE </tspan>
          <tspan fill="#F26522">HUB.</tspan>
        </text>

        <!-- Slogan: CONNECTER • PARTAGER • GRANDIR -->
        <text x="0" y="170" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="800" font-size="19" fill="#0A7A94" letter-spacing="6">
          CONNECTER  •  PARTAGER  •  GRANDIR
        </text>

        <!-- Subtle Amanitech RDC footer note -->
        <text x="0" y="210" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="600" font-size="13" fill="#64748B" letter-spacing="1.5">
          PLATEFORME PÉDAGOGIQUE &amp; LEADERSHIP • AMANITECH RDC
        </text>
      </g>
    </svg>`;
  };

  // Square version (1000x1000) for WhatsApp square thumbnail previews
  const generateSquareSvg = (size) => {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ringTealSq" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#2DD4BF" />
          <stop offset="40%" stop-color="#0E98A8" />
          <stop offset="100%" stop-color="#0A7A94" />
        </linearGradient>

        <linearGradient id="ringDeepBlueSq" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stop-color="#0E98A8" />
          <stop offset="50%" stop-color="#0A7A94" />
          <stop offset="100%" stop-color="#064E5E" />
        </linearGradient>

        <linearGradient id="ringOrangeSq" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FB923C" />
          <stop offset="50%" stop-color="#F26522" />
          <stop offset="100%" stop-color="#C2410C" />
        </linearGradient>

        <filter id="shadowSq" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.1" flood-color="#000000" />
        </filter>
      </defs>

      <!-- Clean White Background -->
      <rect width="${size}" height="${size}" fill="#FFFFFF" />

      <!-- Center Elements -->
      <g transform="translate(${size / 2}, ${size / 2})">
        <!-- Rings Emblem -->
        <g transform="translate(0, -90) scale(2.4)" filter="url(#shadowSq)">
          <!-- Orange Ring -->
          <circle cx="34" cy="28" r="42" fill="none" stroke="url(#ringOrangeSq)" stroke-width="17" stroke-linecap="round" />
          <!-- Teal Ring -->
          <circle cx="0" cy="-32" r="42" fill="none" stroke="url(#ringTealSq)" stroke-width="17" stroke-linecap="round" />
          <!-- Deep Blue Ring -->
          <circle cx="-34" cy="28" r="42" fill="none" stroke="url(#ringDeepBlueSq)" stroke-width="17" stroke-linecap="round" />

          <!-- Overlaps -->
          <path d="M -26 -5 A 42 42 0 0 1 10 -72" fill="none" stroke="url(#ringTealSq)" stroke-width="17" stroke-linecap="round" />
          <path d="M 46 -6 A 42 42 0 0 1 72 28" fill="none" stroke="url(#ringOrangeSq)" stroke-width="17" stroke-linecap="round" />
          <path d="M -14 58 A 42 42 0 0 1 -34 70" fill="none" stroke="url(#ringDeepBlueSq)" stroke-width="17" stroke-linecap="round" />
          <path d="M -1 26 A 42 42 0 0 1 14 62" fill="none" stroke="url(#ringOrangeSq)" stroke-width="17" stroke-linecap="round" />
        </g>

        <!-- Brand Text -->
        <text x="0" y="165" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="88" letter-spacing="3">
          <tspan fill="#0A7A94">CERCLE </tspan>
          <tspan fill="#F26522">HUB.</tspan>
        </text>

        <!-- Slogan -->
        <text x="0" y="225" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="800" font-size="26" fill="#0A7A94" letter-spacing="8">
          CONNECTER  •  PARTAGER  •  GRANDIR
        </text>

        <text x="0" y="280" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="600" font-size="18" fill="#64748B" letter-spacing="2">
          FORMATION PROFESSIONNELLE &amp; LEADERSHIP EN RDC
        </text>
      </g>
    </svg>`;
  };

  console.log('Generating OG social share images based on user uploaded logoog.png...');

  const landscapeSvg = Buffer.from(generateLogoSvg(1200, 630, true));
  const squareSvg = Buffer.from(generateSquareSvg(1000));

  // 1. og-image.png (1200x630)
  await sharp(landscapeSvg)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✔ public/og-image.png generated');

  // 2. og-image.jpg (1200x630)
  await sharp(landscapeSvg)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('✔ public/og-image.jpg generated');

  // 3. logoog.png (exact user filename, 1000x1000 square)
  await sharp(squareSvg)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'logoog.png'));
  console.log('✔ public/logoog.png generated');

  // 4. logoog.jpg
  await sharp(squareSvg)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'logoog.jpg'));
  console.log('✔ public/logoog.jpg generated');

  // 5. og-square.png (for WhatsApp small card support)
  await sharp(squareSvg)
    .resize(600, 600)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'og-square.png'));
  console.log('✔ public/og-square.png generated');

  // Also copy to dist if dist exists
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(path.join(publicDir, 'og-image.png'), path.join(distDir, 'og-image.png'));
    fs.copyFileSync(path.join(publicDir, 'og-image.jpg'), path.join(distDir, 'og-image.jpg'));
    fs.copyFileSync(path.join(publicDir, 'logoog.png'), path.join(distDir, 'logoog.png'));
    fs.copyFileSync(path.join(publicDir, 'logoog.jpg'), path.join(distDir, 'logoog.jpg'));
    fs.copyFileSync(path.join(publicDir, 'og-square.png'), path.join(distDir, 'og-square.png'));
    console.log('✔ Copied images to dist/');
  }

  console.log('All OG images generated successfully matching logoog.png!');
}

generateOgImages().catch(console.error);
