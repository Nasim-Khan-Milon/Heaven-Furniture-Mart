import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gallery } from '../data/site'
import { Marker } from './ui'
import { useLang } from '../i18n/LanguageContext'
import { Reveal, SplitText, useMotionPrefs } from '../fx'

/**
 * Recent work, as a rail you pull rather than a grid you scan.
 *
 * On a pointer device the rail is dragged, with momentum, and the cursor says
 * so — dragging is a better fit for a portfolio than arrows, because it lets
 * someone move at their own pace through work of uneven interest.
 *
 * On touch it stays native scroll with snap points. A JS drag layer on a phone
 * would only get in the way of the gesture the browser already handles better.
 */
export default function Gallery() {
  const { t } = useLang()
  const { fine, still } = useMotionPrefs()
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const node = track.current
      if (!node) return
      setDistance(Math.max(0, node.scrollWidth - node.offsetWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready?.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const draggable = fine && !still

  const shots = gallery.map((shot, i) => (
    <figure
      key={shot.src}
      className={`group ${
        draggable ? 'w-[26vw] max-w-[22rem] shrink-0' : 'w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw] xl:w-[22rem]'
      }`}
    >
      <div className="arch-soft aspect-[3/4] w-full overflow-hidden bg-sand">
        <img
          src={shot.src}
          alt={t(shot.alt)}
          width={shot.w}
          height={shot.h}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
      </div>
      <figcaption className="mt-4 flex items-start gap-3 text-[0.85rem] leading-relaxed text-walnut/60">
        <span className="mt-[0.55em] h-px w-4 shrink-0 bg-gold-deep transition-all duration-500 group-hover:w-7" />
        {t(shot.alt)}
      </figcaption>
    </figure>
  ))

  return (
    <section className="overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <Marker>{t('galMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('galTitle')}
              className="mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="text-[0.9rem] text-walnut/60">
              {draggable ? t('cursorDrag') : t('galSwipe')}
            </p>
          </Reveal>
        </div>
      </div>

      {draggable ? (
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -distance, right: 0 }}
          dragElastic={0.06}
          dragTransition={{ power: 0.28, timeConstant: 380, bounceStiffness: 200, bounceDamping: 34 }}
          whileDrag={{ cursor: 'grabbing' }}
          data-cursor={t('cursorDrag')}
          className="mt-12 flex cursor-grab gap-7 px-12 pb-2"
        >
          {shots}
        </motion.div>
      ) : (
        <div
          ref={track}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:gap-7 sm:px-8 lg:px-12"
        >
          {shots}
        </div>
      )}
    </section>
  )
}
