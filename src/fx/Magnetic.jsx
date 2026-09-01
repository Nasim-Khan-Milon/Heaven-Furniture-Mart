import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { SPRING } from './config'
import { useMotionPrefs } from './MotionProvider'

/**
 * The primary calls to action lean toward the pointer as it approaches, then
 * settle back when it leaves. Used only on the WhatsApp buttons — if every
 * link on the page did this it would read as a gimmick rather than emphasis.
 *
 * Pointer-only, and the wrapper is display:contents-free (an inline-block span)
 * so it never disturbs the flex and grid layouts the buttons sit inside.
 */
export default function Magnetic({ children, strength = 0.32, className = '' }) {
  const { fine } = useMotionPrefs()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  if (!fine) return <span className={className}>{children}</span>

  const onMove = (event) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    x.set((event.clientX - (box.left + box.width / 2)) * strength)
    y.set((event.clientY - (box.top + box.height / 2)) * strength)
  }

  const release = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  )
}
