# Site Polish v2 — design spec

**Date:** 2026-04-28
**Status:** Draft, awaiting user approval
**Reviewer after implementation:** OpenAI Codex CLI

## Context

Following the navbar wide-on-load morph, we identified seven UI/UX gaps + three honorable-mention polish items where the site is currently underselling itself. The page reads as crafted in places (hero, services tile glass) and unfinished in others (Projects shows fake gray bars, custom cursor is a flat dot, section seams are invisible spacers, contact route re-exports the homepage CTA). This spec is one cohesive sprint to lift the whole site to the same craft tier as the hero + navbar.

Goals:
- Replace placeholder content with real-feeling treatments (Projects, /contact, ServiceDetail).
- Add personality moments where the brand can be felt (cursor, seams, mobile menu, footer marquee).
- Tighten one perf/storytelling gap in ProcessSection.
- No new dependencies. Stay inside Tailwind v4 + framer-motion + the project's existing CSS-token system.

Out of scope: refactors unrelated to the listed features, copy rewrites beyond the new strings this work introduces, image/video assets (placeholders only — Q1 answer was option B).

## Files touched (summary)

| File | Change |
| --- | --- |
| `src/app/globals.css` | Add seam treatments, marquee wordmark, project-card placeholder styles, ServiceDetail page chrome wrapper, /contact page styles, mobile-menu corner brackets, cursor mode classes, FLIP transition styles |
| `src/app/page.tsx` | (no change) seam variants stay; their CSS is what changes |
| `src/components/ui/CustomCursor.tsx` | Dual-layer cursor with mode-aware sizing driven by `data-cursor` attributes |
| `src/components/MobileMenu.tsx` | SVG close icon, corner-bracket affordance per link |
| `src/components/sections/ProcessSection.tsx` | rAF-throttled scroll handler, pulse position synced to active step |
| `src/components/sections/ProjectsSection.tsx` | Replace mock-bar JSX with placeholder window-card structure |
| `src/components/sections/services/ServicesSection.tsx` | FLIP entry: capture tile rect, animate frame between rects |
| `src/components/service-detail.tsx` | Reuse `.wdetail` chrome + address bar, add prev/next pagination |
| `src/app/services/[slug]/page.tsx` | (no change) — ServiceDetail still renders here |
| `src/app/contact/page.tsx` | New standalone layout (intro + SLA + wizard + what-happens-next) |
| `src/components/sections/CtaSection.tsx` | (no change) — homepage keeps it |
| `src/components/layout/Footer.tsx` | Marquee wordmark above grid; Connect column gets icon glyphs |
| `src/lib/i18n/en.ts`, `ar.ts` | Add new dict keys: `contact.intro`, `contact.sla`, `contact.next`, `projects.placeholder`, `footer.marquee` |

## 1 — Homepage seams (Wave 1)

**Problem:** `<HomepageSeam variant="..." />` renders four `-my-16 h-32` divs but no CSS rule targets the variant classes — they're invisible negative-margin spacers.

**Treatment per variant** (all in `globals.css`):

| Variant | Visual |
| --- | --- |
| `--hero-services` | Vertical scanline gradient fading hero black → services bg, with a 1px center horizon line at 35% opacity (echoes hero terrain horizon) |
| `--about-process` | Subtle grain mask + accent-glow ellipse 60% width centered, low opacity |
| `--process-cta` (currently between Process and Projects — class name is misleading) | Corner-tick brackets at left/right edges (`⌐ ¬`) drawn in CSS, plus a 1px dashed center divider |
| `--projects-cta` | Soft accent-glow fade rising upward into CtaSection (warm amber at 4% opacity) |

Implementation: each variant gets `position: relative` + `::before`/`::after` pseudo-elements to draw the treatment. Keep the `-my-16` negative margin so the seam visually overlaps section padding. Respect `prefers-reduced-motion` only if any animation is added (these are static — none needed).

**Verification:** scroll the homepage. Each transition between sections should now feel intentional rather than abrupt.

## 2 — Custom cursor intelligence (Wave 1)

**Problem:** `CustomCursor.tsx` is a single 12px dot with no awareness of what's under it. Big brand surface, zero personality work.

**Design:**
- Two layered elements: a 6px solid white dot (current) + a 28px outlined ring trailing behind with a softer spring (`stiffness: 200, damping: 28`). Dot rides ahead, ring lags slightly.
- A single document-level `mouseover` listener reads `data-cursor` from `event.target.closest('[data-cursor]')` and sets a state value (`'default' | 'link' | 'open' | 'drag'`). On `mouseout` of the matched element, return to `'default'`.
- Mode → ring transform table:

| Mode | Ring size | Ring border | Dot |
| --- | --- | --- | --- |
| `default` | 28px | 1px white/15 | 6px white/50 |
| `link` | 36px | 1px white/40 | 4px white/80 |
| `open` | 56px | 1px accent | 4px accent dot, plus a thin crosshair (4 short strokes at N/E/S/W) inside the ring |
| `drag` | 72px | 1px white/30 | hidden; ring shows "DRAG" label inside (mono 10px) |

- Animate via framer-motion `animate` on the ring element, transition `{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }`.

**Tagging consumers** (small edits across components):
- `wtile` → `data-cursor="open"`
- `<Link>` and `<a>` inside content (nav links, footer links, service cards, project cards once clickable) → `data-cursor="link"`
- `.btn`, `.btn--primary`, `.btn--ghost` → `data-cursor="link"` (since they navigate)
- Future: project carousel → `data-cursor="drag"` (not used in this sprint, but mode is wired)

Touch devices keep current behavior (component returns `null` under `useReducedMotion()` and is `hidden md:block`). Add a runtime check: if `window.matchMedia('(pointer: coarse)').matches`, also bail. Codex caught no-op cursors on hybrid touch laptops in past reviews — guard explicitly.

**Verification:** hover services tiles → ring should expand to 56px with accent. Hover nav links → ring expands to 36px. Outside any tagged element → 28px white/15.

## 3 — MobileMenu polish (Wave 2)

**Problem 1:** Close button uses the literal text glyph `"x"` (`MobileMenu.tsx:120`). The font's lowercase x is visually misaligned and inconsistent with the SVG `.wdetail__close` icon used elsewhere.

**Fix:** swap for the same SVG path used in `ServicesSection` modal close (`d="M1 1l12 12M13 1L1 13"` 14×14 viewBox), white/60 stroke, hover white.

**Problem 2:** The 3 menu links are plain centered text — generic.

**Fix:** wrap each link in a `relative` container; add `::before` and `::after` pseudo-elements drawn as window-corner brackets (top-start `⌐`, bottom-end `⌐` rotated 180°), 12×12px, 1px white/30 border-segments (top + start, bottom + end). On hover/focus, brackets fade in, scale from 0.85 → 1, and slightly translate outward (~3px) using framer-motion's `whileHover`. Reduced-motion users get the static visible state with no transform.

This echoes the `.wtile__cross` crosshair pattern, giving the mobile menu visual continuity with the desktop services tiles.

**Verification:** open mobile menu, hover/focus each link → corner brackets appear. Tap close → SVG cross, properly aligned.

## 4 — ProcessSection rAF + active-step pulse sync (Wave 2)

**Problem 1:** `update()` (`ProcessSection.tsx:16-33`) runs on every `scroll` event with no rAF throttle. On long pages with Lenis, this can fire 60+ times per visible frame.

**Fix:** wrap with the standard rAF guard:
```ts
let rafId = 0
const onScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    update()
  })
}
```
Cancel on unmount with `cancelAnimationFrame`.

**Problem 2:** The `.tl__pulse` element's position is driven purely by `--p` (scroll percent through the section). It races ahead of the currently-active step.

**Fix:** track the active step's index inside `update()` (whichever step has `dotY < vh * 0.72`). Set a CSS var `--pulse-target` to that step's relative offset (`step.offsetTop / tl.scrollHeight`). The `.tl__pulse` CSS uses `top: calc(var(--pulse-target, 0) * 100%)` with a `transition: top 600ms cubic-bezier(0.16,1,0.3,1)` so it snaps to the active step instead of streaming with scroll. The existing `--p`-driven spine fill stays — it's the gradient track behind the pulse.

**Verification:** scroll through Process section. Pulse should snap to each step's dot as it activates, with a smooth ease, instead of sliding continuously ahead.

## 5 — Footer polish (Wave 2)

**Marquee wordmark above the grid:**
- New element above `.site-footer__grid`: `.site-footer__marquee` containing `<span>SHUBAK</span>` repeated 4× with `·` separators inside a single `.site-footer__marquee-track`.
- Animated via CSS `@keyframes marquee-slide` translating `transform: translateX(0 → -50%)` over 28s linear infinite. Direction flips for RTL via `body[dir="rtl"]` selector.
- Type: 18vw bold, line-height 0.9, letter-spacing -0.04em, color stroke-only (`-webkit-text-stroke: 1px var(--line-strong); color: transparent`). On hover anywhere within the footer, opacity bumps from 0.55 → 0.85.
- Pause on `prefers-reduced-motion: reduce` (animation-play-state: paused).

**Connect column with icon glyphs:**
- Update `dict.footer.connectItems` shape to optionally include `icon: 'mail' | 'linkedin' | 'x' | 'github'`. Each entry maps to an inline SVG glyph rendered before the label inside the link. Icons match the project's existing thin-stroke aesthetic (1.4 stroke-width, currentColor).
- Default icons for the existing two entries: `mail` for hello@shubak.ai, `linkedin` for LinkedIn. User can extend later via dict.

**Verification:** scroll to footer. Marquee slides left-to-right (RTL: right-to-left). Connect links show prefixed icons.

## 6 — Services FLIP transition (Wave 3)

**Problem:** Tile fades + modal scales — two disconnected animations.

**Design (FLIP pattern):**
1. On click, capture the tile's `getBoundingClientRect()` → `firstRect`.
2. Set `openSlug` AND immediately apply `is-opening` class to the tile (already exists in CSS; hides it).
3. Render the modal with a new wrapper element `.wdetail__flip` positioned `fixed` at `firstRect`'s coordinates, scaled to `firstRect`'s size. This wrapper sits *outside* `.wdetail__frame` and inherits the tile's rounded-corner / border treatment.
4. On the next frame (`requestAnimationFrame` after mount), animate `.wdetail__flip` to the target rect (which is the centered modal frame's natural position — measured via ref). Use framer-motion's `motion.div` with `initial={{ x, y, width, height, borderRadius }}` and `animate={{ x: 0, y: 0, width: '70vw', height: '80vh', borderRadius: 12 }}`. Transition: `{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }`.
5. The chrome (`.wdetail__chrome` dots + address bar) and `.wdetail__scroll` content are inside the flip wrapper but `opacity: 0` initially. On animation complete, fade them in (`{ delay: 0, duration: 0.25 }`).
6. On close: reverse — fade chrome out (~150ms), animate flip wrapper back to `firstRect`, then unmount and clear `is-opening` from the tile.

**Implementation notes:**
- Store `firstRect` in a ref, not state, so we don't re-render mid-animation.
- One-element model: replace the static `.wdetail__frame` with the framer `motion.div`. It IS the frame — no handoff between two elements. Class becomes `.wdetail__frame` for CSS reuse, but the element is rendered by `<motion.div>` with the FLIP transform driven by framer.
- Backdrop (`.wdetail__backdrop`) fades in independently as today.
- Keyboard navigation between services: when `navigate()` fires, swap content + slug only — no inter-service FLIP animation. Keeps the inter-service swap snappy and avoids tracking nested rect captures. The opening/closing FLIP is the only morph.

**Reduced motion:** under `useReducedMotion()`, skip the FLIP — fall back to current fade-scale via opacity-only transition.

**Verification:** click a services tile. The frame should physically grow from the tile's position into the centered modal. Chrome fades in last. Close → reverses back to the tile.

## 7 — ServiceDetail unification (Wave 3)

**Problem:** `service-detail.tsx` is plain Tailwind cards inside `<WindowFrame>`. The modal version uses `.wdetail__chrome` + address bar + structured `.wdetail__grid` blocks. Two visual languages for the same content.

**Fix — refactor `service-detail.tsx`:**
- Wrap the page content in `.wdetail__chrome` (the dots + address bar `shubak.sa/services/{slug}`) + a `.wdetail__page-frame` container that mirrors the `.wdetail__frame` styling minus the fixed positioning (it's a normal page block).
- Reuse the same `.wdetail__hero`, `.wdetail__grid`, `.wdetail__block`, `.wdetail__klabel`, `.wdetail__list`, `.wdetail__chips`, `.wdetail__sample` classes from globals.css. Remove the per-element Tailwind utility soup currently in `service-detail.tsx`.
- Add a `.wdetail__pagination` strip at the bottom: prev/next service tease showing the next service's `num` + title, with arrow chevron. Built from `services` array using `slug` → `findIndex`.
- Keep the `← Back to home` link at the top (already styled appropriately).
- The "Build one like this" CTA already exists in the modal — mirror it on the page.

**No address bar mismatch with the modal:** both should read `shubak.sa/services/{slug}`.

**Verification:** visit `/services/web` → page should look like the modal opened in standalone mode, with prev/next chevrons at bottom navigating between services.

## 8 — /contact dedicated page (Wave 4)

**Problem:** `src/app/contact/page.tsx` is `return <CtaSection />`. The route is identical to scrolling to the homepage CTA.

**Design — new `app/contact/page.tsx`:**
```
┌─────────────────────────────────────────┐
│  ← back to home                         │
│                                          │
│  Eyebrow: "Get in touch"                 │
│  H1: "Let's open your window."           │
│  Subtitle: explainer (~2 lines)          │
│  ┌─────────────────────────┐            │
│  │ ✦ We reply within 24h   │  ← SLA badge │
│  └─────────────────────────┘            │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  ContactWizard (full bleed,         │ │
│  │  reused from CtaSection)            │ │
│  └────────────────────────────────────┘ │
│                                          │
│  What happens next:                      │
│  01 Discovery call (within 24h)          │
│  02 Scope + estimate (3 business days)   │
│  03 Kickoff or honest no                 │
└─────────────────────────────────────────┘
```

**Implementation:**
- Convert `app/contact/page.tsx` to render this layout directly. Wizard component (`ContactWizard`) is reused as-is from its current location.
- New CSS classes: `.contact-page`, `.contact-page__intro`, `.contact-page__sla`, `.contact-page__next`. Located in globals.css under a `/* /contact page */` section.
- SLA badge: small pill (rounded-full), accent-color sparkle icon, white/80 text, accent border at 30% opacity.
- "What happens next" 3-step strip: numbered, mono labels, 1px column dividers between, layout matches Process section's typography but compressed (no scroll behavior).
- New i18n keys:
  - `contact.intro.eyebrow` ("Get in touch" / "تواصل معنا")
  - `contact.intro.heading` (matches existing CTA heading or new — keep "Let's open your window")
  - `contact.intro.sub` (2-line explainer)
  - `contact.sla.label` ("We reply within 24 hours" / "نرد خلال 24 ساعة")
  - `contact.next.title` ("What happens next" / "ماذا بعد")
  - `contact.next.steps[]` — 3 steps with `name` + `desc`

**Homepage CtaSection stays unchanged** — keep its current copy referencing "one business day" or align both to "24 hours" (recommendation: align both to match the SLA we're committing to).

**Verification:** visit `/contact`. Standalone layout, intro at top, SLA badge visible, wizard below, what-happens-next strip at bottom. Scrolling to the homepage CTA still shows its own version.

## 9 — Projects placeholder cards (Wave 4)

**Problem:** `ProjectsSection.tsx` renders fake gray bars as mock UI. For agencies, "show real work" is the most-scrutinized section. Q1 answer: B — placeholder cards until real ones are ready.

**Design:**
- Each card is a window-frame (chrome dots + address bar showing the placeholder URL like `shubak.sa/work/coming-soon`) wrapping a centered "Coming soon" treatment instead of mock bars.
- Card content (replaces the gray-bar mock body):
  - Top: small `COMING SOON` label in mono, white/40, with a 1px accent dot prefix
  - Center: large stylized number (`01 / 04`) using `--accent` at 25% opacity, mono
  - Bottom: a single horizon line gradient (echoes hero) with one travelling pulse dot per card (CSS-only animation, staggered phases)
- Hover: card lifts (existing `translateY(-4px)` stays), accent dot pulses, address bar text scrambles briefly to `shubak.sa/work/[redacted]` (~150ms glitch effect using JS rAF; cheap).
- No `<Link>` — these are not yet clickable. Add `aria-label="Project preview — coming soon"` and `cursor: default` (do NOT set `data-cursor="link"`).
- Keep `dict.projects.items` (Najm, Fahm, Iyadah, Rafd) — those titles + categories + years still render in `.work-card__info`, just the *visual* preview area changes.

**i18n:** add `dict.projects.placeholder` ("Coming soon" / "قريباً").

**Verification:** scroll to Projects. Cards show window chrome + "Coming soon" treatment. Hover lifts + pulses, address bar glitches. No click action.

## Honorable mentions (folded into Wave 2)

- ProcessSection rAF — covered in §4
- Footer marquee + socials — covered in §5
- Section reorder Projects ↔ Process — **NOT doing in this sprint** (separate A/B test, mention in handoff)

## Testing strategy

Manual verification only — no test infra exists in the repo for visual/interaction work. After each wave:

1. `npm run dev` → http://localhost:3000
2. Scroll the full homepage end-to-end. Note any jank, broken transitions, RTL flips going wrong.
3. Switch language EN ↔ AR. Re-scroll. Verify marquee direction, FLIP origin, cursor modes still work.
4. DevTools mobile (375×812 + 768×1024). Verify mobile menu polish, that desktop-only features (cursor, FLIP) stay disabled.
5. Throttle to "Slow 4G" CPU 4× — Process section should not jank, FLIP should still feel smooth (under reduced motion if it doesn't).
6. Toggle `prefers-reduced-motion` (DevTools Rendering tab) — every animation should degrade gracefully.

Codex will then review the diff. We expect feedback on accessibility, RTL edge cases, hook cleanup, and any state leaks across navigation.

## Codex handoff notes (to be expanded after implementation)

- Diff scope: `src/components/**`, `src/app/**`, `src/lib/i18n/{en,ar}.ts`, `src/app/globals.css`, `docs/superpowers/specs/2026-04-28-site-polish-v2-design.md`
- Known trade-offs: cursor uses document-level `mouseover` delegation rather than per-element refs (intentional — scales to all current and future tagged elements without prop drilling)
- FLIP transition is the most likely thing for codex to flag as fragile; pay attention to its review
- "Coming soon" cards intentionally do not link anywhere — by design, not omission

## Approval gate

User: please review this spec and let me know if anything needs to change before I start writing the implementation plan and shipping.
