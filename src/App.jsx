import { useEffect } from 'react'
import Lenis from 'lenis'
import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Reassure from './components/Reassure'
import Studio from './components/Studio'
import WhyHeaven from './components/WhyHeaven'
import Collections from './components/Collections'
import Bespoke from './components/Bespoke'
import Range from './components/Range'
import Materials from './components/Materials'
import Styling from './components/Styling'
import Marquee from './components/Marquee'
import Process from './components/Process'
import Story from './components/Story'
import Gallery from './components/Gallery'
import Faq from './components/Faq'
import Visit from './components/Visit'
import MobileBar from './components/MobileBar'

export default function App() {
  useEffect(() => {
    // Smooth scrolling — skipped entirely for anyone who asks for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -80 })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <LanguageProvider>
      <Header />
      <main id="main">
        <Hero />
        <Reassure />
        <Studio />
        <WhyHeaven />
        <Collections />
        <Bespoke />
        <Range />
        <Materials />
        <Styling />
        <Marquee />
        <Process />
        <Story />
        <Gallery />
        <Faq />
      </main>
      <Visit />
      <MobileBar />
    </LanguageProvider>
  )
}
