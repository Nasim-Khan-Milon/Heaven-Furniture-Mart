import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { founder, milestones } from '../data/site'
import { ArchImage, Marker } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { EASE, LitText, Reveal, SCROLL_SPRING, SplitText, useMotionPrefs } from '../fx'

const LAY = { type: 'spring', stiffness: 130, damping: 15, mass: 0.8 }

function Brick({ milestone, index, still }) {
  const { t, n } = useLang()
  const nudged = index % 2 === 1
  const beat = index * 0.16

  return (
    <li className={`relative ${nudged ? 'sm:ml-[8%]' : 'sm:mr-[8%]'}`}>
      <motion.div
        initial={still ? false : { opacity: 0, y: -60, rotate: nudged ? -1.8 : 1.8 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ ...LAY, delay: beat }}
      >
        <motion.div
          whileHover={still ? undefined : { y: -6, transition: { duration: 0.4, ease: EASE } }}
          className="group relative overflow-hidden rounded-[4px] border border-walnut/20 bg-gradient-to-br from-ivory via-ivory to-linen px-6 py-5 transition-colors duration-500 hover:border-gold-deep/60 sm:px-8 sm:py-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-16deg] bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[420%]"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-0 h-8 w-[3px] -translate-y-1/2 scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
          />

          <div className="relative flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="font-display text-xl text-gold-deep sm:w-[4.5rem] sm:shrink-0">
              {n(milestone.year)}
            </p>
            <p className="pretty text-[1.02rem] leading-relaxed text-walnut/90">
              {t(milestone.text)}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {!still && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 -bottom-1 h-3 rounded-full bg-walnut/30 blur-md"
          initial={{ opacity: 0, scaleX: 0.35 }}
          whileInView={{ opacity: [0, 0.55, 0], scaleX: [0.35, 1.1, 1.35] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.95, delay: beat + 0.22, ease: 'easeOut' }}
        />
      )}

      <motion.span
        aria-hidden="true"
        className="mt-[5px] block h-[3px] origin-left rounded-full bg-gold-deep/30"
        initial={still ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: beat + 0.3, ease: EASE }}
      />
    </li>
  )
}

function Wall() {
  const { t } = useLang()
  const { still } = useMotionPrefs()
  const wallRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wallRef,
    offset: ['start 0.9', 'end 0.6'],
  })
  const plumb = useSpring(scrollYProgress, SCROLL_SPRING)

  return (
    <div className="mt-16 border-t border-walnut/15 pt-12 lg:mt-24 lg:pt-16">
      <div className="mx-auto max-w-3xl">
        <SplitText
          as="h3"
          text={t('storyTimeline')}
          className="block font-display text-2xl text-ink sm:text-3xl"
        />

        <div ref={wallRef} className="relative mt-9 pl-6 sm:pl-8">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-px bg-walnut/15"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: still ? 1 : plumb }}
            className="absolute top-0 left-0 h-full w-px origin-top bg-gold-deep"
          />

          <ol className="space-y-[7px]">
            {milestones.map((milestone, i) => (
              <Brick key={milestone.year} milestone={milestone} index={i} still={still} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default function Story() {
  const { t } = useLang()

  return (
    <section id="story" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:col-span-4 lg:mx-0 lg:max-w-none">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-t-full border border-gold-deep/25 sm:-inset-4"
              />
              <ArchImage
                src={founder.image}
                alt={t(founder.alt)}
                w={founder.w}
                h={founder.h}
                shape="soft"
                drift={5}
                focus="50% 22%"
                className="relative aspect-[4/5] w-full"
              />
            </div>

            <Reveal delay={0.15}>
              <div className="mt-7 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-9 shrink-0 bg-gold-deep" />
                <div>
                  <p className="font-display text-xl leading-tight text-ink">{t(founder.name)}</p>
                  <p className="mt-1 text-[0.96rem] text-walnut/85">{t(founder.role)}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <Marker>{t('storyMarker')}</Marker>
            </Reveal>

            <blockquote className="mt-7">
              <span
                aria-hidden="true"
                className="block font-display text-6xl leading-[0.5] text-gold-deep/35 sm:text-7xl"
              >
                &ldquo;
              </span>
              <LitText
                text={t('storyQuote')}
                className="balance mt-6 font-display text-[length:var(--text-section)] leading-[1.16] font-medium tracking-[-0.018em]"
              />
              <footer className="mt-8">
                <Reveal delay={0.1}>
                  <p className="text-[1.02rem] text-walnut/90">{t('storyBy')}</p>
                </Reveal>
              </footer>
            </blockquote>
          </div>
        </div>

        <Wall />
      </div>
    </section>
  )
}
