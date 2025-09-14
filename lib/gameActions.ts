"use server";

import { revalidatePath } from "next/cache";
import type {
  IGameData,
  IGameState,
  IToolEntity,
  TToolKey,
} from "@/lib/gameData";
import { GAMEDATA_INIT } from "@/lib/gameData";

export async function selectTool(
  toolKey: TToolKey | null,
  currentState: IGameData,
): Promise<IGameData> {
  // create a deep copy of the current state
  const newState: IGameData = JSON.parse(JSON.stringify(currentState));
  // update the selected tool
  newState.state.selectedTool = toolKey;

  return newState;
}

// get the current game state
let currentGameState: IGameData = JSON.parse(JSON.stringify(GAMEDATA_INIT));

export async function getGameState(): Promise<IGameData> {
  return currentGameState;
}

export async function updateGameState(newState: IGameData): Promise<void> {
  currentGameState = newState;
  revalidatePath("/"); // revalidate the page to show updated state
}
