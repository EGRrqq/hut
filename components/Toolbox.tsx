import Image from "next/image";

type IToolKey = "roof" | "floor" | "basement";

interface IToolEntity {
  // if limit not specified it === infinity
  limit?: number;
  disabled: boolean;
  keyBindings: string[];

  src: string;
  alt: string;

  height: number;
  width: number;
}

const TOOLS: Record<IToolKey, IToolEntity> = {
  roof: {
    limit: 1,
    disabled: true,
    keyBindings: ["3"],
    src: "./icons/roof_icon.svg",
    alt: "roof icon",
    width: 40.21,
    height: 34.53,
  },
  floor: {
    disabled: true,
    src: "./icons/floor_icon.svg",
    keyBindings: ["2"],
    alt: "floor icon",
    width: 33,
    height: 23.5,
  },
  basement: {
    limit: 1,
    disabled: false,
    keyBindings: ["1"],
    src: "./icons/basement_icon.svg",
    alt: "basement icon",
    width: 37,
    height: 39.5,
  },
};

export default function Toolbox() {
  return (
    <aside className="w-fit">
      <ol className="grid gap-2 p-2 place-items-center-safe border-2">
        {(Object.keys(TOOLS) as IToolKey[]).map((toolKey) => {
          const tool = TOOLS[toolKey];

          return (
            <li key={toolKey} className="grid place-content-center-safe">
              <ToolBtn tool={tool} toolKey={toolKey} />
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

// room for the useContext
function ToolBtn({ tool, toolKey }: { tool: IToolEntity; toolKey: IToolKey }) {
  return (
    <button
      type="button"
      aria-label={toolKey}
      className="relative p-2 w-11 h-11 border-2 cursor-pointer disabled:cursor-not-allowed hover:shadow-[inset_0px_0px_1px_0.5px_var(--color-blue-800)] active:shadow-[inset_0px_0px_0px_1px_var(--color-blue-800)] disabled:shadow-[inset_0px_0px_0px_20px_var(--color-neutral-600)]"
      disabled={tool.disabled}
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
      {tool.limit && (
        <span
          className={`absolute pointer-events-none top-0 left-0 translate-x-[-57%] translate-y-[-50%] scale-60 text-sm font-semibold rounded-full w-6 border-2 ${tool.disabled ? "bg-neutral-600" : "text-blue-800 bg-white "}`}
        >
          {tool.limit}
        </span>
      )}
    </>
  );
}
