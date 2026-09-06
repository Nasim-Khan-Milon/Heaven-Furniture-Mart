import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'heaven-lang'

const BN_DIGITS = '\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF'

export function localiseNumber(value, lang) {
  const text = String(value)
  if (lang !== 'bn') return text
  return text.replace(/[0-9]/g, (digit) => BN_DIGITS[Number(digit)])
}

function detect() {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'bn') return saved

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
    }
  }, [lang])

  const t = useCallback(
    (key) => {
      if (!key) return ''
      const entry = strings[key]
      if (!entry) return key
      return entry[lang] ?? entry.en
    },
    [lang],
  )

  const n = useCallback((input) => localiseNumber(input, lang), [lang])

  const value = useMemo(
    () => ({ lang, t, n, toggle: () => setLang((l) => (l === 'en' ? 'bn' : 'en')) }),
    [lang, t, n],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
