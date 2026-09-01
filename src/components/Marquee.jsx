import { useLang } from '../i18n/LanguageContext'

const WORDS = ['marqueeDesigned', 'marqueeCrafted', 'marqueeCustomized']

export default function Marquee() {
  const { t } = useLang()
  // Duplicated once so the track can loop seamlessly at -50%.
  const run = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

  return (
    <section aria-hidden="true" className="overflow-hidden border-y border-walnut/12 bg-forest py-6">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[...run, ...run].map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl text-ivory/85 sm:text-3xl">{t(word)}</span>
            <span className="inline-block h-[6px] w-[6px] rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </section>
  )
}
