import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { range, wa } from '../data/site'
import { ArrowIcon, Marker, Reveal } from './ui'
import { useLang } from '../i18n/LanguageContext'


const MODES = [
  { id: 'classic', label: 'rangeClassic' },
  { id: 'modern', label: 'rangeModern' },
]

export default function Range() {
  const { t } = useLang()
  const [mode, setMode] = useState('classic')
  const still = useReducedMotion()

  return (
    <section id="range" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Marker>{t('rangeMarker')}</Marker>
            <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
              {t('rangeTitle')}
            </h2>
            <p className="pretty mt-6 max-w-lg text-lg leading-relaxed text-walnut/85">{t('rangeBody')}</p>
          </Reveal>

          {/* segmented control */}
          <Reveal delay={0.1}>
            <div
              role="group"
              aria-label={t('rangeSwitch')}
              className="relative inline-flex rounded-full border border-walnut/25 p-1"
            >
              {MODES.map((option) => {
                const active = mode === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    aria-pressed={active}
                    className="relative rounded-full px-7 py-3 text-[0.95rem] font-medium transition-colors duration-300"
                  >
                    {active && (
                      <motion.span
                        layoutId="range-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-forest"
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                      />
                    )}
                    <span className={`relative ${active ? 'text-ivory' : 'text-walnut'}`}>
                      {t(option.label)}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {range.map((pair, i) => {
            const flipped = mode === 'modern'
            return (
              <Reveal key={pair.room} delay={0.05 * i} as="li">
                <div style={{ perspective: 1400 }}>
                  <motion.div
                    className="relative aspect-[3/4] w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: still ? 0 : flipped ? 180 : 0 }}
                    transition={{
                      duration: 0.85,
                      delay: still ? 0 : i * 0.07,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  >
                    <Face data={pair.classic} visible={!flipped} label={t(pair.classic.label)} />
                    <Face data={pair.modern} visible={flipped} back label={t(pair.modern.label)} />
                  </motion.div>
                </div>

                <h3 className="mt-5 font-display text-xl text-ink">{t(pair.room)}</h3>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-walnut/65">
                  {t(flipped ? pair.modern.label : pair.classic.label)}
                </p>
              </Reveal>
            )
          })}
        </ul>

        <Reveal delay={0.15}>
          <a
            href={wa(
              'Hello Heaven Furniture Mart, I would like to see more of your work. Do you have other pieces in this style?',
            )}
            target="_blank"
            rel="noreferrer"
            className="group mt-12 inline-flex items-center gap-2.5 border-b border-walnut/30 pb-1 font-medium text-ink transition-colors duration-300 hover:border-gold-deep hover:text-gold-deep"
          >
            {t('rangeMore')}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Face({ data, visible, back = false, label }) {
  return (
    <div
      aria-hidden={!visible}
      className="arch-soft absolute inset-0 overflow-hidden bg-sand"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
      }}
    >
      <img
        src={data.image}
        alt={label}
        width={data.w}
        height={data.h}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
