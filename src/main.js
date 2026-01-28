import './style.css'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// ========================================
// APP CLASS - Enterprise Architecture
// ========================================
class VolcanoApp {
  constructor() {
    this.lenis = null
    this.cursor = {
      dot: null,
      circle: null,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    }
    this.magneticElements = []
    this.isMenuOpen = false
    this.scrollTriggers = []
    
    this.init()
  }

  init() {
    this.initLoading()
    this.initLenis()
    this.initCursor()
    this.initNavigation()
    this.initMagneticElements()
    this.initHeroAnimations()
    this.initScrollAnimations()
    this.initHorizontalScroll()
    this.initCounters()
    this.initForm()
    
    // Start animation loop
    this.animate()
  }

  // ========================================
  // LOADING SCREEN
  // ========================================
  initLoading() {
    const loadingScreen = document.querySelector('.loading-screen')
    
    // Simulate loading progress
    setTimeout(() => {
      loadingScreen.classList.add('hidden')
      document.body.style.overflow = ''
      
      // Trigger hero animations after loading
      setTimeout(() => this.animateHero(), 300)
    }, 2500)
  }

  // ========================================
  // LENIS SMOOTH SCROLL - DISABLED
  // ========================================
  initLenis() {
    // Lenis disabled - using native scroll
    // Only connect ScrollTrigger to native scroll
    ScrollTrigger.defaults({
      scroller: window
    })
  }

  // ========================================
  // CUSTOM CURSOR
  // ========================================
  initCursor() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    this.cursor.dot = document.querySelector('.cursor-dot')
    this.cursor.circle = document.querySelector('.cursor-circle')

    document.addEventListener('mousemove', (e) => {
      this.cursor.targetX = e.clientX
      this.cursor.targetY = e.clientY
    })

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-card, .service-card')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.querySelector('.cursor').classList.add('hover')
      })
      el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').classList.remove('hover')
      })
    })

    // Click effect
    document.addEventListener('mousedown', () => {
      document.querySelector('.cursor').classList.add('click')
    })
    document.addEventListener('mouseup', () => {
      document.querySelector('.cursor').classList.remove('click')
    })
  }

  updateCursor() {
    if (!this.cursor.dot || !this.cursor.circle) return

    // Smooth interpolation
    this.cursor.x += (this.cursor.targetX - this.cursor.x) * 0.15
    this.cursor.y += (this.cursor.targetY - this.cursor.y) * 0.15

    this.cursor.dot.style.left = `${this.cursor.targetX}px`
    this.cursor.dot.style.top = `${this.cursor.targetY}px`

    this.cursor.circle.style.left = `${this.cursor.x}px`
    this.cursor.circle.style.top = `${this.cursor.y}px`
  }

  // ========================================
  // NAVIGATION
  // ========================================
  initNavigation() {
    const header = document.querySelector('.header')
    const menuToggle = document.querySelector('.menu-toggle')
    const fullscreenMenu = document.querySelector('.fullscreen-menu')
    const menuLinks = document.querySelectorAll('.menu-link')
    let lastScroll = 0

    // Header scroll behavior - use native scroll
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY
      
      if (scroll > 100) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }

      if (scroll > lastScroll && scroll > 200) {
        header.classList.add('hidden')
      } else {
        header.classList.remove('hidden')
      }

      lastScroll = scroll
    }, { passive: true })

    // Menu toggle
    menuToggle.addEventListener('click', () => {
      this.isMenuOpen = !this.isMenuOpen
      menuToggle.classList.toggle('active')
      fullscreenMenu.classList.toggle('active')
      document.body.classList.toggle('menu-open')
      
      // Toggle body scroll
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })

    // Menu link clicks
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = link.getAttribute('href')
        
        this.isMenuOpen = false
        menuToggle.classList.remove('active')
        fullscreenMenu.classList.remove('active')
        document.body.classList.remove('menu-open')
        document.body.style.overflow = ''

        // Native smooth scroll
        const targetEl = document.querySelector(target)
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        if (anchor.classList.contains('menu-link')) return
        e.preventDefault()
        const target = anchor.getAttribute('href')
        const targetEl = document.querySelector(target)
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }

  // ========================================
  // MAGNETIC ELEMENTS
  // ========================================
  initMagneticElements() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    this.magneticElements = document.querySelectorAll('.magnetic-element')

    this.magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    })
  }

  // ========================================
  // HERO ANIMATIONS
  // ========================================
  initHeroAnimations() {
    // Set initial states
    gsap.set('.hero-eyebrow', { opacity: 0, y: 20 })
    gsap.set('.title-word', { y: '100%' })
    gsap.set('.desc-line', { opacity: 0, y: 20 })
    gsap.set('.hero-actions', { opacity: 0, y: 20 })
    gsap.set('.stat-item', { opacity: 0, y: 20 })
  }

  animateHero() {
    const tl = gsap.timeline()

    tl.to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.title-word', {
      y: '0%',
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.desc-line', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.8')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.stat-item', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.6')
  }

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  initScrollAnimations() {
    // Section title reveals
    const titleReveals = document.querySelectorAll('.title-reveal')
    titleReveals.forEach(title => {
      // Wrap content in span
      const content = title.innerHTML
      title.innerHTML = `<span>${content}</span>`

      gsap.from(title.querySelector('span'), {
        y: '100%',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Text reveals
    const textReveals = document.querySelectorAll('.text-reveal')
    textReveals.forEach((text, i) => {
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // About features
    gsap.from('.about-feature', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-features',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    // Service cards
    gsap.from('.service-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    // Parallax shapes - use scrub for smoother effect
    gsap.to('.shape-1', {
      y: 150,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    })

    gsap.to('.shape-2', {
      y: -100,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    })
  }

  // ========================================
  // HORIZONTAL SCROLL - WORKS SECTION
  // ========================================
  initHorizontalScroll() {
    const worksSection = document.querySelector('.works')
    const worksPin = document.querySelector('.works-pin')
    const worksTrack = document.querySelector('.works-track')
    const workCards = document.querySelectorAll('.work-card')
    const progressFill = document.querySelector('.progress-fill')

    if (!worksSection || !worksTrack || !worksPin) return

    // Get all cards
    const cards = worksTrack.querySelectorAll('.work-card')
    if (cards.length === 0) return

    // Calculate dimensions dynamically
    const getScrollAmount = () => {
      const trackWidth = worksTrack.scrollWidth
      const viewportWidth = window.innerWidth
      return -(trackWidth - viewportWidth + 100)
    }

    // Create horizontal scroll with smooth scrub
    const horizontalScroll = gsap.to(worksTrack, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: worksPin,
        start: 'top top',
        end: () => `+=${worksTrack.scrollWidth - window.innerWidth + 300}`,
        scrub: 0.3,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update progress bar
          if (progressFill) {
            progressFill.style.width = `${self.progress * 100}%`
          }
        }
      }
    })

    this.scrollTriggers.push(horizontalScroll)

    // Work card hover effects
    workCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.6,
          ease: 'power3.out'
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.6,
          ease: 'power3.out'
        })
      })
    })

    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh()
    })
  }

  // ========================================
  // COUNTER ANIMATION
  // ========================================
  initCounters() {
    const statItems = document.querySelectorAll('.stat-item')

    statItems.forEach(item => {
      const targetValue = parseInt(item.dataset.value)
      const numberEl = item.querySelector('.stat-number')

      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ value: 0 }, {
            value: targetValue,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              numberEl.textContent = Math.floor(this.targets()[0].value)
            }
          })
        },
        once: true
      })
    })
  }

  // ========================================
  // FORM HANDLING
  // ========================================
  initForm() {
    const form = document.getElementById('contactForm')
    if (!form) return

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const submitBtn = form.querySelector('.submit-btn')
      const originalText = submitBtn.querySelector('.btn-text').textContent

      // Animate button
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      })

      submitBtn.querySelector('.btn-text').textContent = '发送中...'

      // Simulate form submission
      setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = '已发送!'
        submitBtn.style.background = '#30d158'

        setTimeout(() => {
          submitBtn.querySelector('.btn-text').textContent = originalText
          submitBtn.style.background = ''
          form.reset()
        }, 2000)
      }, 1500)
    })
  }

  // ========================================
  // ANIMATION LOOP
  // ========================================
  animate() {
    this.updateCursor()
    requestAnimationFrame(() => this.animate())
  }
}

// ========================================
// INITIALIZE APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  new VolcanoApp()
})

// ========================================
// BACK TO TOP
// ========================================
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
