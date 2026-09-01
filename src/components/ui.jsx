import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/* ---------------------------------------------------------------- reveals */

/** Quiet text entrance. Used once per section, not on every element. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const still = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={still ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

/**
 * Images rise into view behind a curtain rather than fading up — it reads like
 * a piece being uncovered in the showroom.
 */
export function Unveil({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const still = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const shown = still || inView

  // The observer sits on the outer wrapper on purpose: Chromium factors an
  // element's own clip-path into its intersection ratio, so observing the
  // clipped node directly would leave it permanently hidden.
  return (
    <div ref={ref} className={className}>
      <div
        className="h-full w-full"
        style={{
          clipPath: shown ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          transition: still ? 'none' : `clip-path 1s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- 3D */

/**
 * Pointer-driven 3D tilt. Only arms itself on devices with a real hover
 * pointer, so a tap on mobile never leaves a card stuck at an angle.
 */
export function Tilt({ children, className = '', max = 9, lift = 14 }) {
  const still = useReducedMotion()
  const [hoverable, setHoverable] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const spring = { stiffness: 170, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring)
  const z = useSpring(useMotionValue(0), spring)

  useEffect(() => {
    setHoverable(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  if (still || !hoverable) return <div className={className}>{children}</div>

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
      onPointerEnter={() => z.set(lift)}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
        z.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------ arch frames */

const shapes = {
  full: 'arch',
  soft: 'arch-soft',
  low: 'arch-low',
}

/**
 * The arch motif: borrowed from the crowns of Heaven's display cabinets and
 * the curved headboards on their beds.
 */
export function ArchImage({
  src,
  alt,
  w,
  h,
  shape = 'soft',
  className = '',
  imgClassName = '',
  priority = false,
}) {
  return (
    <div className={`relative overflow-hidden bg-sand ${shapes[shape]} ${className}`}>
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}

/* ---------------------------------------------------------------- buttons */

const base =
  'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.95rem] font-medium tracking-wide transition-all duration-300 rounded-full'

export function GoldButton({ href, children, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`${base} bg-gold text-forest-deep hover:bg-gold-deep hover:text-ivory ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export function GhostButton({ href, children, dark = false, className = '', ...rest }) {
  const tone = dark
    ? 'border-ivory/35 text-ivory hover:border-gold hover:text-gold'
    : 'border-walnut/30 text-walnut hover:border-ink hover:text-ink'
  return (
    <a href={href} className={`${base} border ${tone} ${className}`} {...rest}>
      {children}
    </a>
  )
}

/* ----------------------------------------------------------------- labels */

/** Small section marker. Sentence case on purpose — no shouty all-caps. */
export function Marker({ children, dark = false, className = '' }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.8rem] font-medium tracking-[0.12em] ${
        dark ? 'text-gold' : 'text-gold-deep'
      } ${className}`}
    >
      <span className="inline-block h-[5px] w-[5px] rotate-45 bg-current" />
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
