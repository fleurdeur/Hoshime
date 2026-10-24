import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Regular High-Contrast SVG Icon
const regularSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0E14"/>
      <stop offset="50%" stop-color="#141A29"/>
      <stop offset="100%" stop-color="#080A0F"/>
    </linearGradient>
    <linearGradient id="star" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="35%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <!-- Background with subtle border -->
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect width="510" height="510" x="1" y="1" rx="111" fill="none" stroke="#F59E0B" stroke-opacity="0.35" stroke-width="2"/>
  
  <!-- Subtle cosmic nebula circle -->
  <circle cx="256" cy="256" r="160" fill="#F59E0B" fill-opacity="0.08" filter="blur(20px)"/>
  
  <!-- Outer orbital ring -->
  <circle cx="256" cy="256" r="148" fill="none" stroke="#F59E0B" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="8 6"/>

  <!-- Four-Pointed Anime Star (Hoshime Star) -->
  <g filter="url(#glow)">
    <!-- Central Star -->
    <path d="M 256 80 C 256 180 270 240 380 256 C 270 272 256 332 256 432 C 256 332 242 272 132 256 C 242 240 256 180 256 80 Z" 
          fill="url(#star)" />
  </g>

  <!-- Diamond Sparkle Accents -->
  <polygon points="370,140 376,152 388,158 376,164 370,176 364,164 352,158 364,152" fill="#FDE68A"/>
  <polygon points="144,340 148,348 156,352 148,356 144,364 140,356 132,352 140,348" fill="#FBBF24"/>
  <circle cx="256" cy="256" r="14" fill="#FFFBEB"/>
</svg>`;

// 2. Maskable SVG Icon with guaranteed safe-zone (15% padding all around)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg-m" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0E14"/>
      <stop offset="50%" stop-color="#141A29"/>
      <stop offset="100%" stop-color="#080A0F"/>
    </linearGradient>
    <linearGradient id="star-m" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="35%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <filter id="glow-m" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <!-- Full Bleed Background for Android adaptive mask -->
  <rect width="512" height="512" fill="url(#bg-m)"/>

  <!-- Centered within safe zone (scale 0.72) -->
  <g transform="translate(71.68, 71.68) scale(0.72)">
    <circle cx="256" cy="256" r="160" fill="#F59E0B" fill-opacity="0.12"/>
    <circle cx="256" cy="256" r="148" fill="none" stroke="#F59E0B" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="10 8"/>
    <g filter="url(#glow-m)">
      <path d="M 256 80 C 256 180 270 240 380 256 C 270 272 256 332 256 432 C 256 332 242 272 132 256 C 242 240 256 180 256 80 Z" fill="url(#star-m)"/>
    </g>
    <polygon points="370,140 376,152 388,158 376,164 370,176 364,164 352,158 364,152" fill="#FDE68A"/>
    <polygon points="144,340 148,348 156,352 148,356 144,364 140,356 132,352 140,348" fill="#FBBF24"/>
    <circle cx="256" cy="256" r="16" fill="#FFFBEB"/>
  </g>
</svg>`;

async function buildIcons() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), regularSvg);
  console.log('Saved icon.svg');

  const regularBuffer = Buffer.from(regularSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // 192x192 PNG
  await sharp(regularBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 512x512 PNG
  await sharp(regularBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // 512x512 Maskable PNG
  await sharp(maskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  // 180x180 Apple Touch Icon PNG
  await sharp(regularBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Favicon (32x32 PNG renamed or ICO)
  await sharp(regularBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');
}

buildIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
