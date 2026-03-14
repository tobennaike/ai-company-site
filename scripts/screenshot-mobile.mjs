import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, 'screenshots')

const devices = [
  { name: 'iphone-14', width: 390, height: 844 },
  { name: 'samsung-galaxy', width: 412, height: 915 },
]

async function run() {
  const browser = await puppeteer.launch({ headless: true })

  for (const device of devices) {
    const page = await browser.newPage()
    await page.setViewport({ width: device.width, height: device.height, deviceScaleFactor: 2 })
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' })
    await page.waitForFunction(() => document.fonts.ready)
    await new Promise(r => setTimeout(r, 1000))

    await page.screenshot({
      path: path.join(outDir, `mobile-${device.name}-full.png`),
      fullPage: true,
    })
    console.log(`Saved: mobile-${device.name}-full.png`)

    // Also screenshot with menu open
    const menuBtn = await page.$('[aria-label="Toggle menu"]')
    if (menuBtn) {
      await menuBtn.click()
      await new Promise(r => setTimeout(r, 500))
      await page.screenshot({
        path: path.join(outDir, `mobile-${device.name}-menu.png`),
        clip: { x: 0, y: 0, width: device.width, height: device.height },
      })
      console.log(`Saved: mobile-${device.name}-menu.png`)
    }

    await page.close()
  }

  await browser.close()
  console.log('\nDone!')
}

run().catch(console.error)
