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

const validateSingleLimit = (t: IToolEntity, name: string) => {
  if (t.limit === undefined)
    throw Error(`actions: limit for the '${name}' tool was not specified`);
  if (t.limit > 1)
    throw Error(`actions: limit for the '${name}' tool exceeds 1`);
};

const rules: Record<TToolKey, (t: IToolEntity, state: IGameState) => boolean> =
  {
    basement: (t, state) => {
      validateSingleLimit(t, "basement");
      return !state.isBasementPlaced && t.limit === 1;
    },
    floor: (t, state) => state.isBasementPlaced && !state.isRoofPlaced,
    roof: (t, state) => {
      validateSingleLimit(t, "roof");
      return (
        state.isBasementPlaced &&
        state.floorsPlaced > 0 &&
        !state.isRoofPlaced &&
        t.limit === 1
      );
    },
  };

async function canPlace(
  toolKey: TToolKey,
  gameData: IGameData,
): Promise<boolean> {
  const t = gameData.tools[toolKey];
  if (!t) return false;
  if (t.limit === 0) return false;

  const rule = rules[toolKey];
  if (!rule) return false; // unknown tool

  return rule(t, gameData.state);
}

export async function placeTool(currentState: IGameData): Promise<IGameData> {
  const toolKey = currentState.state.selectedTool;
  if (!toolKey) throw Error("placeTool: the tool is not selected");

  // validate if the tool can be placed
  if (!(await canPlace(toolKey, currentState))) return currentState;

  // Create a deep copy of the current state
  const newState: IGameData = structuredClone(currentState);

  // Update tool limit
  if (newState.tools[toolKey].limit !== undefined) {
    newState.tools[toolKey].limit--;
  }

  // update game state based on the tool placed
  switch (toolKey) {
    case "basement":
      newState.state.selectedTool = null;

      newState.state.isBasementPlaced = true;
      newState.tools.basement.disabled = true;
      newState.tools.floor.disabled = false;

      break;
    case "floor":
      newState.state.selectedTool = null;

      newState.tools.roof.disabled = false;
      newState.state.floorsPlaced++;

      break;
    case "roof":
      newState.state.selectedTool = null;

      newState.state.isRoofPlaced = true;
      newState.tools.floor.disabled = true;
      newState.tools.roof.disabled = true;

      break;
  }

  return newState;
}
