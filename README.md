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
  App.jsx                 section order, Lenis smooth scroll
  index.css               Tailwind v4 theme tokens, arch utilities
  data/site.js            contact details, collections, milestones — edit copy here
  assets/                 WebP photography, logo variants
  components/
    ui.jsx                Reveal, Unveil, ArchImage, buttons, icons
    Header.jsx            sticky nav, mobile drawer
    Hero.jsx              orchestrated page-load sequence
    Studio.jsx            brand introduction
    Collections.jsx       four room categories
    Bespoke.jsx           the brief builder
    Process.jsx           four-step process
    Story.jsx             founder quote, milestone timeline
    Gallery.jsx           horizontal work strip
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

- **Hero** — one orchestrated load sequence. Each headline word rises out of
  its own mask so the line assembles rather than fades, the photo and its
  outline frame drift apart on scroll for depth, and an architect's dimension
  annotation draws itself over the photo (`MeasureOverlay.jsx`) using
  `pathLength` — extension lines, arrowed dimension line, and a label sitting
  in a break in the line. The headline promises furniture made to the measure
  of your home; this draws that promise.
- **Classic / Modern toggle** — `Range.jsx` flips four cards on the Y axis in
  real perspective, each with a slight stagger, swapping between Heaven's
  carved-and-gilded work and their modern pieces. Backface visibility is
  hidden so only one side is ever readable.
- **Process** — the rule connecting the four steps draws itself as you scroll,
  scaling on X across the desktop layout and on Y down the mobile one, with
  each diamond node popping in as it is reached.
- **3D tilt** — trust cards, collection photos and material swatches rotate in
  perspective under the cursor. `Tilt` in `ui.jsx` only arms itself on devices
  reporting `(hover: hover) and (pointer: fine)`, so a tap on mobile never
  leaves a card stuck at an angle, and it bails out entirely under reduced
  motion.
- **Unveil** — images rise from behind a clip-path curtain as they enter view.
- **FAQ** — height and opacity animate open; the marker rotates to an ×.
- **Marquee** — the company's own tagline loops across a dark band.

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
