import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport.
 *
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, inView boolean]
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Once visible, stop observing (animate once)
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return [ref, inView];
}
