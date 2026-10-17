import { chromium } from '@playwright/test'

const out = process.argv[2] || 'shot.png'
const wait = +(process.argv[3] || 5000)
const w = +(process.argv[4] || 1440)
const h = +(process.argv[5] || 900)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: w, height: h } })
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForTimeout(wait)
await page.screenshot({ path: out })
console.log('saved', out, `${w}x${h}`)
await browser.close()
