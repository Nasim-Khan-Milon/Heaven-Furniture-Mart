import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { messenger, nav, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { MessengerIcon, WhatsAppIcon } from './ui'

const OPENING_MESSAGE =
  "Hello Heaven Furniture Mart, I'd like to book a free design consultation."

function LangToggle({ compact = false }) {
  const { t, lang, toggle } = useLang()
  return (
    <button
      type="button"
      onClick={toggle}
      title={t('langSwitch')}
      aria-label={t('langSwitch')}
      className={`rounded-full border border-walnut/25 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink ${
        compact ? 'px-4 py-2 text-[0.85rem]' : 'px-4 py-2.5 text-[0.85rem]'
      }`}
    >
      <span className={lang === 'en' ? 'font-bangla' : ''}>{t('langName')}</span>
    </button>
  )
}

export default function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-ivory"
      >
        {t('skip')}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-walnut/10 bg-ivory/90 py-3 backdrop-blur-md'
            : 'border-b border-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Heaven Furniture Mart — home" className="shrink-0">
            <img
              src={logo}
              alt="Heaven Furniture Mart"
              width={612}
              height={174}
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-8' : 'h-9 sm:h-10'}`}
            />
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-[0.95rem] text-walnut transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-deep after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <LangToggle />
            <a
              href={wa(OPENING_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-forest px-6 py-3 text-[0.9rem] font-medium text-ivory transition-colors duration-300 hover:bg-gold hover:text-forest-deep sm:inline-flex"
            >
              <WhatsAppIcon />
              {t('ctaBook')}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('openMenu')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-walnut/25 text-ink lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M3.5 7.5h17M3.5 16.5h17" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-forest-deep/50" onClick={() => setOpen(false)} />

            <motion.div
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ivory px-7 pt-6 pb-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <img src={logo} alt="Heaven Furniture Mart" width={612} height={174} className="h-8 w-auto" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t('closeMenu')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-walnut/25 text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="mt-12 flex flex-col" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
                    className="border-b border-walnut/12 py-5 font-display text-3xl text-ink"
                  >
                    {t(item.label)}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <LangToggle compact />
                <a
                  href={wa(OPENING_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 font-medium text-ivory"
                >
                  <WhatsAppIcon />
                  {t('ctaBookLong')}
                </a>
                <a
                  href={messenger}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-walnut/30 px-6 py-3.5 font-medium text-walnut"
                >
                  <MessengerIcon />
                  {t('ctaMessenger')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
