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
