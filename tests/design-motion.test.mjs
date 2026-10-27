import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import test from 'node:test'

const distPath = new URL('../dist/', import.meta.url)
const routes = [
  'index.html',
  'contact/index.html',
  'jasa-pembuatan-website/index.html',
  'jasa-pembuatan-aplikasi/index.html',
  '404.html',
]

test('all public routes load the shared interaction script and reveal content', () => {
  for (const route of routes) {
    const html = readFileSync(new URL(route, distPath), 'utf8')
    assert.match(html, /<script type="module" src="\/_astro\/[^"]+\.js"><\/script>/, route)
    assert.match(html, /data-reveal/, route)
  }
})

test('the built design system has reduced-motion and square-radius tokens', () => {
  const assetPath = new URL('_astro/', distPath)
  const css = readdirSync(assetPath)
    .filter((name) => name.endsWith('.css'))
    .map((name) => readFileSync(new URL(name, assetPath), 'utf8'))
    .join('\n')

  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /data-motion-ready/)
  assert.match(css, /--radius-full:\s*0px/)
})

test('the default page canvas and footer use white background tokens', () => {
  const sourceCss = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
  const design = readFileSync(new URL('../DESIGN.md', import.meta.url), 'utf8')
  const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8')

  assert.match(sourceCss, /:root\s*\{[^}]*--background:\s*0\s+0%\s+100%/s)
  assert.match(sourceCss, /:root\s*\{[^}]*--card:\s*0\s+0%\s+100%/s)
  assert.match(design, /canvas:\s*'#FFFFFF'/)
  assert.match(design, /bg:\s*'#FFFFFF'/)
  assert.match(footer, /<footer class="bg-background/)
})

test('service page cross-links have whitespace before their links', () => {
  const applicationPage = readFileSync(
    new URL('jasa-pembuatan-aplikasi/index.html', distPath),
    'utf8',
  )
  const websitePage = readFileSync(new URL('jasa-pembuatan-website/index.html', distPath), 'utf8')

  assert.match(applicationPage, /Lihat\s+<a href="\/jasa-pembuatan-website"/)
  assert.match(websitePage, /Lihat\s+<a href="\/jasa-pembuatan-aplikasi"/)
})
