import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = path.resolve('assets/IMAGEN PROMOCIONAL 3.png')
const target = path.resolve('assets/web/IMAGEN_PROMOCIONAL_3.webp')

await mkdir(path.dirname(target), { recursive: true })
await sharp(source).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90, effort: 6 }).toFile(target)

const [original, optimized] = await Promise.all([stat(source), stat(target)])
console.log(`Philosophy image: ${(original.size / 1024 / 1024).toFixed(2)} MB → ${(optimized.size / 1024 / 1024).toFixed(2)} MB`)
