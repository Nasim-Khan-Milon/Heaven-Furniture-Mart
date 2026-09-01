import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'heaven-lang'

function detect() {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'bn') return saved
  // Default to Bangla for Bangla-speaking browsers — most of Heaven's
  // customers are in Chattogram.
  return navigator.language?.toLowerCase().startsWith('bn') ? 'bn' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    setLang(detect())
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* private browsing — the choice just won't persist */
    }
  }, [lang])

  /** Look up a key, or pass through a plain string unchanged. */
  const t = useCallback(
    (key) => {
      if (!key) return ''
      const entry = strings[key]
      if (!entry) return key
      return entry[lang] ?? entry.en
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, t, toggle: () => setLang((l) => (l === 'en' ? 'bn' : 'en')) }),
    [lang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
