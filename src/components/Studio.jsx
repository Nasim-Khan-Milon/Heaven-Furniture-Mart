import { showroomLiving } from '../data/site'
import { ArchImage, Marker } from './ui'
import { Reveal, SplitText, Stagger, StaggerItem } from '../fx'
import { useLang } from '../i18n/LanguageContext'

<<<<<<< HEAD

// The founding year lives in the stats band immediately below this section;
// stating it twice in two hundred pixels reads as a page repeating itself.
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
const facts = [
  { big: 'fact2Big', small: 'fact2' },
  { big: 'fact3Big', small: 'fact3' },
]

export default function Studio() {
  const { t } = useLang()

  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Marker>{t('studioMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('studioTitle')}
              className={`balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]`}
            />

            <Reveal delay={0.1}>
              <p className="pretty mt-7 max-w-lg text-lg leading-relaxed text-walnut/92">
                {t('studioBody')}
              </p>
            </Reveal>

            <Stagger as="dl" className="mt-12 divide-y divide-walnut/15 border-y border-walnut/15">
              {facts.map((fact) => (
                <StaggerItem key={fact.big}>
                  <div className="flex items-baseline gap-6 py-5">
                    <dt className="w-32 shrink-0 font-display text-2xl text-forest sm:text-3xl">
                      {t(fact.big)}
                    </dt>
                    <dd className="text-[1.02rem] leading-relaxed text-walnut/88">{t(fact.small)}</dd>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:col-span-7">
            <ArchImage
              src={showroomLiving}
              alt="Carved living room set on display in the Agrabad showroom"
              w={1448}
              h={1086}
              shape="low"
              drift={9}
              className="aspect-[4/3] w-full"
            />
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-walnut/75">
                {t('studioCaption')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
