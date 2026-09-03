import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { assurances, messenger, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import HeroShowcase from './HeroShowcase'
import MeasureOverlay from './MeasureOverlay'
import { ArrowIcon, MessengerIcon, WhatsAppIcon } from './ui'
import { DustMotes, EASE, EASE_INOUT, Magnetic, SplitText, useMotionPrefs } from '../fx'

const HEADLINE = [
  { key: 'heroLine1' },
  { key: 'heroLine2', italic: true },
  { key: 'heroLine3' },
]

/**
 * The first three seconds decide whether this reads as a luxury studio or a
 * furniture listing, so the hero is built around one idea and nothing else:
 * the headline promises furniture made to the measure of a room, and the arch
 * beside it is a room, with a real piece standing in it and dust in the light.
 *
 * Everything here waits for the intro curtain to open before it moves, so the
 * page arrives as a single continuous sequence rather than two competing ones.
 */
export default function Hero() {
  const { t } = useLang()
  const { still, ready } = useMotionPrefs()
  const sectionRef = useRef(null)

  // Three layers leaving at three speeds as you scroll away: the type goes
  // first and fades, the photo follows, the gold outline lags behind both.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const typeY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -120])
  const typeFade = useTransform(scrollYProgress, [0, 0.75], [1, still ? 1 : 0])
  const frameY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -56])
  const outlineY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 40])
  const cueFade = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // Entrances are expressed relative to the curtain opening, not page load.
  const line = (delay) => ({
    initial: still ? false : { opacity: 0, y: 26, filter: 'blur(6px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* warmth behind the type, so the ivory is a lit room and not a blank */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-sand/50 blur-3xl"
      />
      <DustMotes />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-12 lg:px-12">
        <motion.div
          style={{ y: typeY, opacity: typeFade }}
          className="order-1 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1 xl:col-span-6"
        >
          <motion.p
            {...line(0.1)}
            className="flex items-center gap-3 text-[0.82rem] tracking-[0.14em] text-gold-deep"
          >
            <motion.span
              className="h-px bg-gold-deep"
              initial={still ? false : { width: 0 }}
              animate={ready ? { width: 36 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />
            {t('heroEyebrow')}
          </motion.p>

          {/* One pass of low gold light across the type as it settles. Once,
              not on a loop — a headline that keeps shimmering is a headline
              nobody finishes reading. */}
          <div className="relative mt-6 overflow-hidden">
            {!still && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/2 skew-x-[-12deg] bg-gradient-to-r from-transparent via-gold/25 to-transparent"
                initial={{ x: '0%', opacity: 0 }}
                animate={ready ? { x: '340%', opacity: [0, 1, 0] } : {}}
                transition={{ duration: 1.9, delay: 1.05, ease: EASE_INOUT }}
              />
            )}
            <h1 className="font-display text-[length:var(--text-hero)] leading-[0.92] text-ink">
            {HEADLINE.map((row, r) => (
              <SplitText
                key={row.key}
                as="span"
                text={t(row.key)}
                trigger="now"
                play={ready}
                delay={0.18 + r * 0.14}
                stagger={0.06}
                duration={1}
                className="block"
                wordClassName={row.italic ? 'italic text-forest' : ''}
              />
              ))}
            </h1>
          </div>

          <motion.p
            {...line(0.62)}
            className="pretty mt-8 max-w-xl text-lg leading-relaxed text-walnut/85 sm:text-xl"
          >
            {t('heroBody')}
          </motion.p>

          <motion.div {...line(0.75)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href={wa("Hello Heaven Furniture Mart, I'd like to book a free design consultation.")}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-forest px-8 py-4 font-medium text-ivory transition-colors duration-500 hover:text-forest-deep"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />
                <span className="relative flex items-center gap-2.5">
                  <WhatsAppIcon />
                  {t('ctaBookLong')}
                </span>
              </a>
            </Magnetic>

            <a
              href="#collections"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-walnut/30 px-8 py-4 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              {t('ctaSee')}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        <ul className="order-3 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-walnut/15 pt-7 sm:grid-cols-4 sm:gap-x-4 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mt-2 xl:col-span-6">
          {assurances.map((item, i) => (
            <motion.li
              key={item}
              className="text-[0.9rem] leading-snug text-walnut/75"
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.95 + i * 0.08, ease: EASE }}
            >
              {t(item)}
            </motion.li>
          ))}
        </ul>

        <div className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 xl:col-span-5">
          <div className="relative mx-auto max-w-[26rem] lg:mr-0 lg:ml-auto lg:max-w-[30rem] lg:pt-6 lg:pr-5">
            {/* The outline drifts the opposite way to the photo, so the gap
                between them opens as you scroll and the arch gains depth. */}
            <motion.div
              aria-hidden="true"
              style={{ y: outlineY }}
              className="pointer-events-none absolute top-0 left-0 hidden aspect-[9/10] w-full translate-x-5 -translate-y-6 lg:block"
            >
              {/*
                The same arch as before, drawn rather than declared. A CSS
                border cannot be stroked on progressively; an SVG path can, so
                the outline traces itself up one side, over the crown and down
                the other in a single continuous stroke — the same gesture as
                the dimension line under the photograph, which is the point.

                `preserveAspectRatio="none"` lets the path fill whatever box it
                is given, exactly as the border-radius version did, and
                `vectorEffect="non-scaling-stroke"` keeps the hairline even
                after that stretch. Both match MeasureOverlay.

                The box is the alcove's own 9/10, not `inset-0`. Spanning the
                whole column made the stroke close straight across the caption
                underneath — invisible as a faint CSS border, obvious once the
                line draws itself.
              */}
              <svg
                viewBox="0 0 90 100"
                preserveAspectRatio="none"
                className="h-full w-full"
                fill="none"
                stroke="var(--color-gold)"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              >
                <motion.path
                  d="M0.5 99.5 L0.5 45 A44.5 44.5 0 0 1 89.5 45 L89.5 99.5 Z"
                  initial={still ? false : { pathLength: 0, opacity: 0 }}
                  animate={ready ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{
                    pathLength: { duration: 2.1, delay: 0.55, ease: EASE },
                    opacity: { duration: 0.4, delay: 0.55 },
                  }}
                />
              </svg>
            </motion.div>

            <motion.div style={{ y: frameY }} className="relative">
              <motion.div
                className="relative"
                initial={still ? false : { opacity: 0, scale: 0.95, y: 30 }}
                animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
              >
                <HeroShowcase play={ready} />
                <MeasureOverlay start={1.35} play={ready} />
              </motion.div>
            </motion.div>

            <motion.a
              {...line(1.15)}
              href={messenger}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[0.9rem] text-walnut/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              <MessengerIcon className="h-4 w-4" />
              {t('ctaMessenger')}
            </motion.a>
          </div>
        </div>
      </div>

      {/* scroll cue — a line that keeps falling until you take the hint */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: cueFade }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <motion.span
          className="text-[0.7rem] tracking-[0.2em] text-walnut/45"
          initial={still ? false : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {t('heroScroll')}
        </motion.span>
        <span className="relative block h-10 w-px overflow-hidden bg-walnut/15">
          {!still && (
            <motion.span
              className="absolute inset-x-0 top-0 block h-4 bg-gold-deep"
              animate={{ y: ['-100%', '250%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          )}
        </span>
      </motion.div>
    </section>
  )
}
