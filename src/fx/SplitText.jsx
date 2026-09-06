import { motion } from 'framer-motion'
import { EASE, WORD_STAGGER } from './config'
import { useMotionPrefs } from './MotionProvider'

export default function SplitText({
  text,
  as = 'span',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = WORD_STAGGER,

  trigger = 'view',

  play = true,
  amount = 0.55,
  once = true,
  rotate = 3,
  duration = 0.9,
}) {
  const { still } = useMotionPrefs()
  const Tag = motion[as] ?? motion.span
  const words = String(text ?? '').split(/(\s+)/)

  if (still || trigger === false) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  let i = -1

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(trigger === 'now'
        ? { animate: play ? 'shown' : 'hidden' }
        : { whileInView: 'shown', viewport: { once, amount } })}
    >
      {words.map((token, key) => {
        if (!token.trim()) return <span key={key}> </span>
        i += 1
        const step = i
        return (
          <span
            key={key}
            className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
          >
            <motion.span
              className={`inline-block will-change-transform ${wordClassName}`}
              variants={{
                hidden: { y: '108%', rotate, opacity: 0 },
                shown: {
                  y: '0%',
                  rotate: 0,
                  opacity: 1,
                  transition: { duration, delay: delay + step * stagger, ease: EASE },
                },
              }}
            >
              {token}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
