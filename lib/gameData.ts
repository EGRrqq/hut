type TUiKey = "crane";
export type TToolKey = "roof" | "floor" | "basement";

interface IImage {
  src: string;
  alt: string;
  height: number;
  width: number;
}

export interface IToolEntity {
  // if limit not specified it === infinity
  limit?: number;
  placedAmount: number;
  placed: boolean;
  disabled: boolean;
  keyBindings: string[];

  icon: IImage;
  unit: IImage;
}

export interface IGameState {
  isBasementPlaced: boolean;
  floorsPlaced: number;
  isRoofPlaced: boolean;
  selectedTool: TToolKey | null;
}

export interface IGameData {
  ui: Record<TUiKey, IImage>;
  tools: Record<TToolKey, IToolEntity>;
  state: IGameState;
}

export const GAMEDATA_INIT: IGameData = {
  ui: {
    crane: {
      src: "./game/crane.svg",
      alt: "crane ui elem",
      width: 175,
      height: 72,
    },
  },
  tools: {
    roof: {
      limit: 1,
      placedAmount: 0,
      placed: false,
      disabled: true,
      keyBindings: ["3"],

      icon: {
        src: "./icons/roof_icon.svg",
        alt: "roof icon",
        width: 40.21,
        height: 34.53,
      },
      unit: {
        src: "./game/roof.svg",
        alt: "roof unit",
        width: 628.99,
        height: 319.21,
      },
    },
    floor: {
      placedAmount: 0,
      placed: false,
      disabled: true,
      keyBindings: ["2"],

      icon: {
        src: "./icons/floor_icon.svg",
        alt: "floor icon",
        width: 33,
        height: 23.5,
      },
      unit: {
        src: "./game/floor.svg",
        alt: "floor unit",
        width: 454,
        height: 257.75,
      },
    },
    basement: {
      limit: 1,
      placedAmount: 0,
      placed: false,
      disabled: false,
      keyBindings: ["1"],

      icon: {
        src: "./icons/basement_icon.svg",
        alt: "basement icon",
        width: 37,
        height: 39.5,
      },
      unit: {
        src: "./game/basement.svg",
        alt: "basement unit",
        width: 465,
        height: 466,
      },
    },
  },
  state: {
    isBasementPlaced: false,
    floorsPlaced: 0,
    isRoofPlaced: false,
    selectedTool: null,
  },
};
