# Critique Lenses — Deep Reference

## Lens 1: Visual Hierarchy (Full Rubric)

### What to look for
```
THE SQUINT TEST:
  Squint at the screen until blurry. What stands out?
  That's what your visual hierarchy is actually communicating.
  If nothing stands out — or if the wrong thing stands out — hierarchy is broken.

THE 3-SECOND TEST:
  Can a new user identify:
  1. What this screen/page is about?
  2. What the primary action is?
  3. What the secondary options are?
  In under 3 seconds? If not: hierarchy failure.
```

### Common hierarchy failures
```
EVERYTHING IS BOLD / BIG
  → When everything is emphasized, nothing is emphasized.
  → Fix: Establish clear H1 → H2 → body → caption type scale. Max 2 bold levels per screen.

BACKGROUND COLOR COMPETES WITH FOREGROUND
  → Vibrant backgrounds make text/buttons harder to read.
  → Fix: Use desaturated or darker background. Let UI elements be the colorful ones.

CTA BURIED IN THE PAGE
  → Primary action is same size/weight as secondary content.
  → Fix: Primary CTA = largest interactive element on screen. Increase size, use brand color.

VISUAL NOISE (too many elements at same weight)
  → Icons, labels, lines, cards, all demanding equal attention.
  → Fix: Remove or reduce. Apply 60/30/10 rule: 60% neutral, 30% secondary, 10% accent.

ABOVE THE FOLD WASTED
  → Critical content or CTA below the scroll boundary.
  → Fix: Most important content in top 60% of first viewport. CTA always visible without scroll.
```

### Hierarchy scoring
```
4/4 — Clear primary → secondary → tertiary. First-time user instantly knows what to do.
3/4 — Mostly clear, minor competition between elements.
2/4 — Multiple elements compete. User hesitates.
1/4 — Flat hierarchy. Everything is equal. User is lost.
0/4 — Chaotic. No signal of what to do or look at.
```

---

## Lens 2: Typography (Full Rubric)

### Type scale audit
```
Examine every text style used. Check for:
  □ How many distinct font sizes are used? (Should be ≤ 6 for most screens)
  □ Are sizes from a consistent scale? (not 14, 15, 17, 18, 22 — that's 5 arbitrary sizes)
  □ How many font weights? (Max 3 per screen: regular, medium/semibold, bold)
  □ Are weights used semantically? (bold = heading, medium = label, regular = body)
  □ Line heights set? (Not default — line heights should be explicitly designed)

MODULAR SCALE OPTIONS:
  Minor Third (1.2×):  12, 14, 17, 20, 24, 29 — compact, dense interfaces
  Major Third (1.25×): 12, 15, 19, 24, 30, 37 — balanced, versatile
  Perfect Fourth (1.333×): 12, 16, 21, 28, 37 — dramatic hierarchy
  Use: plug into typescale.com to see options
```

### Readability checks
```
CONTRAST (use https://webaim.org/resources/contrastchecker/):
  Body text on bg: ≥ 4.5:1 (WCAG AA)
  Large text (18px+ regular or 14px+ bold) on bg: ≥ 3:1
  UI components and icons: ≥ 3:1
  
  Common violations:
  - Gray text on white: #999999 on #FFFFFF = 2.85:1 (FAIL)
    Fix: use #767676 on #FFFFFF = 4.54:1 (PASS)
  - White text on brand color: depends on specific brand color
    - #6366F1 on white = 3.25:1 (FAIL for normal text)
    - Use #4338CA on white = 5.07:1 (PASS)

LINE LENGTH (measure by character count):
  Desktop body: 65–80 chars per line
  Mobile body: 45–60 chars per line
  Too short (<40 chars): fragmented reading rhythm
  Too long (>90 chars): eye loses track of next line start

LINE HEIGHT:
  Body text: 1.5–1.6× the font size
  Headings: 1.1–1.25× (tighter is ok for large sizes)
  Labels/captions: 1.3–1.4× (compact)
  
  NEVER set line height the same as font size (especially for multiline text)
```

### Common typography issues
```
USING SYSTEM DEFAULT LINE HEIGHTS
  → Browser/OS default line heights are not designed. Always set explicitly.
  → Fix: body { line-height: 1.5; } minimum.

PLACEHOLDER TEXT AS LABEL
  → Placeholder disappears on input focus. Users forget what the field is for.
  → Fix: Always visible floating label above the field.

ALL CAPS FOR LONG TEXT
  → All caps reduces reading speed by ~10-15% due to uniform word shapes.
  → OK for: short labels, section headers, button text (max 2-3 words)
  → Never for: body text, long labels, error messages.

CENTERED BODY TEXT
  → Centered alignment breaks reading rhythm for multi-line text.
  → OK for: headlines, short single-line labels, empty states
  → Never for: paragraphs, list content, form labels

MIXING TOO MANY TYPEFACES
  → Max 2 font families per product: 1 for headings + 1 for body/UI
  → Many great products use 1 font family with different weights
```

---

## Lens 3: Color & Contrast (Full Rubric)

### Color system audit
```
Examine the palette used. Identify:
  □ How many distinct colors are used?
  □ Is there a clear primary brand color?
  □ Is there a clear semantic system? (success/error/warning/info)
  □ Are neutrals consistent? (how many grays? should be a ramp of ~6-8)
  □ Does dark mode exist? Are all colors adapted (not just inverted)?

WELL-STRUCTURED COLOR SYSTEM:
  1 × Primary brand (for CTAs, links, active states)
  1 × Secondary/accent (optional, for highlights)
  4 × Semantic (success, warning, error, info)
  6-8 × Neutral gray ramp (from near-white to near-black)
  2-3 × Background levels (base, elevated, overlay)
  
  Total: ~15-20 colors max. If you're using more: consolidate.
```

### Color usage errors
```
USING COLOR ALONE FOR STATE
  → "Red text = error" — but for 8% of males (color blind), red and green look similar.
  → Fix: Always pair color with icon, text, or pattern.
  → Error = red + ⚠️ icon + error message text. Not just red border.

OVER-SATURATED UI
  → Every element using max-saturation colors = visual fatigue.
  → Fix: CTAs use full brand color. Everything else uses muted/tinted versions.
  → Rule: Only 10% of the UI surface should be brand color at full saturation.

INSUFFICIENT SURFACE DEPTH (dark UIs)
  → Dark mode: using one dark background for everything = flat, unstructured.
  → Fix: 5 elevation levels minimum:
    bg0: #0D0D14 (deepest, behind everything)
    bg1: #141420 (main background)
    bg2: #1C1C2E (cards, panels)
    bg3: #252540 (inputs, tooltips)
    border: rgba(255,255,255,0.08) (dividers)

WARM VS COOL INCONSISTENCY
  → Mixing warm grays (#8B7355) with cool grays (#8B9099) in the same UI.
  → Fix: Pick one temperature for neutrals and be consistent throughout.

ACCENT COLOR ON DARK TEXT
  → Using a light brand color as text color on white background.
  → Test every text color combo in a contrast checker.
```

---

## Lens 4: Spacing & Layout (Full Rubric)

### Spacing system audit
```
Check if spacing is from a consistent system:
  BASE-8 GRID: 4, 8, 12, 16, 24, 32, 48, 64, 96...
  
  Violations to find:
  - Padding of 10px, 14px, 18px, 22px → not on grid
  - Different spacing for visually similar elements
  - Inconsistent padding inside same component type
  
HOW TO CHECK SPACING:
  In a screenshot: use ruler tool or count pixels
  In Figma: inspect panel shows exact values
  In code: grep for px values that aren't multiples of 4
```

### Layout density spectrum
```
CRAMPED (too dense):
  - Content touches the edges
  - No breathing room between sections
  - Users feel overwhelmed
  - Risk: users miss content because everything competes
  Signs: <8px padding inside cards, <4px between list items

BALANCED (target for most products):
  - Generous internal padding (16-24px in cards)
  - Clear separation between sections (32-48px)
  - Whitespace intentional, not accidental
  
AIRY (too sparse):
  - Lots of space but content feels disconnected
  - Users unsure what relates to what (proximity law broken)
  - Often: landing pages that over-whitespace
  Signs: >80px between related content, sections feel isolated

FOR INFORMATION-DENSE TOOLS (dashboards, data tables):
  Tight density is OK — but still on grid (4px base, not 5px/7px)
  Use horizontal rules and section headers to create visual chunks
```

### Common spacing failures
```
INCONSISTENT COMPONENT PADDING
  → Some cards have 16px padding, others 20px.
  → Fix: Define and reuse card padding as a token. Never set per-instance.

WRONG PROXIMITY (items too far/close)
  → A label is closer to the wrong field.
  → A section title has more space below it than above it (reverses reading direction).
  → Fix: Title → 24px below → content → 48px below → next title → 24px below → content

MARGIN COLLAPSING IGNORED (web)
  → Vertical margins collapse in CSS. Bottom margin of heading + top margin of paragraph = not added.
  → Fix: Use gap in flex/grid containers instead of margins for predictable spacing.

NO COLUMN GRID ON DESKTOP
  → Web desktop using a mobile-style single column layout.
  → Fix: 12-column grid (or 4/6/8 column). Max content width: 1200-1440px centered.
  → Most SaaS: left sidebar (240-280px) + main content area + optional right panel.
```

---

## Lens 5: Interaction & Affordance (Full Rubric)

### Interactive element audit
```
For every interactive element, check:
  □ Does it LOOK interactive? (visual affordance)
  □ Does it have a hover state? (desktop)
  □ Does it have a pressed/active state? (mobile + desktop)
  □ Does it have a focus state? (keyboard navigation)
  □ Does it have a disabled state? (if applicable)
  □ Does it have a loading state? (if async action)
  □ Is the touch/click target large enough?
  
AFFORDANCE SIGNALS:
  Interactive = underline (links), filled/outlined shape (buttons), 
                arrow/chevron (expandable), cursor:pointer
  Static = no underline, no border, no hover change
  
  VIOLATION: Styled div with click handler but no visual affordance
  VIOLATION: `cursor: default` on clickable element
```

### State completeness checklist
```
For every significant UI component, all these states should be designed:

BUTTON:
  □ Default | □ Hover | □ Pressed | □ Focus | □ Loading | □ Disabled | □ Success

INPUT FIELD:
  □ Empty | □ Focused | □ Filled | □ Error | □ Disabled | □ Read-only

LIST ITEM / CARD:
  □ Default | □ Hover (desktop) | □ Pressed | □ Selected | □ Skeleton/Loading

ENTIRE SCREEN:
  □ Loading (skeleton) | □ Loaded | □ Empty state | □ Error state | □ Partial data

NEVER leave a state undesigned. Empty states that show raw "null" or blank white 
screens are a product quality failure, not a detail.
```

### Touch target analysis
```
MINIMUM SIZES:
  Apple HIG: 44×44 points
  Material Design: 48×48dp
  WCAG 2.5.5 (AAA): 44×44 CSS pixels
  
COMMON VIOLATIONS:
  - Icon-only buttons (24px icon, no padding) → tap target is 24px
    Fix: wrap in 44px container with transparent padding
  - Text links inline in body text → only as tall as line height
    Fix: increase line height, or separate into its own line
  - Close/dismiss buttons in modal headers (small ×) → often 20-24px
    Fix: minimum 44px tap target, visually 20px icon is fine

THUMB ZONE (mobile):
  Natural reach (right thumb, right-handed):
    Easy: bottom 40% of screen
    Ok: middle 40% 
    Stretch: top 20% (especially far corners)
  
  Primary actions: bottom of screen (iOS bottom bar, FAB, sticky CTA)
  Destructive actions: top of screen intentionally (harder to hit accidentally)
```

---

## Lens 6: Navigation & Information Architecture (Full Rubric)

### Navigation pattern selection
```
MOBILE:
  Bottom Tab Bar    → Best for: 3-5 top-level destinations, frequent switching
  Side Drawer       → OK for: many destinations, less frequent switching
                      Bad for: main app navigation (deprecated pattern in iOS)
  Top Tab Bar       → OK for: content categories within a single section
                      Bad for: main navigation on iOS (Android: common for content)
  
DESKTOP WEB:
  Top Nav           → Best for: marketing sites, simple apps (<5 sections)
  Left Sidebar      → Best for: SaaS dashboards, complex apps (5+ sections)
  Hybrid            → Top nav for global + left sidebar for contextual
  
ANTI-PATTERNS:
  ✗ Bottom tab + hamburger menu = inconsistent (pick one)
  ✗ >5 items in tab bar = cognitive overload
  ✗ Hamburger only on mobile app = discovery problem
  ✗ 3-level deep nested navigation without breadcrumbs
  ✗ Back button that takes user somewhere unexpected
```

### IA depth analysis
```
Map the navigation depth shown:
  Level 1: Main sections (tab bar / sidebar)
  Level 2: Sub-sections (nested nav, secondary tabs)
  Level 3: Individual content (list → detail)
  Level 4+: Deep detail (require back button clarity + breadcrumbs)

RULE: A user should be able to get anywhere in ≤ 3 taps from the home screen.
      If it requires more: restructure the IA or add shortcuts.

WAYFINDING (user always knows where they are):
  □ Active state visible in navigation
  □ Screen title clearly identifies location
  □ Breadcrumbs for deep hierarchies (web desktop)
  □ Back button label shows parent (iOS: "< Back" → "< Settings")
```

---

## Lens 7: Platform Conventions (Full Rubric)

### iOS Specific Patterns
```
✓ CORRECT:
  - Tab bar at bottom (not top)
  - Large title collapses to inline on scroll
  - Swipe-from-left-edge to go back
  - Bottom sheet (cards) for contextual actions
  - Pull-to-refresh on scroll views
  - Haptics on significant actions
  - SF Symbols for system icons
  
✗ VIOLATIONS (jarring to iOS users):
  - Hamburger menu as primary navigation
  - Tab bar at top
  - Toast notifications (use system banners or inline feedback)
  - Custom pull-to-refresh that fights the system gesture
  - Modal that can't be dismissed with swipe down
  - Android-style FAB as primary action (use bottom bar button or nav item)
```

### Android Specific Patterns
```
✓ CORRECT:
  - Bottom navigation bar (Material 3 default)
  - Floating Action Button for primary creation action
  - Top App Bar with icons right-aligned
  - Snackbar for brief feedback (not Toast — deprecated)
  - Material ripple effect on touch
  - Dynamic color theming (Material You)
  - Edge-to-edge layout with proper insets
  
✗ VIOLATIONS:
  - iOS-style back chevron (<) — Android has system back
  - Bottom action sheets with no drag handle
  - iOS-style toggle switches (use Material Switch)
  - No ripple effect on interactive elements
```

### Web Desktop Specific Patterns
```
✓ CORRECT:
  - Hover states on all interactive elements
  - Keyboard navigation (tab, enter, space, escape)
  - Focus ring (not removed via outline: 0 without replacement)
  - Right-click context menus where appropriate
  - Tooltips on icon-only buttons
  - Drag-and-drop where spatial reordering is needed
  - Responsive at 1280px minimum
  
✗ VIOLATIONS:
  - Mobile-style bottom navigation on desktop
  - No hover states (designed only for touch)
  - Max-width: 100% on ultra-wide (content stretches to 2560px)
    Fix: max-width: 1440px, centered
  - Font size too small for distance viewing (never < 13px for any text)
  - No multi-column layout (wasted horizontal space)
```
