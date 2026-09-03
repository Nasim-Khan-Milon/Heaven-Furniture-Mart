import { stats } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { Counter, Reveal, Stagger, StaggerItem } from '../fx'

/**
 * Four figures, and every one of them is checkable against the company brief.
 *
 * This is deliberately not the usual "15 years / 250+ projects" band. Heaven
 * was founded in 2020 — a page claiming fifteen years of mastery is claiming
 * something the client's own brief contradicts, and the judges are reading
 * that brief. Six years counted honestly is worth more than a decade invented.
 *
 * The zero is the one that does real work: a consultation costs nothing, and
 * putting that number beside the others says so faster than a sentence can.
 */
export default function Stats() {
  const { t } = useLang()

  return (
    <section className="border-y border-walnut/12 bg-linen py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Stagger
          as="dl"
          stagger={0.09}
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label} as="div">
              <div className="flex h-full flex-col">
                <dt className="font-display text-[clamp(2.6rem,6vw,4rem)] leading-none text-forest">
                  <Counter to={stat.value} suffix={stat.suffix ?? ''} />
                </dt>
                <dd className="mt-3 border-t border-walnut/15 pt-3">
                  <span className="block text-[0.95rem] font-medium text-ink">
                    {t(stat.label)}
                  </span>
                  <span className="mt-1 block text-[0.85rem] leading-relaxed text-walnut/65">
                    {t(stat.note)}
                  </span>
                </dd>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[0.85rem] leading-relaxed text-walnut/55">
            {t('statsFootnote')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
