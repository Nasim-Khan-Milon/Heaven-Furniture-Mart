import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SCROLL_SPRING } from './config'
import ParallaxImage from './ParallaxImage'
import { Reveal } from './Reveal'
import { useMotionPrefs } from './MotionProvider'

const GAP = 700

const PLACEMENTS = [
  { x: '27vw', rotateY: -34, wall: 'right' },
  { x: '-27vw', rotateY: 34, wall: 'left' },
  { x: '25vw', rotateY: -30, wall: 'right' },
  { x: '-25vw', rotateY: 30, wall: 'left' },
  { x: '0vw', rotateY: 0, wall: 'centre' },
]

function Panel({ panel, index, count, progress, label }) {
  const place = PLACEMENTS[index % PLACEMENTS.length]

  const lead = GAP * 0.6
  const travel = (count - 1) * GAP + lead + GAP * 0.05
  const z = useTransform(progress, [0, 1], [-index * GAP - lead, -index * GAP - lead + travel])

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
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/85 to-transparent px-5 pt-10 pb-4 text-[0.86rem] leading-snug text-ivory/88">
          {label}
        </span>
      </div>

      <div aria-hidden="true" className="mx-auto mt-4 h-px w-2/3 bg-gold/40" />
    </motion.figure>
  )
}

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
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[46vh] w-[56vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,162,39,0.16),transparent_70%)] blur-2xl" />
        </div>

        <div className="absolute inset-0" style={{ perspective: 1100, perspectiveOrigin: '50% 48%' }}>
          <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
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

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-forest-deep)_92%)]"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-px w-[min(38rem,70vw)] bg-ivory/15">
          <motion.div style={{ scaleX: eased }} className="h-px origin-left bg-gold" />
        </div>
      </div>
    </div>
  )
}

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
            <figcaption className="mt-4 flex items-start gap-3 text-[0.92rem] leading-relaxed text-ivory/78">
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
