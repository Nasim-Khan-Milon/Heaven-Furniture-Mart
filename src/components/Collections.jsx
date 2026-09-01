import { collections, wa } from '../data/site'
import { ArrowIcon, Marker, Reveal, Tilt, Unveil } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function Collections() {
  const { t } = useLang()

  return (
    <section id="collections" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Marker>{t('collMarker')}</Marker>
            <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
              {t('collTitle')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-walnut/70">{t('collNote')}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 lg:grid-cols-4">
          {collections.map((item, i) => (
            <a
              key={item.name}
              href={wa(
                `Hello Heaven Furniture Mart, I'm interested in your ${t(item.name).toLowerCase()} furniture. Could you share some options?`,
              )}
              target="_blank"
              rel="noreferrer"
              className={`group block ${i % 2 === 1 ? 'lg:mt-16' : ''}`}
            >
              <Unveil delay={0.05 * i}>
                <Tilt max={8} lift={18}>
                  <div className="arch relative aspect-[3/4] w-full overflow-hidden bg-sand">
                  <img
                    src={item.image}
                    alt={`${t(item.name)} — Heaven Furniture Mart`}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                </Tilt>
              </Unveil>

              <Reveal delay={0.05 * i + 0.1}>
                <h3 className="mt-5 flex items-center gap-2 font-display text-xl text-ink sm:text-2xl">
                  {t(item.name)}
                  <ArrowIcon className="h-4 w-4 -translate-x-1 text-gold-deep opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-walnut/65">
                  {t(item.pieces)}
                </p>
                <p className="mt-3 border-l border-gold/50 pl-3 text-[0.85rem] leading-relaxed text-walnut/80">
                  {t(item.note)}
                </p>
              </Reveal>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
