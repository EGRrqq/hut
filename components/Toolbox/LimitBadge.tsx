"use client";
import type { IToolEntity } from "@/lib/gameData";

export function LimitBadge({ tool }: { tool: IToolEntity }) {
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
