/**
 * One place for every curve on the page.
 *
 * Furniture moves with weight. Nothing here uses a linear or a bouncy spring —
 * a carved sofa does not overshoot. Everything decelerates into place.
 */

/** Default. Fast out of the gate, long settle. Used for almost every entrance. */
export const EASE = [0.22, 1, 0.36, 1]

/** Symmetrical. For things that travel both ways — flips, curtains, pins. */
export const EASE_INOUT = [0.65, 0, 0.35, 1]

/** Heavier version of EASE. Long tail, for large moving surfaces. */
export const EASE_SOFT = [0.16, 1, 0.3, 1]

/** Curtain / panel movement. Slow start, decisive finish. */
export const CURTAIN = [0.76, 0, 0.24, 1]

/** Pointer-tracking springs. */
export const SPRING = { stiffness: 170, damping: 22, mass: 0.6 }
export const SPRING_SOFT = { stiffness: 90, damping: 20, mass: 0.5 }
export const SPRING_TIGHT = { stiffness: 320, damping: 30, mass: 0.5 }

/** Scroll-linked springs — softer, so scroll-driven values never feel twitchy. */
export const SCROLL_SPRING = { stiffness: 80, damping: 22, mass: 0.4 }

/** Word-by-word stagger for split headlines. */
export const WORD_STAGGER = 0.052
