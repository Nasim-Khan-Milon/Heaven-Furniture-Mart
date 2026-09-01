import { reasons } from '../data/site'
import { Marker, Reveal, Tilt } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function WhyHeaven() {
  const { t } = useLang()

  return (
    <section id="why" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Marker>{t('whyMarker')}</Marker>
            <h2 className="balance mt-6 font-display text-[length:var(--text-display)] leading-[1.02]">
              {t('whyTitle')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-walnut/70">{t('whyNote')}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={t(reason.title)} delay={0.04 * i} as="li">
              <Tilt max={7} lift={16} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-walnut/15 bg-linen/45 p-6 transition-colors duration-300 hover:border-gold/60">
                  <span className="font-display text-2xl text-gold-deep">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl leading-snug text-ink">
                    {t(reason.title)}
                  </h3>
                  <p className="pretty mt-2.5 text-[0.9rem] leading-relaxed text-walnut/75">
                    {t(reason.body)}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
