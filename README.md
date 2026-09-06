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

Phone number, WhatsApp number, email, address and social links are all in the
`contact` object in `src/data/site.js`. Change them once there and every button
on the page follows. The `wa()` helper builds a pre-filled WhatsApp link:

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

- `still` — the visitor asked for reduced motion. Skip animation entirely.
- `ready` — the preloader has finished; entrance animations wait on this.
- `fine` — a precise pointer, so hover-tilt and cursor effects are worth running.

Every animated component checks `still`. If you add one, check it too.

Lenis provides smooth scrolling in `App.jsx` and is disabled outright under
`prefers-reduced-motion`.

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
