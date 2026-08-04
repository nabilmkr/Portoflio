/* 05_Tech_Spec.md §2 — Custom hook wrapping native IntersectionObserver */
/* 04_Component_Spec.md §9 — SectionWrapper uses this for entry animation trigger */

import { useState, useEffect, useRef } from "react";

export function useIntersectionObserver({ threshold = 0.1, rootMargin = "0px" } = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}
