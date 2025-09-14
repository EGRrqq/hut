import Crane from "@/components/Crane";
import { GameWindow } from "@/components/GameWindow";
import { GrabbedUnit } from "@/components/GrabbedUnit";
import Toolbox from "@/components/Toolbox";

export default function Home() {
  return (
    <>
      <GameWindow>
        <Crane>
          <GrabbedUnit />
        </Crane>
      </GameWindow>

      <Toolbox />
    </>
  );
}
