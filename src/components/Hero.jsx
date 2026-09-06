import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { messenger, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import HeroShowcase from './HeroShowcase'
import { ArrowIcon, MessengerIcon, WhatsAppIcon } from './ui'
import { DustMotes, EASE, EASE_INOUT, Magnetic, SplitText, useMotionPrefs } from '../fx'

// Two rows, so the headline stacks like a block rather than trailing a short line.
const HEADLINE = [
  ['heroLine1', 'heroLine2'],
  ['heroLine3'],
]

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.95rem] w-[0.95rem]">
      <path
        fill="currentColor"
        d="M12 2.4l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.2l6.5-.9z"
      />
    </svg>
  )
}

export default function Hero() {
  const { t, lang } = useLang()
  const { still, ready } = useMotionPrefs()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -60])

  const rise = (delay) => ({
    initial: still ? false : { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative bg-ivory px-3 pt-[5.25rem] pb-6 sm:px-5 sm:pb-7 lg:px-7 lg:pb-9"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[5.25rem] bottom-0 bg-gold"
      />
      <motion.div
        style={{ y: cardY }}
        className="relative mx-auto mt-4 max-w-[1400px] overflow-hidden rounded-[1.75rem] bg-ivory sm:mt-5 sm:rounded-[2.25rem] lg:mt-6"
      >
        {/* The wave the pieces stand on — flat on phones, a diagonal sweep from
            large screens up, where the piece sits off to the right. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[21.5rem] w-full sm:h-[24.5rem] lg:hidden"
        >
          <path
            fill="var(--color-gold)"
            d="M0 52 C 260 14 520 46 760 40 C 1010 34 1250 62 1440 44 L1440 120 L0 120 Z"
          />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[58%] w-full lg:block"
        >
          <path
            fill="var(--color-gold)"
            d="M0 396 C 170 376 320 404 452 394 C 618 382 660 214 852 146 C 1052 76 1298 40 1440 28 L1440 420 L0 420 Z"
          />
        </svg>

        <div className="relative grid gap-6 px-6 pt-8 pb-8 sm:px-9 sm:pt-9 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-8 lg:gap-y-0 lg:px-11 lg:pt-11 lg:pb-10">
          {/* Left — the pitch */}
          <div className="order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 ">
            <motion.p
              {...rise(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-deep/30 bg-ivory px-4 py-2 text-[0.82rem] font-medium text-walnut"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
              {t('heroBadge')}
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
              {...rise(0.5)}
              className="pretty mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-walnut/90 sm:text-[1.08rem]"
            >
              {t('heroBody')}
            </motion.p>

            <motion.div {...rise(0.62)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <a
                  href={wa("Hello Heaven Furniture Mart, I'd like to book a free design consultation.")}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-forest px-7 py-3.5 font-medium text-ivory transition-colors duration-500 hover:text-forest-deep"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <span className="relative flex items-center gap-2.5">
                    <WhatsAppIcon />
                    {t('ctaBook')}
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
              {...rise(0.72)}
              href={messenger}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-fit items-center gap-2 text-[0.92rem] text-walnut/85 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              <MessengerIcon className="h-4 w-4" />
              {t('ctaMessenger')}
            </motion.a>
          </div>

          {/* Right — the piece standing on the wave */}
          <motion.div
            className="order-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1"
            initial={still ? false : { opacity: 0, y: 26 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.32, ease: EASE }}
          >
            <HeroShowcase play={ready} />
          </motion.div>

          {/* Rating — bottom left, level with the piece caption opposite */}
          <motion.a
            {...rise(0.88)}
            href="#reviews"
            className="order-3 block w-fit self-end rounded-xl transition-opacity hover:opacity-80 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:mt-7"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex gap-0.5 text-gold-deep" aria-hidden="true">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </span>
              <span className="font-display text-[1.15rem] font-extrabold text-ink">
                {t('heroRatingValue')}
              </span>
            </span>
            <span className="mt-1 block max-w-[24ch] text-[0.86rem] leading-snug text-walnut/85">
              {t('heroRatingNote')}
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
