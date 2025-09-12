"use client";

import Image from "next/image";
import { useRef } from "react";
import usePointerParallax from "@/hooks/usePointerParallax";

interface ICrane {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  maxOffset?: number;
}

const CRANE_ID = "crane";

/**
 * Crane component — positions an image at the top and moves it horizontally
 * based on pointer X. Accepts optional props for maxOffset and width/height.
 */
export default function Crane({
  src,
  alt,
  width = 175,
  height = 72,
  maxOffset = 250,
}: ICrane) {
  if (!src) throw Error("src prop for the image was not specified");
  if (!alt) throw Error("alt prop for the image was not specified");

  const elRef = useRef<HTMLImageElement | null>(null);
  usePointerParallax(elRef, { maxOffset });

  return (
    <>
      <section id={CRANE_ID} className="flex justify-center-safe">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          ref={elRef}
          style={{ willChange: "transform", touchAction: "none" }}
          priority

          // basically i need smth like grab prop that grabs tools from toolbox
        />
      </section>
      <div className="flex justify-center-safe">
        <Image
          src="./basement.svg"
          alt="basement"
          width={465}
          height={456}
          priority
        />
      </div>
    </>
  );
}
