import { motion, useScroll, useSpring } from 'framer-motion'
import { SCROLL_SPRING } from './config'
import { useMotionPrefs } from './MotionProvider'

/**
 * A brass hairline across the very top that fills as the page is read.
 *
 * This page is long and has one job at the end of it, so telling someone how
 * much is left is a courtesy, not decoration. Spring-smoothed, because the raw
 * scroll value judders against Lenis's own interpolation.
 */
export default function ScrollRail() {
  const { still } = useMotionPrefs()
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, SCROLL_SPRING)

  if (still) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-deep"
    />
  )
}
