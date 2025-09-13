import Image from "next/image";

type IToolKey = "roof" | "floor" | "basement";

interface IToolEntity {
  // if limit not specified it === infinity
  limit?: number;
  disabled: boolean;
  key: string[];

  src: string;
  alt: string;

  height: number;
  width: number;
}

const TOOLS: Record<IToolKey, IToolEntity> = {
  roof: {
    limit: 1,
    disabled: true,
    key: ["3"],
    src: "./icons/roof_icon.svg",
    alt: "roof icon",
    width: 40.21,
    height: 34.53,
  },
  floor: {
    disabled: true,
    src: "./icons/floor_icon.svg",
    key: ["2"],
    alt: "floor icon",
    width: 33,
    height: 23.5,
  },
  basement: {
    limit: 1,
    disabled: false,
    key: ["1"],
    src: "./icons/basement_icon.svg",
    alt: "basement icon",
    width: 37,
    height: 39.5,
  },
};

export default function () {
  return (
    <aside className="w-fit">
      <ol className="grid gap-2 p-2 place-items-center-safe border-2">
        {Object.keys(TOOLS).map((toolKey) => {
          const tool = TOOLS[toolKey as IToolKey];

          return (
            <li key={toolKey} className="grid place-content-center-safe">
              <button
                type="button"
                aria-label={toolKey}
                className="relative p-2 w-11 h-11 border-2 cursor-pointer disabled:cursor-not-allowed hover:shadow-[inset_0px_0px_1px_0.5px_var(--color-blue-800)] active:shadow-[inset_0px_0px_0px_1px_var(--color-blue-800)]"
                disabled={tool.disabled}
              >
                {tool.disabled && (
                  <div
                    aria-hidden={true}
                    className="absolute pointer-events-none w-[105%] h-[105%] translate-x-[-20%] translate-y-[-27%] bg-black/70 "
                  ></div>
                )}

                <Image
                  aria-hidden="true"
                  src={tool.src}
                  alt={tool.alt}
                  width={tool.width}
                  height={tool.height}
                  id={`${toolKey}_icon`}
                  className="pointer-events-none"
                  priority
                />

                {tool.limit && (
                  <span
                    className={`absolute pointer-events-none top-0 left-0 translate-x-[-57%] translate-y-[-50%] scale-60 text-sm font-semibold text-blue-800 bg-white rounded-full w-6 border-2 ${tool.disabled && "bg-black/50"}`}
                  >
                    {tool.limit}
                  </span>
                )}

                <span
                  className={`absolute pointer-events-none bottom-0 right-0 translate-x-[-15%] translate-y-[-30%] text-sm/2 bg-background/90 ${tool.disabled && "bg-inherit"}`}
                >
                  {tool.key[0]}
                </span>

                {tool.disabled && tool.limit && (
                  <span
                    aria-hidden={true}
                    className="absolute pointer-events-none top-0 left-0 translate-x-[-57%] translate-y-[-50%] scale-60 text-sm font-semibold rounded-full w-6 border-2 bg-black/70"
                  >
                    <span className="opacity-0">{tool.limit}</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
