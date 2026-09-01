import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { SPRING_TIGHT } from './config'
import { useMotionPrefs } from './MotionProvider'

/**
 * A brass ring that trails the pointer and swells over anything clickable.
 *
 * Two bodies at different spring rates: a hard dot that sits exactly on the
 * pointer, and a ring that lags a frame or two behind it. The lag is the whole
 * effect — it gives the pointer weight, which is the same thing the rest of the
 * page is doing with its easing curves.
 *
 * Never rendered on touch devices or under reduced motion. The real cursor is
 * kept, not hidden, so a visitor whose pointer drifts outside the window or who
 * is tabbing through the page is never left without one.
 */
export default function Cursor() {
  const { fine } = useMotionPrefs()
  const [state, setState] = useState({ active: false, label: '', visible: false })

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 })
  const dotX = useSpring(x, SPRING_TIGHT)
  const dotY = useSpring(y, SPRING_TIGHT)

  useEffect(() => {
    if (!fine) return

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)

      const hit = event.target.closest?.(
        'a, button, [role="button"], input, summary, [data-cursor]',
      )
      setState({
        visible: true,
        active: Boolean(hit),
        label: hit?.dataset?.cursor && hit.dataset.cursor !== 'true' ? hit.dataset.cursor : '',
      })
    }

    const leave = () => setState((s) => ({ ...s, visible: false }))

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [fine, x, y])

  if (!fine) return null

  const { active, label, visible } = state

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-gold"
        style={{ x: ringX, y: ringY, width: 34, height: 34, marginLeft: -17, marginTop: -17 }}
        animate={{
          scale: label ? 2.1 : active ? 1.55 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: active ? 'rgba(217,162,39,0.14)' : 'rgba(217,162,39,0)',
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[0.3rem] tracking-[0.1em] text-gold-deep"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 rounded-full bg-gold"
        style={{ x: dotX, y: dotY, width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5 }}
        animate={{ opacity: visible && !active ? 1 : 0, scale: active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
