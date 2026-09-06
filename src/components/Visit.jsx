import logoLight from '../assets/logo-light.png'
import { contact, messenger, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { Marker, MessengerIcon, WhatsAppIcon } from './ui'
import { Magnetic, Reveal, SplitText } from '../fx'

const socials = [
  { label: 'Facebook', href: contact.facebook },
  { label: 'Instagram', href: contact.instagram },
  { label: 'YouTube', href: contact.youtube },
]

export default function Visit() {
  const { t } = useLang()

  return (
    <footer id="visit" className="bg-forest-deep text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 pb-10 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Marker dark>{t('visitMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('visitTitle')}
              className={`balance mt-6 block text-ivory font-display text-[length:var(--text-display)] leading-[1.02]`}
            />
            <Reveal delay={0.18}>
              <p className="pretty mt-6 max-w-md text-lg leading-relaxed text-ivory/82">{t('visitBody')}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <a
                    href={wa(
                      "Hello Heaven Furniture Mart, I'd like to book a free design consultation.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 font-medium whitespace-nowrap text-forest-deep transition-colors duration-300 hover:bg-ivory"
                  >
                    <WhatsAppIcon />
                    {t('ctaWhatsapp')}
                  </a>
                </Magnetic>
                <a
                  href={messenger}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ivory/30 px-8 py-4 font-medium whitespace-nowrap text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <MessengerIcon />
                  {t('ctaMessenger')}
                </a>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ivory/30 px-8 py-4 font-medium whitespace-nowrap text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {t('ctaCall')} {contact.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pt-4">
            <Reveal delay={0.05}>
              <h3 className="font-display text-lg text-gold">{t('visitShowroom')}</h3>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-ivory/82">
                Heaven Furniture Mart
                <br />
                Agrabad Access Road
                <br />
                Chattogram, Bangladesh
              </p>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block border-b border-ivory/30 pb-0.5 text-[0.96rem] text-ivory/85 transition-colors hover:border-gold hover:text-gold"
              >
                {t('visitMaps')}
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-display text-lg text-gold">{t('visitTalk')}</h3>
              <p className="mt-3 flex flex-col gap-2 text-[1.02rem] text-ivory/82">
                <a href={`tel:${contact.phoneRaw}`} className="transition-colors hover:text-gold">
                  {contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-gold"
                >
                  {contact.email}
                </a>
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="font-display text-lg text-gold">{t('visitFollow')}</h3>
              <ul className="mt-3 flex flex-col gap-2 text-[1.02rem] text-ivory/82">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-gold"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-[1.75rem] border border-ivory/15">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/12 bg-forest/50 px-6 py-4">
              <p className="text-[0.96rem] text-ivory/85">
                {t('visitAddress')}
              </p>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[0.96rem] text-gold transition-colors hover:text-ivory"
              >
                {t('visitDirections')}
              </a>
            </div>
            <iframe
              title="Heaven Furniture Mart showroom on Agrabad Access Road, Chattogram"
              src="https://www.google.com/maps?q=Heaven%20Furniture%20Mart%2C%20Agrabad%20Access%20Road%2C%20Chattogram&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full border-0 bg-forest/40 sm:h-[380px]"
              style={{ filter: 'grayscale(0.35) contrast(1.05)' }}
            />
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ivory/12 pt-8 sm:flex-row sm:items-center">
          <img
            src={logoLight}
            alt="Heaven Furniture Mart"
            width={612}
            height={174}
            loading="lazy"
            className="h-9 w-auto"
          />
          <p className="text-[0.92rem] text-ivory/62">
            {t('footerNote')}
          </p>
        </div>
      </div>
    </footer>
  )
}
