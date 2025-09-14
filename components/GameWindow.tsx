"use client";

import { type ReactElement, useEffect } from "react";

interface IGameWIndowProps {
  children: ReactElement;
}

export function GameWindow({ children }: IGameWIndowProps) {
  useEffect(() => {
    window.addEventListener("click", () => console.log("clicked"));
  });

  return <main className="h-dvh">{children}</main>;
}
