import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { heroPieces } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

const HOLD = 3600

const EASE = [0.22, 1, 0.36, 1]

/**
 * Cut-out pieces rotate through the arch: each one rises in as the previous
 * drops away, so the hero shows the range rather than a single bed.
 */
export default function HeroShowcase() {
  const { t, lang } = useLang()
  const still = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (still || paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroPieces.length), HOLD)
    return () => clearInterval(timer)
  }, [still, paused])

  const piece = heroPieces[index]

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* the arch is now a lit alcove the pieces stand inside */}
      <div className="arch relative flex aspect-[9/10] w-full items-end justify-center overflow-hidden bg-gradient-to-b from-linen via-linen to-sand">
        <div
          aria-hidden="true"
          className="absolute top-[8%] left-1/2 h-[62%] w-[78%] -translate-x-1/2 rounded-full bg-ivory/70 blur-3xl"
        />
        {/* floor line */}
        <div aria-hidden="true" className="absolute bottom-[18%] h-px w-[78%] bg-walnut/15" />

        <AnimatePresence mode="wait">
          <motion.img
            key={piece.id}
            src={piece.image}
            alt={t(piece.alt)}
            width={piece.w}
            height={piece.h}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            className="relative mb-[15%] max-h-[62%] w-[92%] max-w-none object-contain drop-shadow-[0_28px_28px_rgba(36,28,21,0.18)]"
            initial={still ? false : { opacity: 0, y: 34, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? {} : { opacity: 0, y: -22, scale: 0.97 }}
            transition={{ duration: 0.75, ease: EASE }}
          />
        </AnimatePresence>
      </div>

      {/* caption + progress dots */}
      <div className="mt-4 flex items-start justify-between gap-4 pl-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={piece.id + lang}
            initial={still ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="max-w-xs text-[0.85rem] leading-relaxed text-walnut/65"
          >
            {t(piece.caption)}
          </motion.p>
        </AnimatePresence>

        <div className="flex shrink-0 items-center gap-2 pt-1">
          {heroPieces.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t(item.alt)}
              aria-current={i === index}
              className="group p-1"
            >
              <span
                className={`block h-[6px] rounded-full transition-all duration-500 ${
                  i === index ? 'w-6 bg-gold-deep' : 'w-[6px] bg-walnut/30 group-hover:bg-walnut/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
