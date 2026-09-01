import { useEffect, useRef } from 'react'
import { useMotionPrefs } from './MotionProvider'

/**
 * Dust catching the light behind the hero.
 *
 * Photographs of Heaven's showroom have shafts of light in them; this is the
 * cheapest honest way to put air into the space between the headline and the
 * arch. Thirty-odd motes on one canvas — no DOM nodes, no layout, one composite
 * per frame.
 *
 * Stops entirely when the hero scrolls off, and never starts on `lite`
 * hardware or under reduced motion.
 */
export default function DustMotes({ count = 34 }) {
  const canvasRef = useRef(null)
  const { still, lite } = useMotionPrefs()

  useEffect(() => {
    if (still || lite) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = 0
    let height = 0
    let motes = []
    let frame
    let running = true

    const size = () => {
      const box = canvas.getBoundingClientRect()
      width = box.width
      height = box.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.7,
        // Slow upward drift with a slight sideways bias, like warm air.
        vy: -(0.06 + Math.random() * 0.16),
        vx: (Math.random() - 0.5) * 0.09,
        a: 0.12 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      for (const m of motes) {
        m.x += m.vx
        m.y += m.vy
        if (m.y < -6) {
          m.y = height + 6
          m.x = Math.random() * width
        }
        if (m.x < -6) m.x = width + 6
        if (m.x > width + 6) m.x = -6

        // Each mote breathes at its own rate so the field never looks uniform.
        const twinkle = 0.72 + 0.28 * Math.sin(time / 1400 + m.phase)
        ctx.beginPath()
        ctx.fillStyle = `rgba(217, 162, 39, ${m.a * twinkle})`
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }

    size()
    seed()
    frame = requestAnimationFrame(draw)

    const resize = () => {
      size()
      seed()
    }
    window.addEventListener('resize', resize)

    // Stop the loop the moment the hero leaves the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          frame = requestAnimationFrame(draw)
        } else if (!entry.isIntersecting) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [count, still, lite])

  if (still || lite) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
