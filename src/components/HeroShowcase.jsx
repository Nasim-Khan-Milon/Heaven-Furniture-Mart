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
    const timer = setInterval(() => setIndex((i) => (i + 1) % heroPieces.length), HOLD)
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
            exit={still ? {} : { opacity: 0, scaleX: 0.6 }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
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
