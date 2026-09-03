import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from '../fx/Reveal'
import ParallaxImage from '../fx/ParallaxImage'
import Magnetic from '../fx/Magnetic'
import { useMotionPrefs } from '../fx/MotionProvider'
import { SPRING } from '../fx/config'

/* --------------------------------------------------------------- reveals */

export { Reveal, Stagger, StaggerItem }

/**
 * Kept for the handful of places that wrap something other than a photograph
 * in the curtain — a map panel, a bordered card. Photographs should use
 * ParallaxImage, which does this plus the drift and the light sweep.
 *
 * The observer sits on the outer wrapper because Chromium factors an element's
 * own clip-path into its intersection ratio; observing the clipped node would
 * leave it stuck at zero and permanently hidden.
 */
export function Unveil({ children, delay = 0, className = '' }) {
  const { still } = useMotionPrefs()
  const [shown, setShown] = useState(false)
  const [node, setNode] = useState(null)

  useEffect(() => {
    if (!node || still) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, still])

  const open = still || shown

  return (
    <div ref={setNode} className={className}>
      <div
        className="h-full w-full"
        style={{
          clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          transition: still ? 'none' : `clip-path 1.1s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- 3D */

/**
 * Pointer-driven tilt with a specular highlight that tracks the pointer, so a
 * card catches light the way a polished surface would rather than just leaning.
 */
export function Tilt({ children, className = '', max = 9, lift = 14, glare = true }) {
  const { fine } = useMotionPrefs()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), SPRING)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), SPRING)
  const z = useSpring(useMotionValue(0), SPRING)

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useSpring(useMotionValue(0), SPRING)

  if (!fine) return <div className={className}>{children}</div>

  const onMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - box.left) / box.width - 0.5)
    y.set((event.clientY - box.top) / box.height - 0.5)
  }

  return (
    <div
      className={className}
      style={{ perspective: 1000 }}
      onPointerMove={onMove}
      onPointerEnter={() => {
        z.set(lift)
        glareOpacity.set(1)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
        z.set(0)
        glareOpacity.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            style={{
              opacity: glareOpacity,
              background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(217,162,39,0.22), transparent 58%)',
              '--gx': glareX,
              '--gy': glareY,
            }}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
          />
        )}
      </motion.div>
    </div>
  )
}

/**
 * A child of `Tilt` that sits forward of, or behind, the card's own surface.
 *
 * A tilt on its own is a flat rectangle being rotated — convincing for about
 * half a second. What sells it as depth is *parallax between its parts*: when
 * the number and the heading sit 30–50px in front of the panel they slide
 * across it as the card turns, which is the cue the eye actually reads as
 * three-dimensional.
 *
 * Harmless outside a perspective context — `translateZ` with no perspective
 * ancestor resolves to no visual change — so it is safe on touch, where `Tilt`
 * renders a plain div.
 */
export function Layer({ z = 0, children, className = '' }) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------ arch frames */

/**
 * The arch motif: taken from the crowns of Heaven's display cabinets and the
 * curved headboards on their beds. Delegates to ParallaxImage so every framed
 * photograph on the page reveals and drifts identically.
 */
export function ArchImage({
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
  delay = 0,
}) {
  return (
    <ParallaxImage
      src={src}
      alt={alt}
      w={w}
      h={h}
      shape={shape}
      className={className}
      imgClassName={imgClassName}
      frameClassName={frameClassName}
      priority={priority}
      drift={drift}
      delay={delay}
    />
  )
}

/* ---------------------------------------------------------------- buttons */

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-wide transition-colors duration-500'

/** The wipe that fills a button from its lower edge on hover. */
function Fill({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${className}`}
    />
  )
}

export function GoldButton({ href, children, className = '', magnetic = false, ...rest }) {
  const button = (
    <a
      href={href}
      className={`${base} bg-gold text-forest-deep hover:text-ivory ${className}`}
      {...rest}
    >
      <Fill className="bg-gold-deep" />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </a>
  )
  return magnetic ? <Magnetic>{button}</Magnetic> : button
}

export function GhostButton({ href, children, dark = false, className = '', magnetic = false, ...rest }) {
  const tone = dark
    ? 'border-ivory/35 text-ivory hover:text-forest-deep'
    : 'border-walnut/30 text-walnut hover:text-ivory'
  const button = (
    <a href={href} className={`${base} border ${tone} ${className}`} {...rest}>
      <Fill className={dark ? 'bg-gold' : 'bg-forest'} />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </a>
  )
  return magnetic ? <Magnetic>{button}</Magnetic> : button
}

/* ----------------------------------------------------------------- labels */

/** Small section marker. Sentence case on purpose — no shouty all-caps. */
export function Marker({ children, dark = false, className = '' }) {
  const { still } = useMotionPrefs()
  return (
    <p
      className={`flex items-center gap-3 text-[0.8rem] font-medium tracking-[0.12em] ${
        dark ? 'text-gold' : 'text-gold-deep'
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="inline-block h-[5px] w-[5px] bg-current"
        initial={still ? false : { rotate: 0, scale: 0 }}
        whileInView={{ rotate: 45, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------ icons */

export function WhatsAppIcon({ className = 'h-[1.05em] w-[1.05em]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.16 1.73 2.64 4.2 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

export function MessengerIcon({ className = 'h-[1.05em] w-[1.05em]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.3 2 2 6.2 2 11.8c0 3.2 1.4 6 3.7 7.8v3.8l3.4-1.9c.9.25 1.9.4 2.9.4 5.7 0 10-4.2 10-9.8S17.7 2 12 2Zm1 13.2-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7Z" />
    </svg>
  )
}

export function ArrowIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
