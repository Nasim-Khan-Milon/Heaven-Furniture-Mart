import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { useMotionPrefs } from '../fx'

const DRAW = { duration: 1.05, ease: [0.65, 0, 0.35, 1] }

export default function MeasureOverlay({ start = 1.5, play = true }) {
  const { t, lang } = useLang()
  const { still } = useMotionPrefs()

  const draw = (delay, duration = DRAW.duration) => ({
    initial: still ? false : { pathLength: 0, opacity: 0 },
    animate: play ? { pathLength: 1, opacity: 1 } : {},
    transition: { duration, ease: DRAW.ease, delay: start + delay },
  })

  const fade = (delay) => ({
    initial: still ? false : { opacity: 0 },
    animate: play ? { opacity: 1 } : {},
    transition: { duration: 0.45, delay: start + delay },
  })

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <g
        stroke="var(--color-gold)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <motion.path d="M54 400 V 430" {...draw(0, 0.4)} />
        <motion.path d="M346 400 V 430" {...draw(0.06, 0.4)} />

        <motion.path d="M200 415 H 54" {...draw(0.22, 0.7)} />
        <motion.path d="M200 415 H 346" {...draw(0.22, 0.7)} />
        <motion.path d="M54 415 l 8 -3.5 M54 415 l 8 3.5" {...draw(0.85, 0.3)} />
        <motion.path d="M346 415 l -8 -3.5 M346 415 l -8 3.5" {...draw(0.85, 0.3)} />

              </g>

      <motion.g {...fade(0.75)}>
        <rect x={lang === "bn" ? 154 : 169} y="406" width={lang === "bn" ? 92 : 62} height="18" rx="2" fill="var(--color-ivory)" />
        <text
          x="200"
          y="418.5"
          textAnchor="middle"
          fill="var(--color-forest)"
          fontSize="10.5"
          fontFamily="var(--font-sans)"
          letterSpacing="0.8"
        >
          {t('heroMeasureLabel')}
        </text>
      </motion.g>
    </svg>
  )
}
