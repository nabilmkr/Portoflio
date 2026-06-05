# Bolt Journal

## 2024-06-05 - [Animation Performance]
**Learning:** Manual `requestAnimationFrame` for simple opacity fades in React components (like `FadingVideo`) blocks the main thread unnecessarily and can cause jank on lower-end devices.
**Action:** Always prefer native CSS transitions (`transition: opacity 0.5s ease-in-out`) over JS-based animation loops for simple property interpolations to leverage GPU acceleration.
