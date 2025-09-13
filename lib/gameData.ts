type TToolKey = "roof" | "floor" | "basement";

interface IToolEntity {
  // if limit not specified it === infinity
  limit?: number;
  disabled: boolean;
  keyBindings: string[];

  src: string;
  alt: string;

  height: number;
  width: number;
}

interface IGameState {
  isBasementPlaced: boolean;
  isFloorPlaced: boolean;
  isRoofPlaced: boolean;
}

interface IGameData {
  tools: Record<TToolKey, IToolEntity>;
  state: IGameState;
}

const GAMEDATA_INIT: IGameData = {
  tools: {
    roof: {
      limit: 1,
      disabled: true,
      keyBindings: ["3"],
      src: "./icons/roof_icon.svg",
      alt: "roof icon",
      width: 40.21,
      height: 34.53,
    },
    floor: {
      disabled: true,
      src: "./icons/floor_icon.svg",
      keyBindings: ["2"],
      alt: "floor icon",
      width: 33,
      height: 23.5,
    },
    basement: {
      limit: 1,
      disabled: false,
      keyBindings: ["1"],
      src: "./icons/basement_icon.svg",
      alt: "basement icon",
      width: 37,
      height: 39.5,
    },
  },
  state: {
    isBasementPlaced: false,
    isFloorPlaced: false,
    isRoofPlaced: false,
  },
};
