import { diningMarble, materials } from '../data/site'
import { ArchImage, Marker, Reveal, Tilt, Unveil } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function Materials() {
  const { t } = useLang()

  return (
    <section id="materials" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Unveil>
              <ArchImage
                src={diningMarble}
                alt="Marble-top dining table with hand-finished upholstered chairs"
                w={1087}
                h={1447}
                shape="soft"
                className="aspect-[3/4] w-full"
              />
            </Unveil>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Marker>{t('matMarker')}</Marker>
              <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
                {t('matTitle')}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="pretty mt-7 max-w-xl text-lg leading-relaxed text-walnut/85">{t('matBody')}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-10 text-[0.9rem] text-walnut/60">{t('matNote')}</p>
            </Reveal>

            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {materials.map((material, i) => (
                <Reveal key={material.name} delay={0.04 * i} as="li">
                  <Tilt max={12} lift={22} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-walnut/15 bg-linen/40 p-4">
                      <span
                        aria-hidden="true"
                        className="h-14 w-full rounded-lg shadow-sm"
                        style={{ background: material.swatch }}
                      />
                      <span className="mt-3 font-display text-lg text-ink">{t(material.name)}</span>
                      <span className="mt-0.5 text-[0.8rem] leading-snug text-walnut/65">
                        {t(material.note)}
                      </span>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
