import { useEffect } from 'react'
import Lenis from 'lenis'
import { LanguageProvider } from './i18n/LanguageContext'
import { AmbientLight, Grain, MotionProvider, Preloader, ScrollRail } from './fx'
import Header from './components/Header'
import Hero from './components/Hero'
import Reassure from './components/Reassure'
import Studio from './components/Studio'
import WhyHeaven from './components/WhyHeaven'
import Stats from './components/Stats'
import Collections from './components/Collections'
import Bespoke from './components/Bespoke'
import Range from './components/Range'
import Materials from './components/Materials'
import Workshop from './components/Workshop'
import Styling from './components/Styling'
import Marquee from './components/Marquee'
import Process from './components/Process'
import Story from './components/Story'
import Showroom3D from './components/Showroom3D'
<<<<<<< HEAD
=======
import ShowroomTour from './components/ShowroomTour'
import Testimonials from './components/Testimonials'
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
import Faq from './components/Faq'
import Quote from './components/Quote'
import Visit from './components/Visit'
import MobileBar from './components/MobileBar'

function SmoothScroll() {
  useEffect(() => {
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

  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <SmoothScroll />
        <Preloader />
        <Grain />
        <AmbientLight />
        <ScrollRail />

        <Header />
        <main id="main">
          <Hero />
          <Reassure />
          <Studio />
          <Stats />
          <WhyHeaven />
          <Collections />
          <Bespoke />
          <Range />
          <Materials />
          <Workshop />
          <Styling />
          <Marquee />
          <Process />
          <Story />
          <Showroom3D />
<<<<<<< HEAD
=======
          <ShowroomTour />
          <Testimonials />
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
          <Faq />
          <Quote />
        </main>
        <Visit />
        <MobileBar />
      </MotionProvider>
    </LanguageProvider>
  )
}
