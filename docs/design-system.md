# Design System Documentation

## Overview
This design system implements a modern, professional aesthetic with glassmorphism + dark luxe styling for a portfolio website. The system is built on Tailwind CSS with CSS variables for theming and follows elite-frontend-designer standards.

## Color Palette

### Primary Colors (Deep Blue with Purple Undertones)
- **Primary-50**: `hsl(210 40% 98%)` - Lightest
- **Primary-100**: `hsl(210 40% 96%)`
- **Primary-200**: `hsl(214 32% 91%)`
- **Primary-300**: `hsl(213 27% 84%)`
- **Primary-400**: `hsl(215 20% 65%)`
- **Primary-500**: `hsl(215 16% 47%)`
- **Primary-600**: `hsl(215 19% 35%)`
- **Primary-700**: `hsl(215 25% 27%)`
- **Primary-800**: `hsl(217 33% 17%)`
- **Primary-900**: `hsl(222 47% 11%)` - Base
- **Primary-950**: `hsl(229 84% 5%)` - Darkest

### Secondary Colors (Warm Gray)
- **Secondary-50**: `hsl(24 5% 95%)` - Lightest
- **Secondary-100**: `hsl(24 5% 90%)`
- **Secondary-200**: `hsl(24 5% 80%)`
- **Secondary-300**: `hsl(24 5% 70%)`
- **Secondary-400**: `hsl(24 5% 60%)`
- **Secondary-500**: `hsl(24 5% 50%)`
- **Secondary-600**: `hsl(24 5% 40%)`
- **Secondary-700**: `hsl(24 5% 30%)`
- **Secondary-800**: `hsl(24 5% 20%)`
- **Secondary-900**: `hsl(24 10% 15%)`
- **Secondary-950**: `hsl(24 10% 10%)` - Base

### Accent Colors (Vibrant Purple)
- **Accent-50**: `hsl(250 100% 98%)` - Lightest
- **Accent-100**: `hsl(251 91% 95%)`
- **Accent-200**: `hsl(252 85% 90%)`
- **Accent-300**: `hsl(253 81% 85%)`
- **Accent-400**: `hsl(254 78% 80%)`
- **Accent-500**: `hsl(255 75% 75%)`
- **Accent-600**: `hsl(256 72% 70%)`
- **Accent-700**: `hsl(257 69% 65%)`
- **Accent-800**: `hsl(258 66% 60%)`
- **Accent-900**: `hsl(259 63% 55%)`
- **Accent-950**: `hsl(262 83% 58%)` - Base

### Status Colors
- **Success**: `hsl(142 76% 36%)` - Green
- **Warning**: `hsl(38 92% 50%)` - Amber
- **Destructive**: `hsl(0 84% 60%)` - Red
- **Info**: `hsl(199 89% 48%)` - Blue

## Typography Scale

### Font Families
- **Sans**: Inter (system-ui fallback)
- **Mono**: JetBrains Mono (monospace fallback)
- **Display**: Same as sans (reserved for future use)

### Font Sizes (8px base)
- **xs**: 12px (0.75rem)
- **sm**: 14px (0.875rem)
- **base**: 16px (1rem)
- **lg**: 18px (1.125rem)
- **xl**: 20px (1.25rem)
- **2xl**: 24px (1.5rem)
- **3xl**: 30px (1.875rem)
- **4xl**: 36px (2.25rem)
- **5xl**: 48px (3rem)
- **6xl**: 60px (3.75rem)
- **7xl**: 72px (4.5rem)
- **8xl**: 96px (6rem)
- **9xl**: 128px (8rem)

### Line Heights
- Tight: 1 (for display text)
- Normal: 1.5 (for body text)
- Relaxed: 1.75 (for long-form content)

## Spacing Scale (8px base)

### Core Spacing
- **0**: 0px
- **px**: 1px
- **0.5**: 2px (0.125rem)
- **1**: 4px (0.25rem)
- **1.5**: 6px (0.375rem)
- **2**: 8px (0.5rem)
- **2.5**: 10px (0.625rem)
- **3**: 12px (0.75rem)
- **3.5**: 14px (0.875rem)
- **4**: 16px (1rem)
- **5**: 20px (1.25rem)
- **6**: 24px (1.5rem)
- **7**: 28px (1.75rem)
- **8**: 32px (2rem)
- **9**: 36px (2.25rem)
- **10**: 40px (2.5rem)
- **11**: 44px (2.75rem)
- **12**: 48px (3rem)
- **14**: 56px (3.5rem)
- **16**: 64px (4rem)
- **20**: 80px (5rem)
- **24**: 96px (6rem)
- **28**: 112px (7rem)
- **32**: 128px (8rem)
- **36**: 144px (9rem)
- **40**: 160px (10rem)
- **44**: 176px (11rem)
- **48**: 192px (12rem)
- **52**: 208px (13rem)
- **56**: 224px (14rem)
- **60**: 240px (15rem)
- **64**: 256px (16rem)
- **72**: 288px (18rem)
- **80**: 320px (20rem)
- **96**: 384px (24rem)

## Border Radius

### Scale
- **none**: 0px
- **xs**: 2px (0.125rem)
- **sm**: 4px (0.25rem)
- **DEFAULT**: 6px (0.375rem)
- **md**: 8px (0.5rem)
- **lg**: 12px (0.75rem)
- **xl**: 16px (1rem)
- **2xl**: 24px (1.5rem)
- **3xl**: 32px (2rem)
- **full**: 9999px

## Breakpoints (Responsive Design)

### Screen Sizes
- **xs**: 375px (Small phones)
- **sm**: 640px (Mobile)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)
- **2xl**: 1536px (Extra large desktop)
- **3xl**: 1920px (Full HD desktop)

### Container Padding
- **Default**: 1rem (16px)
- **sm**: 2rem (32px)
- **lg**: 4rem (64px)
- **xl**: 5rem (80px)
- **2xl**: 6rem (96px)

## Shadows & Effects

### Box Shadows
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **DEFAULT**: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`
- **2xl**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`
- **glass**: `0 8px 32px 0 rgba(31, 38, 135, 0.37)` (Glassmorphism)
- **neo-brutal**: `4px 4px 0px 0px rgba(0, 0, 0, 1)` (Neo-brutalism)

### Backdrop Blur
- **xs**: 2px
- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **2xl**: 24px
- **3xl**: 40px

## Animations

### Keyframe Animations
1. **fadeIn/fadeOut**: Simple opacity transitions
2. **slideUp/slideDown**: Vertical slide animations
3. **slideInLeft/slideInRight**: Horizontal slide animations
4. **scaleIn/scaleOut**: Scale animations
5. **bounceIn**: Bounce effect for attention
6. **pulseSoft**: Subtle pulsing effect
7. **float**: Floating animation for decorative elements
8. **gradientShift**: Animated gradient background
9. **glassGlow**: Pulsing glow for glass elements

### Timing Functions
- **ease-in-out**: Smooth acceleration and deceleration
- **ease-out**: Quick start, slow end
- **cubic-bezier(0.68, -0.55, 0.265, 1.55)**: Bounce effect

## Theme Switching

### Implementation
- Uses `next-themes` for theme management
- Supports `light`, `dark`, and `system` themes
- Theme toggle component with visual feedback
- Smooth transitions between themes
- System preference detection

### Theme Variables
All colors are defined as CSS variables in HSL format for easy theme switching. The dark theme inverts the color scale while maintaining contrast ratios.

## Accessibility

### WCAG Compliance
- Minimum contrast ratio of 4.5:1 for normal text
- Proper focus indicators for all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Touch targets minimum 44x44px

### Focus Management
- Visible focus rings with high contrast
- Focus trapping in modals
- Skip links for keyboard users
- Proper tab order

## Utilities

### CSS Utility Classes
- **.glass-effect**: Glassmorphism effect with backdrop blur
- **.text-gradient**: Gradient text effect
- **.focus-ring**: Consistent focus styling
- **.touch-target**: Minimum 44px touch target
- **.responsive-heading-***: Responsive typography utilities
- **.gradient-bg**: Gradient background utilities

### Performance Optimizations
- **will-change**: Optimized for transform and opacity animations
- **contain**: Content containment for performance
- **backface-visibility**: Hidden for 3D transforms

## Usage Guidelines

### Color Usage
1. **Primary**: Main brand color, use for primary actions and key elements
2. **Secondary**: Supporting color, use for backgrounds and secondary elements
3. **Accent**: Highlight color, use sparingly for emphasis
4. **Muted**: Subtle color, use for disabled states and subtle text

### Typography Hierarchy
1. **Display**: Hero sections and major headings
2. **Heading**: Section titles and important content
3. **Body**: Main content and paragraphs
4. **Small**: Captions, labels, and fine print

### Component Guidelines
1. **Consistency**: Use design tokens consistently across components
2. **Responsive**: Design for mobile-first, enhance for desktop
3. **Accessible**: Ensure all components meet accessibility standards
4. **Performant**: Optimize animations and effects for performance

## Dark Mode Implementation

### Color Inversion
The dark mode inverts the color scale while maintaining:
- Readability and contrast
- Visual hierarchy
- Brand identity
- User comfort

### Adaptive Effects
- Glass effects adapt to dark background
- Shadows become more pronounced
- Gradients adjust for better visibility
- Animations maintain smoothness

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome for Android 90+

## Performance Considerations
1. **Animation Performance**: Use transform and opacity for smooth animations
2. **Image Optimization**: Use Next.js Image component with WebP
3. **Font Loading**: Use font-display: swap for better perceived performance
4. **Code Splitting**: Leverage Next.js automatic code splitting
5. **Bundle Size**: Keep dependencies minimal and tree-shakeable