import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const websitePagePath = new URL('../dist/jasa-pembuatan-website/index.html', import.meta.url)
const applicationPagePath = new URL('../dist/jasa-pembuatan-aplikasi/index.html', import.meta.url)
const homePagePath = new URL('../dist/index.html', import.meta.url)
const sitemapPath = new URL('../dist/sitemap.xml', import.meta.url)

const readBuiltPage = (path, route) => {
  assert.ok(existsSync(path), `Expected the build to generate ${route}`)
  return readFileSync(path, 'utf8')
}

test('website service page has Indonesian content, metadata, and consultation CTA', () => {
  const html = readBuiltPage(websitePagePath, '/jasa-pembuatan-website')

  for (const expected of [
    '<html lang="id">',
    '<title>Jasa Pembuatan Website Profesional | Wreative</title>',
    '<meta name="description" content="Jasa pembuatan website profesional untuk bisnis:',
    '<link rel="canonical" href="https://wreative.id/jasa-pembuatan-website">',
    'Company Profile',
    'Landing Page',
    'https://link.wreative.com/wa',
    'target="_blank"',
    'rel="noopener noreferrer"',
    'href="/jasa-pembuatan-aplikasi"',
  ]) {
    assert.ok(html.includes(expected), `Expected website page to include ${expected}`)
  }
})

test('application service page covers mobile and web apps with metadata and CTA', () => {
  const html = readBuiltPage(applicationPagePath, '/jasa-pembuatan-aplikasi')

  for (const expected of [
    '<html lang="id">',
    '<title>Jasa Pembuatan Aplikasi Mobile &amp; Web | Wreative</title>',
    '<meta name="description" content="Jasa pembuatan aplikasi Android, iOS, dan web application',
    '<link rel="canonical" href="https://wreative.id/jasa-pembuatan-aplikasi">',
    'Android',
    'iOS',
    'Flutter',
    'SaaS',
    'ERP',
    'https://link.wreative.com/wa',
    'target="_blank"',
    'rel="noopener noreferrer"',
    'href="/jasa-pembuatan-website"',
  ]) {
    assert.ok(html.includes(expected), `Expected application page to include ${expected}`)
  }
})

test('homepage service cards link to both detail pages', () => {
  const html = readBuiltPage(homePagePath, '/')

  assert.ok(html.includes('href="/jasa-pembuatan-website"'))
  assert.ok(html.includes('href="/jasa-pembuatan-aplikasi"'))
  assert.ok(html.includes('href="#contact"'))
})

test('sitemap lists both service page canonical URLs', () => {
  assert.ok(existsSync(sitemapPath), 'Expected the build to copy the sitemap')
  const sitemap = readFileSync(sitemapPath, 'utf8')

  assert.ok(sitemap.includes('<loc>https://wreative.id/jasa-pembuatan-website</loc>'))
  assert.ok(sitemap.includes('<loc>https://wreative.id/jasa-pembuatan-aplikasi</loc>'))
})
