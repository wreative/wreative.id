import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const distPath = new URL('../dist/', import.meta.url)
const routes = [
  'index.html',
  'contact/index.html',
  'jasa-pembuatan-website/index.html',
  'jasa-pembuatan-aplikasi/index.html',
  '404.html',
]

test('all public routes declare shared icons and PWA metadata', () => {
  for (const route of routes) {
    const html = readFileSync(new URL(route, distPath), 'utf8')

    assert.match(html, /<link rel="icon" type="image\/x-icon" href="\/icons\/favicon\.ico"/, route)
    assert.match(
      html,
      /<link rel="icon" type="image\/png" sizes="32x32" href="\/icons\/favicon-32x32\.png"/,
      route,
    )
    assert.match(
      html,
      /<link rel="icon" type="image\/png" sizes="16x16" href="\/icons\/favicon-16x16\.png"/,
      route,
    )
    assert.match(
      html,
      /<link rel="apple-touch-icon" sizes="180x180" href="\/icons\/apple-touch-icon\.png"/,
      route,
    )
    assert.match(html, /<link rel="manifest" href="\/manifest\.json"/, route)
    assert.match(html, /<meta name="theme-color" content="#DFE4EA"/, route)
    assert.match(html, /\/registerSW\.js/, route)
  }
})

test('manifest icons and shortcuts resolve to emitted assets', () => {
  const manifest = JSON.parse(readFileSync(new URL('manifest.json', distPath), 'utf8'))
  const referencedIcons = [
    ...manifest.icons,
    ...manifest.shortcuts.flatMap((shortcut) => shortcut.icons ?? []),
  ]

  assert.equal(manifest.theme_color, '#DFE4EA')
  assert.equal(manifest.background_color, '#DFE4EA')

  for (const icon of referencedIcons) {
    assert.ok(existsSync(new URL(icon.src.replace(/^\//, ''), distPath)), icon.src)
  }

  assert.ok(existsSync(new URL('sw.js', distPath)))
  assert.ok(existsSync(new URL('registerSW.js', distPath)))
})

test('shortcut icons use the 192px PNG asset', () => {
  const manifest = JSON.parse(readFileSync(new URL('manifest.json', distPath), 'utf8'))
  const shortcuts = manifest.shortcuts.flatMap((shortcut) => shortcut.icons ?? [])

  assert.ok(shortcuts.length > 0)
  assert.ok(shortcuts.every((icon) => icon.src === '/icons/favicon-192x192.png'))
})
