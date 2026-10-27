import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const contactPagePath = new URL('../dist/contact/index.html', import.meta.url)
const homePagePath = new URL('../dist/index.html', import.meta.url)

test('build includes a WhatsApp contact page with page-specific metadata', () => {
  assert.ok(existsSync(contactPagePath), 'Expected the build to generate /contact')

  const html = readFileSync(contactPagePath, 'utf8')

  for (const expected of [
    '<html lang="id">',
    '<title>Kontak Wreative',
    'https://wreative.id/contact',
    'G-P1RLZGG7G8',
    'https://link.wreative.com/wa',
    'https://www.linkedin.com/company/wreative',
    'https://www.instagram.com/wreative',
    'https://www.tiktok.com/@wreative',
    'href="/#services"',
    'href="/contact"',
  ]) {
    assert.ok(html.includes(expected), `Expected contact page to include ${expected}`)
  }
})

test('homepage retains its in-page consultation anchor', () => {
  const html = readFileSync(homePagePath, 'utf8')
  assert.ok(html.includes('href="#contact"'))
})
