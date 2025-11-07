import { globby } from 'globby'
import sharp from 'sharp'
import { dirname, join, parse } from 'node:path'
import fs from 'node:fs/promises'

const sizes = [480, 768, 1080, 1440, 1920]
const formats = ['webp', 'avif']

const files = await globby(['content/media/**/*.{jpg,jpeg,png}'])
for (const file of files) {
  const { name } = parse(file)
  const outDir = join(dirname(file), name)
  await fs.mkdir(outDir, { recursive: true })
  for (const w of sizes) {
    for (const fmt of formats) {
      await sharp(file).resize({ width: w }).toFormat(fmt).toFile(join(outDir, `${name}-${w}.${fmt}`))
    }
  }
}
