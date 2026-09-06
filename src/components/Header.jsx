import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import logo from '../assets/logo.png'
import { messenger, nav, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { MessengerIcon, WhatsAppIcon } from './ui'
import { EASE, Magnetic, SPRING_TIGHT, useMotionPrefs } from '../fx'

const OPENING_MESSAGE =
  "Hello Heaven Furniture Mart, I'd like to book a free design consultation."

const FLIP = 'cubic-bezier(0.76, 0, 0.24, 1)'

function splitLabel(label, lang) {
  if (lang !== 'en') return [label]
  return Array.from(String(label))
}

function Roll({ label, lang, still }) {
  const parts = splitLabel(label, lang)

  if (still) return <span className="block">{label}</span>

  const layer = (offset) =>
    parts.map((char, i) => (
      <span
        key={`${offset}-${i}`}
        className="inline-block will-change-transform"
        style={{
          transition: `transform 520ms ${FLIP}`,
          transitionDelay: `${i * 26}ms`,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <span className="relative block overflow-hidden pb-[0.18em] -mb-[0.18em]">
      <span className="nav-roll-top flex whitespace-nowrap">{layer('a')}</span>
      <span aria-hidden="true" className="nav-roll-bottom absolute inset-0 flex whitespace-nowrap">
        {layer('b')}
      </span>
    </span>
  )
}

function LangToggle({ compact = false }) {
  const { t, lang, toggle } = useLang()
  return (
    <button
      type="button"
      onClick={toggle}
      title={t('langSwitch')}
      aria-label={t('langSwitch')}
      className={`rounded-full border border-walnut/25 font-medium text-walnut transition-colors duration-300 hover:border-ink hover:text-ink ${
        compact ? 'px-4 py-2 text-[0.92rem]' : 'px-4 py-2.5 text-[0.92rem]'
      }`}
    >
      <span className={lang === 'en' ? 'font-bangla' : ''}>{t('langName')}</span>
    </button>
  )
}

function DesktopNav() {
  const { t, lang } = useLang()
  const { still } = useMotionPrefs()
  const listRef = useRef(null)
  const [pill, setPill] = useState({ x: 0, w: 0, show: false })
  const [active, setActive] = useState(null)

  const track = useCallback((event) => {
    const list = listRef.current
    if (!list) return
    const item = event.currentTarget.getBoundingClientRect()
    const bounds = list.getBoundingClientRect()
    setPill({ x: item.left - bounds.left, w: item.width, show: true })
  }, [])

  const clear = useCallback(() => {
    setPill((prev) => ({ ...prev, show: false }))
    setActive(null)
  }, [])

  return (
    <nav
      ref={listRef}
      onMouseLeave={clear}
      className="relative hidden items-center lg:flex"
      aria-label="Main"
    >
      {!still && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-full border border-gold-deep/25 bg-linen"
          initial={false}
          animate={{
            x: pill.x,
            width: pill.w,
            opacity: pill.show ? 1 : 0,
            scale: pill.show ? 1 : 0.86,
          }}
          transition={{ ...SPRING_TIGHT, type: 'spring' }}
        />
      )}

      {nav.map((item, i) => (
        <motion.a
          key={item.href}
          href={item.href}
          onMouseEnter={(event) => {
            track(event)
            setActive(i)
          }}
          onFocus={(event) => {
            track(event)
            setActive(i)
          }}
          onBlur={clear}
          animate={{ opacity: active === null || active === i || still ? 1 : 0.4 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="group relative z-10 px-4 py-2 text-[1.02rem] text-walnut transition-colors duration-300 hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-3 h-[5px] w-[5px] -translate-y-1/2 rotate-45 scale-0 bg-gold-deep opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
            <Roll label={t(item.label)} lang={lang} still={still} />
          </span>
        </motion.a>
      ))}
    </nav>
  )
}

export default function Header() {
  const { t } = useLang()
  const { still } = useMotionPrefs()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(!open && y > previous && y > 280)
  })

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

      <motion.header
        animate={{ y: hidden && !still ? '-105%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ${
          scrolled
            ? 'border-b border-walnut/10 bg-ivory/90 py-3 backdrop-blur-md'
            : 'border-b border-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Heaven Furniture Mart — home" className="group shrink-0">
            <img
              src={logo}
              alt="Heaven Furniture Mart"
              width={612}
              height={174}
              className={`w-auto origin-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-80 ${
                scrolled ? 'h-8' : 'h-9 sm:h-10'
              }`}
            />
          </a>

          <DesktopNav />

          <div className="flex items-center gap-2.5">
            <LangToggle />
            <Magnetic className="hidden sm:inline-block">
              <a
                href={wa(OPENING_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-forest px-6 py-3 text-[0.96rem] font-medium text-ivory transition-colors duration-500 hover:text-forest-deep"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />
                <span className="relative flex items-center gap-2">
                  <WhatsAppIcon />
                  {t('ctaBook')}
                </span>
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('openMenu')}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-walnut/25 text-ink transition-colors duration-300 hover:border-gold-deep lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M3.5 7.5h17M3.5 16.5h17" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

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
                    className="group flex items-center gap-3 border-b border-walnut/12 py-5 font-display text-3xl text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] rotate-45 scale-0 bg-gold-deep opacity-0 transition-all duration-500 group-active:scale-100 group-active:opacity-100"
                    />
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
