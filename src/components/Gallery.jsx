import { gallery } from '../data/site'
import { Marker, Reveal } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function Gallery() {
  const { t } = useLang()

  return (
    <section className="overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <Marker>{t('galMarker')}</Marker>
            <h2 className="mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
              {t('galTitle')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[0.9rem] text-walnut/60">{t('galSwipe')}</p>
          </Reveal>
        </div>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:gap-7 sm:px-8 lg:px-12">
        {gallery.map((shot) => (
          <figure
            key={shot.src}
            className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw] xl:w-[22rem]"
          >
            <div className="arch-soft aspect-[3/4] w-full overflow-hidden bg-sand">
              <img
                src={shot.src}
                alt={t(shot.alt)}
                width={shot.w}
                height={shot.h}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-[1.05]"
              />
            </div>
            <figcaption className="mt-4 text-[0.85rem] leading-relaxed text-walnut/60">
              {t(shot.alt)}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
