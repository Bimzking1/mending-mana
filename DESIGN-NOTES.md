# Design notes

The reference design is the phone. Desktop is the same column, centred, with the results
grid widening to two then three cards. Nothing was designed wide and then shrunk.

## Colour

Tokens live in `src/index.css` as RGB channels and are consumed only through Tailwind
names (`bg-paper`, `text-ink-muted`, `bg-primary-soft`). No component contains a hex value.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `paper` | `#FBF7F1` | `#14110F` | page background |
| `surface` | `#FFFFFF` | `#1E1A17` | cards, inputs |
| `sunken` | `#F3EDE4` | `#262019` | chips, quiet blocks |
| `line` | `#E6DDD0` | `#372F28` | borders |
| `ink` | `#1A1614` | `#F5EFE7` | primary text |
| `ink-muted` | `#6B6158` | `#A99B8C` | secondary text |
| `ink-faint` | `#9A8F83` | `#82766A` | metadata |
| `primary` | `#E24818` | `#FF6B3D` | the single accent |
| `lemon` / `laut` / `daun` / `terong` | — | — | category tints only |

Dark mode is a warm near-black, never `#000`, and the accent lightens so it keeps its
contrast against the darker surface. Category colours only ever appear as a soft tint
behind an emoji — one accent carries the whole interface.

## Type

Two families. **Space Grotesk** for the wordmark, headings and every number that matters
(prices, quantities) — its geometric digits are what make `~20×` land. **Plus Jakarta
Sans** for everything else.

Weights are limited to 400 / 500 / 600 / 700 / 800. The scale is named rather than
numeric so hierarchy is explicit at the call site: `micro`, `meta`, `body`, `lead`,
`title`, `hero`, `amount`, `qty`. Numbers use `font-variant-numeric: tabular-nums`
(`.tabular`) so digits don't jitter while typing.

## Layout

- One column, `max-w-5xl`, `px-4` on phones and `px-6` from `sm`.
- Primary actions sit at the bottom of the screen, sticky, within thumb reach, with a
  gradient fade so content scrolls under them. From `sm` they return to the flow.
- Every interactive target is at least 40px tall; chips and buttons are 44px.
- Horizontal scrollers (category chips, suggestions) bleed to the screen edge with
  `-mx-4 px-4` so the last chip is reachable and the scroll affordance is visible.
- Nothing depends on hover. Hover states exist but only sharpen what is already legible.

## Motion

One ambient loop (the home preview), one orchestrated moment (the reveal curtain between
input and results), and a 55ms stagger on card entrance. Everything else is a 150ms
colour or scale response to a tap. `prefers-reduced-motion: reduce` disables all of it
globally in `src/index.css`.

## The comparison card

One compact, centred column: the category emoji sits on a soft round tint at the top,
then the quantity — the loudest element, scaling with the card so `~11×` reads at a
glance. The product name and brand follow, centred, and the reference price appears as a
quiet pill under the brand, followed by leftover money only when there is some. On
phones the cards run in a horizontal snap carousel with the next card peeking, so
nothing is hidden behind a scroll; from `md` they widen into a 2–3 column grid. No
progress bars, no percentages, no gauges: this is not a finance app.

## Copy

Indonesian as spoken: "Mau beli apa?", "Harganya berapa?", "Uang segini ternyata bisa
jadi…". Errors say what to do ("Masukin dulu harganya ya 👀"). The empty state names the
cheapest reference so the number is actionable. Nothing shames the reader, and the app
never says whether to buy.

## Built for

320, 375, 390, 430, 768, 1024 and 1280+. Nothing uses a fixed width, the body clips
horizontal overflow, and the amount field wraps rather than pushing the layout sideways.
Focus is visible everywhere through one global `:focus-visible` rule, and a screen change
moves focus to the top of the new screen. Run `npm run dev` and walk those widths in a
real browser before launch — the layout was written for them but not photographed at
each one.
