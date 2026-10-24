import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-core'

const output = path.join(os.tmpdir(), 'renacer-visual-qa', process.env.RENACER_QA_PHASE || 'current')
const url = process.env.RENACER_QA_URL || 'http://127.0.0.1:4173/'
const chrome = process.env.RENACER_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: chrome, headless: true })

try {
  for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['tablet', 820, 1180],
    ['mobile', 390, 844],
    ['mobile-small', 320, 740],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      const images = [...document.images]
      images.forEach((image) => { image.loading = 'eager' })
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)))
    })
    await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true })
    await page.screenshot({ path: path.join(output, `${name}-top.png`) })
    for (const section of ['.intro', '.philosophy', '.pillars', '.services', '.team', '.life', '.family', '.visit', '.footer']) {
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
    assert.equal(state.teamMembers, 8, `${name}: expected eight team members with photos`)
    assert.equal(await page.locator('.team-person:not(:has(.team-portrait img))').count(), 0, `${name}: team member without a photo`)
    assert.equal(state.headings.length, 1, `${name}: expected one main heading`)

    if (process.env.RENACER_QA_PHASE !== 'before') {
      const bookingLinks = await page.locator('a').filter({ hasText: /Agenda una visita/ }).evaluateAll((links) => links.map((link) => link.href))
      assert.ok(bookingLinks.length >= 4, `${name}: booking links missing`)
      for (const href of bookingLinks) {
        const bookingUrl = new URL(href)
        assert.equal(bookingUrl.origin, 'https://wa.me', `${name}: booking must open WhatsApp`)
        assert.equal(bookingUrl.pathname, '/522221725326', `${name}: incorrect WhatsApp number`)
        assert.equal(bookingUrl.searchParams.get('text'), 'Hola, me gustaría agendar una visita a Instituto Renacer.', `${name}: booking message missing`)
      }
      assert.equal(await page.locator('.footer a[href="tel:+522221725326"]').count(), 1, `${name}: footer phone missing`)
      assert.equal(await page.locator('.footer a[href="mailto:institutorenacerpuebla@gmail.com"]').count(), 1, `${name}: footer email missing`)
      assert.ok(!(await page.locator('.footer').innerText()).includes('Correo por agregar'), `${name}: email placeholder visible`)
      assert.equal((await page.locator('.footer-contact p').last().innerText()).trim(), 'Puebla', `${name}: incorrect location`)
      assert.equal(await page.locator('.life-visual').getByText('Próximamente').count(), 0, `${name}: daily life placeholder visible`)
    }

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
  const motionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await motionPage.goto(url, { waitUntil: 'networkidle' })
  await motionPage.locator('.intro h2').scrollIntoViewIfNeeded()
  await motionPage.waitForFunction(() => getComputedStyle(document.querySelector('.intro h2')).opacity === '1')
  assert.equal(await motionPage.evaluate(() => document.documentElement.classList.contains('motion-ready')), true)
  await motionPage.close()
  console.log('Scroll reveal: visible after entering viewport')
  console.log(`Screenshots: ${output}`)
} finally {
  await browser.close()
}
