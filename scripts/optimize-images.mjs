// One-off build tool: converts the bakery's PNG/JPG source photos to
// resized WebP. Run manually with `node scripts/optimize-images.mjs`
// whenever new source images are dropped in src/public.
import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const ROOT = join(process.cwd(), 'src/public')

// [folder relative to ROOT, max width in px, webp quality]
const TARGETS = [
  ['cardapio', 480, 75],
  ['.', 900, 80],
]

let totalBefore = 0
let totalAfter = 0

for (const [dir, maxWidth, quality] of TARGETS) {
  const abs = join(ROOT, dir)
  const entries = readdirSync(abs, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isFile()) continue
    const ext = extname(entry.name).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

    const srcPath = join(abs, entry.name)
    const name = basename(entry.name, ext)
    const outPath = join(abs, `${name}.webp`)

    const before = statSync(srcPath).size
    const img = sharp(srcPath)
    const meta = await img.metadata()

    const pipeline = img
      .resize({ width: Math.min(maxWidth, meta.width || maxWidth), withoutEnlargement: true })
      .webp({ quality })

    await pipeline.toFile(outPath)

    const after = statSync(outPath).size
    totalBefore += before
    totalAfter += after

    unlinkSync(srcPath)

    console.log(
      `${join(dir, entry.name)} -> ${name}.webp  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    )
  }
}

console.log('\n--- Total ---')
console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)}MB`)
console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(1)}MB`)
console.log(`Saved:  ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`)
