import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Decides once, at the top of the tree, how much motion this visitor gets.
 *
 * Three independent questions, because they have different answers:
 *   still — did they ask for reduced motion? Then almost everything stops.
 *   fine  — do they have a real pointer? Gates the cursor, magnets and tilt,
 *           so a tap on a phone never leaves a card stuck at an angle.
 *   lite  — is this a modest device or a metered connection? Drops the
 *           per-frame work (dust, grain, velocity tracking) but keeps every
 *           scroll and entrance animation.
 *
 * A mid-range Android on 4G in Chattogram is the realistic visitor here, so
 * `lite` is the case the page is actually tuned for — not the desktop.
 */

const MotionContext = createContext(null)

const DEFAULTS = { still: false, fine: false, lite: true, ready: false, intro: true }

export function MotionProvider({ children }) {
  const reduced = useReducedMotion()
  const [caps, setCaps] = useState({ fine: false, lite: true })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    // Cheap proxies for "this device will drop frames if I run a canvas".
    const cores = navigator.hardwareConcurrency ?? 4
    const memory = navigator.deviceMemory ?? 4
    const saveData = navigator.connection?.saveData === true
    const slowLink = /2g/.test(navigator.connection?.effectiveType ?? '')

    setCaps({ fine, lite: saveData || slowLink || cores <= 4 || memory <= 4 })
  }, [])

  // Reduced motion skips the intro entirely — the page is simply there.
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
      /** True once the intro curtain has opened and the page may animate in. */
      ready: ready || still,
      /** Whether the intro sequence should run at all. */
      intro: !still,
      done,
    }),
    [still, caps.fine, caps.lite, ready, done],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotionPrefs() {
  return useContext(MotionContext) ?? DEFAULTS
}
