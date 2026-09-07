/* 03_UI_UX_Spec.md §2 — Motion Primitives */
/* 10_Motion_Interaction_Spec.md — Motion constants centralized */

export const motionConfig = {
  duration: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.4,
    moderate: 0.6,
    slow: 0.9,
  },

  ease: {
    standard: [0.22, 1, 0.36, 1],
    entrance: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
  },

  spring: {
    gentle: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },

    responsive: {
      type: "spring",
      stiffness: 260,
      damping: 25,
      mass: 0.5,
    },
  },
};

export const springConfig = motionConfig.spring.gentle;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const heroPortrait = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionConfig.duration.moderate,
      ease: motionConfig.ease.entrance,
    },
  },
};

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.standard,
    },
  },
};

export const clipReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: motionConfig.duration.moderate,
      ease: motionConfig.ease.entrance,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.entrance,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.entrance,
    },
  },
};
