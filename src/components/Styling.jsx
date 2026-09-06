import { sofaEmbroidery, styling, wa } from '../data/site'
import { ArchImage, ArrowIcon, Marker } from './ui'
import { Reveal, SplitText, Stagger, StaggerItem } from '../fx'
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
            </Reveal>
            <SplitText
              as="h2"
              text={t('styTitle')}
              className={`balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]`}
            />

            <Reveal delay={0.1}>
              <p className="pretty mt-7 max-w-xl text-lg leading-relaxed text-walnut/92">{t('styBody')}</p>
            </Reveal>

            <Stagger as="ul" className="mt-10 divide-y divide-walnut/15 border-y border-walnut/15">
              {styling.map((item) => (
                <StaggerItem key={item.title} as="li">
                  <div className="py-5">
                    <h3 className="font-display text-xl text-ink">{t(item.title)}</h3>
                    <p className="pretty mt-1.5 text-[1.02rem] leading-relaxed text-walnut/88">
                      {t(item.body)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

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
            <ArchImage
              src={sofaEmbroidery}
              alt="Embroidered sofa styled within a full living room scheme"
              w={1024}
              h={1024}
              shape="soft"
              drift={8}
              className="aspect-[4/5] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
