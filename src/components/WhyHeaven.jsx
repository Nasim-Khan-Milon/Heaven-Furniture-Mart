import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { reasons } from '../data/site'
import { Layer, Marker, Tilt } from './ui'
<<<<<<< HEAD
import { Reveal, SplitText, Stagger, StaggerItem } from '../fx'
=======
import { EASE, EASE_INOUT, Reveal, SCROLL_SPRING, SplitText, useMotionPrefs } from '../fx'
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
import { useLang } from '../i18n/LanguageContext'

export default function WhyHeaven() {
  const { t, lang } = useLang()
  const { still } = useMotionPrefs()
  const sectionRef = useRef(null)

  // Replays a gold sweep across every card whenever the language flips,
  // so the switch reads as a deliberate refresh instead of a blank grid.
  const [pulse, setPulse] = useState(0)
  const booted = useRef(false)
  useEffect(() => {
    if (!booted.current) {
      booted.current = true
      return
    }
    setPulse((p) => p + 1)
  }, [lang])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const eased = useSpring(scrollYProgress, SCROLL_SPRING)
  const glowY = useTransform(eased, [0, 1], ['-14%', '14%'])
  const glowFade = useTransform(eased, [0, 0.45, 1], [0, 0.75, 0])
  const railScale = useTransform(eased, [0.1, 0.75], [0, 1])

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative overflow-hidden bg-linen py-20 sm:py-28 lg:py-32"
    >
      {!still && (
        <motion.div
          aria-hidden="true"
          style={{ y: glowY, opacity: glowFade }}
          className="pointer-events-none absolute -top-32 right-[-14rem] h-[40rem] w-[40rem] rounded-full bg-gold/12 blur-[110px]"
        />
      )}

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Marker>{t('whyMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('whyTitle')}
              className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[1.02rem] leading-relaxed text-walnut/85">{t('whyNote')}</p>
          </Reveal>
        </div>

        <div aria-hidden="true" className="mt-12 h-px w-full bg-walnut/12">
          <motion.div
            style={{ scaleX: still ? 1 : railScale }}
            className="h-px origin-left bg-gold-deep/70"
          />
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
<<<<<<< HEAD
            <StaggerItem key={t(reason.title)} as="li">
              <Tilt max={9} lift={18} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-walnut/15 bg-linen/45 p-6 transition-colors duration-300 hover:border-gold/60">
                  <Layer z={44}>
                    <span className="font-display text-2xl text-gold-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </Layer>
                  <Layer z={28}>
                    <h3 className="mt-4 font-display text-xl leading-snug text-ink">
                      {t(reason.title)}
                    </h3>
                  </Layer>
                  <Layer z={12}>
                    <p className="pretty mt-2.5 text-[0.9rem] leading-relaxed text-walnut/75">
                      {t(reason.body)}
                    </p>
                  </Layer>
                </div>
              </Tilt>
            </StaggerItem>
=======
            <ReasonCard key={reason.title} reason={reason} index={i} pulse={pulse} />
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReasonCard({ reason, index, pulse }) {
  const { t, n, lang } = useLang()
  const { still, lite } = useMotionPrefs()
  const beat = (index % 4) * 0.09
  const number = n(String(index + 1).padStart(2, '0'))

  const shell =
    'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-walnut/15 bg-linen/45 p-6 transition-colors duration-500 hover:border-gold/60'

  if (still) {
    return (
      <li className="h-full">
        <div className={shell}>
          <span className="font-display text-2xl text-gold-deep">{number}</span>
          <h3 className="mt-4 font-display text-xl leading-snug text-ink">{t(reason.title)}</h3>
          <p className="pretty mt-2.5 text-[0.96rem] leading-relaxed text-walnut/88">
            {t(reason.body)}
          </p>
        </div>
      </li>
    )
  }

  return (
    <motion.li
      className="h-full"
      style={{ transformPerspective: 900 }}
      initial={{
        opacity: 0,
        y: 66,
        rotateX: -18,
        scale: 0.93,
        filter: lite ? 'blur(0px)' : 'blur(10px)',
      }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, delay: beat, ease: EASE }}
    >
      <Tilt max={10} lift={24} className="h-full">
        <motion.div
          className={shell}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* entrance shimmer */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-14deg] bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            initial={{ x: '0%', opacity: 0 }}
            whileInView={{ x: '430%', opacity: [0, 1, 0] }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.5, delay: beat + 0.3, ease: EASE_INOUT }}
          />

          {/* language-switch shimmer — remounts on every toggle */}
          {pulse > 0 && (
            <motion.span
              key={pulse}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-14deg] bg-gradient-to-r from-transparent via-gold/35 to-transparent"
              initial={{ x: '0%', opacity: 0 }}
              animate={{ x: '430%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.15, delay: beat * 0.6, ease: EASE_INOUT }}
            />
          )}

          {/* corner brackets draw in */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-10 w-px origin-top bg-gold-deep/45"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: beat + 0.5, ease: EASE }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-px w-10 origin-left bg-gold-deep/45"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: beat + 0.58, ease: EASE }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-10 w-px origin-bottom bg-gold-deep/45"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: beat + 0.5, ease: EASE }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-px w-10 origin-right bg-gold-deep/45"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: beat + 0.58, ease: EASE }}
          />

          {/* hover wash */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <Layer z={44} className="relative">
            <motion.span
              key={`num-${lang}`}
              className="block font-display text-2xl text-gold-deep transition-transform duration-500 group-hover:-translate-y-0.5"
              initial={{ y: 16, opacity: 0, scale: 0.86 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: beat + 0.22, ease: EASE }}
            >
              {number}
            </motion.span>
          </Layer>

          <Layer z={28} className="relative">
            <h3 className="mt-4 font-display text-xl leading-snug text-ink">
              <motion.span
                key={`title-${lang}`}
                className="block"
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {t(reason.title)}
              </motion.span>
            </h3>
          </Layer>

          <Layer z={12} className="relative">
            <p className="pretty mt-2.5 text-[0.96rem] leading-relaxed text-walnut/88">
              <motion.span
                key={`body-${lang}`}
                className="block"
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.07, ease: EASE }}
              >
                {t(reason.body)}
              </motion.span>
            </p>
          </Layer>

          <Layer z={20} className="relative mt-auto pt-5">
            <motion.span
              aria-hidden="true"
              className="block h-[2px] w-10 origin-left rounded-full bg-gold-deep/35 transition-all duration-500 group-hover:w-16 group-hover:bg-gold-deep"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: beat + 0.62, ease: EASE }}
            />
          </Layer>
        </motion.div>
      </Tilt>
    </motion.li>
  )
}
