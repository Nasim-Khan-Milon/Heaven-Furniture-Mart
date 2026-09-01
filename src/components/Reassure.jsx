import { showroomLiving, contact, messenger, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { ArchImage, MessengerIcon, Reveal, Unveil, WhatsAppIcon } from './ui'

const STEPS = [
  { title: 'reassure1Title', body: 'reassure1Body' },
  { title: 'reassure2Title', body: 'reassure2Body' },
  { title: 'reassure3Title', body: 'reassure3Body' },
]

/**
 * Sits directly under the hero. Many of Heaven's customers will be buying
 * something this expensive online for the first time — this says plainly that
 * the page is not a shop and nothing here takes their money.
 */
export default function Reassure() {
  const { t } = useLang()

  return (
    <section id="how-to-order" className="bg-linen py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <h2 className="balance font-display text-[length:var(--text-section)] leading-[1.08]">
            {t('reassureTitle')}
          </h2>
          <p className="pretty mt-5 max-w-2xl text-lg leading-relaxed text-walnut/85">
            {t('reassureBody')}
          </p>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={0.05 * i} as="li">
              <div className="flex h-full flex-col rounded-2xl border border-walnut/15 bg-ivory/70 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-lg text-forest-deep">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl leading-snug text-ink">
                  {t(step.title)}
                </h3>
                <p className="pretty mt-2.5 text-[0.95rem] leading-relaxed text-walnut/80">
                  {t(step.body)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* the strongest reassurance of all: a real address you can walk into */}
        <div className="mt-12 grid grid-cols-1 gap-8 rounded-2xl border border-walnut/15 bg-ivory/70 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Unveil>
              <ArchImage
                src={showroomLiving}
                alt={t('reassureShowroom')}
                w={1448}
                h={1086}
                shape="low"
                className="aspect-[4/3] w-full"
              />
            </Unveil>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <h3 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                {t('reassureShowroom')}
              </h3>
              <p className="pretty mt-3 max-w-xl text-[1rem] leading-relaxed text-walnut/80">
                {t('reassureShowroomBody')}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={wa(
                    "Hello Heaven Furniture Mart, I'd like to book a free design consultation.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-forest px-6 py-3.5 font-medium text-ivory transition-colors duration-300 hover:bg-gold hover:text-forest-deep"
                >
                  <WhatsAppIcon />
                  {t('ctaWhatsapp')}
                </a>
                <a
                  href={messenger}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-walnut/30 px-6 py-3.5 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink"
                >
                  <MessengerIcon />
                  {t('ctaMessenger')}
                </a>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-walnut/30 px-6 py-3.5 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink"
                >
                  {t('ctaCall')} {contact.phoneDisplay}
                </a>
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-b border-walnut/30 pb-0.5 text-[0.95rem] text-walnut transition-colors hover:border-gold-deep hover:text-gold-deep"
                >
                  {t('reassureDirections')}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
