import type { ReactElement } from "react";

export interface IFooterProps {
  children: ReactElement;
}

export function Footer({ children }: IFooterProps) {
  return (
    <footer className="sticky bottom-0 left-full grid gap-2 [&>*:not(hr)]:hover:text-blue-800 w-fit p-1 border-1">
      {children}
      <hr className="w-full" />
      <a href="http://t.me/egrqq" rel="noopener noreferrer" target="_blank">
        @egrqq
      </a>
    </footer>
  );
}
