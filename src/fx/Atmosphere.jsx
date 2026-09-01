import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMotionPrefs } from './MotionProvider'

/**
 * Two fixed layers that sit over and under everything: a grain wash, and a
 * warm light that drifts as the page scrolls.
 *
 * Flat ivory reads as a screen colour. Real showrooms have a light source, and
 * photographs of them have grain — these two layers are what stop the page from
 * looking like a wireframe with photos dropped in.
 *
 * The grain is one inline SVG turbulence rasterised once by the browser and
 * then only ever transformed, so it costs a composite and nothing else. It is
 * dropped completely on `lite` devices.
 */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")"

export function Grain() {
  const { still, lite } = useMotionPrefs()
  if (still || lite) return null

  return (
    <div
      aria-hidden="true"
      className="grain-layer pointer-events-none fixed inset-0 z-[90] opacity-[0.035]"
      style={{ backgroundImage: NOISE, backgroundSize: '160px 160px' }}
    />
  )
}

/**
 * A single warm pool of light behind the page that slides down and across as
 * you scroll — as if the room has one window and you are walking past it.
 */
export function AmbientLight() {
  const { still, lite } = useMotionPrefs()
  const { scrollYProgress } = useScroll()
  const eased = useSpring(scrollYProgress, { stiffness: 40, damping: 22, mass: 0.6 })

  const y = useTransform(eased, [0, 1], ['-6vh', '46vh'])
  const x = useTransform(eased, [0, 0.5, 1], ['-8vw', '12vw', '-4vw'])
  const scale = useTransform(eased, [0, 0.5, 1], [1, 1.35, 1.1])

  if (still || lite) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x, y, scale }}
        className="absolute top-0 left-1/2 h-[62vh] w-[62vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,162,39,0.16),rgba(217,162,39,0)_68%)] blur-3xl"
      />
    </div>
  )
}
