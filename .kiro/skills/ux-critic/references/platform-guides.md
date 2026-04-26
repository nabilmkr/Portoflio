# Platform Guides & Scenario Guides

## SCENARIO GUIDES

---

## Login / Auth Screen

### Critical checks
```
□ Is there a "Show password" toggle on password fields?
  → Without it: typos go undetected, users abandon
  
□ Is error messaging specific and helpful?
  ✗ "Invalid credentials" (tells user nothing actionable)
  ✓ "Incorrect password. Forgot your password?" (tells them what to do)
  
□ Does the form submit on Enter/Return key?
  → If not: mobile users with keyboard open are stuck

□ Is the CTA ("Log in") always visible above keyboard?
  → On mobile: when keyboard opens, 50% of screen disappears.
  → Fix: KeyboardAvoidingView (React Native) or CSS viewport units trick.

□ Is there a "Forgot password" link? Is it discoverable (not hidden)?

□ Social auth buttons (Sign in with Google/Apple)?
  → If present: should be ABOVE the email/password form (users scan top first)
  → iOS: "Sign in with Apple" is required if any other social login is present (App Store rule)
  → Order: Apple > Google > others
```

### Common failures
```
PLACEHOLDER AS ONLY LABEL
  → On mobile: keyboard opens, user fills field, placeholder disappears.
    User forgets what they typed in / what the field was for.
  → Fix: Floating label that moves up on focus.

NO AUTOFILL SUPPORT
  → HTML input types not set correctly = no password manager autofill.
  → Fix: type="email", type="password", autocomplete="current-password"

DISABLED BUTTON UNTIL VALID
  → Good in theory, but: if button is disabled, user doesn't know WHY.
  → Better: always enabled button, show inline validation on submit.

CAPS LOCK WARNING MISSING
  → Password field with caps lock on = user types wrong password repeatedly.
  → Fix: Detect caps lock and show a small warning near the password field.
```

---

## Dashboard / Data Screen

### Critical checks
```
□ Is the most important metric immediately visible (above fold, large)?
□ Are chart types semantically correct?
  - Trends over time → Line chart
  - Comparing categories → Bar chart
  - Part-to-whole → Donut/Pie (max 5 slices only)
  - Correlation → Scatter plot
  - Geographic data → Map
  ✗ Using pie chart for more than 5 segments = unreadable
  ✗ Using bar chart for continuous time data = should be line

□ Empty state designed? (No data = what does the user see?)
  → Blank chart area with no guidance = confusion
  → Fix: Illustration + message + CTA ("Add your first data →")

□ Loading state? (Are charts showing skeleton before data?)
  → Blank space flashing to full chart = jarring
  → Fix: Skeleton shimmer matching chart shape

□ Filters and date ranges prominently accessible?
  → If data is time-based: date range picker should be top-level, not buried.

□ Data refresh indicator? (Last updated: X minutes ago)
```

### Information density calibration
```
B2B TOOLS / DEVELOPER DASHBOARDS (Linear, Vercel, GitHub):
  - Dense is expected and appropriate
  - Small font OK (13px even)
  - Information per pixel is a feature, not a bug
  - Users know the product, they want efficiency

CONSUMER APPS:
  - More whitespace, larger text
  - Only key metrics shown (not raw data)
  - Progressive disclosure for details

EXECUTIVE DASHBOARDS:
  - Very clean, big numbers, minimal clutter
  - Charts > tables (pattern recognition, not exact values)
  - Color coding for status (red/amber/green)
```

---

## Onboarding Flow

### Critical checks
```
□ Step count: how many screens before the user reaches value?
  → Best: 2-4 steps for consumer apps
  → Acceptable: 5-7 for complex B2B tools
  → Red flag: 8+ steps (most users abandon)
  
□ Is there a "Skip" or "Do this later" option?
  → Always provide an escape for users who want to explore first.
  → Exception: steps that are required (e.g., verify email before access)

□ Is there a progress indicator?
  → Users need to know: how far along am I? How much more?
  → Best: step dots or "Step 2 of 4"
  → Avoid: long progress bars that feel slow (psychological)

□ Does each screen communicate VALUE, not just collect data?
  → Instead of "Enter your name" → "What should we call you? 👋"
  → Instead of "Set preferences" → "Let's personalize your experience"
  → The tone should feel like a conversation, not a form.

□ Does the first screen immediately show what the product does?
  → Onboarding ≠ marketing. Don't repeat "the best app for X" — they already signed up.
  → Show the actual product moment as early as possible.
```

### Onboarding patterns
```
PROGRESSIVE ONBOARDING (best for complex apps):
  → Show empty states with guidance inline
  → Teach features as they're encountered, not upfront
  → Examples: Notion, Linear

CHECKLIST ONBOARDING:
  → Show a "Get started" checklist on the home screen
  → Users complete steps at their own pace
  → Examples: Stripe, GitHub

WIZARD ONBOARDING (ok for simple apps):
  → Sequential steps, must complete all before using
  → Best for: apps that require data to function (e.g., fitness tracker needs birthday/weight)
  → Bad for: general purpose tools

DEMO/TOUR ONBOARDING:
  → Overlay tooltips on the real UI
  → Often skipped by users (research: most click "skip tour")
  → OK as supplement, not primary onboarding
```

---

## Settings Screen

### Critical checks
```
□ Are settings logically grouped?
  Common groups:
  - Account / Profile
  - Notifications
  - Privacy / Security
  - Appearance / Display
  - Integrations / Connections
  - Help / Support
  - Danger zone (destructive actions)

□ Are destructive actions (Delete account, Disconnect, Clear data) visually distinct?
  → Use RED color, separate section "Danger Zone"
  → Must require confirmation: "Are you sure? This cannot be undone."
  → Confirm by typing the word "DELETE" for irreversible actions (GitHub/Heroku pattern)

□ Toggle placement on mobile (iOS):
  → Left: label — Right: toggle
  → Never put toggle on the left (fights native iOS pattern)

□ Does every setting show its current state?
  → "Notifications" → is it on or off? Don't make user tap to find out.
  → Toggles show state. Selects show current value. Links show nothing (needs chevron ›)

□ Is search available for settings-heavy screens?
  → If >15 settings: add a search field at the top
```

---

## List / Feed

### Critical checks
```
□ Is item height consistent within the same list type?
  → Variable height is OK for feeds (text posts vary)
  → Fixed height preferred for structured lists (contacts, files)

□ Is there a swipe action on mobile? Is it discoverable?
  → Swipe-to-delete is not naturally discoverable
  → Hint: show swipe action briefly on first app launch (animation hint)
  → Or: long-press context menu as fallback

□ Empty state — is it designed and helpful?
  → Never show a blank list
  → Show illustration + message + primary action
  
□ Infinite scroll vs pagination?
  → Infinite scroll: good for feeds, social content (endless discovery)
  → Pagination: good for search results, data tables (user needs to bookmark position)
  → ✗ Infinite scroll on tables makes it impossible to navigate
  
□ Pull-to-refresh on mobile?
  → Expected on any list that can have new content.
  
□ Loading state? Are items skeleton-loading or showing a spinner?
  → Per-item skeletons >> single spinner
```

---

## Product / Detail Page

### Critical checks (E-commerce / Content)
```
□ Is the primary CTA (Buy / Add to cart / Start free trial) always visible?
  → Mobile: sticky bottom bar with CTA
  → Desktop: sticky right panel or inline CTA above fold

□ Are trust signals present?
  → Social proof: ratings, review count, customer count
  → Trust badges: secure payment, money-back guarantee
  → These must be NEAR the CTA (not bottom of page)

□ Image gallery UX:
  → Mobile: swipe between images (horizontal)
  → Desktop: thumbnail strip + main image
  → Zoom on tap/click
  → Correct image ratio (don't crop faces or key product details)

□ Price visibility:
  → Price should be prominent (larger than body text)
  → If there's a discount: both prices visible (crossed out original)
  → Never hide price (force user to add to cart to see price = abandonment)

□ Is the page scannable?
  → Users scan, not read. Bold key info: price, delivery date, key features.
  → Use icons + short labels for feature lists (not paragraphs)
```

---

## Form / Checkout Flow

### Critical checks
```
□ Field order logical?
  → Follow natural sequence: Name → Email → Password → Billing
  → NOT: Password → Email → Name (illogical, non-standard)

□ Inline validation (not only on submit)?
  → Validate each field on blur (when user leaves the field)
  → Instant validation on submit: all errors shown at once
  → ✗ Only validating on submit = user has to re-read whole form to find errors
  → ✗ Validating on every keystroke = annoying (shows errors before user finishes typing)

□ Error messages specific and actionable?
  ✗ "Invalid input"
  ✓ "Email must include an @ symbol"
  ✗ "Password error"
  ✓ "Password must be at least 8 characters"

□ Multi-step forms: is progress shown?
  → "Step 2 of 3: Shipping details"
  → Never hide progress in long checkout

□ Are optional fields clearly labeled?
  → "Optional" in label, or "(optional)" suffix
  → NOT marking required fields with * (users often don't know * = required)

□ Is the form keyboard-friendly on mobile?
  → Correct input type for each field:
    Name → text, autocomplete="name"
    Email → email, autocomplete="email"
    Phone → tel, autocomplete="tel"
    Expiry date → text, inputmode="numeric", pattern="[0-9/]*"
    Card number → text, inputmode="numeric"

□ After submission: clear success state?
  → Confirmation screen, not just "form cleared"
  → If async: loading state while waiting for response
```

---

## Landing Page

### Critical checks
```
□ Clarity above fold:
  → In 5 seconds, a visitor should know:
    1. What does this product do?
    2. Who is it for?
    3. What do I do next? (CTA)
  → Test with strangers: "What do you think this page is about?"

□ Hero headline:
  → Focus on OUTCOME, not features
  ✗ "The most powerful project management software"
  ✓ "Ship projects on time, every time" (outcome)
  ✓ "Build better habits in 5 minutes a day" (outcome + time commitment)

□ Primary CTA above fold:
  → Must be visible without scrolling on desktop (1080p minimum)
  → Free trial / Sign up / Get started — specific, low-friction
  → Friction reducers near CTA: "No credit card required" / "Free forever"

□ Social proof placement:
  → Within the first 2 scrolls (not footer only)
  → Specific numbers beat vague claims:
  ✗ "Trusted by thousands of companies"
  ✓ "Used by 45,000+ teams at Airbnb, Stripe, and Netflix"

□ Mobile parity:
  → Desktop design ≠ mobile design. Check at 375px (iPhone SE) width.
  → Long horizontal nav → hamburger or simplified links
  → Multi-column → single column (but CTA still above fold)
  → Images: don't let them push CTA below fold on mobile
```

---

## Design System Review

### What to check
```
TOKENS:
  □ Color tokens defined (not hardcoded hex values)?
  □ Typography scale defined (not px values in every component)?
  □ Spacing scale defined (multiples of 4 or 8)?
  □ Shadow tokens defined (sm/md/lg, not one-off)?
  □ Border radius tokens defined?
  
COMPONENTS:
  □ All components have variants documented?
  □ All states designed (default/hover/focus/disabled/error)?
  □ Components use tokens, not raw values?
  □ Naming consistent? (Button/ButtonPrimary vs Btn/PrimaryBtn = inconsistent)
  
DOCUMENTATION:
  □ Usage guidelines written (when to use what)?
  □ Anti-patterns documented (what NOT to do)?
  □ Accessibility notes included?
  
COMMON DESIGN SYSTEM FAILURES:
  - Tokens defined but not used (hardcoded values in components)
  - Multiple versions of same component (3 different "card" components)
  - No semantic layer (raw colors used instead of semantic names)
    ✗ Using: colors.gray700 for text
    ✓ Using: text.secondary → resolves to colors.gray700
  - Missing density variants (compact / comfortable / spacious) for data-heavy apps
```
