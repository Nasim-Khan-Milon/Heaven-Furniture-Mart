import { useEffect, useRef, useState } from 'react'
import { useMotionPrefs } from './MotionProvider'

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
