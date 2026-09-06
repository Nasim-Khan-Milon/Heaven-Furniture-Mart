import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import stageMeasure from '../assets/stage-measure.webp'
import stageCutting from '../assets/stage-cutting.webp'
import stageFinishing from '../assets/stage-finishing.webp'
import stageFoam from '../assets/stage-foam.webp'
import stageDelivery from '../assets/stage-delivery.webp'
import { useLang } from '../i18n/LanguageContext'
import { Marker } from './ui'
import { Reveal, SCROLL_SPRING, SplitText, Video, useMotionPrefs } from '../fx'

/**
 * Each stage may carry a `video`. Drop an .mp4 into `src/assets/`, import it,
 * add it to the entry, and that panel plays the clip with the photograph as
 * its poster — on capable devices only. Leave it off and the panel stays a
 * photograph, which is what ships today.
 *
 *   import carving from '../assets/carving.mp4'
 *   { image: craftShowcase, video: carving, w: 1024, h: 1024, ... }
 *
 * Keep clips short, silent and under about 3 MB. Heaven's own YouTube and
 * Facebook carry workshop footage; the brief says to go and take it.
 */
const PANELS = [
  {
    image: stageMeasure,
    w: 1200,
    h: 1500,
    title: 'shop1',
    body: 'shop1b',
    step: 'shop1s',
  },
  {
    image: stageCutting,
    video: '/media/stage-cutting.mp4',
    w: 800,
    h: 1000,
    title: 'shop2',
    body: 'shop2b',
    step: 'shop2s',
  },
  {
    image: stageFinishing,
    video: '/media/stage-finishing.mp4',
    w: 800,
    h: 1000,
    title: 'shop3',
    body: 'shop3b',
    step: 'shop3s',
  },
  {
    image: stageFoam,
    w: 1000,
    h: 1250,
    title: 'shop4',
    body: 'shop4b',
    step: 'shop4s',
  },
  {
    image: stageDelivery,
    w: 1000,
    h: 1250,
    title: 'shop5',
    body: 'shop5b',
    step: 'shop5s',
  },
]

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
          <p className="max-w-xs text-[1.02rem] leading-relaxed text-ivory/74">
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

        <div className="mx-12 mt-12 h-px bg-ivory/15">
          <motion.div style={{ width: rule }} className="h-px bg-gold" />
        </div>
      </div>
    </div>
  )
}

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
        <Video
          src={panel.video}
          poster={panel.image}
          alt={t(panel.title)}
          w={panel.w}
          h={panel.h}
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-6 font-display text-sm tracking-[0.14em] text-gold">
          {t(panel.step)}
        </span>
      </div>
      <figcaption className="mt-6 max-w-sm">
        <h3 className="font-display text-2xl text-ivory">{t(panel.title)}</h3>
        <p className="pretty mt-2 text-[1.02rem] leading-relaxed text-ivory/78">{t(panel.body)}</p>
      </figcaption>
    </motion.figure>
  )
}

<<<<<<< HEAD
/* ---------------------------------------------------------------- mobile */

/**
 * The mobile rail. Flat is not the same as dead.
 *
 * Pinning still has no place on a touchscreen — it fights the address bar and
 * wins nothing on a surface that already scrolls sideways. But the desktop
 * rail's actual *idea* is that one stage holds your attention at a time, and
 * that idea survives the change of input perfectly well. Each panel lifts and
 * brightens as it reaches the middle of the rail and settles back as it
 * leaves, exactly as on desktop — driven here by the rail's own horizontal
 * scroll rather than by the page's vertical scroll.
 */
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
function SwipeRail({ panels }) {
  const rail = useRef(null)
  return (
    <div
      ref={rail}
      className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:px-8"
    >
      {panels.map((panel) => (
        <SwipePanel key={panel.title} panel={panel} container={rail} />
      ))}
    </div>
  )
}

function SwipePanel({ panel, container }) {
  const { t } = useLang()
  const { still } = useMotionPrefs()
  const ref = useRef(null)

<<<<<<< HEAD
  // Tracked against the rail, not the window: `container` is what makes the
  // progress follow a sideways swipe instead of the page scrolling past.
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
  const { scrollXProgress } = useScroll({
    target: ref,
    container,
    axis: 'x',
    offset: ['start end', 'end start'],
  })
  const eased = useSpring(scrollXProgress, SCROLL_SPRING)

  const y = useTransform(eased, [0, 0.5, 1], [26, 0, 26])
  const opacity = useTransform(eased, [0, 0.5, 1], [0.45, 1, 0.45])

  return (
    <motion.figure
      ref={ref}
      style={still ? undefined : { y, opacity }}
      className="w-[76vw] shrink-0 snap-start sm:w-[44vw]"
    >
      <div className="arch-soft relative aspect-[4/5] w-full overflow-hidden bg-forest-soft">
        <Video
          src={panel.video}
          poster={panel.image}
          alt={t(panel.title)}
          w={panel.w}
          h={panel.h}
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-6 font-display text-sm tracking-[0.14em] text-gold">
          {t(panel.step)}
        </span>
      </div>
      <figcaption className="mt-5">
        <h3 className="font-display text-xl text-ivory">{t(panel.title)}</h3>
<<<<<<< HEAD
        <p className="pretty mt-2 text-[0.9rem] leading-relaxed text-ivory/65">{t(panel.body)}</p>
=======
        <p className="pretty mt-2 text-[0.96rem] leading-relaxed text-ivory/78">{t(panel.body)}</p>
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
      </figcaption>
    </motion.figure>
  )
}
