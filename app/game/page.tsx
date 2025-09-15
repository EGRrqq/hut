import Link from "next/link";
import Crane from "@/components/Crane";
import { Footer } from "@/components/Footer";
import { GameWindow } from "@/components/GameWindow";
import { GrabbedUnit } from "@/components/GrabbedUnit";
import Toolbox from "@/components/Toolbox";
import { GameStatus } from "@/components/GameStatus";

export default function Game() {
  return (
    <>
      <GameWindow>
        <Crane>
          <GrabbedUnit />
        </Crane>
      </GameWindow>

      <Toolbox />
      <GameStatus />

      <Footer>
        <Link href="/">/</Link>
      </Footer>
    </>
  );
}
