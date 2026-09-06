import { motion } from 'framer-motion'
import { testimonials, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { GhostButton, Marker, WhatsAppIcon } from './ui'
import { EASE, Reveal, SplitText, useMotionPrefs } from '../fx'

const OPENING_MESSAGE =
  "Hello Heaven Furniture Mart, I'd like to book a free design consultation."

function Star({ delay, still }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.05rem] w-[1.05rem] text-gold"
      fill="currentColor"
      initial={still ? false : { opacity: 0, scale: 0.4, y: 4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <path d="M12 2.6l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 16.6 6.4 19.8l1.3-6.3L3 9.2l6.3-.7L12 2.6Z" />
    </motion.svg>
  )
}

function Stars({ base, still, label }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} delay={base + i * 0.08} still={still} />
      ))}
    </span>
  )
}

function Avatar({ photo, initial, name }) {
  return (
    <span className="relative grid h-[3.4rem] w-[3.4rem] shrink-0 place-items-center">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-gold-deep/30 transition-colors duration-500 group-hover:border-gold-deep/70"
      />
      {photo ? (
        <img
          src={photo}
          alt={name}
          width={160}
          height={160}
          loading="lazy"
          decoding="async"
          className="h-[2.85rem] w-[2.85rem] rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-[2.85rem] w-[2.85rem] place-items-center rounded-full bg-forest font-display text-lg text-ivory transition-colors duration-500 group-hover:bg-forest-soft"
        >
          {initial}
        </span>
      )}
    </span>
  )
}

function Card({ person, index, still }) {
  const { t } = useLang()
  const beat = index * 0.13

  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 46, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: beat, ease: EASE }}
      className="h-full"
    >
      <motion.figure
        whileHover={still ? undefined : { y: -8, transition: { duration: 0.45, ease: EASE } }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-walnut/20 bg-linen/70 p-7 transition-[border-color,box-shadow] duration-500 hover:border-gold-deep/45 hover:shadow-[0_18px_40px_-24px_rgba(36,28,21,0.45)] sm:p-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gold/0 blur-3xl transition-colors duration-700 group-hover:bg-gold/20"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-deep/70 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />

        <div className="relative flex items-center justify-between gap-4">
          <Stars base={beat + 0.2} still={still} label={t('testiRatingLabel')} />
          <motion.span
            aria-hidden="true"
            initial={still ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: beat + 0.1, ease: EASE }}
            className="font-display text-5xl leading-[0.4] text-gold-deep/25 transition-colors duration-500 group-hover:text-gold-deep/45"
          >
            &ldquo;
          </motion.span>
        </div>

        <blockquote className="pretty relative mt-6 flex-1 text-[1.06rem] leading-[1.75] text-walnut">
          <motion.p
            initial={still ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: beat + 0.22, ease: EASE }}
          >
            {t(person.quote)}
          </motion.p>
        </blockquote>

        <figcaption className="relative mt-7 flex items-center gap-4 border-t border-walnut/15 pt-6">
          <Avatar photo={person.photo} initial={t(person.initial)} name={t(person.name)} />
          <div className="min-w-0">
            <p className="font-display text-[1.15rem] leading-tight text-ink">{t(person.name)}</p>
            <p className="mt-1 text-[0.92rem] text-walnut/90">{t(person.place)}</p>
          </div>
        </figcaption>

        <p className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-forest/10 px-3.5 py-1.5 text-[0.86rem] font-medium text-forest">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
          {t(person.bought)}
        </p>
      </motion.figure>
    </motion.div>
  )
}

export default function Testimonials() {
  const { t, n } = useLang()
  const { still } = useMotionPrefs()

  return (
    <section id="reviews" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Reveal>
            <Marker>{t('testiMarker')}</Marker>
          </Reveal>
          <SplitText
            as="h2"
            text={t('testiTitle')}
            className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.04]"
          />
          <Reveal delay={0.1}>
            <p className="pretty mt-7 text-lg leading-relaxed text-walnut/90">{t('testiBody')}</p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-walnut/15 py-5">
            <span className="flex items-center gap-3">
              <Stars base={0.25} still={still} label={t('testiRatingLabel')} />
              <span className="font-display text-xl text-ink">{n('5.0')}</span>
            </span>
            <span className="text-[0.98rem] text-walnut/92">{t('testiTrust')}</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((person, i) => (
            <Card key={person.id} person={person} index={i} still={still} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-4 lg:mt-16">
          <GhostButton href={wa(OPENING_MESSAGE)} target="_blank" rel="noreferrer" magnetic>
            <WhatsAppIcon />
            {t('testiCta')}
          </GhostButton>
          <p className="text-[1.02rem] text-walnut/88">{t('testiCtaNote')}</p>
        </Reveal>
      </div>
    </section>
  )
}
