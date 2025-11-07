import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceDir = path.join(__dirname, '../content/media')
const targetDir = path.join(__dirname, '../site/public/media')

async function copyMedia() {
  try {
    // Ensure source exists
    await fs.access(sourceDir)

    // Remove old media folder if exists
    try {
      await fs.rm(targetDir, { recursive: true, force: true })
    } catch {}

    // Create target directory
    await fs.mkdir(targetDir, { recursive: true })

    // Copy all files from source to target
    const files = await fs.readdir(sourceDir, { withFileTypes: true })

    for (const file of files) {
      if (file.name === '.gitkeep') continue

      const sourcePath = path.join(sourceDir, file.name)
      const targetPath = path.join(targetDir, file.name)

      if (file.isDirectory()) {
        await fs.cp(sourcePath, targetPath, { recursive: true })
      } else {
        await fs.copyFile(sourcePath, targetPath)
      }
    }

    console.log(`✓ Copied media files from content/media to site/public/media`)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('ℹ No media files to copy')
    } else {
      console.error('Error copying media:', err)
    }
  }
}

copyMedia()
