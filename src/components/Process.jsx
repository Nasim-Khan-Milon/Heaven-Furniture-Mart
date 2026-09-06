import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { process } from '../data/site'
import { Marker } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { EASE, Reveal, SCROLL_SPRING, SplitText, useMotionPrefs } from '../fx'

function Step({ step, index, active, progress, onHover, still }) {
  const { t } = useLang()
  const lit = active === index
  const dim = active !== null && !lit

  const ghostY = useTransform(progress, [0, 1], [26, -26])

  return (
    <motion.li
      onMouseEnter={() => onHover(index)}
      className="group relative pt-9 pb-11 pl-12 lg:pt-14 lg:pb-0 lg:pl-0"
      animate={{ opacity: still ? 1 : dim ? 0.45 : 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <motion.span
        aria-hidden="true"
        style={still ? undefined : { y: ghostY }}
        animate={{
          color: lit ? 'var(--color-gold)' : 'rgba(74,55,40,0.14)',
          scale: lit ? 1.06 : 1,
        }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none absolute -top-1 right-0 font-display text-[4.5rem] leading-none select-none lg:top-6 lg:right-6 lg:text-[7rem]"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <span
        aria-hidden="true"
        className="absolute top-9 left-[7px] block h-[13px] w-[13px] lg:top-[-6px] lg:left-0"
      >
        {!still && (
          <motion.span
            className="absolute inset-0 block rotate-45 border border-gold"
            animate={lit ? { scale: [1, 2.9], opacity: [0.75, 0] } : { scale: 1, opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE, repeat: lit ? Infinity : 0, repeatDelay: 0.5 }}
          />
        )}
        <motion.span
          className="absolute inset-0 block border"
          initial={still ? false : { scale: 0, rotate: 0, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          animate={
            still
              ? undefined
              : {
                  scale: lit ? 1.45 : 1,
                  rotate: lit ? 135 : 45,
                  backgroundColor: lit ? 'var(--color-gold)' : 'var(--color-ivory)',
                  borderColor: lit ? 'var(--color-gold)' : 'var(--color-gold-deep)',
                }
          }
          transition={{ duration: 0.55, ease: EASE }}
        />
      </span>

      <div className="relative">
        <Reveal delay={0.05 * index}>
          <motion.span
            animate={{ width: lit ? 44 : 22, opacity: lit ? 1 : 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden="true"
            className="mb-5 block h-px bg-gold-deep"
          />
        </Reveal>

        <SplitText
          as="h3"
          text={t(step.title)}
          stagger={0.045}
          duration={0.7}
          className="block font-display text-xl text-ink sm:text-2xl"
        />

        <Reveal delay={0.12 + 0.05 * index}>
          <motion.p
            animate={{ x: lit && !still ? 6 : 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="pretty mt-3 max-w-sm text-[1.02rem] leading-relaxed text-walnut/88"
          >
            {t(step.body)}
          </motion.p>
        </Reveal>
      </div>
    </motion.li>
  )
}

export default function Process() {
  const { t } = useLang()
  const trackRef = useRef(null)
  const { still } = useMotionPrefs()
  const [hovered, setHovered] = useState(null)
  const [swept, setSwept] = useState(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.45'],
  })
  const drawn = useSpring(scrollYProgress, SCROLL_SPRING)

  useMotionValueEvent(drawn, 'change', (value) => {
    if (value <= 0.02) return setSwept(null)
    setSwept(Math.min(process.length - 1, Math.floor(value * process.length * 1.08)))
  })

  const along = useTransform(drawn, [0, 1], ['0%', '100%'])
  const active = still ? null : (hovered ?? swept)

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

        <div ref={trackRef} onMouseLeave={() => setHovered(null)} className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-0 left-[13px] h-full w-px bg-walnut/15 lg:top-0 lg:left-0 lg:h-px lg:w-full"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: still ? 1 : drawn }}
            className="absolute top-0 left-[13px] h-full w-px origin-top bg-gold lg:hidden"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: still ? 1 : drawn }}
            className="absolute top-0 left-0 hidden h-px w-full origin-left bg-gold lg:block"
          />

          {!still && (
            <>
              <motion.span
                aria-hidden="true"
                style={{ top: along }}
                className="absolute left-[13px] z-10 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold shadow-[0_0_16px_4px_rgba(217,162,39,0.5)] lg:hidden"
              />
              <motion.span
                aria-hidden="true"
                style={{ left: along }}
                className="absolute top-0 z-10 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold shadow-[0_0_16px_4px_rgba(217,162,39,0.5)] lg:block"
              />
            </>
          )}

          <ol className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-8">
            {process.map((step, i) => (
              <Step
                key={step.title}
                step={step}
                index={i}
                active={active}
                progress={drawn}
                onHover={setHovered}
                still={still}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
