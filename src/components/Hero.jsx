import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import heroBed from '../assets/hero-bed.webp'
import { assurances, messenger, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import HeroShowcase from './HeroShowcase'
import MeasureOverlay from './MeasureOverlay'
import { ArrowIcon, MessengerIcon, WhatsAppIcon } from './ui'

const EASE = [0.22, 1, 0.36, 1]

// Each word rises out of its own mask, so the line assembles rather than fades.
const HEADLINE = [
  { key: 'heroLine1' },
  { key: 'heroLine2', italic: true },
  { key: 'heroLine3' },
]

export default function Hero() {
  const { t } = useLang()
  const still = useReducedMotion()
  const sectionRef = useRef(null)

  // Photo and its outline drift at different rates, so the hero gains depth
  // as you scroll away from it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const frameY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -56])

  const line = (delay) => ({
    initial: still ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  })

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* soft warmth behind the type, so the ivory isn't flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-sand/50 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-12 lg:px-12">
        <div className="order-1 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1 xl:col-span-6">
          <motion.p
            {...line(0.15)}
            className="flex items-center gap-3 text-[0.82rem] tracking-[0.14em] text-gold-deep"
          >
            <span className="h-px w-9 bg-gold-deep" />
            {t('heroEyebrow')}
          </motion.p>

          <h1 className="mt-6 font-display text-[length:var(--text-hero)] leading-[0.92] text-ink">
            {HEADLINE.map((row, r) => (
              <span key={r} className="block">
                {t(row.key).split(' ').map((word, w, words) => (
                  <span
                    key={word}
                    className="inline-block overflow-hidden pb-[0.06em] align-bottom"
                  >
                    <motion.span
                      className={`inline-block ${row.italic ? 'italic text-forest' : ''}`}
                      initial={still ? false : { y: '110%', rotate: 4 }}
                      animate={{ y: '0%', rotate: 0 }}
                      transition={{
                        duration: 0.95,
                        delay: 0.22 + r * 0.09 + w * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                    {w < words.length - 1 && <span>&nbsp;</span>}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            {...line(0.62)}
            className="pretty mt-8 max-w-xl text-lg leading-relaxed text-walnut/85 sm:text-xl"
          >
            {t('heroBody')}
          </motion.p>

          <motion.div {...line(0.75)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={wa(
                "Hello Heaven Furniture Mart, I'd like to book a free design consultation.",
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-forest px-8 py-4 font-medium text-ivory transition-colors duration-300 hover:bg-gold hover:text-forest-deep"
            >
              <WhatsAppIcon />
              {t('ctaBookLong')}
            </a>
            <a
              href="#collections"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-walnut/30 px-8 py-4 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              {t('ctaSee')}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <ul className="order-3 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-walnut/15 pt-7 sm:grid-cols-4 sm:gap-x-4 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mt-2 xl:col-span-6">
          {assurances.map((item) => (
            <li key={item} className="text-[0.9rem] leading-snug text-walnut/75">
              {t(item)}
            </li>
          ))}
        </ul>

        <div className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 xl:col-span-5">
          <div className="relative mx-auto max-w-[26rem] lg:ml-auto lg:mr-0 lg:max-w-[30rem] lg:pt-6 lg:pr-5">
            {/* Outline and image share one relative box, so the offset frame
                always registers against the photo instead of drifting. */}
            <motion.div style={{ y: frameY }} className="relative">
              <div
                aria-hidden="true"
                className="arch pointer-events-none absolute inset-0 hidden translate-x-5 -translate-y-6 border border-gold/40 lg:block"
              />
              <div className="relative">
                <HeroShowcase />
                <MeasureOverlay start={1.5} />
              </div>
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
    </section>
  )
}
