import * as React from "react";
import { ContextValue } from "./types";

/* eslint-disable @typescript-eslint/no-empty-function */
export const emptyFn = (): void => {};

export function ensureArray<T>(
  item?: null | T | T[],
  newInstance = false
): T[] {
  return item == null
    ? []
    : Array.isArray(item)
    ? newInstance
      ? item.slice()
      : item
    : [item];
}

export function scrollIntoView(el?: HTMLElement | null): void {
  el != null &&
    el.scrollIntoView({
      block: "center",
      behavior: "smooth",
      inline: "nearest",
    });
}

export const ComboboxContext = React.createContext<ContextValue<any>>({
  values: [],
  onSelect: emptyFn,
});
