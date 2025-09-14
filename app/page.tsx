import Crane from "@/components/Crane";
import { GrabbedUnit } from "@/components/GrabbedUnit";
import Toolbox from "@/components/Toolbox";

export default function Home() {
  return (
    <>
      <main>
        <Crane>
          <GrabbedUnit />
        </Crane>
      </main>
      <Toolbox />
    </>
  );
}
