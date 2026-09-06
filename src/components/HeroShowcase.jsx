import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { heroPieces } from '../data/site'
import { localiseNumber, useLang } from '../i18n/LanguageContext'
import { EASE, useMotionPrefs } from '../fx'

const HOLD = 5000
const COUNT = heroPieces.length
const pad = (n) => String(n + 1).padStart(2, '0')

function Chevron({ back = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d={back ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroShowcase({ play = true }) {
  const { t, lang } = useLang()
  const { still } = useMotionPrefs()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dir, setDir] = useState(1)

  const go = useCallback((step) => {
    setDir(step)
    setIndex((i) => (i + step + COUNT) % COUNT)
  }, [])

  useEffect(() => {
    if (still || paused || !play) return
    const timer = setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % COUNT)
    }, HOLD)
    return () => clearInterval(timer)
  }, [still, paused, play])

  const piece = heroPieces[index]
  const shift = still ? 0 : 34 * dir

  return (
    <div
      className="relative flex h-full flex-col justify-end"
      aria-roledescription="carousel"
      aria-label={t('heroCarousel')}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[13.5rem] w-full sm:h-[17rem] lg:h-[20.5rem] xl:h-[22.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`shadow-${piece.id}`}
            aria-hidden="true"
            className="absolute bottom-[-0.35rem] left-1/2 h-[1.15rem] w-[62%] -translate-x-1/2 rounded-[50%] bg-[var(--color-deep-brown)]/25 blur-lg"
            initial={still ? false : { opacity: 0, scaleX: 0.55 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={still ? {} : { opacity: 0, scaleX: 0.7 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={piece.id}
            src={piece.image}
            alt={t(piece.alt)}
            width={piece.w}
            height={piece.h}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            draggable="false"
            className="h-full w-full object-contain object-bottom drop-shadow-[0_22px_26px_rgba(20,15,10,0.35)]"
            initial={still ? false : { opacity: 0, x: shift, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={still ? {} : { opacity: 0, x: -shift, scale: 0.97 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </AnimatePresence>
      </div>

      {/* Caption bar — set against the charcoal-teal panel now, so text goes light with a wood-tan accent */}
      <div className="mt-5 flex items-end justify-between gap-5 lg:mt-7">
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={piece.id + lang}
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              <p
                className={`truncate font-display font-semibold text-[var(--color-wood-tan)] ${
                  lang === 'bn' ? 'text-[0.8rem]' : 'text-[0.72rem] tracking-[0.16em] uppercase'
                }`}
              >
                {t(piece.room)} · {piece.ref}
              </p>
              <h2 className="mt-1.5 truncate font-display text-[1.15rem] leading-tight font-extrabold text-ivory sm:text-[1.35rem]">
                {t(piece.name)}
              </h2>
              <p className="mt-1 text-[0.85rem] leading-snug text-ivory/75">
                {t('heroPriceNote')}
              </p>
            </motion.div>
          </AnimatePresence>
          <p className="sr-only" aria-live="polite">
            {`${localiseNumber(pad(index), lang)} / ${localiseNumber(pad(COUNT - 1), lang)} — ${t(piece.name)}. ${t(piece.caption)}`}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <p className="hidden items-baseline font-display font-extrabold text-ivory/20 sm:flex">
            <span className="text-[2.6rem] leading-none tabular-nums">
              {localiseNumber(pad(index), lang)}
            </span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t('heroPrev')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:bg-[var(--color-brass)] hover:text-[var(--color-charcoal-teal-deep)]"
            >
              <Chevron back />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('heroNext')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brass)] text-[var(--color-charcoal-teal-deep)] transition-colors duration-300 hover:bg-[var(--color-brass-soft)]"
            >
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}