import { milestones } from '../data/site'
import { Marker, Reveal } from './ui'
import { useLang } from '../i18n/LanguageContext'


export default function Story() {
  const { t } = useLang()

  return (
    <section id="story" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Marker>{t('storyMarker')}</Marker>
              <blockquote className="mt-7">
                <p className="balance font-display text-[length:var(--text-section)] leading-[1.16] text-ink italic">
                  “{t('storyQuote')}”
                </p>
                <footer className="mt-7 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold-deep" />
                  <span className="text-[0.95rem] text-walnut/80">{t('storyBy')}</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <h3 className="font-display text-2xl text-ink">{t('storyTimeline')}</h3>
            </Reveal>
            <ol className="mt-7 border-l border-walnut/20 pl-7">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={0.05 * i} as="li">
                  <div className="relative pb-7 last:pb-0">
                    <span className="absolute top-[0.55rem] -left-[2.05rem] h-[7px] w-[7px] rotate-45 bg-gold" />
                    <p className="font-display text-lg text-forest">{m.year}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-walnut/75">{t(m.text)}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
