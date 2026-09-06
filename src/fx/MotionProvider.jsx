import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const MotionContext = createContext(null)

const DEFAULTS = { still: false, fine: false, lite: true, frugal: true, ready: false, intro: true }

export function MotionProvider({ children }) {
  const reduced = useReducedMotion()
  const [caps, setCaps] = useState({ fine: false, lite: true, frugal: true })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const cores = navigator.hardwareConcurrency ?? 4
    const memory = navigator.deviceMemory ?? 4
    const saveData = navigator.connection?.saveData === true
    const slowLink = /2g/.test(navigator.connection?.effectiveType ?? '')

    setCaps({
      fine,
      lite: saveData || slowLink || cores <= 4 || memory <= 4,
      frugal: saveData || /(^|\W)(slow-2g|2g|3g)($|\W)/.test(navigator.connection?.effectiveType ?? ''),
    })
  }, [])

  const still = reduced === true
  useEffect(() => {
    if (still) setReady(true)
  }, [still])

  const done = useCallback(() => setReady(true), [])

  const value = useMemo(
    () => ({
      still,
      fine: caps.fine && !still,
      lite: caps.lite,

      frugal: caps.frugal,

      ready: ready || still,

      intro: !still,
      done,
    }),
    [still, caps.fine, caps.lite, caps.frugal, ready, done],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotionPrefs() {
  return useContext(MotionContext) ?? DEFAULTS
}
