import { work } from '../data/site'
import { Marker } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { Corridor, Reveal, SplitText } from '../fx'

export default function Showroom3D() {
  const { t } = useLang()

  return (
    <section id="work" className="relative bg-forest-deep py-20 text-ivory sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Marker dark>{t('galMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('galTitle')}
              className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02] text-ivory"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs text-[1.02rem] leading-relaxed text-ivory/74">{t('walkNote')}</p>
          </Reveal>
        </div>
      </div>

      <Corridor
        panels={work}
        labelFor={(panel) => t(panel.alt)}
        className="mt-10 lg:mt-0"
      />
    </section>
  )
}
