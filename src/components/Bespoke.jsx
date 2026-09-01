import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { craftShowcase, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { ArchImage, Marker, Reveal, Unveil, WhatsAppIcon } from './ui'

const QUESTIONS = [
  {
    key: 'piece',
    label: 'qPiece',
    options: [
      { label: 'Sofa set', phrase: 'a sofa set' },
      { label: 'Bed', phrase: 'a bed' },
      { label: 'Dining table', phrase: 'a dining table' },
      { label: 'Wardrobe', phrase: 'a wardrobe' },
      { label: 'Display cabinet', phrase: 'a display cabinet' },
      { label: 'Office desk', phrase: 'an office desk' },
      { label: 'Something else', phrase: 'a custom piece' },
    ],
  },
  {
    key: 'style',
    label: 'qStyle',
    options: [
      { label: 'Classic & carved', phrase: 'classic and carved' },
      { label: 'Modern & clean', phrase: 'modern and clean' },
      { label: 'A mix of both', phrase: 'somewhere between classic and modern' },
    ],
  },
  {
    key: 'material',
    label: 'qMaterial',
    options: [
      { label: 'Solid wood', phrase: 'in solid wood' },
      { label: 'Velvet upholstery', phrase: 'in velvet upholstery' },
      { label: 'Marble top', phrase: 'with a marble top' },
      { label: 'Glass & metal', phrase: 'in glass and metal' },
      { label: 'Not sure yet', phrase: 'with the material still open' },
    ],
  },
  {
    key: 'timing',
    label: 'qTiming',
    options: [
      { label: 'Within a month', phrase: 'I need it within a month.' },
      { label: 'In 2–3 months', phrase: 'I am planning for two to three months from now.' },
      { label: 'Just exploring', phrase: 'I am still exploring, so there is no rush.' },
    ],
  },
]

const OPENING = 'Hello Heaven Furniture Mart.'
const CLOSING = 'Could you tell me what is possible for my room, and roughly what it would cost?'

function compose(picks) {
  const { piece, style, material, timing } = picks
  if (!piece && !style && !material && !timing) {
    return `${OPENING}\n\nI would like to talk about a custom piece for my home. ${CLOSING}`
  }
  let body = `I am looking for ${piece ? piece.phrase : 'a custom piece'}`
  if (style) body += `, ${style.phrase} in style`
  if (material) body += `, ${material.phrase}`
  body += '.'
  if (timing) body += ` ${timing.phrase}`
  return `${OPENING}\n\n${body}\n\n${CLOSING}`
}

export default function Bespoke() {
  const { t } = useLang()
  const [picks, setPicks] = useState({})

  const message = useMemo(() => compose(picks), [picks])
  const chosen = Object.keys(picks).length

  const select = (key, option) =>
    setPicks((prev) => ({
      ...prev,
      [key]: prev[key]?.label === option.label ? undefined : option,
    }))

  return (
    <section id="bespoke" className="bg-forest text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------ left: the pitch */}
          <div className="lg:col-span-5">
            <Reveal>
              <Marker dark>{t('bespokeMarker')}</Marker>
              <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02] text-ivory">
                {t('bespokeTitle')}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="pretty mt-7 max-w-lg text-lg leading-relaxed text-ivory/75">{t('bespokeBody')}</p>
            </Reveal>

            <div className="mt-10 hidden max-w-sm lg:block">
              <Unveil delay={0.15}>
                <ArchImage
                  src={craftShowcase}
                  alt="Hand-carved and glazed display cabinet made by Heaven Furniture Mart"
                  w={1024}
                  h={1024}
                  shape="soft"
                  className="aspect-[4/5] w-full"
                />
              </Unveil>
            </div>
          </div>

          {/* -------------------------------------------- right: brief builder */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-[2rem] border border-ivory/15 bg-forest-soft/50 p-6 sm:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ivory/12 pb-5">
                  <h3 className="font-display text-2xl text-ivory sm:text-3xl">{t('briefTitle')}</h3>
                  <p className="text-[0.85rem] text-ivory/55">
                    {chosen} {t('briefOf')} {QUESTIONS.length} {t('briefCount')}
                  </p>
                </div>

                <div className="mt-7 space-y-7">
                  {QUESTIONS.map((q) => (
                    <fieldset key={q.key}>
                      <legend className="text-[0.9rem] text-ivory/70">{t(q.label)}</legend>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {q.options.map((option) => {
                          const active = picks[q.key]?.label === option.label
                          return (
                            <motion.button
                              key={option.label}
                              type="button"
                              onClick={() => select(q.key, option)}
                              aria-pressed={active}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className={`rounded-full border px-4 py-2 text-[0.9rem] transition-colors duration-250 ${
                                active
                                  ? 'border-gold bg-gold text-forest-deep'
                                  : 'border-ivory/25 text-ivory/80 hover:border-gold/70 hover:text-ivory'
                              }`}
                            >
                              {option.label}
                            </motion.button>
                          )
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>

                <div className="mt-9 border-t border-ivory/12 pt-7">
                  <p className="text-[0.85rem] text-ivory/55">
                    {t('briefPreface')}
                  </p>

                  <div className="relative mt-3 min-h-[8.5rem] rounded-2xl bg-forest-deep/60 p-5 sm:min-h-[7.5rem]">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={message}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.28 }}
                        className="pretty whitespace-pre-line text-[0.95rem] leading-relaxed text-ivory/90"
                      >
                        {message}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <a
                    href={wa(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 font-medium text-forest-deep transition-colors duration-300 hover:bg-ivory sm:w-auto"
                  >
                    <WhatsAppIcon />
                    {t('briefSend')}
                  </a>

                  <p className="mt-4 text-[0.82rem] leading-relaxed text-ivory/50">
                    {t('briefFree')}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
