import type {
  IGameData,
  IGameState,
  IToolEntity,
  TToolKey,
} from "@/lib/gameData";
import { GAMEDATA_INIT } from "@/lib/gameData";

// clone initial tools to avoid mutation
export const getInitGameState: () => IGameData = () =>
  JSON.parse(JSON.stringify(GAMEDATA_INIT));

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

export function canPlace(toolKey: TToolKey, gameData: IGameData): boolean {
  const t = gameData.tools[toolKey];
  if (!t) return false;
  if (t.limit === 0) return false;

  const rule = rules[toolKey];
  if (!rule) return false; // unknown tool

  return rule(t, gameData.state);
}
