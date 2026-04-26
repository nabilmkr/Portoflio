# Design Principles & Quick Tools Reference

## CONTRAST CHECKER QUICK TABLE

Common gray text on white background:
```
#FFFFFF on #FFFFFF =  1:1   ✗ invisible
#999999 on #FFFFFF =  2.85:1 ✗ FAIL (common mistake)
#888888 on #FFFFFF =  3.54:1 ✗ FAIL normal text, ✓ large text only
#767676 on #FFFFFF =  4.54:1 ✓ PASS AA normal
#595959 on #FFFFFF =  7.0:1  ✓ PASS AAA
#404040 on #FFFFFF = 10.0:1  ✓ PASS AAA

White text on dark backgrounds:
#FFFFFF on #6366F1 =  3.25:1 ✗ FAIL normal text
#FFFFFF on #4F46E5 =  4.55:1 ✓ PASS AA
#FFFFFF on #1E1E2E =  15.3:1 ✓ excellent

RULE: When in doubt, always go darker on the text, not lighter.
Tool: https://webaim.org/resources/contrastchecker/
```

---

## SPACING CHEAT SHEET

### When to use each spacing value (base-8)
```
2px  / 0.5 — Barely anything. Between icon and text in a badge.
4px  / 1   — Tight. Between inline elements.
8px  / 2   — Standard gap. Inside compact list items.
12px / 3   — Between elements within a component.
16px / 4   — Standard padding inside cards, standard gap in most contexts.
20px / 5   — Comfortable padding on mobile (horizontal screen padding).
24px / 6   — Section spacing inside a card.
32px / 8   — Separation between related sections on a page.
48px / 12  — Major section breaks. Between hero and next section.
64px / 16  — Large structural gaps on desktop.
96px / 24  — Hero section vertical padding.
```

### Thumb zone map (iPhone 14, 6.1" screen)
```
SCREEN HEIGHT: 844 logical pixels

EASY REACH (right thumb): 
  Bottom 320px (approx): everything below y=520

COMFORTABLE:
  Middle zone y=250–520

STRETCH (hard to reach):
  Top y=0–250 especially corners

PRIMARY ACTIONS SHOULD BE:
  → Bottom navigation: y=780+ (above home indicator)
  → Sticky CTA button: y=760–810
  → Floating action button: y=720, x=16 (left) or x=343 (right of center)

DO NOT PUT HERE:
  → Destructive actions in top corners (hard to tap accidentally)
  → Delete / Cancel / Dangerous confirmations
```

---

## ANIMATION PRINCIPLES

### When to animate (and when not to)
```
ANIMATE:
  ✓ Screen transitions (entering/exiting screens)
  ✓ Appearing/disappearing elements (modals, toasts, dropdowns)
  ✓ State changes (button loading, toggle switch)
  ✓ Micro-interactions (like/heart animation, success checkmark)
  ✓ Scroll-linked parallax (subtle only)
  ✓ List item entry (stagger on load)

DO NOT ANIMATE:
  ✗ Loading spinners on interactions that take <300ms (feels slow)
  ✗ Every cursor hover (excessive, distracting)
  ✗ Large layout shifts (jarring, not satisfying)
  ✗ Anything that delays access to content
```

### Animation timing cheat sheet
```
INSTANT (0-100ms):   Button press feedback, ripple effect start
FAST (100-200ms):    Hover state, focus ring, small position changes  
NORMAL (200-350ms):  Modal appear, dropdown open, tab switch
SLOW (350-500ms):    Page transition, large element appear
VERY SLOW (500ms+):  Onboarding illustration, loading sequence
                     Only use when the animation IS the experience.

SPRING PHYSICS (preferred over linear/ease):
  Feel natural and physical
  Parameters: stiffness, damping, mass
  Use withSpring() in Reanimated, spring() in Framer Motion
  
  Snappy UI: high stiffness (200+), medium damping (20)
  Natural UI: medium stiffness (100-150), medium damping (15-18)
  Bouncy: low damping (8-12) — use sparingly (consumer apps only)

EASING CURVES:
  ease-out → elements entering the screen (decelerate to rest)
  ease-in  → elements leaving the screen (accelerate out)
  ease-in-out → elements moving within the screen
  linear   → spinners, continuous loops only
  NEVER: linear for entrance/exit animations (feels mechanical)
```

---

## COPY / MICROCOPY PRINCIPLES

Design is incomplete without words. Always review the copy.

### Error messages
```
ANATOMY OF A GOOD ERROR MESSAGE:
  1. What went wrong (specific)
  2. Why it went wrong (if helpful)
  3. What to do next (actionable)
  
✗ BAD:
  "Error"
  "Something went wrong"
  "Invalid input"
  "Network error"

✓ GOOD:
  "Couldn't connect to the internet. Check your connection and try again."
  "This email is already in use. Try logging in instead."
  "Password must be at least 8 characters, including a number."
  "Your session expired. Please sign in again to continue."

TONE: Never blame the user. Never use technical jargon. Always offer a next step.
```

### Empty states
```
ANATOMY OF A GOOD EMPTY STATE:
  1. Illustration (optional but powerful — makes it feel intentional)
  2. Title: What's missing and why (not "No data found")
  3. Description: Context / encouragement
  4. CTA: The exact action to take

✗ BAD:
  [blank white space]
  "No results"
  "No items found"

✓ GOOD:
  🗂️ "No projects yet"
  "Create your first project to start organizing your work."
  [+ New Project button]
  
  🔍 "No results for 'Flibble'"
  "Try a different search term, or browse by category."
  [Browse categories →]
```

### Button labels
```
SPECIFIC BEATS GENERIC:
  ✗ "Submit" → ✓ "Create account" / "Send message" / "Book appointment"
  ✗ "OK" → ✓ "Got it" / "Confirm booking" / "Delete project"
  ✗ "Yes" → ✓ "Yes, delete" / "Yes, log out"
  ✗ "Click here" → ✓ "View all projects" / "Learn about pricing"

DESTRUCTIVE ACTIONS:
  → Always name the action AND the object: "Delete project" not just "Delete"
  → Confirm with what's happening: "Are you sure you want to delete 'My App'? 
     This cannot be undone."
  → Confirm button text = same as the action: "Delete project" (not "Yes" or "Confirm")

CTA FRICTION REDUCTION:
  Add clarifying subtext near CTAs:
  "Start free trial" → "No credit card required"
  "Sign up with email" → "Takes less than 2 minutes"
  "Download app" → "Free • 4.8 ★ • 50K reviews"
```

---

## GESTALT QUICK REFERENCE

### Applying Gestalt to UI reviews
```
PROXIMITY:
  → Elements grouped together are perceived as related.
  → Check: Is the label close to ITS input? Is the section title close to ITS content?
  → Violation: Label halfway between two fields. Card title with equal space above and below.

SIMILARITY:
  → Elements that look alike are perceived as the same type of thing.
  → Check: Are all buttons the same visual style? Are all links the same color?
  → Violation: Some clickable items are blue, others are black, and both are the same weight.
    User can't distinguish interactive from non-interactive.

CONTINUITY:
  → The eye follows paths and alignments.
  → Check: Are elements aligned to a grid? Does the eye flow naturally?
  → Violation: Left edges of different components are misaligned. Content alignment shifts.

FIGURE/GROUND:
  → Users perceive content on top of a background.
  → Check: Are modals, tooltips, dropdowns clearly elevated above the background?
  → Violation: Dropdown menu same background color as the page. Tooltip no shadow.

CLOSURE:
  → Minds complete incomplete shapes.
  → Check: Do card grids show partial cards at the edge? (Signals: more content to scroll)
  → Use: Carousel that clips the last visible item → user understands it scrolls.
```

---

## COMMON DESIGN ANTI-PATTERNS TO ALWAYS FLAG

```
DARK PATTERNS (ethical violations — always flag as Critical):
  ✗ Pre-checked newsletter subscription on signup
  ✗ "No thanks, I don't want to save money" (guilt-trip opt-out)
  ✗ Hidden unsubscribe (must be as easy as subscribe)
  ✗ Confirm-shaming
  ✗ Roach motel (easy to get in, hard to get out — e.g., impossible to cancel subscription)
  ✗ Bait and switch (free trial that auto-charges without clear warning)
  → Always flag these as Critical. They're both bad UX and often illegal (GDPR, FTC).

COMMON BAD PRACTICES:
  ✗ Disabling copy-paste in password fields (breaks password managers)
  ✗ "Are you sure?" on every action (reservation panic vs. genuine destructive action)
  ✗ Infinite carousels with no indicator of where you are
  ✗ Autoplaying video/audio (immediate tab close)
  ✗ Pop-up immediately on page load (user has seen nothing yet)
  ✗ Cookie banner that makes "Accept all" larger/easier than "Manage preferences"
  ✗ Removing browser back button behavior
  ✗ Forms that reset on validation error
  ✗ Success states that don't confirm what happened
  ✗ Notification permission prompt before user sees any value from the app

RESPONSIVE FAILURES:
  ✗ Text overflowing its container on small screens
  ✗ Buttons too close together for touch (less than 8px gap)
  ✗ Content hidden on mobile that exists on desktop (information loss)
  ✗ Horizontal scrollbar appearing unexpectedly
  ✗ Images not resizing (fixed width larger than viewport)
```

---

## BEFORE / AFTER FEEDBACK EXAMPLES

### Typography critique example
```
BEFORE:
  → 14px gray (#999999) body text on white background
  
FEEDBACK:
  🔴 CRITICAL — Accessibility failure
  The body text at 14px with color #999999 on white (#FFFFFF) gives a contrast ratio of 2.85:1,
  failing WCAG AA (requires 4.5:1 for normal text). Approximately 1 in 12 people have some
  form of vision impairment that would make this text difficult or impossible to read.
  
  Fix: Change text color to #595959 (contrast 7.0:1, WCAG AAA) OR increase size to 18px+
  and use #767676 (3:1 ratio passes for large text). I'd recommend the former — dark text
  also improves readability for everyone, not just users with visual impairments.

AFTER: ✓ #595959 at 15px. Clean, accessible, readable.
```

### Spacing critique example
```
BEFORE:
  → Card with padding: top 20px, right 16px, bottom 12px, left 16px

FEEDBACK:
  🟡 MINOR — Inconsistent internal padding
  The card has asymmetric padding (20/16/12/16) that creates visual imbalance — the content
  appears to float upward within the card. This also breaks from a consistent spacing system.
  
  Fix: Use uniform 16px padding on all sides (16/16/16/16). If you need visual hierarchy
  between header and content, achieve it with a 1px internal divider or a font size/weight
  difference — not asymmetric padding.
```

### Navigation critique example
```
BEFORE:
  → Mobile app with 7-item tab bar at bottom

FEEDBACK:
  🟠 MAJOR — Tab bar overloaded
  7 navigation items in a bottom tab bar exceeds the cognitive limit (Miller's Law: 5±2)
  and violates Apple HIG guidelines (maximum 5 items). At 7 items, labels become illegible
  on smaller devices (iPhone SE: 375pt wide / 7 items = ~53pt per item, barely fitting icon
  + 2-word label).
  
  Fix: Reduce to 4-5 primary destinations. Move secondary sections (Settings, Help) into
  a "More" or profile menu. Ask: what are the 4 core jobs users come to this app to do?
  Those are your tabs.
```
