import { milestones } from '../data/site'
import { Marker } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { LitText, Reveal, SplitText, Stagger, StaggerItem } from '../fx'

/**
 * The managing director's words, lit one at a time as they are read.
 *
 * This is the only place on the page where scrolling drives type, and it is
 * deliberately the only place: the quote is the single strongest piece of proof
 * Heaven has, so slowing a visitor to reading pace is the point. Anywhere else
 * it would just be a trick.
 *
 * The timeline beside it is a genuine sequence, which is the one thing that
 * earns numbered markers — so it gets years, not invented step numbers.
 */
export default function Story() {
  const { t } = useLang()

  return (
    <section id="story" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Marker>{t('storyMarker')}</Marker>
            </Reveal>

            <blockquote className="mt-7">
              <LitText
                text={`“${t('storyQuote')}”`}
                className="balance font-display text-[length:var(--text-section)] leading-[1.16] italic"
              />
              <footer className="mt-7 flex items-center gap-4">
                <Reveal delay={0.1} className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gold-deep" />
                  <span className="text-[0.95rem] text-walnut/80">{t('storyBy')}</span>
                </Reveal>
              </footer>
            </blockquote>
          </div>

          <div className="lg:col-span-5">
            <SplitText
              as="h3"
              text={t('storyTimeline')}
              className="block font-display text-2xl text-ink"
            />

            <Stagger as="ol" className="relative mt-7 border-l border-walnut/20 pl-7">
              {milestones.map((m) => (
                <StaggerItem key={m.year} as="li" y={18}>
                  <div className="group relative pb-7 last:pb-0">
                    <span className="absolute top-[0.55rem] -left-[2.05rem] h-[7px] w-[7px] rotate-45 bg-gold transition-transform duration-500 group-hover:scale-150" />
                    <p className="font-display text-lg text-forest">{m.year}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-walnut/75">{t(m.text)}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
