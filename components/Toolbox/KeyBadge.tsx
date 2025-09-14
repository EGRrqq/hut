"use client";
import type { IToolEntity } from "@/lib/gameData";

export function KeyBadge({ tool }: { tool: IToolEntity }) {
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
