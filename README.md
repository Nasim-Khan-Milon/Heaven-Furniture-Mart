# Heaven Furniture Mart — Landing Page

A conversion-focused landing page for Heaven Furniture Mart, a bespoke furniture
studio on Agrabad Access Road, Chattogram.

Built for the RacDox Hackathon with React, Vite, Tailwind CSS v4 and Framer Motion.

---

## Run it locally

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173).

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

Node 18 or newer is required.

## Deploy

**Vercel** — push the folder to GitHub, then import the repo at vercel.com.
Framework preset is detected as Vite; `vercel.json` is already included, so no
configuration is needed.

**Netlify** — build command `npm run build`, publish directory `dist`.

---

## Design decisions

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

### One implementation note

Scroll reveals use `useInView` on an outer wrapper, with the `clip-path`
transition applied to an inner element. This is deliberate: Chromium factors an
element's own `clip-path` into its intersection ratio, so observing the clipped
node directly reports a ratio of zero and the element stays hidden forever. The
split in `Unveil` (`src/components/ui.jsx`) is what avoids that.

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
    Cursor.jsx            brass pointer ring
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
    WhyHeaven.jsx         eight trust points
    Collections.jsx       four room categories
    Bespoke.jsx           the brief builder
    Range.jsx             classic / modern flip cards
    Materials.jsx         swatch board with sheen
    Workshop.jsx          pinned horizontal five-stage rail
    Styling.jsx           full-room styling service
    Marquee.jsx           velocity-reactive brand band
    Process.jsx           four-step process with self-drawing rule
    Story.jsx             founder quote, milestone timeline
    Gallery.jsx           draggable work rail
    Faq.jsx               six questions
    Visit.jsx             closing call to action, contact, footer
    MobileBar.jsx         sticky mobile call to action
```

To change any wording or contact detail, start in `src/data/site.js`.

---

## Language

The whole page is bilingual. `src/i18n/strings.js` holds every visible string
in English and Bangla; components read them through `useLang()`. The toggle
lives in the header, the choice is remembered in `localStorage`, and browsers
reporting a Bangla locale get Bangla on first visit.

The Bangla is **not a literal translation**. Most of Heaven's customers are in
Chattogram and many will be buying something this expensive online for the
first time, so the Bangla copy uses shorter sentences and everyday words where
the English is more figurative.

Two type details worth keeping if you edit the CSS: Bangla glyphs are taller
than Latin, so `html[data-lang='bn']` drops the display sizes a step and adds
line-height. And the `.italic` override is deliberately **unlayered** — Noto
Serif Bengali has no true italic, so the browser fakes one by slanting, which
looks wrong in Bangla. Tailwind's utility layer would beat a layered rule.

## Built for a first-time online buyer

Heaven's customers are not all confident online shoppers, so:

- There is no cart, no card field and no account anywhere. The page's only job
  is to start a conversation.
- `Reassure.jsx` sits directly under the hero and says so plainly, then walks
  through what actually happens after you send a message.
- Three ways to reach a human — WhatsApp, Facebook Messenger and a `tel:` link
  that just opens the dialer — in the header, the hero, the reassurance
  section, the footer and the sticky mobile bar.
- The showroom address and map are repeated near the top, not just in the
  footer. For someone who doesn't trust the internet, a real address they can
  walk into is the strongest proof there is.
- A `<noscript>` block carries the name, address and phone, so the page is
  still useful if the JavaScript fails on a slow connection.

## Before you hand this to the client

Two FAQ answers contain figures the brief never supplied. Both are marked with
`TODO` comments in `src/data/site.js` — confirm them with Heaven Furniture Mart
and correct them:

- **Lead time.** Currently says most pieces take around three to five weeks.
- **Delivery area.** Currently says delivery and installation are included in
  and around Chattogram, with anything further to be discussed.

Both appear twice — once in English and once in Bangla (`faq2a`, `faq4a`).

Worth asking the client about two things that would help first-time buyers more
than anything else on the page, but which the brief never mentioned: whether
they accept **cash on delivery**, and a **starting price** for a basic sofa or
bed. Neither is invented here because neither should be guessed.

The Messenger link points at `m.me/HeavenFurnitureMart`. Confirm that handle
resolves — Facebook page usernames and numeric IDs are not interchangeable.

Everything else on the page comes from the company brief, the brochure or the
company deck. There are deliberately **no invented customer testimonials** — the
social proof is the Managing Director's real quote plus the "hundreds of happy
homeowners" figure from the deck.

The showroom map is a keyless Google Maps embed pointing at the business name
and street. If the pin lands imprecisely, replace the `src` in `Visit.jsx` with
a share link taken straight from Google Maps.

---

## Motion

All motion lives in `src/fx/`. Nothing in `components/` implements an animation
directly — it composes these.

### The gate: `MotionProvider`

Decides once, at the top of the tree, how much motion a visitor gets. Three
independent questions with three different answers:

| Flag | Question | What it turns off |
| --- | --- | --- |
| `still` | `prefers-reduced-motion` | Almost everything. The intro never runs, masks render open, scroll-linked values freeze. |
| `fine` | `(hover: hover) and (pointer: fine)` | Cursor ring, magnetic buttons, 3D tilt, gallery drag. A tap can never strand a card at an angle. |
| `lite` | `≤4 cores`, `≤4GB`, `saveData`, or `2g` | Per-frame work only: dust canvas, grain, scroll-velocity tracking. Every entrance and scroll animation still plays. |

A mid-range Android on 4G in Chattogram is the visitor this is tuned for, not
the desktop it was built on.

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

- **`SplitText.jsx`** — masked word reveals on every heading. Split by *word*,
  never character: Bangla builds conjuncts and vowel signs across several code
  points, and slicing to characters scatters যুক্তাক্ষর like ক্ষ and matras like ি
  into separate boxes. Word boundaries are the smallest unit safe in both
  scripts. Masks are padded and the padding pulled back with a negative margin,
  so descenders and matras have room without the layout shifting.
- **`Cursor.jsx`** — brass ring lagging the pointer, dot sitting on it. The lag
  is the effect. The native cursor is kept, not hidden, so a failed script never
  leaves someone without one.
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
- **`Header`** — retreats when reading downward, returns the moment you scroll up.

### Cost

+26 KB raw / +7.5 KB gzipped over the pre-animation build, entirely from the
Framer Motion surface already in use. No new dependencies were added — no GSAP,
no Locomotive. Everything animates `transform`, `opacity`, `clip-path` or
`filter`; nothing animates layout.

---

## A note on the photography

Several images came from Heaven's Facebook page as marketing graphics with
logo bands, promotional text and contact bars baked in. Those overlays have
been cropped out so the page carries its own typography rather than competing
with someone else's. If you re-export any of these, crop the same way — a
landing page with a second logo and phone number burned into the photos reads
as a screenshot, not a website.

The team and sponsored-sports photos in that set were left out deliberately;
they are good social content but they do not support a luxury furniture page.

---

Photography, brand assets and company information belong to Heaven Furniture Mart.
