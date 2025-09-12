"use client";

import { useEffect } from "react";

type Options = {
  maxOffset?: number;
  vw?: () => number;
};

const defaultVw = () =>
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

/**
 * Hook that attaches a mousemove listener and uses requestAnimationFrame
 * to update an element's translateX according to pointer X.
 *
 * @example
 * const ref = useRef<HTMLDivElement|null>(null); usePointerParallax(ref, {maxOffset:250})
 */
export default function usePointerParallax(
  targetRef:
    | { current: HTMLElement | null }
    | React.RefObject<HTMLElement | null>,
  { maxOffset = 250, vw = defaultVw }: Options = {},
) {
  useEffect(() => {
    const getEl = () => {
      const el = targetRef.current;

      if (!el)
        throw Error(`usePointerParallax: targetRef.current is ${targetRef}`);

      return el;
    };

    // most-recent mouse X position
    let latestMouseX: number = 0;
    // prevents scheduling multiple raf callbacks per frame
    let isTicking = false;

    function update() {
      const center = vw() / 2; // center x
      const ratio = (latestMouseX - center) / center; // from -1 (left) to 1 (right)
      const clamped = Math.max(-1, Math.min(1, ratio)); // clamp ratio to [-1, 1]
      const offset = clamped * maxOffset; // convert to pixel offset

      // move only horizontally. keep top fixed
      // translateX for smoother transforms
      getEl().style.transform = `translateX(${offset}px) translateY(0)`;

      // allow scheduling another raf
      isTicking = false;
    }

    function onMouseMove(e: MouseEvent) {
      latestMouseX = e.clientX; // mouse x within viewport

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [targetRef, maxOffset, vw]);
}
