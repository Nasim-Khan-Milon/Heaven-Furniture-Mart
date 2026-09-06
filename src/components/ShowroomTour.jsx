import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import tourPoster from '../assets/showroom-tour.webp'
import { contact } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { Marker } from './ui'
import { Reveal, SplitText, useMotionPrefs } from '../fx'

const SRC = '/media/showroom-tour.mp4'

export default function ShowroomTour() {
  const { t } = useLang()
  const { still } = useMotionPrefs()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)

  const start = () => {
    setStarted(true)
    requestAnimationFrame(() => {
      const node = videoRef.current
      if (!node) return
      node.play().catch(() => {})
    })
  }

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative overflow-hidden bg-forest-deep py-20 text-ivory sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Marker dark>{t('tourMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('tourTitle')}
              className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02] text-ivory"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs text-[1.02rem] leading-relaxed text-ivory/74">{t('tourBody')}</p>
          </Reveal>
        </div>

        <Reveal delay={0.08} y={40}>
          <div className="relative mx-auto mt-12 w-full max-w-[46rem] lg:mt-14">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-3 -top-3 -bottom-3 rounded-[6px] border border-ivory/10 sm:-inset-x-5 sm:-top-5 sm:-bottom-5"
            />

            <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-forest-soft">
              {started ? (
                <video
                  ref={videoRef}
                  src={SRC}
                  poster={tourPoster}
                  controls
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={start}
                  aria-label={t('tourPlay')}
                  className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden"
                >
                  <img
                    src={tourPoster}
                    alt={t('tourPoster')}
                    width={1000}
                    height={563}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full scale-[1.01] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-forest-deep/25"
                  />

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                      {!still && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-gold/50"
                          animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gold/95 text-forest-deep transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="ml-1 h-6 w-6 sm:h-7 sm:w-7"
                        >
                          <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                        </svg>
                      </span>
                    </span>
                  </span>

                  {/* On a phone the frame is short enough that this row runs into
                      the play button, so it only shows from sm up. */}
                  <span className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-3 p-5 text-left sm:flex sm:p-7">
                    <span className="font-display text-lg text-ivory sm:text-xl">
                      {t('tourPlay')}
                    </span>
                    <span className="text-[0.86rem] tracking-[0.12em] text-gold">
                      {t('tourLength')}
                    </span>
                  </span>
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg text-ivory sm:hidden">{t('tourPlay')}</p>
                <p className="mt-1 text-[0.86rem] tracking-[0.12em] text-gold sm:hidden">
                  {t('tourLength')}
                </p>
                <p className="mt-2 text-[0.92rem] text-ivory/62 sm:mt-0">{t('tourHint')}</p>
              </div>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 border-b border-ivory/30 pb-0.5 text-[0.96rem] text-ivory/85 transition-colors hover:border-gold hover:text-gold"
              >
                {t('visitDirections')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
