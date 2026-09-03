import { useEffect, useRef, useState } from 'react'
import { useMotionPrefs } from './MotionProvider'

/**
 * A muted background clip that behaves itself.
 *
 * Video is the one thing on a page that can genuinely ruin the experience it
 * was added to improve, so every branch here is about *not* playing it:
 *
 *   - No `src` at all → the poster renders and nothing else happens. The page
 *     works today, with photographs, and gains video the moment a file exists.
 *   - `still` (reduced motion) → poster only. The clip is never requested.
 *   - `frugal` (save-data, or a 2g/3g connection) → poster only, and the file
 *     is never fetched. Someone paying by the megabyte should not be charged
 *     for decoration.
 *
 *     Note this gates on the *connection*, not on `lite`. `lite` counts cores
 *     and memory to decide whether a device will drop frames running
 *     JavaScript — a different question entirely. Video decode is hardware
 *     accelerated; a phone that stutters on a particle canvas plays a clip
 *     fine. Gating on `lite` would have hidden video from most phones, which
 *     is exactly the audience the clip is for.
 *   - Off screen → paused. A clip playing three sections above where someone
 *     is reading burns battery for nobody.
 *   - Autoplay refused by the browser → the poster simply stays. Nothing
 *     breaks, nothing is blank.
 *
 * The poster sits *underneath* the video rather than only in the `poster`
 * attribute, so the crossfade to first frame is ours to time and a failed load
 * degrades to a photograph instead of a black rectangle.
 *
 * `playsInline` is not optional: without it iOS Safari takes any autoplaying
 * video fullscreen, which on a landing page reads as a hijack.
 */
export default function Video({
  src,
  poster,
  alt,
  w,
  h,
  className = '',
  mediaClassName = 'h-full w-full object-cover',
}) {
  const { still, frugal } = useMotionPrefs()
  const holder = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)

  const wanted = Boolean(src) && !still && !frugal

  useEffect(() => {
    if (!wanted) return
    const node = video.current
    const box = holder.current
    if (!node || !box) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // A rejected play() is a normal outcome, not an error to surface.
          node.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        } else {
          node.pause()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(box)
    return () => observer.disconnect()
  }, [wanted])

  return (
    <div ref={holder} className={`relative ${className}`}>
      <img
        src={poster}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className={mediaClassName}
      />

      {wanted && (
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={(event) => {
            event.currentTarget.play().then(() => setPlaying(true)).catch(() => {})
          }}
          className={`absolute inset-0 transition-opacity duration-700 ${mediaClassName} ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
