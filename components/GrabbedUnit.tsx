"use client";

import Image from "next/image";
import { useGame } from "@/components/GameProvider";

export function GrabbedUnit() {
  const { gameData } = useGame();
  const selectedTool = gameData.state.selectedTool
    ? gameData.tools[gameData.state.selectedTool]
    : null;

  return (
    <>
      {selectedTool && (
        <Image
          src={selectedTool.unit.src}
          alt={selectedTool.unit.alt}
          width={selectedTool.unit.width}
          height={selectedTool.unit.height}
          className="place-self-center-safe pointer-events-none"
          priority
        />
      )}
    </>
  );
}
