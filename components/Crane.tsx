"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useRef } from "react";
import usePointerParallax from "@/hooks/usePointerParallax";
import { useGame } from "./GameProvider";

interface ICrane {
  maxOffset?: number;
  children: ReactElement;
}

const CRANE_ID = "crane";

/**
 * crane component - positions an image at the top and moves it horizontally
 * based on pointer X. Accepts optional props for maxOffset and width/height.
 */
export default function Crane({ maxOffset = 200, children }: ICrane) {
  const elRef = useRef<HTMLImageElement | null>(null);
  usePointerParallax(elRef, { maxOffset });

  const { gameData } = useGame();

  return (
    <div className="flex-col place-items-center-safe">
      <section
        style={{ willChange: "transform", touchAction: "none" }}
        ref={elRef}
        id={CRANE_ID}
        className="grid justify-center-safe w-fit"
      >
        <Image
          src={gameData.ui.crane.src}
          alt={gameData.ui.crane.alt}
          width={gameData.ui.crane.width}
          height={gameData.ui.crane.height}
          priority
        />
        {children}
      </section>
    </div>
  );
}
