"use client";
import { useGame } from "./GameProvider";

export function GameStatus() {
  const { gameData } = useGame();

  return (
    <ul className="absolute grid gap-1 right-0 top-50 [&>li]:flex [&>li]:justify-between [&>li]:gap-2 border-1 p-1 w-50">
      <li>
        <p>game status: </p>
        <p>{gameData.state.isRoofPlaced ? "ended" : "playing"}</p>
      </li>
      <hr />
      <li>
        <p>basement: </p>
        <p>{gameData.state.isBasementPlaced ? 1 : 0}</p>
      </li>
      <li>
        <p>floor: </p>
        <p>{gameData.state.floorsPlaced}</p>
      </li>
      <li>
        <p>roof: </p>
        <p>{gameData.state.isRoofPlaced ? 1 : 0}</p>
      </li>
      <hr />
      <li>
        <p>selected tool: </p>
        <p>
          {gameData.state.selectedTool
            ? gameData.state.selectedTool
            : "no tool"}
        </p>
      </li>
    </ul>
  );
}
