import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { heroPieces } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { EASE, useMotionPrefs } from '../fx'

const HOLD = 4200

/**
 * The arch is a lit alcove and the pieces are standing in it.
 *
 * Each piece swings in on a slight 3D rotation rather than sliding, so it reads
 * as an object being set down rather than a slide changing. The contact shadow
 * on the floor is animated separately and slightly behind the piece — that lag
 * is what stops the cut-outs from looking like stickers on a background.
 *
 * The rotation pauses on hover and on focus, and the dots are real buttons, so
 * the range is reachable without waiting four seconds a piece.
 */
export default function HeroShowcase({ play = true }) {
  const { t, lang } = useLang()
  const { still } = useMotionPrefs()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (still || paused || !play) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroPieces.length), HOLD)
    return () => clearInterval(timer)
  }, [still, paused, play])

  const piece = heroPieces[index]

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="arch relative flex aspect-[9/10] w-full items-end justify-center overflow-hidden bg-gradient-to-b from-linen via-linen to-sand">
        {/* the light in the alcove, breathing very slowly */}
        <motion.div
          aria-hidden="true"
          className="absolute top-[8%] left-1/2 h-[62%] w-[78%] -translate-x-1/2 rounded-full bg-ivory/70 blur-3xl"
          animate={still ? {} : { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div aria-hidden="true" className="absolute bottom-[18%] h-px w-[78%] bg-walnut/15" />

        {/* contact shadow, keyed to the piece and a beat behind it */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`shadow-${piece.id}`}
            aria-hidden="true"
            className="absolute bottom-[16.5%] h-[3.5%] w-[52%] rounded-[50%] bg-walnut/25 blur-md"
            initial={still ? false : { opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={still ? {} : { opacity: 0, scaleX: 0.6 }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          />
        </AnimatePresence>

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
            initial={still ? false : { opacity: 0, y: 46, scale: 0.9, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={still ? {} : { opacity: 0, y: -26, scale: 0.96, rotateX: -8 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformPerspective: 900 }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 pl-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={piece.id + lang}
            initial={still ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="max-w-xs text-[0.85rem] leading-relaxed text-walnut/65"
          >
            {t(piece.caption)}
          </motion.p>
        </AnimatePresence>

        <div className="flex shrink-0 items-center gap-2 pt-1">
          {heroPieces.map((item, i) => {
            const active = i === index
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t(item.alt)}
                aria-current={active}
                className="group p-1"
              >
                <span
                  className={`relative block h-[6px] overflow-hidden rounded-full transition-all duration-500 ${
                    active ? 'w-7 bg-walnut/20' : 'w-[6px] bg-walnut/30 group-hover:bg-walnut/60'
                  }`}
                >
                  {/* the active dot fills over the hold, so the rotation is
                      visible rather than surprising */}
                  {active && (
                    <motion.span
                      key={`fill-${index}-${paused}`}
                      className="absolute inset-0 block origin-left rounded-full bg-gold-deep"
                      initial={{ scaleX: still ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: still || paused || !play ? 0 : HOLD / 1000,
                        ease: 'linear',
                      }}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
