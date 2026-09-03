import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useMotionPrefs } from './MotionProvider'

/**
 * A number that counts up once, when it is first read.
 *
 * Eased rather than linear — a linear counter hits its target and stops dead,
 * which reads as a progress bar. This one decelerates into place like every
 * other piece of motion on the page.
 *
 * Written to a `<span>` with `tabular-nums` so the digits do not reflow the
 * line as they change; a counter that shifts its own layout on every frame is
 * worse than no counter.
 */
export default function Counter({ to, duration = 1.9, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const { still } = useMotionPrefs()
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(still ? to : 0)

  useEffect(() => {
    if (still || !inView) return
    let frame
    const started = performance.now()
    const tick = (now) => {
      const p = Math.min((now - started) / (duration * 1000), 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, still, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
