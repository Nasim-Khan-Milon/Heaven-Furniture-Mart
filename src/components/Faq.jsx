import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqs, wa } from '../data/site'
import { Marker, WhatsAppIcon } from './ui'
import { Reveal, SplitText } from '../fx'
import { useLang } from '../i18n/LanguageContext'

export default function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-linen py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Marker>{t('faqMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('faqTitle')}
              className={`balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]`}
            />
            <Reveal delay={0.18}>
              <p className="pretty mt-6 max-w-sm text-[1.02rem] leading-relaxed text-walnut/88">{t('faqNote')}</p>
              <a
                href={wa('Hello Heaven Furniture Mart, I have a question about your work.')}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-walnut/30 px-6 py-3 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                <WhatsAppIcon />
                {t('faqCta')}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-walnut/20">
              {faqs.map((faq, i) => {
                const isOpen = open === i
                return (
                  <Reveal key={faq.q} delay={0.04 * i}>
                    <div className="border-b border-walnut/20">
                      <dt>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? -1 : i)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-6 py-6 text-left"
                        >
                          <span className="font-display text-xl text-ink sm:text-2xl">
                            {t(faq.q)}
                          </span>
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-walnut/25 text-gold-deep"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5" fill="none">
                              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                            </svg>
                          </motion.span>
                        </button>
                      </dt>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.dd
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pretty max-w-2xl pb-7 text-[1rem] leading-relaxed text-walnut/90">
                              {t(faq.a)}
                            </p>
                          </motion.dd>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                )
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
