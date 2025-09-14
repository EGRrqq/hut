"use client";

import { type ReactElement, useEffect, useRef } from "react";
import { useGame } from "./GameProvider";

interface IGameWIndowProps {
  children: ReactElement;
}

export function GameWindow({ children }: IGameWIndowProps) {
  const { gameData, placeTool } = useGame();
  // ref
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // game was ended
    if (gameData.state.isRoofPlaced) return;
    // tool is not selected
    if (!gameData.state.selectedTool) return;

    function handleClick() {
      if (gameData.state.selectedTool) placeTool();
    }

    const gameWindow = ref.current;
    gameWindow?.addEventListener("click", handleClick);

    return () => {
      gameWindow?.removeEventListener("click", handleClick);
    };
  }, [gameData, placeTool]);

  return (
    <main ref={ref} className="h-dvh">
      {children}
    </main>
  );
}
