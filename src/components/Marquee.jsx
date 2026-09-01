import { useLang } from '../i18n/LanguageContext'
import { VelocityMarquee } from '../fx'

const WORDS = ['marqueeDesigned', 'marqueeCrafted', 'marqueeCustomized']

/**
 * Heaven's own three-word pitch, running as a band across the page.
 *
 * It drifts on its own but scrolling pushes it — scroll hard and it runs ahead,
 * scroll back up and it reverses. It is the one element that visibly answers to
 * the visitor's own movement, which is worth more here than a fourth entrance
 * animation would be.
 */
export default function Marquee() {
  const { t } = useLang()

  return (
    <section aria-hidden="true" className="overflow-hidden border-y border-walnut/12 bg-forest py-6">
      <VelocityMarquee baseSpeed={2.2}>
        {WORDS.map((word) => (
          <span key={word} className="flex items-center gap-10 pr-10">
            <span className="font-display text-2xl text-ivory/85 sm:text-3xl">{t(word)}</span>
            <span className="inline-block h-[6px] w-[6px] rotate-45 bg-gold" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  )
}
