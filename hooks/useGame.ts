"use client";

import { useCallback, useEffect, useState } from "react";
import { getInitGameState, placeTool } from "@/lib/gameActions";
import type { IGameData, TToolKey } from "@/lib/gameData";

export function useGame() {
  const [gameData, setGameData] = useState<IGameData | null>(null);
  const [selectedTool, setSelectedTool] = useState<TToolKey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize game state
  useEffect(() => {
    const initGame = async () => {
      try {
        setIsLoading(true);
        const initialState = await getInitGameState();
        setGameData(initialState);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize game",
        );
      } finally {
        setIsLoading(false);
      }
    };

    initGame();
  }, []);

  // Handle tool selection
  const handleToolSelect = useCallback(
    async (toolKey: TToolKey) => {
      if (!gameData) return;

      try {
        setIsLoading(true);
        const newGameData = await placeTool(toolKey, gameData);
        setGameData(newGameData);
        setSelectedTool(toolKey);

        // Here you would also trigger the crane animation to grab the tool
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to place tool");
      } finally {
        setIsLoading(false);
      }
    },
    [gameData],
  );

  // Reset game
  const resetGame = useCallback(async () => {
    try {
      setIsLoading(true);
      const initialState = await getInitGameState();
      setGameData(initialState);
      setSelectedTool(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset game");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    gameData,
    selectedTool,
    isLoading,
    error,
    handleToolSelect,
    resetGame,
  };
}
