import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logoLight from '../assets/logo-light.png'
import { useLang } from '../i18n/LanguageContext'
import { CURTAIN, EASE } from './config'
import { useMotionPrefs } from './MotionProvider'

/**
 * The one orchestrated moment on the page.
 *
 * Heaven's pitch is that a piece is measured before it is made, so the page
 * opens the same way: a dimension line draws itself across the brand, a set of
 * plans counts up to complete, and then two panels part like the doors of the
 * Agrabad showroom. Everything after this is triggered by the visitor.
 *
 * It is skippable on any input, it never runs for reduced-motion visitors, and
 * scroll is held for its 1.8s so the hero is not half-read behind the panels.
 */

const DRAW = 1.75 // curtains start parting here
const CLEAR = 2.85 // component unmounts here

export default function Preloader() {
  const { t } = useLang()
  const { intro, ready, done } = useMotionPrefs()
  const [phase, setPhase] = useState('draw') // draw → part → gone
  const [count, setCount] = useState(0)
  const skipped = useRef(false)

  // ------------------------------------------------------------- the counter
  useEffect(() => {
    if (!intro) return
    let frame
    const started = performance.now()
    const tick = (now) => {
      const p = Math.min((now - started) / (DRAW * 1000 - 250), 1)
      // Eased so the number slows as it approaches 100 instead of running out.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [intro])

  // -------------------------------------------------------------- the timing
  useEffect(() => {
    if (!intro) return

    const part = setTimeout(() => finish(), DRAW * 1000)
    const clear = setTimeout(() => setPhase('gone'), CLEAR * 1000)

    function finish() {
      if (skipped.current) return
      skipped.current = true
      setPhase('part')
      done() // hero begins its entrance behind the opening panels
    }

    const skip = () => {
      if (skipped.current) return
      clearTimeout(part)
      clearTimeout(clear)
      finish()
      setTimeout(() => setPhase('gone'), 1000)
    }

    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })

    return () => {
      clearTimeout(part)
      clearTimeout(clear)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
    }
  }, [intro, done])

  // Hold the page still while the panels are closed.
  useEffect(() => {
    if (!intro || phase === 'gone') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [intro, phase])

  if (!intro || phase === 'gone') return null

  const parting = phase === 'part'
  const panel = { duration: 1.05, ease: CURTAIN }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]" aria-hidden="true">
        {/* ---------------------------------------------------- the two panels */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[50.5%] bg-forest-deep"
          animate={parting ? { x: '-101%' } : { x: 0 }}
          transition={panel}
        />
        <motion.div
          className="absolute inset-y-0 right-0 w-[50.5%] bg-forest-deep"
          animate={parting ? { x: '101%' } : { x: 0 }}
          transition={panel}
        />

        {/* light spilling through the opening gap */}
        <motion.div
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gold"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={parting ? { opacity: [0.9, 0], scaleY: 1 } : { opacity: 0.35, scaleY: 1 }}
          transition={{ duration: parting ? 0.7 : 1, ease: EASE }}
        />

        {/* ------------------------------------------------------- the content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          animate={parting ? { opacity: 0, scale: 1.07 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="relative">
            <motion.img
              src={logoLight}
              alt=""
              width={612}
              height={174}
              className="h-10 w-auto sm:h-14"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            />

            {/* the dimension line, drawn under the brand like a plan */}
            <svg
              viewBox="0 0 320 40"
              className="absolute -bottom-9 left-1/2 h-10 w-[19rem] -translate-x-1/2 sm:w-[22rem]"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            >
              {[
                { d: 'M14 6 V 26', delay: 0.45, dur: 0.35 },
                { d: 'M306 6 V 26', delay: 0.52, dur: 0.35 },
                { d: 'M160 16 H 14', delay: 0.66, dur: 0.6 },
                { d: 'M160 16 H 306', delay: 0.66, dur: 0.6 },
                { d: 'M14 16 l 8 -3.5 M14 16 l 8 3.5', delay: 1.2, dur: 0.25 },
                { d: 'M306 16 l -8 -3.5 M306 16 l -8 3.5', delay: 1.2, dur: 0.25 },
              ].map((line) => (
                <motion.path
                  key={line.d}
                  d={line.d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: line.dur, delay: line.delay, ease: CURTAIN }}
                />
              ))}
            </svg>
          </div>

          <motion.p
            className="mt-16 text-[0.8rem] tracking-[0.24em] text-ivory/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            {t('introTagline')}
          </motion.p>
        </motion.div>

        {/* ------------------------------------------------------- the counter */}
        <motion.div
          className="absolute right-6 bottom-6 flex items-end gap-3 sm:right-10 sm:bottom-10"
          animate={parting ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="font-display text-4xl leading-none text-ivory/85 tabular-nums sm:text-5xl">
            {String(count).padStart(2, '0')}
          </span>
          <span className="pb-1 text-[0.7rem] tracking-[0.18em] text-ivory/40">
            {t('introLoading')}
          </span>
        </motion.div>

        {/* thin progress rule along the very bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-px origin-left bg-gold"
          style={{ width: '100%' }}
          animate={{ scaleX: count / 100 }}
          transition={{ duration: 0.2, ease: 'linear' }}
        />
      </div>
    </AnimatePresence>
  )
}
