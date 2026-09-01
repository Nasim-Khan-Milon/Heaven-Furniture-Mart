import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import craftShowcase from '../assets/craft-showcase.webp'
import classicArmchairs from '../assets/classic-armchairs.webp'
import showroomReal from '../assets/showroom-real.webp'
import diningMarble from '../assets/dining-marble.webp'
import storageCabinet from '../assets/storage-cabinet.webp'
import { useLang } from '../i18n/LanguageContext'
import { Marker } from './ui'
import { Reveal, SCROLL_SPRING, SplitText, useMotionPrefs } from '../fx'

const PANELS = [
  { image: craftShowcase, w: 1024, h: 1024, title: 'shop1', body: 'shop1b', step: 'shop1s' },
  { image: classicArmchairs, w: 1000, h: 1333, title: 'shop2', body: 'shop2b', step: 'shop2s' },
  { image: storageCabinet, w: 1024, h: 1024, title: 'shop3', body: 'shop3b', step: 'shop3s' },
  { image: diningMarble, w: 1087, h: 1447, title: 'shop4', body: 'shop4b', step: 'shop4s' },
  { image: showroomReal, w: 1200, h: 1600, title: 'shop5', body: 'shop5b', step: 'shop5s' },
]

/**
 * The workshop, told sideways.
 *
 * Vertical scroll is converted into horizontal travel while the section holds
 * the screen. It is the heaviest thing on the page and it is here on purpose:
 * making a piece is a sequence of stages, and a sequence reads better along a
 * line than stacked down a column. The page earns one moment like this, and
 * this is it.
 *
 * The outer element's height is the travel distance plus one screen, so the
 * scroll maps 1:1 — a visitor never feels they have scrolled further than the
 * rail actually moved, which is what makes most pinned sections feel broken.
 *
 * Below `lg`, and for reduced motion, this becomes an ordinary snap rail you
 * swipe. Pinning fights the address bar on mobile and there is nothing to gain
 * from it on a touchscreen that already scrolls sideways.
 */
export default function Workshop() {
  const { t } = useLang()
  const { still } = useMotionPrefs()
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const sync = () => setPinned(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const swipes = !pinned || still

  const header = (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <Marker dark>{t('shopMarker')}</Marker>
          </Reveal>
          <SplitText
            as="h2"
            text={t('shopTitle')}
            className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02] text-ivory"
          />
        </div>
        <Reveal delay={0.12}>
          <p className="max-w-xs text-[0.95rem] leading-relaxed text-ivory/60">
            {t(swipes ? 'shopNoteSwipe' : 'shopNote')}
          </p>
        </Reveal>
      </div>
    </div>
  )

  return (
    <section id="workshop" className="bg-forest-deep py-20 text-ivory sm:py-24 lg:py-28">
      {header}
      {swipes ? <SwipeRail panels={PANELS} /> : <PinnedRail panels={PANELS} />}
    </section>
  )
}

/* --------------------------------------------------------------- desktop */

function PinnedRail({ panels }) {
  const wrap = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const node = track.current
      if (!node) return
      setDistance(Math.max(0, node.scrollWidth - window.innerWidth + 96))
    }
    measure()
    window.addEventListener('resize', measure)
    // Fonts land after first paint and change the caption widths under them.
    document.fonts?.ready?.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const eased = useSpring(scrollYProgress, SCROLL_SPRING)
  const x = useTransform(eased, [0, 1], [0, -distance])
  const rule = useTransform(eased, [0, 1], ['0%', '100%'])

  return (
    <div ref={wrap} style={{ height: `calc(100vh + ${distance}px)` }} className="relative mt-14">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max gap-8 pr-24 pl-12">
          {panels.map((panel, i) => (
            <Panel key={panel.title} panel={panel} index={i} progress={eased} count={panels.length} />
          ))}
        </motion.div>

        {/* travel indicator, sitting where a drawer rail would */}
        <div className="mx-12 mt-12 h-px bg-ivory/15">
          <motion.div style={{ width: rule }} className="h-px bg-gold" />
        </div>
      </div>
    </div>
  )
}

/**
 * Each panel lifts and brightens as it reaches the middle of the screen and
 * settles back as it leaves, so attention lands on one stage at a time rather
 * than on the whole row at once.
 */
function Panel({ panel, index, progress, count }) {
  const { t } = useLang()
  const centre = index / Math.max(count - 1, 1)
  const span = 0.5 / count

  const y = useTransform(
    progress,
    [centre - span * 3, centre, centre + span * 3],
    [42, 0, 42],
  )
  const opacity = useTransform(
    progress,
    [centre - span * 4, centre, centre + span * 4],
    [0.45, 1, 0.45],
  )

  return (
    <motion.figure
      style={{ y, opacity }}
      className="w-[62vw] shrink-0 sm:w-[46vw] lg:w-[clamp(17rem,31vw,44vh)]"
    >
      <div className="arch-soft relative aspect-[4/5] w-full overflow-hidden bg-forest-soft">
        <img
          src={panel.image}
          alt={t(panel.title)}
          width={panel.w}
          height={panel.h}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-6 font-display text-sm tracking-[0.14em] text-gold">
          {t(panel.step)}
        </span>
      </div>
      <figcaption className="mt-6 max-w-sm">
        <h3 className="font-display text-2xl text-ivory">{t(panel.title)}</h3>
        <p className="pretty mt-2 text-[0.95rem] leading-relaxed text-ivory/65">{t(panel.body)}</p>
      </figcaption>
    </motion.figure>
  )
}

/* ---------------------------------------------------------------- mobile */

function SwipeRail({ panels }) {
  const { t } = useLang()
  return (
    <div
      className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:px-8"
      data-cursor="drag"
    >
      {panels.map((panel) => (
        <figure key={panel.title} className="w-[76vw] shrink-0 snap-start sm:w-[44vw]">
          <div className="arch-soft relative aspect-[4/5] w-full overflow-hidden bg-forest-soft">
            <img
              src={panel.image}
              alt={t(panel.title)}
              width={panel.w}
              height={panel.h}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-6 font-display text-sm tracking-[0.14em] text-gold">
              {t(panel.step)}
            </span>
          </div>
          <figcaption className="mt-5">
            <h3 className="font-display text-xl text-ivory">{t(panel.title)}</h3>
            <p className="pretty mt-2 text-[0.9rem] leading-relaxed text-ivory/65">
              {t(panel.body)}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
