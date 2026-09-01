import { sofaEmbroidery, styling, wa } from '../data/site'
import { ArchImage, ArrowIcon, Marker, Reveal, Unveil } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function Styling() {
  const { t } = useLang()

  return (
    <section id="styling" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Marker>{t('styMarker')}</Marker>
              <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
                {t('styTitle')}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="pretty mt-7 max-w-xl text-lg leading-relaxed text-walnut/85">{t('styBody')}</p>
            </Reveal>

            <ul className="mt-10 divide-y divide-walnut/15 border-y border-walnut/15">
              {styling.map((item, i) => (
                <Reveal key={item.title} delay={0.05 * i} as="li">
                  <div className="py-5">
                    <h3 className="font-display text-xl text-ink">{t(item.title)}</h3>
                    <p className="pretty mt-1.5 text-[0.95rem] leading-relaxed text-walnut/75">
                      {t(item.body)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.15}>
              <a
                href={wa(
                  'Hello Heaven Furniture Mart, I would like help styling a full room. Could we talk it through?',
                )}
                target="_blank"
                rel="noreferrer"
                className="group mt-9 inline-flex items-center gap-2.5 border-b border-walnut/30 pb-1 font-medium text-ink transition-colors duration-300 hover:border-gold-deep hover:text-gold-deep"
              >
                {t('styCta')}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Unveil>
              <ArchImage
                src={sofaEmbroidery}
                alt="Embroidered sofa styled within a full living room scheme"
                w={1024}
                h={1024}
                shape="soft"
                className="aspect-[4/5] w-full"
              />
            </Unveil>
          </div>
        </div>
      </div>
    </section>
  )
}
