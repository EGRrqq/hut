"use client";
import Image from "next/image";
import type { IToolEntity, TToolKey } from "@/lib/gameData";
import { KeyBadge } from "./KeyBadge";
import { LimitBadge } from "./LimitBadge";

// room for the useContext
export function ToolBtn({
  tool,
  toolKey,
  onToolSelect,
}: {
  tool: IToolEntity;
  toolKey: TToolKey;
  onToolSelect: (key: TToolKey | null) => void;
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
        src={tool.icon.src}
        alt={tool.icon.alt}
        width={tool.icon.width}
        height={tool.icon.height}
        id={`${toolKey}_icon`}
        className={`${tool.disabled && "grayscale opacity-50"}`}
        priority
      />

      <LimitBadge tool={tool} />
      <KeyBadge tool={tool} />
    </button>
  );
}
