import { motion } from 'framer-motion'
import { diningMarble, materials } from '../data/site'
import { ArchImage, Layer, Marker, Tilt } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { Reveal, SplitText, Stagger, StaggerItem, useMotionPrefs } from '../fx'

export default function Materials() {
  const { t } = useLang()
  const { still } = useMotionPrefs()

  return (
    <section id="materials" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ArchImage
              src={diningMarble}
              alt="Marble-top dining table with hand-finished upholstered chairs"
              w={1087}
              h={1447}
              shape="soft"
              drift={9}
              className="aspect-[3/4] w-full"
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Marker>{t('matMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('matTitle')}
              className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]"
            />

            <Reveal delay={0.16}>
              <p className="pretty mt-7 max-w-xl text-lg leading-relaxed text-walnut/92">
                {t('matBody')}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-10 text-[0.96rem] text-walnut/75">{t('matNote')}</p>
            </Reveal>

            <Stagger as="ul" stagger={0.06} className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {materials.map((material) => (
                <StaggerItem key={material.name} as="li" y={22}>
                  <Tilt max={12} lift={22} glare={false} className="h-full">
                    <div className="group flex h-full flex-col rounded-xl border border-walnut/15 bg-linen/40 p-4 transition-colors duration-500 hover:border-gold/60">
                      <Layer z={40} className="w-full">
                      <span
                        aria-hidden="true"
                        className="relative block h-14 w-full overflow-hidden rounded-lg shadow-md"
                        style={{ background: material.swatch }}
                      >
                        {!still && (
                          <motion.span
                            className="absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                            initial={{ x: '0%' }}
                            whileInView={{ x: '420%' }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 1.3, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
                          />
                        )}
                      </span>
                      </Layer>
                      <Layer z={18}>
                        <span className="mt-3 block font-display text-lg text-ink">{t(material.name)}</span>
                        <span className="mt-0.5 block text-[0.86rem] leading-snug text-walnut/80">
                          {t(material.note)}
                        </span>
                      </Layer>
                    </div>
                  </Tilt>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
