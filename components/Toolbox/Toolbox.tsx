"use client";

import { useGame } from "@/components/GameProvider";
import { ToolBtn } from "@/components/Toolbox/ToolBtn";
import type { TToolKey } from "@/lib/gameData";

export default function Toolbox() {
  const { gameData, selectTool } = useGame();

  return (
    <aside className="w-fit absolute left-0 top-50">
      <ol className="grid gap-2 p-2 place-items-center-safe border-2">
        {(Object.keys(gameData.tools) as TToolKey[]).map((toolKey) => {
          const tool = gameData.tools[toolKey];

          return (
            <li key={toolKey} className="grid place-content-center-safe">
              <ToolBtn
                tool={tool}
                toolKey={toolKey}
                onToolSelect={selectTool}
              />
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
