// Scroll reveal (fade-up on first intersection)
const revealEls = document.querySelectorAll('[data-reveal]')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.dataset.motionReady = ''
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.getAttribute('data-reveal-delay'))
          if (Number.isFinite(delay) && delay > 0) {
            entry.target.style.transitionDelay = `${Math.min(delay, 360)}ms`
          }
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '-50px' },
  )
  revealEls.forEach((el) => io.observe(el))
}

// Sticky header: scrolled state + active-section highlight
const header = document.querySelector('[data-header]')
const navLinks = document.querySelectorAll('[data-nav-link]')
const onScroll = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 20)
  const pos = window.scrollY + 100
  let current = 'home'
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1)
    const section = id ? document.getElementById(id) : null
    if (section && section.offsetTop <= pos) current = id
  })
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href')?.slice(1) === current)
  })
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Mobile menu
const menuToggles = document.querySelectorAll('[data-menu-toggle]')
const menuTrigger = document.querySelector('[data-menu-trigger]')
const menuClose = document.querySelector('[data-menu-close]')
const menu = document.querySelector('[data-menu]')
const menuOverlay = document.querySelector('[data-menu-overlay]')
const setMenuOpen = (open) => {
  menu?.classList.toggle('is-open', open)
  menu?.toggleAttribute('inert', !open)
  menu?.setAttribute('aria-hidden', String(!open))
  menuOverlay?.classList.toggle('is-open', open)
  document.body.classList.toggle('overflow-hidden', open)
  menuToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)))
  if (open) {
    menuClose?.focus()
  } else if (menu?.contains(document.activeElement)) {
    menuTrigger?.focus()
  }
}

const closeMenu = () => setMenuOpen(false)

menuToggles.forEach((menuToggle) => {
  menuToggle?.addEventListener('click', () => {
    setMenuOpen(!menu?.classList.contains('is-open'))
  })
})
menuOverlay?.addEventListener('click', closeMenu)
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu()
})
