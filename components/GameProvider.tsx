"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getGameState,
  placeTool,
  selectTool,
  updateGameState,
} from "@/lib/gameActions";
import type { IGameData, TToolKey } from "@/lib/gameData";

interface GameContextType {
  gameData: IGameData;
  isLoading: boolean;
  selectTool: (toolKey: TToolKey | null) => Promise<void>;
  placeTool: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameData, setGameData] = useState<IGameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial game state
  useEffect(() => {
    let isMounted = true;

    async function loadGameState() {
      try {
        const state = await getGameState();
        if (isMounted) {
          setGameData(state);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load game state:", error);
        if (isMounted) setIsLoading(false);
      }
    }

    loadGameState();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectTool = useCallback(
    async (toolKey: TToolKey | null) => {
      if (!gameData) return;

      try {
        // Update server state
        const newState = await selectTool(toolKey, gameData);
        await updateGameState(newState);

        // Update local state
        setGameData(newState);
      } catch (error) {
        console.error("Failed to select tool:", error);
      }
    },
    [gameData],
  );

  const handlePlaceTool = useCallback(async () => {
    if (!gameData) return;

    try {
      const newState = await placeTool(gameData);
      await updateGameState(newState);
      setGameData(newState);
    } catch (error) {
      console.error("Failed to place tool:", error);
    }
  }, [gameData]);

  if (!gameData) return <GameLoader />;

  return (
    <GameContext.Provider
      value={{
        gameData,
        isLoading,
        selectTool: handleSelectTool,
        placeTool: handlePlaceTool,
      }}
    >
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
