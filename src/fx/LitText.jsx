import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionPrefs } from './MotionProvider'

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
