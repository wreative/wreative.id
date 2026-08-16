// Scroll reveal (fade-up on first intersection)
const revealEls = document.querySelectorAll('[data-reveal]')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay')
          if (delay) entry.target.style.transitionDelay = `${delay}ms`
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '-50px' },
  )
  revealEls.forEach((el) => io.observe(el))
} else {
  revealEls.forEach((el) => {
    const delay = el.getAttribute('data-reveal-delay')
    if (delay) el.style.transitionDelay = `${delay}ms`
    el.classList.add('is-visible')
  })
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
const menu = document.querySelector('[data-menu]')
const menuOverlay = document.querySelector('[data-menu-overlay]')
const closeMenu = () => {
  menu?.classList.remove('is-open')
  menuOverlay?.classList.remove('is-open')
  document.body.classList.remove('overflow-hidden')
}
menuToggles.forEach((menuToggle) => {
  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open')
    menuOverlay?.classList.toggle('is-open', open)
    document.body.classList.toggle('overflow-hidden', open)
  })
})
menuOverlay?.addEventListener('click', closeMenu)
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu()
})

// Hero parallax
const p1 = document.querySelector('[data-parallax="1"]')
const p2 = document.querySelector('[data-parallax="2"]')
window.addEventListener(
  'scroll',
  () => {
    const s = Math.min(window.scrollY, 1000)
    if (p1) p1.style.transform = `translateY(${s * 0.15}px)`
    if (p2) p2.style.transform = `translateY(${s * -0.1}px)`
  },
  { passive: true },
)
