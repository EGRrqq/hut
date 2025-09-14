"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getGameState, selectTool, updateGameState } from "@/lib/gameActions";
import type { IGameData, TToolKey } from "@/lib/gameData";

interface GameContextType {
  gameData: IGameData;
  selectTool: (toolKey: TToolKey | null) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameData, setGameData] = useState<IGameData | null>(null);

  useEffect(() => {
    async function loadGameState() {
      const state = await getGameState();
      setGameData(state);
    }
    loadGameState();
  }, []);

  const handleSelectTool = async (toolKey: TToolKey | null) => {
    if (!gameData) return;

    const newState = await selectTool(toolKey, gameData);
    await updateGameState(newState);
    setGameData(newState);
  };

  if (!gameData) return <GameLoader />;

  return (
    <GameContext.Provider value={{ gameData, selectTool: handleSelectTool }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

function GameLoader() {
  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="h-dvh grid place-items-center-safe text-center font-bold text-3xl"
    >
      Loading game…
    </p>
  );
}
