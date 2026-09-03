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

/**
 * Every photograph on the page arrives the same way, in four overlapping moves:
 *
 *   1. a curtain lifts the frame open from the bottom edge,
 *   2. the photograph inside settles back from a slight over-zoom,
 *   3. a low sweep of light crosses it once, and
 *   4. from then on it drifts against the scroll, slower than its own frame.
 *
 * The drift is the part that does the real work. A photo pinned to its frame
 * reads as a sticker; a photo that lags behind its frame reads as something
 * seen through an opening.
 *
 * POSITIONING — the drift is applied to a wrapper that is *scaled up* and
 * pinned to `inset-0`, never to an image offset by a negative percentage top.
 * A percentage `top` resolves against the containing block's height, but a
 * percentage `margin` resolves against its *width*; mixing the two is what
 * makes a frame render at the right size with the photograph sitting off its
 * centre. Overscan is `1 + drift/50`, so the travel can never expose an edge
 * however far the frame is driven.
 *
 * The intersection observer deliberately sits on the *outer* wrapper. Chromium
 * folds an element's own clip-path into its intersection ratio, so observing
 * the clipped node directly would leave it hidden at 0% forever.
 */
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
  /** Drift distance as a percentage of the frame's own height. */
  drift = 7,
  zoom = 1.13,
  delay = 0,
  sheen = true,
  /** Which part of the photograph to keep when the crop is tight. */
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

  // Enough overscan that the drift never pulls an edge into frame.
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
            {/*
              `frameClassName` lands on this plain div rather than on the image.
              Framer writes an inline `transform` onto anything it animates, and
              an inline transform beats a Tailwind utility class — so a
              `group-hover:scale-*` applied to the image itself silently does
              nothing. Giving the hover its own untouched layer is what makes it
              work at all.
            */}
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
