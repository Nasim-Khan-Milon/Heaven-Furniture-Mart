# Heaven Furniture Mart

Marketing site for Heaven Furniture Mart, a bespoke furniture studio on Agrabad
Access Road, Chattogram. The site is a single scrolling page in English and
Bangla, built to turn a visitor into a WhatsApp or Messenger conversation
rather than an online order — there is no cart and no checkout.

Built with React 19, Vite 7, Tailwind CSS v4 and Framer Motion.

---

## Quick start

Requires Node.js 20.19+ or 22.12+ (Vite 7's minimum).

```bash
npm install
npm run dev        # dev server, usually http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-free production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check the real output |

## Deploying

`vercel.json` pins the framework to Vite, the build command to `npm run build`
and the output directory to `dist/`. Any static host works — build and upload
`dist/`.

---

## Project layout

<<<<<<< HEAD
**The logo is the real one.** It was extracted from the assets embedded in
Heaven's own brochure PDF rather than redrawn, so the wordmark on the page is
the brand's actual mark. `logo-light.png` is a recoloured variant for the dark
footer, generated from the same source.

**The palette comes from the brand, not a template.** The accent gold
(`#D9A227`) is sampled from the `A` in that logo. It sits against a warm ivory
(`#F7F2E8`) base and a deep forest-teal (`#14332B`) for the dark bands — the
brief's "charcoal-teal", pushed greener so it harmonises with the warm, gold-lit
tone of Heaven's photography.

**Typography is Bodoni Moda over Jost.** A didone display face paired with a
geometric sans. Bodoni is neoclassical, which is the same design language as the
carved and gilt pieces Heaven actually builds; Jost's geometry echoes the
letterforms in the wordmark.

**The arch is the structural motif.** Every image frame is arch-topped rather
than a rounded rectangle, taken from the crowns of Heaven's display cabinets and
the curved headboards on their beds (`.arch`, `.arch-soft`, `.arch-low` in
`src/index.css`). It keeps the page from reading as a generic card grid.

**One clear action, repeated.** Every call to action leads to the same place —
WhatsApp on +880 1960-481983 — with a pre-written opening message that matches
the context it was tapped from. Nothing competes with it.

### The brief builder

The bespoke section holds the one interactive moment on the page. Four
tap-to-answer questions — piece, style, material, timing — compose a WhatsApp
message in real time in front of the visitor, then hand it off pre-filled. It
turns "I should enquire sometime" into a message that is already written, which
is the single biggest thing standing between a curious visitor and a lead.

Every question is optional; the message stays sensible no matter which
combination is chosen. See `src/components/Bespoke.jsx`.

---

## Performance and accessibility

- Photography converted to WebP and resized — nine images total about 1.3 MB.
- Every image carries explicit `width`/`height` to avoid layout shift, and
  everything below the fold is lazy-loaded.
- `prefers-reduced-motion` is honoured throughout: Lenis smooth scroll never
  initialises, and all reveals resolve instantly.
- Keyboard focus is visible on every interactive element, there's a skip link,
  the chip group uses `aria-pressed`, and the mobile drawer locks body scroll.
- Structured data (`FurnitureStore`) plus Open Graph tags are in `index.html`.

### Three implementation notes

**Percentages resolve against different axes.** `ParallaxImage` used to offset
its photograph with `-top-[10%]` and `h-[120%]`. A percentage `top` resolves
against the containing block's *height*, but a percentage `margin` resolves
against its *width* — mixing the two renders the frame at the right size with
the photograph sitting off its centre. The drift now runs on a wrapper pinned
to `inset-0` and scaled by `1 + drift/50`, so the travel can never expose an
edge no matter how far the frame is driven.

**Framer's inline transform beats a Tailwind class.** Anything Framer animates
gets an inline `transform`, which wins over a utility class — so a
`group-hover:scale-*` applied to an animated image silently does nothing. Hover
transforms get their own untouched layer (`frameClassName` in
`ParallaxImage`); that is the only reason the Collections zoom works.

**A scroll hook must mount with the element it measures.** `useScroll({ target })`
subscribes once, on mount, to whatever the ref points at — and it never
re-subscribes when that ref is populated later, because the ref object's own
identity does not change. `Corridor` originally kept the hook in the parent and
chose its layout from an effect, so the first render returned the flat column,
`wrap.current` was null at subscribe time, and progress sat at exactly zero for
the life of the page. Every panel rendered at its resting depth, which looks
entirely plausible and animates nothing. The 3D rail is its own component now,
so the hook and its target mount in the same commit; `Workshop.jsx` already did
this with `PinnedRail`, for the same reason.

The tell, if this ever recurs: read the live `z` values while scrolling. If they
are exactly `-index * GAP` at every scroll position, progress is pinned at zero.

**Clip-path hides an element from its own observer.** Scroll reveals use
`useInView` on an outer wrapper, with the `clip-path` transition on an inner
element. Chromium factors an element's own `clip-path` into its intersection
ratio, so observing the clipped node directly reports zero and the element
stays hidden forever. The split in `Unveil` (`src/components/ui.jsx`) avoids
that.

---

## Structure

```
src/
  App.jsx                 section order, providers, Lenis smooth scroll
  index.css               Tailwind v4 theme tokens, arch utilities, grain keyframes
  data/site.js            contact details, collections, milestones — edit copy here
  i18n/strings.js         every visible string, English and Bangla
  assets/                 WebP photography, logo variants

  fx/                     the motion system — components compose these
    MotionProvider.jsx    still / fine / lite capability gate, intro ready flag
    config.js             every easing curve and spring on the page
    Preloader.jsx         the intro: dimension lines, counter, parting curtains
    SplitText.jsx         masked word reveals, Bangla-safe
    ParallaxImage.jsx     curtain + zoom settle + light sweep + scroll drift
    Reveal.jsx            Reveal, Stagger, StaggerItem
    LitText.jsx           scroll-lit passage (the founder quote)
    VelocityMarquee.jsx   scroll-velocity-driven band
    Corridor.jsx          the 3D corridor: walls, floor, frames at depth
    Counter.jsx           count-up figures for the proof band
    Video.jsx             muted background clips, gated on connection cost
    Magnetic.jsx          pointer-seeking CTA wrapper
    Atmosphere.jsx        film grain, drifting ambient light
    DustMotes.jsx         hero dust canvas
    ScrollRail.jsx        top reading-progress hairline

  components/
    ui.jsx                ArchImage, Tilt, Marker, buttons, icons
    Header.jsx            sticky nav that retreats on scroll, mobile drawer
    Hero.jsx              headline, arch alcove, dimension overlay
    HeroShowcase.jsx      rotating cut-out pieces with contact shadow
    MeasureOverlay.jsx    self-drawing architect's dimension annotation
    Reassure.jsx          how ordering works, showroom address
    Studio.jsx            brand introduction
    WhyHeaven.jsx         eight trust points, on tilting depth cards
    Collections.jsx       four room categories
    Bespoke.jsx           the brief builder
    Range.jsx             classic / modern flip cards
    Materials.jsx         swatch board with sheen
    Workshop.jsx          pinned horizontal five-stage rail
    Styling.jsx           full-room styling service
    Marquee.jsx           velocity-reactive brand band
    Process.jsx           four-step process with self-drawing rule
    Story.jsx             founder quote, milestone timeline
    Showroom3D.jsx        recent work, hung down the 3D corridor
    Stats.jsx             four figures, all checkable against the brief
    Faq.jsx               six questions
    Quote.jsx             consultation form — composes, never posts
    Visit.jsx             closing call to action, contact, footer
    MobileBar.jsx         sticky mobile call to action
=======
```text
index.html            Meta tags, Google Fonts link, FurnitureStore JSON-LD
src/
  main.jsx            Entry point
  App.jsx             Section order, Lenis smooth scroll, providers
  index.css           Tailwind v4 @theme tokens: colour, type, motion
  components/         One file per page section (25 files)
  fx/                 Reusable motion primitives (16 files)
  data/site.js        Contact details, nav, and all section content lists
  i18n/
    strings.js        Every string on the page, keyed, en + bn
    LanguageContext.jsx  Language state, t(), Bangla numeral helper
  assets/             Images, all .webp except the two logos
public/media/         Workshop and showroom video (.mp4)
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
```

Sections render in the order set by `App.jsx`. To reorder the page, move the
components there; nothing else depends on their sequence.

---

## Content and copy

**All user-facing text lives in `src/i18n/strings.js`.** Nothing is hardcoded in
a component. Each entry carries both languages:

```js
heroBadge: { en: 'Free design consultation', bn: 'ফ্রি ডিজাইন পরামর্শ' },
```

Components read it through the `t()` helper:

```jsx
const { t, lang } = useLang()
<p>{t('heroBadge')}</p>
```

If you add a key, add both `en` and `bn` — a missing `bn` value falls through to
the English string, which looks like a bug to a Bangla reader.

Structured content (nav items, collections, FAQs, testimonials, hero pieces)
lives in `src/data/site.js` as arrays of objects whose fields are *string keys*,
not strings. That keeps the data bilingual by construction.

<<<<<<< HEAD
## Flat is not the same as dead

Two sections swap technique below `lg`, and both got that wrong at first.
`Workshop`'s pinned rail became a swipe rail with no motion on it at all, and
`Corridor`'s 3D fell back to a bare grid of `<img>` tags — the only stretch of
the page where nothing moved.

Dropping *the technique* on a phone is right: pinning fights the address bar,
and deep perspective costs fill rate and needs a wide viewport to read. Dropping
*the idea* is not. The swipe rail now focuses one stage at a time exactly as the
pinned version does, and the flat corridor goes through `ParallaxImage` like
every other photograph on the page — curtain, zoom settle, light sweep, drift.

If you change either fallback, check it the same way: read the live transform
values while scrolling. A section that renders correctly and animates nothing
looks entirely plausible in a screenshot.

## Adding video

`Workshop.jsx` ships with photographs and will play clips the moment you give
it any. Each stage in `PANELS` takes an optional `video`:

```js
import carving from '../assets/carving.mp4'

const PANELS = [
  { image: craftShowcase, video: carving, w: 1024, h: 1024, title: 'shop1', ... },
  ...
]
```

The photograph stays as the poster, so a stage with no clip is unchanged and a
clip that fails to load degrades to the photograph rather than a black box.
Heaven's own YouTube and Facebook carry workshop footage — the brief says to go
and take it. Keep clips short, silent and under about 3 MB, and export H.264
mp4: every current browser plays it.

`Video.jsx` handles the parts that are easy to get wrong. It is muted, looped
and `playsInline` — without `playsInline`, iOS Safari takes an autoplaying
video fullscreen, which on a landing page reads as a hijack. It pauses when it
leaves the viewport. A `play()` the browser refuses is treated as a normal
outcome, not an error, and the poster simply stays.

**One gate worth understanding.** Video is suppressed for reduced-motion
visitors and on `frugal` connections — save-data, or 2g/3g — and in those cases
the file is never requested at all. It is deliberately *not* gated on `lite`.
`lite` counts cores and memory to answer "will this device drop frames running
JavaScript every frame", which is the right question for the dust canvas and
the wrong one for a video: H.264 decode is hardware-accelerated on essentially
every phone of the last decade, so a handset that stutters on a particle canvas
plays a clip perfectly. Gating video on `lite` hid it from most phones — which
is exactly the audience it is for. The two flags are separate for that reason.

## The form posts nowhere, on purpose

`Quote.jsx` has the only form on the page and it has no backend. The fields
compose a message and hand it to WhatsApp — or to the mail client, for anyone
who would rather not use WhatsApp — already written. A landing page that
swallows a lead into a database nobody at Heaven checks is worse than no form
at all; this way the enquiry lands in the inbox the showroom already answers on
their phone, the visitor can see and edit it before it sends, and nothing can
be lost. Name and phone are the only required fields.

## A note on the figures

`Stats.jsx` shows four numbers and every one of them is checkable against the
company brief: six years (founded 2020), five room categories, 100% made to
order, and ৳0 for a design consultation. Nothing is rounded up and nothing is
invented. This matters more than it looks — a furniture page claiming a decade
and a half of mastery is contradicting the brief its reader is holding.

## Before you hand this to the client
=======
Phone number, WhatsApp number, email, address and social links are all in the
`contact` object in `src/data/site.js`. Change them once there and every button
on the page follows. The `wa()` helper builds a pre-filled WhatsApp link:
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)

```js
wa("Hello Heaven Furniture Mart, I'd like to book a consultation.")
```

### Language switching

`LanguageProvider` reads a saved choice from `localStorage`, otherwise falls
back to the browser locale, and writes `lang` and `data-lang` onto `<html>`.
CSS keys off `html[data-lang='bn']` to swap the font stack, loosen line-height
and drop Latin-only typographic tricks such as letter-spacing and uppercasing.

`localiseNumber(value, lang)` converts Western digits to Bangla numerals for
stats and counters.

---

## Design tokens

Defined once in `src/index.css` under Tailwind v4's `@theme`, so they are
available as both CSS variables and utility classes (`bg-gold`, `text-ink`).

### Colour

| Token | Hex | Used for |
| --- | --- | --- |
| `--color-ivory` | `#f7f2e8` | Page background |
| `--color-linen` | `#efe7d7` | Raised surfaces |
| `--color-sand` | `#e3d8c2` | Section washes |
| `--color-gold` | `#d9a227` | Hero field and wave, accents |
| `--color-gold-deep` | `#a87b1c` | Small print and rules on light ground |
| `--color-forest` | `#14332b` | Primary buttons |
| `--color-forest-deep` | `#0c1f1a` | Text on gold |
| `--color-walnut` | `#4a3728` | Body copy |
| `--color-ink` | `#241c15` | Headings |

Contrast on the gold field: ink 7.3:1, forest 6.0:1, walnut 4.9:1 — all pass
WCAG AA for body text.

### Type

| Role | Latin | Bangla |
| --- | --- | --- |
| Headings | Archivo 600–900 | Anek Bangla 600–800 |
| Body | Jost 300–600 | Hind Siliguri 300–600 |

Fonts load from Google Fonts via the `<link>` in `index.html`. **If you change a
family or weight there, change `--font-display` / `--font-sans` in
`index.css` too** — they are two separate places and drifting apart is the
easiest way to get a silent fallback to system sans.

Sizes are fluid `clamp()` values: `--text-hero`, `--text-display`,
`--text-section`. Bangla overrides them smaller inside `html[data-lang='bn']`,
because the script needs more vertical room per line.

---

## The hero

`src/components/Hero.jsx` and `src/components/HeroShowcase.jsx`.

A white rounded card floats on a full-bleed gold field, with a gold wave sweeping
across the bottom of the card. Furniture stands directly on that wave.

- **Two waves, not one.** A near-flat curve below `lg`, where the piece is
  centred, and a diagonal sweep from `lg` up, where the piece sits right of the
  copy. One path cannot do both without cutting through the furniture's legs.
- **The gold field starts below the fixed header** (`top-[5.25rem]`) so the
  logo keeps its ivory backdrop — its `A` is gold and disappears on gold.
- `HeroShowcase` owns the carousel: 5s auto-advance, pause on hover and on
  focus, previous/next buttons, an `aria-live` announcement of the current
  piece, and no motion at all under `prefers-reduced-motion`.

### Swapping hero images

Hero images **must have a transparent background** — the piece stands on the
wave with nothing boxed around it, so a white rectangle is immediately obvious.

1. Cut the background out to real alpha and export `.webp`, roughly 1400px wide.
2. Drop it in `src/assets/`.
3. Import it in `src/data/site.js` and add an entry to `heroPieces`:

   ```js
   {
     id: 'sofa-green',
     image: heroSofaGreen,
     w: 1400, h: 739,          // intrinsic size, prevents layout shift
     ref: 'HFM-SF2',           // shown next to the room label
     name: 'pieceSofaGreen',   // ↓ all four are keys into strings.js
     room: 'collLiving',
     caption: 'pieceSofaGreenC',
     alt: 'pieceSofaGreenAlt',
   }
   ```

4. Add the four strings to `src/i18n/strings.js` in both languages.

The carousel counts entries itself, so the `01 / 05` counter and the arrows need
no updating. Shoot or crop pieces so they sit on a flat baseline — they are
bottom-aligned (`object-bottom`) and a floating piece looks like it is hovering.

---

## Motion

`src/fx/` holds the shared primitives — `SplitText`, `Reveal`, `Magnetic`,
`Counter`, `ParallaxImage`, `Preloader` and others. `src/fx/config.js` holds the
shared easing curves and spring configs; use those rather than inventing new
ones per component, or the page starts to feel like several sites.

`MotionProvider` exposes `useMotionPrefs()`:

```jsx
const { still, ready, fine } = useMotionPrefs()
```

<<<<<<< HEAD
| Flag | Question | What it turns off |
| --- | --- | --- |
| `still` | `prefers-reduced-motion` | Almost everything. The intro never runs, masks render open, scroll-linked values freeze. |
| `fine` | `(hover: hover) and (pointer: fine)` | Magnetic buttons, 3D tilt, hero alcove yaw. A tap can never strand a card at an angle. |
| `lite` | `≤4 cores`, `≤4GB`, `saveData`, or `2g` | Per-frame work only: dust canvas, grain, scroll-velocity tracking. Every entrance and scroll animation still plays. |
| `frugal` | `saveData`, or a 2g/3g connection | Anything that costs bytes — currently video, which is never even requested. |
=======
- `still` — the visitor asked for reduced motion. Skip animation entirely.
- `ready` — the preloader has finished; entrance animations wait on this.
- `fine` — a precise pointer, so hover-tilt and cursor effects are worth running.
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)

Every animated component checks `still`. If you add one, check it too.

<<<<<<< HEAD
### The one orchestrated moment

`Preloader.jsx` — gold dimension lines draw around the brand, a counter runs to
100, then two forest panels part like the showroom doors. Scroll is held for its
1.8s. Skippable on any pointer, key or wheel event. The hero's own entrance is
gated on the curtain opening (`ready`), so load reads as one continuous sequence
rather than two competing ones.

Everything after this point is triggered by the visitor.

### Signature scroll moments

- **`Workshop.jsx`** — vertical scroll converted to horizontal travel while the
  section holds the screen. Five stages from carving to showroom. The outer
  height is travel distance *plus one screen*, so scroll maps 1:1 — the thing
  most pinned sections get wrong. Each panel lifts and brightens at centre
  screen. Below `lg` it becomes an ordinary swipe rail; pinning fights the
  mobile address bar and wins nothing on a touchscreen.
- **`Corridor.jsx`** — a room you walk by scrolling. Frames hang on alternating
  walls at fixed depths inside one `preserve-3d` stage, and scroll drives the
  camera past them; two wall planes and a floor give them something to hang on.
  Three things had to be right for it to read as depth rather than as floating
  cards. Wall offsets are in `vw`, not `%` — a percentage `translateX` resolves
  against the panel's own width, which moved a frame 127px and left it occluded
  by the one in front. The walls stand at 46vw, well clear of the 27vw the
  frames hang at, because a plane closer than a frame does not sit behind it:
  the browser sorts by geometry and cuts straight through the photograph. And
  the opacity band spans more than one gap, so three frames are alive at once —
  with one, it is a slideshow that happens to be dark.

  **Why not three.js.** WebGL here would add roughly 150 KB gzipped to a page
  the brief scores on speed, and it would want furniture *models*; Heaven has
  photographs. Photographs on planes in perspective is the honest version, and
  the version that survives a mid-range Android.
- **`LitText.jsx`** — the managing director's quote lights word by word as it
  crosses the screen, so reading pace and scroll pace match. Used exactly once.
  It earns the effect *because* nothing else uses it.
- **`VelocityMarquee.jsx`** — the brand band drifts on its own, but scrolling
  shoves it and scrolling up reverses it. The one place the visitor's own
  movement visibly drives something.
- **`ParallaxImage.jsx`** — every photograph arrives the same way: curtain lifts,
  image settles back from an over-zoom, one light sweep crosses it, then it
  drifts slower than its own frame forever after. The drift does the real work —
  a photo pinned to its frame reads as a sticker; one that lags reads as
  something seen through an opening.

### Supporting layers

- **`Hero`** — three things arrive after the curtain and then stop. The gold
  arch *draws* itself as an SVG stroke rather than appearing as a border, in
  one continuous pass up, over the crown and down — the same gesture as the
  dimension line below it. One low sweep of gold crosses the headline as it
  settles, once, because type that keeps shimmering never gets finished. And
  the alcove is a stack of planes at real depths — light at −110px, back wall
  at −40, the piece at +55, a sill at +95 — so yawing the box moves each by a
  different amount. That difference is the depth cue; one plane rotating is
  just a picture leaning over.
- **`SplitText.jsx`** — masked word reveals on every heading. Split by *word*,
  never character: Bangla builds conjuncts and vowel signs across several code
  points, and slicing to characters scatters যুক্তাক্ষর like ক্ষ and matras like ি
  into separate boxes. Word boundaries are the smallest unit safe in both
  scripts. Masks are padded and the padding pulled back with a negative margin,
  so descenders and matras have room without the layout shifting.
- **`Magnetic.jsx`** — only the WhatsApp CTAs lean toward the pointer. On every
  link it would be a gimmick; on the one action the page is built around it is
  emphasis.
- **`Atmosphere.jsx`** — film grain that jumps between four positions rather than
  sliding (a slide reads as moving texture; a jump reads as a new frame), and one
  warm light pool drifting as though the room has a single window.
- **`DustMotes.jsx`** — 34 motes on one canvas in the hero. Stops the instant the
  hero leaves the viewport.
- **`Reveal` / `Stagger`** — rise with a blur burning off as it lands. The blur is
  what separates it from the fade-and-slide every page does.
- **`Process`** — the rule connecting four steps draws as you scroll, X across
  desktop, Y down mobile, each node ringing once as the line reaches it. The
  animation is a genuine progress indicator, so its length means something.
- **`Range`** — four cards flip on Y in real perspective, backface hidden.
- **`Layer`** — a child of `Tilt` that sits forward of the card surface. A tilt
  alone is a flat rectangle being rotated; what sells depth is parallax between
  a card's own parts, so the numbers and headings in `WhyHeaven` and the
  swatches in `Materials` ride 18–44px in front of the panel and slide across
  it as the card turns.
- **`Counter`** — the proof figures count up once, eased rather than linear. A
  linear counter hits its target and stops dead, which reads as a progress bar.
- **`Header`** — retreats when reading downward, returns the moment you scroll up.

### Cost

The whole motion system, the 3D corridor included, costs **+4 KB gzipped** over
the build before it (146.8 KB vs 142.4 KB). No new dependencies were added — no
three.js, no GSAP, no Locomotive. Everything animates `transform`, `opacity`,
`clip-path` or `filter`; nothing animates layout.
=======
Lenis provides smooth scrolling in `App.jsx` and is disabled outright under
`prefers-reduced-motion`.
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)

---

## Accessibility

Keep these working when editing:

- Skip link to `#main` as the first focusable element.
- Visible gold focus ring on everything focusable (`:focus-visible` in
  `index.css`); never remove the outline without replacing it.
- Carousel pauses on focus, not just hover, and announces the current piece.
- Decorative SVG and imagery carry `aria-hidden="true"`; real images carry a
  translated `alt`.
- All motion respects `prefers-reduced-motion`.

---

## Image licensing

Some product renders in `src/assets/` came from stock libraries. Before this
goes to production, confirm every image is either licensed or shot in the
showroom. In particular, `hero-outdoor-teak.webp` derives from a watermarked
Vecteezy preview and is **not cleared for commercial use** as it stands.

---

## Conventions

- Two-space indent, no semicolons, single quotes — match the existing files.
- One section per component file; components stay presentational and read their
  content from `data/site.js` and `i18n/strings.js`.
- Images as `.webp` with explicit `width` and `height` so nothing reflows on
  load.
- Tailwind utilities only. There is no separate stylesheet beyond `index.css`,
  which holds tokens, base styles and a handful of `@layer utilities` helpers
  (`.arch`, `.rule-gold`, `.balance`, `.pretty`, `.no-scrollbar`).
