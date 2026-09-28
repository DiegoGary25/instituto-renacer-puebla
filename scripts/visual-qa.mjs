import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-core'

const output = path.join(os.tmpdir(), 'renacer-visual-qa')
const url = process.env.RENACER_QA_URL || 'http://127.0.0.1:4173/'
const chrome = process.env.RENACER_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: chrome, headless: true })

try {
  for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['tablet', 820, 1180],
    ['mobile', 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      const images = [...document.images]
      images.forEach((image) => { image.loading = 'eager' })
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)))
    })
    await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true })
    await page.screenshot({ path: path.join(output, `${name}-top.png`) })
    for (const section of ['.pillars', '.team', '.family']) {
      await page.locator(section).screenshot({ path: path.join(output, `${name}-${section.slice(1)}.png`) })
    }
    if (name === 'desktop') {
      const track = page.locator('.team-track')
      await page.getByRole('button', { name: 'Ver siguientes integrantes' }).click()
      await page.waitForTimeout(400)
      assert.ok(await track.evaluate((element) => element.scrollLeft > 0), 'team carousel did not advance')
      await track.evaluate((element) => { element.scrollLeft = element.clientWidth * .9 })
      await page.locator('.team').screenshot({ path: path.join(output, 'desktop-team-middle.png') })
      await track.evaluate((element) => { element.scrollLeft = element.scrollWidth })
      await page.locator('.team').screenshot({ path: path.join(output, 'desktop-team-end.png') })
    }

    const state = await page.evaluate(() => ({
      viewport: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      brokenImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).map((image) => image.src),
      teamMembers: document.querySelectorAll('.team-person').length,
      headings: [...document.querySelectorAll('h1')].map((heading) => heading.textContent.trim()),
    }))

    assert.equal(state.documentWidth, state.viewport, `${name}: horizontal page overflow`)
    assert.deepEqual(state.brokenImages, [], `${name}: images failed to load`)
    assert.equal(state.teamMembers, 11, `${name}: team members missing`)
    assert.equal(state.headings.length, 1, `${name}: expected one main heading`)

    if (name === 'mobile') {
      const toggle = page.getByRole('button', { name: 'Abrir menú' })
      await toggle.click()
      assert.equal(await page.getByRole('button', { name: 'Cerrar menú' }).getAttribute('aria-expanded'), 'true')
      await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Servicios' }).click()
      assert.equal(await page.getByRole('button', { name: 'Abrir menú' }).getAttribute('aria-expanded'), 'false')
    }

    console.log(`${name}: ${state.viewport}px wide, ${state.documentHeight}px tall, ${state.teamMembers} team members, no overflow or broken images`)
    await page.close()
  }
  console.log(`Screenshots: ${output}`)
} finally {
  await browser.close()
}
