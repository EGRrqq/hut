import Link from "next/link";
import Crane from "@/components/Crane";
import { Footer } from "@/components/Footer";
import { GameWindow } from "@/components/GameWindow";
import { GrabbedUnit } from "@/components/GrabbedUnit";
import Toolbox from "@/components/Toolbox";

export default function Game() {
  return (
    <>
      <GameWindow>
        <Crane>
          <GrabbedUnit />
        </Crane>
      </GameWindow>

      <Toolbox />

      <Footer>
        <Link href="/">/</Link>
      </Footer>
    </>
  );
}
