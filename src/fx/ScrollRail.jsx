import { motion, useScroll, useSpring } from 'framer-motion'
import { SCROLL_SPRING } from './config'
import { useMotionPrefs } from './MotionProvider'

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
