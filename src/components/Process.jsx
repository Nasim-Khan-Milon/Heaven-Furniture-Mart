import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { process } from '../data/site'
import { Marker } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { Reveal, SCROLL_SPRING, SplitText, useMotionPrefs } from '../fx'

/**
 * Four steps, with a brass rule that draws itself along them as you scroll.
 *
 * The rule is the animation doing actual work: it is a progress indicator for a
 * process, so its length means something. Each node snaps in as the line
 * reaches it and holds a faint ring for a beat, the way a marked point on a
 * drawing gets circled.
 *
 * Horizontal on desktop, vertical on mobile — the same line, re-laid.
 */
export default function Process() {
  const { t } = useLang()
  const trackRef = useRef(null)
  const { still } = useMotionPrefs()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.45'],
  })
  const drawn = useSpring(scrollYProgress, SCROLL_SPRING)
  const progress = still ? 1 : drawn

  return (
    <section id="process" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Reveal>
            <Marker>{t('procMarker')}</Marker>
          </Reveal>
          <SplitText
            as="h2"
            text={t('procTitle')}
            className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]"
          />
        </div>

        <div ref={trackRef} className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-0 left-[13px] h-full w-px bg-walnut/15 lg:top-0 lg:left-0 lg:h-px lg:w-full"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-0 left-[13px] h-full w-px origin-top bg-gold lg:hidden"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute top-0 left-0 hidden h-px w-full origin-left bg-gold lg:block"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-8">
            {process.map((step, i) => (
              <li key={step.title} className="relative pt-8 pb-10 pl-12 lg:pt-10 lg:pb-0 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-8 left-[7px] block h-[13px] w-[13px] lg:top-[-6px] lg:left-0"
                >
                  {/* the ring, expanding once as the line arrives */}
                  {!still && (
                    <motion.span
                      className="absolute inset-0 block rotate-45 border border-gold"
                      initial={{ scale: 1, opacity: 0 }}
                      whileInView={{ scale: 2.6, opacity: [0, 0.7, 0] }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <motion.span
                    className="absolute inset-0 block rotate-45 border border-gold bg-ivory"
                    initial={still ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>

                <Reveal delay={0.06 * i}>
                  <span className="font-display text-3xl text-gold-deep">{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl text-ink sm:text-2xl">{t(step.title)}</h3>
                  <p className="pretty mt-3 max-w-sm text-[0.95rem] leading-relaxed text-walnut/75">
                    {t(step.body)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
