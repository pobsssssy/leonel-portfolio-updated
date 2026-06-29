import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it enters the viewport.
 * The hook uses IntersectionObserver and includes a safe fallback.
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { elementRef, isVisible };
}
