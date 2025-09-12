"use client";

import Image from "next/image";
import { useEffect } from "react";

const CRANE_ID = "crane";

// get crane image element
const getCrane = () => {
  const crane = document.getElementById("crane");
  if (!crane) throw Error(`there is no Image with ${CRANE_ID} id`);

  return crane;
};

// get width of the viewport for calculations
const vw = () =>
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

// how far the image should be able to move left/right from center
// increase for larger travel range
const maxOffset = 250;

// most-recent mouse X position
let latestMouseX: number = 0;
// prevents scheduling multiple raf callbacks per frame
let isTicking = false;

function onMouseMove(e: MouseEvent) {
  latestMouseX = e.clientX; // mouse x within viewport

  if (!isTicking) {
    isTicking = true;
    requestAnimationFrame(() => {
      const center = vw() / 2; // center x
      const ratio = (latestMouseX - center) / center; // from -1 (left) to 1 (right)
      const offset = Math.max(-1, Math.min(1, ratio)) * maxOffset;

      // move only horizontally. keep top fixed
      // translateX for smoother transforms
      getCrane().style.transform = `translateX(${offset}px) translateY(0)`;

      // compute and apply transform using latestX
      isTicking = false;
    });
  }
}

export default function Home() {
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="flex justify-center-safe">
      <Image
        id={CRANE_ID}
        src="/crane.svg"
        alt="crane"
        width={180}
        height={80}
        priority
      />
    </div>
  );
}
