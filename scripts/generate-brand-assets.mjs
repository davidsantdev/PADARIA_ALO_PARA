// Generates favicon / apple-touch-icon / social share image from inline SVG,
// using the site's brand colors. Run with `node scripts/generate-brand-assets.mjs`.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const PUBLIC_DIR = join(process.cwd(), 'public')
mkdirSync(PUBLIC_DIR, { recursive: true })

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F2A65A" />
      <stop offset="0.55" stop-color="#C2703A" />
      <stop offset="1" stop-color="#9C4F26" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#g)" />
  <text x="256" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="290" font-weight="600"
    text-anchor="middle" fill="#FBF6EE">A</text>
</svg>
`

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3A2A24" />
      <stop offset="1" stop-color="#241C17" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="1040" cy="90" r="160" fill="#E2933C" opacity="0.12" />
  <circle cx="120" cy="560" r="120" fill="#F5C84C" opacity="0.10" />
  <text x="90" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="96" font-weight="600" fill="#FBF6EE">
    Alô <tspan fill="#E2933C" font-style="italic">Pará</tspan>
  </text>
  <text x="92" y="365" font-family="Arial, sans-serif" font-size="34" fill="#FBF6EEAA">
    Pães, salgados e bolos feitos do zero, todos os dias.
  </text>
</svg>
`

await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile(join(PUBLIC_DIR, 'favicon.png'))
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'))
await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toFile(join(PUBLIC_DIR, 'og-image.png'))

console.log('Brand assets generated in /public: favicon.png, apple-touch-icon.png, og-image.png')
