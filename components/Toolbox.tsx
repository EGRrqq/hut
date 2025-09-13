"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getInitGameState, placeTool } from "@/lib/gameActions";
import type { IGameData, IToolEntity, TToolKey } from "@/lib/gameData";

export default function Toolbox() {
  const [gameData, setGameData] = useState<IGameData | null>(null);
  const [selectedTool, setSelectedTool] = useState<TToolKey | null>(null);

  useEffect(() => {
    // Initialize game state
    const initGame = async () => {
      const initialState = await getInitGameState();
      setGameData(initialState);
    };

    initGame();
  }, []);

  const handleToolSelect = async (toolKey: TToolKey) => {
    if (!gameData) return;

    const newGameData = await placeTool(toolKey, gameData);
    setGameData(newGameData);
    setSelectedTool(toolKey);

    // Here you would also trigger the crane animation to grab the tool
  };

  if (!gameData) {
    return <div>Loading game...</div>;
  }

  return (
    <aside className="w-fit">
      <ol className="grid gap-2 p-2 place-items-center-safe border-2">
        {(Object.keys(gameData.tools) as TToolKey[]).map((toolKey) => {
          const tool = gameData.tools[toolKey];

          return (
            <li key={toolKey} className="grid place-content-center-safe">
              <ToolBtn
                tool={tool}
                toolKey={toolKey}
                onToolSelect={handleToolSelect}
              />
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

// room for the useContext
function ToolBtn({
  tool,
  toolKey,
  onToolSelect,
}: {
  tool: IToolEntity;
  toolKey: TToolKey;
  onToolSelect: (toolKey: TToolKey) => void;
}) {
  return (
    <button
      type="button"
      aria-label={toolKey}
      className="relative p-2 w-11 h-11 border-2 cursor-pointer disabled:cursor-not-allowed hover:shadow-[inset_0px_0px_1px_0.5px_var(--color-blue-800)] active:shadow-[inset_0px_0px_0px_1px_var(--color-blue-800)] disabled:shadow-[inset_0px_0px_0px_20px_var(--color-neutral-600)]"
      disabled={tool.disabled}
      onClick={() => onToolSelect(toolKey)}
    >
      <Image
        aria-hidden="true"
        src={tool.src}
        alt={tool.alt}
        width={tool.width}
        height={tool.height}
        id={`${toolKey}_icon`}
        className={`pointer-events-none ${tool.disabled && "grayscale opacity-50"}`}
        priority
      />

      <LimitBadge tool={tool} />
      <KeyBadge tool={tool} />
    </button>
  );
}

function KeyBadge({ tool }: { tool: IToolEntity }) {
  if (!tool) throw Error("KeyBadge: tool prop was not specified");

  return (
    <span
      aria-hidden
      className={`absolute pointer-events-none bottom-0 right-0 translate-x-[-15%] translate-y-[-30%] text-sm/2 bg-background/90 ${tool.disabled && "bg-inherit"}`}
    >
      {tool.keyBindings[0]}
    </span>
  );
}

function LimitBadge({ tool }: { tool: IToolEntity }) {
  if (!tool) throw Error("LimitBadge: tool prop was not specified");

  return (
    <>
      {tool.limit !== undefined && (
        <span
          className={`absolute pointer-events-none top-0 left-0 translate-x-[-57%] translate-y-[-50%] scale-60 text-sm font-semibold rounded-full w-6 border-2 ${tool.disabled ? "bg-neutral-600" : "text-blue-800 bg-white "}`}
        >
          {tool.limit}
        </span>
      )}
    </>
  );
}
