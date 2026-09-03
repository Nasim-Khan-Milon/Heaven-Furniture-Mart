import { collections, wa } from '../data/site'
import { ArrowIcon, Marker, Tilt } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { ParallaxImage, Reveal, SplitText, Stagger, StaggerItem } from '../fx'

/**
 * Four rooms, staggered off each other's baseline so the row reads as a set of
 * pieces placed in a space rather than a product grid.
 *
 * Every card is a WhatsApp link with the room already written into the opening
 * message, so a visitor who taps "Dining" arrives in a conversation that has
 * already started. The whole page funnels to one action; this is that action,
 * pre-filled four different ways.
 */
export default function Collections() {
  const { t } = useLang()

  return (
    <section id="collections" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Marker>{t('collMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('collTitle')}
              className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-walnut/70">{t('collNote')}</p>
          </Reveal>
        </div>

        <Stagger
          stagger={0.09}
          className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 lg:grid-cols-4"
        >
          {collections.map((item, i) => (
            <StaggerItem key={item.name} y={38}>
              <a
                href={wa(
                  `Hello Heaven Furniture Mart, I'm interested in your ${t(item.name).toLowerCase()} furniture. Could you share some options?`,
                )}
                target="_blank"
                rel="noreferrer"
                className={`group block ${i % 2 === 1 ? 'lg:mt-16' : ''}`}
              >
                <Tilt max={8} lift={18}>
                  <ParallaxImage
                    src={item.image}
                    alt={`${t(item.name)} — Heaven Furniture Mart`}
                    w={item.w}
                    h={item.h}
                    shape="full"
                    drift={6}
                    className="aspect-[3/4] w-full"
                    frameClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                </Tilt>

                <h3 className="mt-5 flex items-center gap-2 font-display text-xl text-ink sm:text-2xl">
                  {t(item.name)}
                  <ArrowIcon className="h-4 w-4 -translate-x-1 text-gold-deep opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-walnut/65">
                  {t(item.pieces)}
                </p>
                <p className="mt-3 border-l border-gold/50 pl-3 text-[0.85rem] leading-relaxed text-walnut/80">
                  {t(item.note)}
                </p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
