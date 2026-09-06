import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useMotionPrefs } from './MotionProvider'

const wrap = (min, max, value) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

export default function VelocityMarquee({ children, baseSpeed = 2.4, className = '' }) {
  const { still, lite } = useMotionPrefs()
  const baseX = useMotionValue(0)
  const direction = useRef(1)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 48, stiffness: 380 })
  const factor = useTransform(smooth, [0, 1200], [0, 4.5], { clamp: false })

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (still || lite) return
    let move = direction.current * baseSpeed * (delta / 1000)
    const pull = factor.get()
    if (pull < 0) direction.current = -1
    else if (pull > 0) direction.current = 1
    move += move * Math.abs(pull)
    baseX.set(baseX.get() + move)
  })

  const run = [0, 1, 2, 3]

  if (still || lite) {
    return (
      <div className={`marquee-track flex w-max items-center ${className}`}>
        {run.map((i) => (
          <span key={i} className="flex items-center">
            {children}
          </span>
        ))}
      </div>
    )
  }

  return (
    <motion.div style={{ x }} className={`flex w-max items-center ${className}`}>
      {run.map((i) => (
        <span key={i} className="flex items-center">
          {children}
        </span>
      ))}
    </motion.div>
  )
}
