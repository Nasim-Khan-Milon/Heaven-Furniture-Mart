import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contact, messenger, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { MessengerIcon, WhatsAppIcon } from './ui'

export default function MobileBar() {
  const { t } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/12 bg-forest-deep/95 px-4 py-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-3">
            <a
              href={`tel:${contact.phoneRaw}`}
              aria-label={t('ctaCall')}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .7-.2 1l-2.3 2.2Z" />
              </svg>
            </a>
            <a
              href={messenger}
              target="_blank"
              rel="noreferrer"
              aria-label={t('ctaMessenger')}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory"
            >
              <MessengerIcon className="h-5 w-5" />
            </a>
            <a
              href={wa("Hello Heaven Furniture Mart, I'd like to book a free design consultation.")}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gold py-3.5 font-medium text-forest-deep"
            >
              <WhatsAppIcon />
              {t('ctaBookLong')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
