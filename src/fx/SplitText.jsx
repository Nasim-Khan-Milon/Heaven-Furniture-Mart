import { motion } from 'framer-motion'
import { EASE, WORD_STAGGER } from './config'
import { useMotionPrefs } from './MotionProvider'

/**
 * Headlines assemble word by word out of a mask, rather than fading in whole.
 *
 * Split by *word*, never by character. Bangla builds conjuncts and vowel signs
 * across several code points — যুক্তাক্ষর like ক্ষ or a matra like ি belong to
 * the cluster beside them, and slicing the string into characters would scatter
 * them into separate boxes. Word boundaries are the smallest unit that is safe
 * in both scripts.
 *
 * The mask is an overflow-hidden box per word. Descenders and Bangla matras sit
 * below the baseline, so the box is padded and the padding pulled back off with
 * a negative margin — the clip gains room without the layout moving a pixel.
 */
export default function SplitText({
  text,
  as = 'span',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = WORD_STAGGER,
  /** 'view' waits for scroll, 'now' plays immediately, false holds it still. */
  trigger = 'view',
  /** With trigger='now', holds the words in their masks until this flips true. */
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

  // Whitespace tokens are kept in the array so multiple spaces survive; only
  // real words get a mask and an index in the stagger.
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
