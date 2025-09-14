"use client";

import Image from "next/image";
import { useRef } from "react";
import usePointerParallax from "@/hooks/usePointerParallax";
import { useGame } from "./GameProvider";

interface ICrane {
  maxOffset?: number;
}

const CRANE_ID = "crane";

/**
 * crane component - positions an image at the top and moves it horizontally
 * based on pointer X. Accepts optional props for maxOffset and width/height.
 */
export default function Crane({ maxOffset = 200 }: ICrane) {
  const elRef = useRef<HTMLImageElement | null>(null);
  usePointerParallax(elRef, { maxOffset });

  const { gameData } = useGame();
  const selectedTool = gameData.state.selectedTool
    ? gameData.tools[gameData.state.selectedTool]
    : null;

  return (
    <section id={CRANE_ID} className="grid justify-center-safe">
      <Image
        src={gameData.ui.crane.src}
        alt={gameData.ui.crane.alt}
        width={gameData.ui.crane.width}
        height={gameData.ui.crane.height}
        ref={elRef}
        style={{ willChange: "transform", touchAction: "none" }}
        // basically i need smth like grab prop that grabs tools from toolbox
        priority
      />
      {selectedTool && (
        <Image
          src={selectedTool.unit.src}
          alt={selectedTool.unit.alt}
          width={selectedTool.unit.width}
          height={selectedTool.unit.height}
          priority
        />
      )}
    </section>
  );
}
