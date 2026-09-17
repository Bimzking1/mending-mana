# Mending mana? — Build the Product

Build a polished, production-quality web app called **“Mending mana?”**

The app helps people pause before buying something by translating the price of an item into recognizable things they could get instead.

The main experience is extremely simple:

1. User opens the app.
2. User selects **“Mending mana?”**
3. User enters what they want to buy.
4. User enters the price.
5. User optionally selects a category.
6. The app shows recognizable alternatives that amount of money could buy.

Example:

User enters:

```text
Item:
Wireless Headphones

Price:
Rp500.000

Category:
Electronics
```

The app responds:

```text
Rp500.000

Mending mana?

Uang segini ternyata bisa jadi...

☕ 20× Kopi Kenangan Mantan
☕ 18× Fore Latte
🎬 10× Cinema XXI tickets
🧋 14× Chatime
👕 2× Uniqlo AIRism T-Shirt
🎮 3× indie games
📚 5× books
```

The app should NOT tell the user what to buy.

It should make the opportunity cost feel tangible.

---

# 1. IMPORTANT PRIORITY

Prioritize these things in this order:

1. **Mobile user experience**
2. **Visual design**
3. **Interaction design**
4. **Fast, simple comparison flow**
5. **Recognizable product-level comparisons**
6. **Responsive desktop experience**
7. **Clean data architecture**
8. **Scraper architecture**

Do NOT over-engineer the scraper during this implementation.

The scraper will likely be continued later using other free AI tools.

Your job is to build the frontend/product foundation so that another developer or AI can easily continue the data collection system later.

---

# 2. TECH STACK

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Lucide React
* Zustand only if actually needed
* Static JSON data for V1

Do NOT introduce:

* backend
* database
* authentication
* unnecessary API server
* paid services
* AI API dependency

The app should work entirely from local/static data.

Deployment target:

**Netlify**

---

# 3. MOBILE-FIRST IS A HARD REQUIREMENT

Design for mobile FIRST.

The primary user is someone standing in a store, browsing an online shop, or looking at a product and thinking:

> “Should I actually buy this?”

They should be able to open the website and calculate the comparison quickly with one hand.

Design target:

```text
Mobile
↓
Tablet
↓
Desktop
```

NOT:

```text
Desktop
↓
shrink it until it fits mobile
```

The mobile version is the reference design.

Desktop should expand naturally from the mobile design.

---

# 4. RESPONSIVE BREAKPOINTS

Use sensible Tailwind breakpoints.

Think about:

```text
~320px
~375px
~390px
~430px
~768px
~1024px
~1280px+
```

The application must remain usable on small phones.

Do not create horizontal overflow.

Do not rely on hover for important interactions.

Every important action must work with touch.

Buttons should have comfortable touch targets.

Avoid tiny text and tiny icons.

---

# 5. DESIGN DIRECTION

The visual identity should feel:

* modern
* playful
* clever
* warm
* approachable
* Indonesian
* slightly surprising
* memorable
* clean

But NOT:

* childish
* cartoonish
* meme-heavy
* overly bubbly
* corporate
* banking-app-like
* spreadsheet-like
* generic SaaS dashboard
* overly masculine
* overly feminine

The app should feel like a modern consumer product.

Think:

```text
financial awareness
+
shopping
+
playful discovery
```

without looking like a finance application.

---

# 6. FONT SYSTEM

Choose fonts deliberately.

Use:

### Primary UI font

**Plus Jakarta Sans**

Use it for:

* body text
* form labels
* buttons
* navigation
* product names
* supporting text
* numbers when appropriate

It fits the Indonesian/mobile-product aesthetic particularly well.

Fallback:

```css
font-family:
  "Plus Jakarta Sans",
  Inter,
  system-ui,
  sans-serif;
```

### Display / branding font

Use a distinctive display font for:

* “Mending mana?”
* major hero headings
* large marketing statements

Possible direction:

**Space Grotesk**

or another modern geometric display font.

Do NOT use a decorative font that hurts readability.

The logo/title should feel like a real brand, not a school project.

---

# 7. TYPOGRAPHY HIERARCHY

Typography is extremely important.

Create a clear hierarchy.

Example:

### Brand

```text
Mending mana?
```

Large, distinctive, confident.

### Hero

```text
Sebelum beli,
coba bandingin dulu.
```

### Input amount

```text
Rp500.000
```

This should be one of the largest elements on the screen.

### Result quantity

```text
20×
```

The quantity should visually dominate the comparison card.

### Product

```text
Kopi Kenangan Mantan
```

### Brand

```text
Kopi Kenangan
```

### Supporting metadata

```text
± Rp25.000 / cup
```

Use weight and size rather than excessive colors to establish hierarchy.

Avoid using too many font weights.

Recommended:

```text
400 — body
500 — labels
600 — product names
700 — important values
800 — hero / major numbers
```

---

# 8. COLOR SYSTEM

Create a coherent design token system.

Base:

```text
Warm off-white / cream
Deep charcoal
```

Primary accent:

```text
Orange / coral
```

Secondary accents can include subtle:

```text
yellow
blue
lavender
mint
```

Use colors sparingly.

Do not make every card a different bright color.

The app should feel colorful without becoming noisy.

Example conceptual palette:

```text
Background:
#FAF9F6

Foreground:
#171717

Primary:
warm orange/coral

Secondary:
soft yellow

Accent:
muted blue

Success:
soft green

Warning:
warm amber
```

Feel free to refine the exact values.

Create the palette as reusable Tailwind/theme tokens instead of scattering hex values throughout components.

---

# 9. LIGHT + DARK MODE

Support:

* Light mode
* Dark mode
* System preference

Dark mode should be intentionally designed, not simply:

```text
background → black
text → white
```

Maintain:

* hierarchy
* contrast
* card separation
* readable muted text
* proper accent colors

The app should still look attractive at night.

---

# 10. ICONOGRAPHY

Use:

**Lucide React**

for interface icons.

Examples:

```text
Coffee
Utensils
ShoppingBag
Shirt
Footprints
Smartphone
Laptop
Gamepad2
BookOpen
Ticket
Plane
Home
Sparkles
ArrowRight
RefreshCw
```

Avoid mixing many unrelated icon styles.

Emoji can be used selectively where it improves personality, especially in comparison cards.

But the main UI should use a consistent icon system.

---

# 11. LANDING / HOME SCREEN

The home screen should immediately communicate the idea.

Do NOT make users read a long explanation.

Suggested structure:

```text
┌─────────────────────────────┐
│                             │
│        Mending mana?        │
│                             │
│   Sebelum beli,             │
│   coba bandingin dulu.      │
│                             │
│        ✨                   │
│                             │
│   [ Mulai bandingin ]       │
│                             │
└─────────────────────────────┘
```

Below that:

```text
Rp500 ribu ternyata bisa jadi...
```

Show a few animated/sample comparison items.

For example:

```text
20× Kopi Kenangan
10× Cinema XXI
2× Uniqlo T-Shirt
```

The home screen should feel alive.

---

# 12. MAIN INPUT EXPERIENCE

This is the most important screen.

The user should not encounter a complicated form.

Preferred flow:

### Step 1

```text
Mau beli apa?
```

Input:

```text
Wireless Headphones
```

### Step 2

```text
Harganya berapa?
```

Large currency input:

```text
Rp
500.000
```

### Step 3

Optional:

```text
Kategori
```

Category chips:

```text
Semua
🍔 Food
☕ Coffee
👕 Fashion
📱 Gadget
🎮 Gaming
📚 Books
🎬 Entertainment
```

Then:

```text
[ Mendingin! ]
```

The exact copy can be refined if something better fits the brand.

---

# 13. CURRENCY INPUT

Make Indonesian Rupiah input excellent.

When the user types:

```text
500000
```

display:

```text
Rp500.000
```

Handle:

```text
500
5000
50000
500000
1000000
```

correctly.

Do not make users manually type:

```text
Rp
.
```

The input should feel effortless on mobile.

Use a numeric keyboard on mobile.

---

# 14. RESULT SCREEN

This is the emotional payoff.

After submitting, create a strong transition.

Example:

```text
Rp500.000

Mending mana?

Uang segini ternyata bisa jadi...
```

Then show comparison cards.

The most important visual element is the quantity:

```text
20×
```

followed by:

```text
Kopi Kenangan Mantan
```

and:

```text
Kopi Kenangan
± Rp25.000 / cup
```

---

# 15. COMPARISON CARD DESIGN

Cards should feel tangible and visually recognizable.

Example:

```text
┌─────────────────────────────┐
│ ☕                          │
│                             │
│ 20×                         │
│ Kopi Kenangan Mantan        │
│ Kopi Kenangan               │
│                             │
│ ± Rp25.000 / cup            │
└─────────────────────────────┘
```

Quantity:

**VERY LARGE**

Product:

**prominent**

Brand:

secondary

Reference price:

small supporting information

Do NOT make the card look like a boring database row.

---

# 16. PRODUCT-LEVEL COMPARISONS

This is a core requirement.

The database should contain specific products.

BAD:

```text
Coffee — Rp25.000
```

GOOD:

```text
Kopi Kenangan Mantan
Kopi Kenangan
Rp25.000
```

BAD:

```text
Shirt — Rp200.000
```

GOOD:

```text
AIRism T-Shirt
Uniqlo
Rp199.000
```

BAD:

```text
Movie ticket — Rp50.000
```

GOOD:

```text
Cinema XXI Regular Ticket
Cinema XXI
Rp50.000
```

The user should recognize the thing being shown.

---

# 17. COMPARISON ENGINE

Basic calculation:

```ts
quantity = Math.floor(userPrice / referencePrice)
```

Example:

```text
user price = Rp500.000
reference price = Rp25.000

500000 / 25000
= 20
```

Display:

```text
~20× Kopi Kenangan Mantan
```

Do not show meaningless results such as:

```text
0.2× coffee
```

unless there is a deliberate product reason.

Prioritize reference products where:

```text
quantity >= 1
```

---

# 18. COMPARISON SELECTION

Do not simply show the first 10 records in JSON.

Build a scoring/selection system.

Consider:

### Relevance

If the user selected:

```text
Food
```

food-related items can receive higher relevance.

But still allow cross-category comparisons.

### Price proximity

Prefer products that result in interesting quantities.

### Recognizability

Recognizable brands/products should be preferred.

### Diversity

Avoid:

```text
20 coffees
18 coffees
16 coffees
14 coffees
12 coffees
```

Instead:

```text
coffee
food
entertainment
fashion
gaming
books
```

The results should feel like:

> “Oh wow, I could get THAT?”

---

# 19. NUMBER FORMATTING

Use Indonesian locale formatting.

Examples:

```text
Rp25.000
Rp100.000
Rp500.000
Rp1.500.000
```

Use:

```ts
Intl.NumberFormat("id-ID")
```

Do not manually format currency everywhere.

Create a reusable formatter.

---

# 20. APPROXIMATION

Use `~` when the calculation is approximate.

Example:

```text
~20× Kopi Kenangan Mantan
```

This communicates that prices can vary.

Do not imply that the price is universally identical across Indonesia.

---

# 21. DATA FRESHNESS

Every product reference should contain:

```text
sourceName
sourceUrl
lastVerified
```

Example:

```json
{
  "name": "Pistachio Aren Latte",
  "brand": "Kopi Kenangan",
  "price": 25000,
  "sourceName": "Kopi Kenangan",
  "sourceUrl": "...",
  "lastVerified": "2026-09-17"
}
```

The frontend does not need to expose all of this prominently.

But the data architecture must support it.

---

# 22. DATA ARCHITECTURE

For V1:

```text
src/data/latest.json
```

Example:

```json
{
  "version": 1,
  "updatedAt": "2026-09-17",
  "items": []
}
```

Keep the data structure clean enough that another AI/developer can replace the JSON with an API/database later.

Do not tightly couple components to raw JSON structure.

Create TypeScript types.

---

# 23. SCRAPER ARCHITECTURE

The scraper will be continued later by another free AI.

Therefore, make the scraper architecture **clean and documented**, but do not spend excessive time implementing dozens of sources.

Create the foundation:

```text
scraper/
├── sources/
│   ├── coffee/
│   ├── food/
│   ├── snacks/
│   ├── fashion/
│   ├── electronics/
│   ├── gadgets/
│   ├── gaming/
│   ├── books/
│   └── entertainment/
│
├── normalize.ts
├── validate.ts
├── deduplicate.ts
├── categorize.ts
├── collect.ts
├── diff.ts
├── merge.ts
└── export.ts
```

Document how future scrapers should be added.

---

# 24. SCRAPER CONTRACT

Every scraper should eventually return something compatible with:

```ts
interface ScrapedItem {
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  unit: string
  displayUnit: string
  sourceName: string
  sourceUrl: string
  region: string
  collectedAt: string
}
```

The scraper MUST focus on:

**individual recognizable products.**

Not generic categories.

---

# 25. NORMALIZATION

Support Indonesian price formats such as:

```text
Rp25.000
Rp 25.000
25.000
Rp25,000
25k
25K
```

Normalize them to:

```text
25000
```

Reject:

* zero prices
* negative prices
* missing product names
* malformed URLs
* invalid records

---

# 26. DEDUPLICATION

Avoid duplicate products.

For example:

```text
Fore Latte
FORE Latte
Fore Coffee - Latte
```

should be considered potential duplicates.

Use normalized:

```text
brand + product name
```

as part of the deduplication strategy.

Do not blindly delete records when similarity is uncertain.

---

# 27. COLLECTIONS

Future scraper runs should create:

```text
collections/
collection-2026-09-17-13-25.json
```

rather than overwriting everything.

The eventual workflow:

```text
scrape
↓
normalize
↓
validate
↓
deduplicate
↓
collection JSON
↓
diff
↓
review
↓
merge
↓
latest.json
```

This lets future AI tools continue improving the scraper without destroying previous data.

---

# 28. DATA SIZE

Do NOT attempt to build a massive database immediately.

Initial target:

```text
200–300 high-quality reference products
```

Then:

```text
500+
1000+
```

over time.

Quality and recognizability are more important than having tens of thousands of records.

---

# 29. SAMPLE DATA

Create realistic mock data for development.

Include recognizable Indonesian-style examples across categories.

For example:

```text
Kopi Kenangan Mantan
Fore Latte
Tomoro Coffee
Starbucks Caffe Latte
Chatime Brown Sugar
Mixue Ice Cream
Cinema XXI ticket
CGV ticket
Uniqlo AIRism T-Shirt
Nike running shoes
Logitech mouse
Samsung earbuds
Gramedia books
Steam indie games
```

IMPORTANT:

If using prices, clearly treat development data as mock/sample data unless verified from an actual source.

Do not pretend mock prices are current real-world prices.

---

# 30. UX DETAILS

Add subtle interaction feedback.

Examples:

* button press animation
* smooth card entrance
* subtle number animation
* loading transition between input and results
* gentle hover effects on desktop
* touch feedback on mobile
* animated comparison cards appearing one-by-one

Do NOT over-animate.

The animation should make the app feel polished, not slow.

Respect:

```text
prefers-reduced-motion
```

---

# 31. RESULT REVEAL

Consider making the result feel like a reveal.

Example sequence:

```text
Rp500.000
       ↓
Mending mana?
       ↓
Uang segini ternyata bisa jadi...
       ↓
20× Kopi Kenangan Mantan
       ↓
10× Cinema XXI
       ↓
2× Uniqlo AIRism T-Shirt
```

Keep it fast.

Target feeling:

> “Whoa, I didn't realize Rp500k could become that many things.”

---

# 32. EMPTY STATES

Handle cases gracefully.

Examples:

### No price

```text
Masukkan dulu harganya 👀
```

### Invalid price

```text
Masukkan nominal yang valid.
```

### Very small amount

If no suitable comparison exists:

```text
Belum ketemu perbandingan yang pas.
Coba nominal yang sedikit lebih besar.
```

### Very large amount

Do not break the UI.

Support large numbers.

---

# 33. ACCESSIBILITY

Implement:

* semantic HTML
* proper labels
* keyboard navigation
* visible focus states
* sufficient contrast
* aria labels where needed
* screen-reader-friendly controls
* reduced-motion support
* touch-friendly controls

Do not communicate information through color alone.

---

# 34. PERFORMANCE

The app should feel instant.

Because the initial database is static JSON:

* avoid unnecessary network requests
* lazy-load nonessential UI
* keep bundle reasonable
* avoid unnecessary dependencies
* memoize only where useful
* do not introduce heavy animation libraries unless necessary

The core flow should feel almost instant:

```text
Open
→ Enter price
→ Tap
→ Results
```

---

# 35. DESKTOP EXPERIENCE

Desktop should not simply stretch the mobile layout.

On desktop:

* center the main experience
* use generous whitespace
* comparison cards can become a grid
* maintain readable max-width
* make the result area visually strong

Example:

```text
             Mending mana?

       Rp500.000

   Uang segini ternyata bisa jadi...


 ┌────────┐ ┌────────┐ ┌────────┐
 │ 20×    │ │ 10×    │ │ 2×     │
 │ Coffee │ │ Cinema │ │ Shirt  │
 └────────┘ └────────┘ └────────┘
```

---

# 36. MOBILE RESULT LAYOUT

On mobile, prioritize vertical readability.

Possible:

```text
Rp500.000

Mending mana?

Uang segini ternyata bisa jadi...

┌─────────────────────┐
│ ☕                  │
│                     │
│ 20×                 │
│ Kopi Kenangan       │
│ Mantan              │
│                     │
│ ± Rp25.000 / cup    │
└─────────────────────┘

┌─────────────────────┐
│ 🎬                  │
│                     │
│ 10×                 │
│ Cinema XXI          │
│                     │
│ ± Rp50.000 / ticket │
└─────────────────────┘
```

Cards should use almost the entire available width while maintaining comfortable margins.

---

# 37. BOTTOM ACTIONS

On result screen, provide:

```text
[ Coba harga lain ]
```

and optionally:

```text
[ Bandingin lagi ]
```

Make restarting extremely easy.

The user should not have to navigate back through multiple screens.

---

# 38. SHAREABLE RESULT

Design the result so it could eventually become shareable.

For example:

```text
Rp500.000

ternyata bisa jadi...

20× Kopi Kenangan
10× Cinema XXI
2× Uniqlo T-Shirt
```

Create the component architecture so a future:

```text
Share
Download image
Copy result
```

feature can be added.

Do not require implementing social sharing now unless it is trivial.

---

# 39. HEADER / NAVIGATION

Keep navigation minimal.

Possible:

```text
Mending mana?
```

and:

```text
About
```

Do not create a complex dashboard navigation.

This is a consumer utility, not an enterprise application.

---

# 40. ABOUT PAGE

Create a small About section/page explaining:

```text
Mending mana? membantu kamu melihat harga dari sudut pandang yang berbeda.

Masukkan harga barang yang ingin kamu beli, lalu lihat apa saja yang bisa kamu dapatkan dengan jumlah uang yang sama.

Bukan untuk bilang kamu harus beli atau jangan beli.

Cuma... biar tahu aja. 👀
```

Keep it short.

---

# 41. BRANDING

The name is:

# Mending mana?

Keep the question mark.

The logo should visually emphasize:

```text
Mending
mana?
```

or:

```text
Mending mana?
```

It should look good as:

* website header
* mobile home-screen/PWA icon
* social media image
* favicon

Create a simple text-based logo treatment rather than a complicated illustration.

---

# 42. MICROCOPY

Use Indonesian naturally.

Avoid stiff translations.

Good:

```text
Mau beli apa?
Harganya berapa?
Mending mana?
Coba bandingin.
Uang segini ternyata bisa jadi...
Masih pengen beli?
Coba pikir lagi.
```

Avoid:

```text
Input your desired purchase item.
Enter purchase amount.
Calculate alternative purchasing opportunities.
```

The product should feel Indonesian.

---

# 43. NO FINANCIAL JUDGMENT

Do not shame the user.

Avoid:

```text
Itu terlalu mahal.
Jangan beli.
Kamu boros.
Pembelian buruk.
```

Prefer:

```text
Uang segini ternyata bisa jadi...
Coba bandingin dulu.
```

The app provides perspective, not financial advice.

---

# 44. COMPONENT ARCHITECTURE

Create reusable components such as:

```text
AppShell
BrandLogo
Hero
PurchaseForm
CurrencyInput
CategorySelector
ComparisonResults
ComparisonCard
ProductIcon
PriceDisplay
QuantityDisplay
EmptyState
AboutSection
ThemeToggle
```

Keep components focused.

Do not put the entire application in `App.tsx`.

---

# 45. TYPES

Create explicit TypeScript types.

Do NOT use:

```ts
any
```

unless absolutely unavoidable.

Prefer:

```ts
type Category = ...

interface ReferenceItem {
  ...
}
```

Use strict TypeScript.

---

# 46. CODE QUALITY

Use:

* meaningful variable names
* reusable utilities
* small components
* strict TypeScript
* consistent formatting
* no unnecessary abstractions
* no duplicated logic
* no hardcoded repeated UI data

Avoid premature enterprise architecture.

This is a small consumer application.

Keep it understandable.

---

# 47. FUTURE SCRAPER HANDOFF

At the end of the implementation, create:

```text
SCRAPER.md
```

Explain:

1. How the scraper architecture works.
2. How to add a new source.
3. Expected scraper output.
4. Product data schema.
5. Normalization rules.
6. Validation rules.
7. Deduplication strategy.
8. Collection file format.
9. Diff/merge process.
10. How `latest.json` is generated.

This documentation is important because the scraper will be continued later by other free AI tools.

Also create:

```text
DATA-SCHEMA.md
```

containing the reference item schema and examples.

---

# 48. FUTURE COMMANDS

Prepare the project structure for commands such as:

```bash
npm run dev

npm run build

npm run scrape

npm run scrape:source

npm run data:validate

npm run data:diff

npm run data:merge

npm run data:publish
```

They do not all need to be fully implemented now.

Do not fake functionality.

If a command is not implemented, document it as planned.

---

# 49. README

Create a useful README containing:

```text
What is Mending mana?
Tech stack
Project structure
Running locally
Building
Data architecture
Adding reference products
Scraper architecture
Deployment
Future roadmap
```

---

# 50. IMPORTANT: DO NOT OVERBUILD

This is critical.

Do NOT turn this into:

* a SaaS dashboard
* a financial management app
* a social network
* an AI chatbot
* an e-commerce platform
* a backend-heavy application
* an authentication system

The core product is:

```text
ENTER PRICE
     ↓
COMPARE
     ↓
"OH, I COULD GET THAT?"
```

Everything should support that loop.

---

# 51. FINAL USER EXPERIENCE GOAL

When someone opens the app on their phone, the experience should feel like:

```text
"Oh, this is interesting."

        ↓

"What am I about to buy?"

        ↓

"How much is it?"

        ↓

"Wait..."

        ↓

"Rp500k can buy 20 coffees?"

        ↓

"Or 10 movie tickets?"

        ↓

"Huh."
```

That moment of realization is the product.

Build the UI around that moment.

---

# 52. IMPLEMENTATION INSTRUCTIONS

Start by:

1. Setting up the React + TypeScript + Vite project.
2. Installing/configuring Tailwind and shadcn/ui.
3. Establishing the font system.
4. Establishing the color/design token system.
5. Creating the responsive app shell.
6. Building the mobile-first input experience.
7. Building the comparison engine.
8. Creating realistic sample JSON data.
9. Building the comparison result cards.
10. Adding responsive desktop behavior.
11. Adding light/dark mode.
12. Adding subtle animations.
13. Adding accessibility.
14. Creating scraper/data documentation.
15. Running a production build and fixing all TypeScript/build errors.

Before finishing, test the application at:

```text
320px
375px
390px
430px
768px
1024px
1280px+
```

The most important screen is the **mobile result screen**.

Make it feel polished enough that it could realistically be launched as an MVP.

Do not stop at a wireframe or generic CRUD interface.

Build the actual product.
