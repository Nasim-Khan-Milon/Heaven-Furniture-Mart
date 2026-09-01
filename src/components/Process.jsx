import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { process } from '../data/site'
import { Marker, Reveal } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function Process() {
  const { t } = useLang()
  const trackRef = useRef(null)
  const still = useReducedMotion()

  // The rule draws itself across the steps as you scroll through the section.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.45'],
  })
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const progress = still ? 1 : drawn

  return (
    <section id="process" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <Marker>{t('procMarker')}</Marker>
          <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
            {t('procTitle')}
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative mt-14">
          {/* the track the line runs along — horizontal on desktop, vertical on mobile */}
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
                {/* node sitting on the track */}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-8 left-[7px] block h-[13px] w-[13px] rotate-45 border border-gold bg-ivory lg:top-[-6px] lg:left-0"
                  initial={still ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />

                <Reveal delay={0.05 * i}>
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
