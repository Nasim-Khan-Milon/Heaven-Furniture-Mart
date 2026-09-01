import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionPrefs } from './MotionProvider'

/**
 * Words light up one at a time as the passage crosses the screen, so reading
 * pace and scroll pace are the same thing. Reserved for the managing director's
 * quote — it is the one piece of copy on the page worth slowing a visitor down
 * for, and it earns the effect precisely because nothing else uses it.
 *
 * Each word is its own component so it can own a hook. Mapping hooks over an
 * array inside the parent would break the moment the language toggle changed
 * the word count mid-session; a component per word remounts cleanly instead.
 */

function LitWord({ progress, start, end, children }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  const color = useTransform(progress, [start, end], ['#8a7a67', '#241c15'])
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}
    </motion.span>
  )
}

export default function LitText({ text, className = '' }) {
  const ref = useRef(null)
  const { still } = useMotionPrefs()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.86', 'end 0.42'],
  })

  const words = String(text ?? '').split(' ')

  if (still) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = Math.min(start + 1.6 / words.length, 1)
        return (
          <span key={`${word}-${i}`}>
            <LitWord progress={scrollYProgress} start={start} end={end}>
              {word}
            </LitWord>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </p>
  )
}
