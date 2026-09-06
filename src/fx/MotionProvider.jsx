import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

<<<<<<< HEAD
/**
 * Decides once, at the top of the tree, how much motion this visitor gets.
 *
 * Three independent questions, because they have different answers:
 *   still — did they ask for reduced motion? Then almost everything stops.
 *   fine  — do they have a real pointer? Gates the cursor, magnets and tilt,
 *           so a tap on a phone never leaves a card stuck at an angle.
 *   lite  — is this a modest device? Drops the per-frame work (dust, grain,
 *           velocity tracking) but keeps every scroll and entrance animation.
 *   frugal — is the *connection* metered or slow? Gates payload, not frames.
 *
 * `lite` and `frugal` are separate on purpose. `lite` asks "will this device
 * drop frames running JavaScript every frame", and answers it with core and
 * memory counts. That is the wrong question to ask about a video: H.264 decode
 * is hardware-accelerated on essentially every phone of the last decade, so a
 * handset that stutters on a particle canvas still plays a clip perfectly.
 * Gating video on `lite` would have hidden it from most mobile visitors for no
 * reason. What actually matters for a video is whether the visitor is paying
 * for the bytes — which is `frugal`.
 *
 * A mid-range Android on 4G in Chattogram is the realistic visitor here, so
 * `lite` is the case the page is actually tuned for — not the desktop.
 */

=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
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
<<<<<<< HEAD
      /** Metered or slow connection — suppress anything that costs bytes. */
      frugal: caps.frugal,
      /** True once the intro curtain has opened and the page may animate in. */
=======

      frugal: caps.frugal,

>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
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
