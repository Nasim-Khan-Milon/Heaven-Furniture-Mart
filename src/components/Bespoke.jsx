import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { craftShowcase, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { ArchImage, Marker, WhatsAppIcon } from './ui'
import { Magnetic, Reveal, SplitText } from '../fx'

const QUESTIONS = [
  {
    key: 'piece',
    label: 'qPiece',
    options: [
      { id: 'sofa', label: 'optSofa', phrase: 'phSofa' },
      { id: 'bed', label: 'optBed', phrase: 'phBed' },
      { id: 'dining', label: 'optDining', phrase: 'phDining' },
      { id: 'wardrobe', label: 'optWardrobe', phrase: 'phWardrobe' },
      { id: 'cabinet', label: 'optCabinet', phrase: 'phCabinet' },
      { id: 'desk', label: 'optDesk', phrase: 'phDesk' },
      { id: 'other', label: 'optOther', phrase: 'phOther' },
    ],
  },
  {
    key: 'style',
    label: 'qStyle',
    options: [
      { id: 'classic', label: 'optClassic', phrase: 'phClassic' },
      { id: 'modern', label: 'optModern', phrase: 'phModern' },
      { id: 'mix', label: 'optMix', phrase: 'phMix' },
    ],
  },
  {
    key: 'material',
    label: 'qMaterial',
    options: [
      { id: 'wood', label: 'optWood', phrase: 'phWood' },
      { id: 'velvet', label: 'optVelvet', phrase: 'phVelvet' },
      { id: 'marble', label: 'optMarble', phrase: 'phMarble' },
      { id: 'glass', label: 'optGlass', phrase: 'phGlass' },
      { id: 'unsure', label: 'optUnsure', phrase: 'phUnsure' },
    ],
  },
  {
    key: 'timing',
    label: 'qTiming',
    options: [
      { id: 'soon', label: 'optSoon', phrase: 'phSoon' },
      { id: 'later', label: 'optLater', phrase: 'phLater' },
      { id: 'browsing', label: 'optBrowsing', phrase: 'phBrowsing' },
    ],
  },
]

function join(parts) {
  return parts.filter(Boolean).join(' ')
}

function compose(picks, t) {
  const { piece, style, material, timing } = picks
  const opening = t('msgOpening')
  const closing = t('msgClosing')

  if (!piece && !style && !material && !timing) {
    return `${opening}\n\n${t('msgEmpty')}\n\n${closing}`
  }

  let body = join([t('msgLead'), t(piece ? piece.phrase : 'phOther'), t('msgLeadEnd')])
  if (style) body += `, ${join([t('msgStyleLead'), t(style.phrase), t('msgStyleEnd')])}`
  if (material) body += `, ${t(material.phrase)}`
  body += t('msgStop')
  if (timing) body += ` ${t(timing.phrase)}`

  return `${opening}\n\n${body}\n\n${closing}`
}

export default function Bespoke() {
  const { t, n } = useLang()
  const [picks, setPicks] = useState({})

  const message = useMemo(() => compose(picks, t), [picks, t])
  const chosen = Object.keys(picks).length

  const select = (key, option) =>
    setPicks((prev) => ({
      ...prev,
      [key]: prev[key]?.id === option.id ? undefined : option,
    }))

  return (
    <section id="bespoke" className="bg-forest text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Marker dark>{t('bespokeMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('bespokeTitle')}
              className={`balance mt-6 block text-ivory font-display text-[length:var(--text-display)] leading-[1.02]`}
            />

            <Reveal delay={0.1}>
              <p className="pretty mt-7 max-w-lg text-lg leading-relaxed text-ivory/85">{t('bespokeBody')}</p>
            </Reveal>

            <div className="mt-10 hidden max-w-sm lg:block">
              <ArchImage
                src={craftShowcase}
                alt="Hand-carved and glazed display cabinet made by Heaven Furniture Mart"
                w={1024}
                h={1024}
                shape="soft"
                drift={9}
                delay={0.1}
                className="aspect-[4/5] w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-[2rem] border border-ivory/15 bg-forest-soft/50 p-6 sm:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ivory/12 pb-5">
                  <h3 className="font-display text-2xl text-ivory sm:text-3xl">{t('briefTitle')}</h3>
                  <p className="text-[0.92rem] text-ivory/70">
                    {n(chosen)} {t('briefOf')}{' '}
                    {n(QUESTIONS.length)} {t('briefCount')}
                  </p>
                </div>

                <div className="mt-7 space-y-7">
                  {QUESTIONS.map((q) => (
                    <fieldset key={q.key}>
                      <legend className="text-[0.96rem] text-ivory/82">{t(q.label)}</legend>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {q.options.map((option) => {
                          const active = picks[q.key]?.id === option.id
                          return (
                            <motion.button
                              key={option.id}
                              type="button"
                              onClick={() => select(q.key, option)}
                              aria-pressed={active}
                              whileTap={{ scale: 0.94 }}
                              whileHover={{ y: -2 }}
                              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                              className={`rounded-full border px-4 py-2 text-[0.96rem] transition-colors duration-250 ${
                                active
                                  ? 'border-gold bg-gold text-forest-deep'
                                  : 'border-ivory/25 text-ivory/88 hover:border-gold/70 hover:text-ivory'
                              }`}
                            >
                              {t(option.label)}
                            </motion.button>
                          )
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>

                <div className="mt-9 border-t border-ivory/12 pt-7">
                  <p className="text-[0.92rem] text-ivory/70">
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
                        className="pretty whitespace-pre-line text-[1.02rem] leading-relaxed text-ivory/90"
                      >
                        {message}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <Magnetic className="mt-5 block w-full sm:w-auto">
                    <a
                      href={wa(message)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 font-medium text-forest-deep transition-colors duration-300 hover:bg-ivory sm:w-auto"
                    >
                      <WhatsAppIcon />
                      {t('briefSend')}
                    </a>
                  </Magnetic>

                  <p className="mt-4 text-[0.88rem] leading-relaxed text-ivory/66">
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
