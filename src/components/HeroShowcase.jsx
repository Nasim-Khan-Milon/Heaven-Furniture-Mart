import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { heroPieces } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { EASE, SPRING_SOFT, useMotionPrefs } from '../fx'

const HOLD = 4200

/**
 * The arch is a lit alcove and the pieces are standing in it.
 *
 * FLOOR ANCHORING — the five cut-outs have nothing in common dimensionally: a
 * bed is 861×421, a vanity is 557×642. Sizing each one by width and clamping
 * it with a max-height leaves every piece resting at a different level, which
 * is what makes a cut-out read as a sticker pasted on top rather than an
 * object standing in a room. Instead each piece gets the *same* box — pinned
 * from the alcove's top inset down to the floor line — and sits in it with
 * `object-contain object-bottom`. Whatever its proportions, its feet land on
 * the floor and its shadow is underneath it.
 *
 * DEPTH — the alcove is a real 3D space. Moving the pointer across it yaws the
 * whole box a few degrees, and the piece inside sits forward of the backdrop on
 * its own Z plane, so it swings further than the wall behind it. Each piece
 * arrives rotated away from the viewer and turns to face front, the way
 * something is set down rather than the way a slide changes.
 *
 * Rotation pauses on hover and focus, and the dots are real buttons.
 */
export default function HeroShowcase({ play = true }) {
  const { t, lang } = useLang()
  const { still, fine } = useMotionPrefs()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), SPRING_SOFT)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), SPRING_SOFT)

  useEffect(() => {
    if (still || paused || !play) return
    const timer = setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % COUNT)
    }, HOLD)
    return () => clearInterval(timer)
  }, [still, paused, play])

  const piece = heroPieces[index]

  const track = (event) => {
    if (!fine) return
    const box = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - box.left) / box.width - 0.5)
    py.set((event.clientY - box.top) / box.height - 0.5)
  }

  const release = () => {
    px.set(0)
    py.set(0)
    setPaused(false)
  }

  return (
    <div
      className="relative"
      style={{ perspective: 1200 }}
      onPointerMove={track}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={release}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <motion.div
        style={fine && !still ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className="arch relative aspect-[9/10] w-full overflow-hidden bg-gradient-to-b from-linen via-linen to-sand"
      >
        {/*
          The alcove is a stack of planes at real depths, not a flat backdrop
          with a photograph on it. Yawing the box moves each plane by a
          different amount — the light furthest back barely shifts, the piece
          swings, the sill in front leads. That difference *is* the depth cue;
          a single plane rotating is just a picture leaning over.
        */}

        {/* the light, deepest of all, breathing very slowly */}
        <motion.div
          aria-hidden="true"
          className="absolute top-[8%] left-1/2 h-[62%] w-[78%] -translate-x-1/2 rounded-full bg-ivory/70 blur-3xl"
          style={{ transform: 'translate(-50%,0) translateZ(-110px)' }}
          animate={still ? {} : { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* the back wall of the alcove */}
        <div
          aria-hidden="true"
          className="absolute bottom-[18%] left-[11%] h-px w-[78%] bg-walnut/15"
          style={{ transform: 'translateZ(-40px)' }}
        />

        {/* contact shadow, keyed to the piece and a beat behind it */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`shadow-${piece.id}`}
            aria-hidden="true"
            className="absolute bottom-[16.5%] left-1/2 h-[3.5%] w-[52%] -translate-x-1/2 rounded-[50%] bg-walnut/25 blur-md"
            initial={still ? false : { opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={still ? {} : { opacity: 0, scaleX: 0.7 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          />
        </AnimatePresence>

        {/* Every piece gets this same box, so every piece stands on the floor. */}
        <div
          className="absolute top-[13%] right-[4%] bottom-[18%] left-[4%]"
          style={{ transform: 'translateZ(55px)', transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={piece.id}
              src={piece.image}
              alt={t(piece.alt)}
              width={piece.w}
              height={piece.h}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              className="h-full w-full object-contain object-bottom drop-shadow-[0_28px_28px_rgba(36,28,21,0.18)]"
              initial={still ? false : { opacity: 0, y: 40, scale: 0.92, rotateY: -22 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              exit={still ? {} : { opacity: 0, y: -22, scale: 0.96, rotateY: 18 }}
              transition={{ duration: 0.95, ease: EASE }}
              style={{ transformPerspective: 1000 }}
            />
          </AnimatePresence>
        </div>
        {/* the sill, nearest the viewer, so there is something in front of
            the piece for it to move against */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[13%] bg-gradient-to-t from-sand/80 to-transparent"
          style={{ transform: 'translateZ(95px)' }}
        />
      </motion.div>

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