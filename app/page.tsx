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

function onMouseMove(e: MouseEvent) {
  // how far the image should be able to move left/right from center
  // increase for larger travel range
  const maxOffset = 250;

  const x = e.clientX; // mouse x within viewport
  const center = vw() / 2; // center x
  const ratio = (x - center) / center; // from -1 (left) to 1 (right)
  const offset = Math.max(-1, Math.min(1, ratio)) * maxOffset;

  // move only horizontally. keep top fixed
  // translateX for smoother transforms
  getCrane().style.transform = `translateX(${offset}px) translateY(0)`;
}

export default function Home() {
  useEffect(() => {
    window.addEventListener("mousemove", (e) => onMouseMove(e));
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
