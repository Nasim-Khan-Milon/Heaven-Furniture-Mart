import { motion } from 'framer-motion'
import { EASE } from './config'
import { useMotionPrefs } from './MotionProvider'

/**
 * The quiet entrance. Rise, with a touch of blur burning off as it lands —
 * the blur is what separates this from the fade-and-slide every page does,
 * and it reads as something coming into focus rather than appearing.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  y = 22,
  blur = true,
  amount = 0.3,
  once = true,
}) {
  const { still } = useMotionPrefs()
  const Tag = motion[as] ?? motion.div

  if (still) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/**
 * Grid and list entrances. The parent owns the timing so the children stay in
 * sequence no matter how many there are, and a `<ul>` keeps its `<li>`s.
 */
export function Stagger({
  children,
  className = '',
  as = 'div',
  delay = 0,
  stagger = 0.075,
  amount = 0.18,
  once = true,
}) {
  const { still } = useMotionPrefs()
  const Tag = motion[as] ?? motion.div

  if (still) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className = '', as = 'div', y = 30 }) {
  const { still } = useMotionPrefs()
  const Tag = motion[as] ?? motion.div

  if (still) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(5px)' },
        shown: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: EASE },
        },
      }}
    >
      {children}
    </Tag>
  )
}
