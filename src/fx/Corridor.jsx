import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SCROLL_SPRING } from './config'
import ParallaxImage from './ParallaxImage'
import { Reveal } from './Reveal'
import { useMotionPrefs } from './MotionProvider'

<<<<<<< HEAD
/**
 * A real three-dimensional corridor you walk down by scrolling.
 *
 * The page's whole argument is that Heaven builds furniture into a *room*, so
 * one section should be a room rather than a picture of one. Panels hang on
 * alternating walls at fixed depths; scrolling drives the camera forward past
 * them. Everything is a `translateZ` inside one `preserve-3d` stage, so the
 * browser composites it on the GPU and the whole thing costs a transform per
 * frame — no WebGL context, no geometry, no new dependency.
 *
 * Why CSS 3D and not three.js: a WebGL scene here would add roughly 150 KB
 * gzipped to a page whose brief is explicitly scored on being fast, and it
 * would need furniture *models* — Heaven has photographs. Photographs on
 * planes in perspective is the honest version of this effect, and it is the
 * version that survives a mid-range Android.
 *
 * DEPTH MATH — panel `i` sits at `z = -i * GAP`. The camera travels
 * `count * GAP` over the section's scroll, so panel `i` crosses the camera
 * plane at progress `i / count`. Opacity is derived from each panel's own
 * live z rather than from progress, which keeps a panel's fade tied to where
 * it actually is in space even when the spring is still catching up.
 *
 * SCROLL COST — 56vh of travel per frame, not the 78vh it started at. The
 * camera covers `count * GAP` regardless, so a shorter section simply moves
 * the viewer down the corridor faster; what it buys back is a page that does
 * not spend a fifth of its total length on one effect.
 *
 * Below `lg`, and under reduced motion, this becomes a plain stacked column.
 * Deep perspective on a phone fights the address bar, costs fill rate, and
 * the payoff needs a wide viewport to read at all.
 */

const GAP = 700

/**
 * Alternating wall placement — right, left, right, left, then dead ahead.
 *
 * The offsets are in `vw`, not `%`. A percentage on `translateX` resolves
 * against the *element's own width*, so `34%` of a 374px frame moved a panel
 * 127px — not far enough to clear the frame in front of it, which left the
 * corridor looking like a single photograph in the dark. Viewport units are
 * what "hangs on the far wall" actually means here.
 *
 * The last panel sits dead ahead: the corridor has to arrive somewhere.
 */
=======
const GAP = 700

>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
const PLACEMENTS = [
  { x: '27vw', rotateY: -34, wall: 'right' },
  { x: '-27vw', rotateY: 34, wall: 'left' },
  { x: '25vw', rotateY: -30, wall: 'right' },
  { x: '-25vw', rotateY: 30, wall: 'left' },
  { x: '0vw', rotateY: 0, wall: 'centre' },
]

function Panel({ panel, index, count, progress, label }) {
  const place = PLACEMENTS[index % PLACEMENTS.length]

<<<<<<< HEAD
  // Live depth of this panel, in px, relative to the camera plane.
  //
  // LEAD holds the first frame a little way off at the start, so the corridor
  // opens with something approaching rather than something already arrived.
  // TRAVEL then stops the camera just as the last frame reaches it — driving
  // the full `count * GAP` overshot the end and left the final half-screen of
  // the section showing an empty corridor.
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
  const lead = GAP * 0.6
  const travel = (count - 1) * GAP + lead + GAP * 0.05
  const z = useTransform(progress, [0, 1], [-index * GAP - lead, -index * GAP - lead + travel])

<<<<<<< HEAD
  // Fades up out of the dark, holds through the walk-past, gone once behind.
  // The band is deliberately wider than one gap: with three frames alive at
  // once the section reads as a corridor with depth, and with one it reads as
  // a slideshow that happens to be dark.
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
  const opacity = useTransform(
    z,
    [-GAP * 2.7, -GAP * 1.5, GAP * 0.04, GAP * 0.34],
    [0, 1, 1, 0],
  )

  return (
    <motion.figure
      style={{
        z,
        opacity,
        x: place.x,
        rotateY: place.rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="absolute top-1/2 left-1/2 w-[clamp(18rem,26vw,26rem)] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="arch-soft relative aspect-[3/4] w-full overflow-hidden bg-forest-soft shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
        <img
          src={panel.src}
          alt={label}
          width={panel.w}
          height={panel.h}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
<<<<<<< HEAD
        {/* the wall each panel hangs on is lit from the corridor's centre */}
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            place.wall === 'right'
              ? 'bg-gradient-to-l from-forest-deep/70 via-transparent to-transparent'
              : place.wall === 'left'
                ? 'bg-gradient-to-r from-forest-deep/70 via-transparent to-transparent'
                : 'bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent'
          }`}
        />
<<<<<<< HEAD
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/85 to-transparent px-5 pt-10 pb-4 text-[0.8rem] leading-snug text-ivory/80">
=======
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/85 to-transparent px-5 pt-10 pb-4 text-[0.86rem] leading-snug text-ivory/88">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
          {label}
        </span>
      </div>

<<<<<<< HEAD
      {/* a brass hairline under each frame, like a picture rail */}
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
      <div aria-hidden="true" className="mx-auto mt-4 h-px w-2/3 bg-gold/40" />
    </motion.figure>
  )
}

<<<<<<< HEAD
/**
 * The 3D rail, as its own component.
 *
 * This split is load-bearing, not tidiness. `useScroll({ target })` subscribes
 * once, on mount, to whatever the ref points at — and it does not re-subscribe
 * when that ref is populated later, because the ref object's identity never
 * changes. Keeping the hook in the parent meant it ran on the first render,
 * when the breakpoint check had not yet flipped and the flat column was
 * returned instead, so `wrap.current` was null and progress sat at exactly
 * zero forever. Every panel rendered at its resting depth and the corridor
 * looked plausible while animating nothing at all.
 *
 * Mounting the hook and the element it measures in the same commit is the fix.
 * `Workshop.jsx` already does this with `PinnedRail` — same reason.
 */
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
function DeepCorridor({ panels, labelFor, className }) {
  const wrap = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const eased = useSpring(scrollYProgress, SCROLL_SPRING)

  return (
    <div
      ref={wrap}
      style={{ height: `calc(100vh + ${panels.length * 56}vh)` }}
      className={`relative ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
<<<<<<< HEAD
        {/* ceiling wash — the corridor is lit from above and ahead */}
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[46vh] w-[56vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,162,39,0.16),transparent_70%)] blur-2xl" />
        </div>

        <div className="absolute inset-0" style={{ perspective: 1100, perspectiveOrigin: '50% 48%' }}>
          <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
<<<<<<< HEAD
            {/* Two walls and a floor, all running away from the camera. These
                are what make it a room: without a surface for the frames to
                hang on, panels at different depths read as floating cards.

                The walls stand at 46vw, well outside the 27vw the frames hang
                at. A wall closer than the frames does not sit behind them — in
                a real 3D context the browser sorts by geometry, so the plane
                cuts straight through the photograph and washes half of it
                green. The clearance is the fix. */}
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 h-[104vh] w-[520vh] bg-[linear-gradient(to_top,rgba(12,31,26,0.98)_0%,rgba(30,70,59,0.45)_52%,rgba(30,70,59,0)_100%)]"
              style={{ transform: 'translate(-50%,-50%) translateX(-46vw) rotateY(90deg)' }}
            />
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 h-[104vh] w-[520vh] bg-[linear-gradient(to_top,rgba(12,31,26,0.98)_0%,rgba(30,70,59,0.45)_52%,rgba(30,70,59,0)_100%)]"
              style={{ transform: 'translate(-50%,-50%) translateX(46vw) rotateY(-90deg)' }}
            />
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 h-[520vh] w-[92vw] bg-[linear-gradient(to_top,rgba(12,31,26,0.98),rgba(74,55,40,0.45))]"
              style={{ transform: 'translate(-50%,-50%) translateY(52vh) rotateX(90deg)' }}
            />

            {panels.map((panel, i) => (
              <Panel
                key={panel.src}
                panel={panel}
                index={i}
                count={panels.length}
                progress={eased}
                label={labelFor(panel)}
              />
            ))}
          </div>
        </div>

<<<<<<< HEAD
        {/* vignette, so panels dissolve into the dark rather than clipping */}
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-forest-deep)_92%)]"
        />

<<<<<<< HEAD
        {/* how far down the corridor you are */}
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-[min(38rem,70vw)] bg-ivory/15">
          <motion.div style={{ scaleX: eased }} className="h-px origin-left bg-gold" />
        </div>
      </div>
    </div>
  )
}

<<<<<<< HEAD
/**
 * The mobile corridor.
 *
 * Deep perspective is the wrong tool on a phone — it costs fill rate and needs
 * a wide viewport to read at all — but that is an argument against *the
 * technique*, not against motion. This version was originally a bare grid of
 * `<img>` tags, which made it the only stretch of the page with nothing moving
 * on it at all.
 *
 * It now goes through `ParallaxImage`, the same path every other photograph on
 * the page takes: the frame curtains open, the photograph settles back from an
 * over-zoom, one sweep of light crosses it, and from then on it drifts against
 * the scroll. All transform and opacity, all GPU, and consistent with the rest
 * of the page rather than a separate idea bolted on for small screens.
 */
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
function FlatCorridor({ panels, labelFor, className }) {
  return (
    <div className={`mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 sm:grid-cols-2 sm:px-8 ${className}`}>
      {panels.map((panel, i) => (
        <figure key={panel.src} className={i % 2 === 1 ? 'sm:mt-14' : ''}>
          <div className="relative">
            <ParallaxImage
              src={panel.src}
              alt={labelFor(panel)}
              w={panel.w}
              h={panel.h}
              shape="soft"
              drift={9}
              delay={i % 2 === 1 ? 0.08 : 0}
              className="aspect-[3/4] w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
          </div>
          <Reveal delay={0.1}>
<<<<<<< HEAD
            <figcaption className="mt-4 flex items-start gap-3 text-[0.85rem] leading-relaxed text-ivory/65">
=======
            <figcaption className="mt-4 flex items-start gap-3 text-[0.92rem] leading-relaxed text-ivory/78">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
              <span className="mt-[0.55em] h-px w-4 shrink-0 bg-gold" />
              {labelFor(panel)}
            </figcaption>
          </Reveal>
        </figure>
      ))}
    </div>
  )
}

export default function Corridor({ panels, labelFor, className = '' }) {
  const { still } = useMotionPrefs()

<<<<<<< HEAD
  // Read the breakpoint during the first render, not in an effect. Deciding
  // this after mount is what forced the wrong branch on commit one.
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
  const [deep, setDeep] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const sync = () => setDeep(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

<<<<<<< HEAD
  // Remounting on the breakpoint keeps the scroll hook and its target in step.
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
  const Rail = !deep || still ? FlatCorridor : DeepCorridor
  return (
    <Rail
      key={!deep || still ? 'flat' : 'deep'}
      panels={panels}
      labelFor={labelFor}
      className={className}
    />
  )
}
