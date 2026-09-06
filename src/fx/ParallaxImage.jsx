import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASE, EASE_INOUT } from './config'
import { useMotionPrefs } from './MotionProvider'

const SHAPES = {
  full: 'arch',
  soft: 'arch-soft',
  low: 'arch-low',
  square: 'rounded-2xl',
}

export default function ParallaxImage({
  src,
  alt,
  w,
  h,
  shape = 'soft',
  className = '',
  imgClassName = '',
  frameClassName = '',
  priority = false,

  drift = 7,
  zoom = 1.13,
  delay = 0,
  sheen = true,

  focus = 'center',
}) {
  const outer = useRef(null)
  const { still } = useMotionPrefs()
  const shown = useInView(outer, { once: true, amount: 0.2 })
  const open = still || shown

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`])

  const overscan = 1 + drift / 50

  return (
    <div ref={outer} className={className}>
      <div
        className="h-full w-full"
        style={{
          clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          transition: still ? 'none' : `clip-path 1.15s cubic-bezier(0.65,0,0.35,1) ${delay}s`,
        }}
      >
        <div className={`relative h-full w-full overflow-hidden bg-sand ${SHAPES[shape]}`}>
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={still ? undefined : { y, scale: overscan }}
          >
            <div className={`h-full w-full ${frameClassName}`}>
              <motion.img
                src={src}
                alt={alt}
                width={w}
                height={h}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
                className={`h-full w-full object-cover ${imgClassName}`}
                style={{ objectPosition: focus }}
                initial={still ? false : { scale: zoom }}
                animate={open ? { scale: 1 } : { scale: zoom }}
                transition={{ duration: 1.5, delay: delay + 0.1, ease: EASE }}
              />
            </div>
          </motion.div>

          {sheen && !still && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-14deg] bg-gradient-to-r from-transparent via-ivory/28 to-transparent"
              initial={{ x: '0%', opacity: 0 }}
              animate={open ? { x: '420%', opacity: [0, 1, 0] } : {}}
              transition={{ duration: 1.5, delay: delay + 0.45, ease: EASE_INOUT }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
