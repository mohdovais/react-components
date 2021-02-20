import * as React from "react";
import { ContextType, ValueType } from "./types";

export const emptyFn = (value?: ValueType) => {};

export function ensureArray<T>(item?: T | T[]): T[] {
  return item == null ? [] : Array.isArray(item) ? item : [item];
}

export function scrollIntoView(el?: HTMLElement | null): void {
  el != null &&
    el.scrollIntoView({
      block: "center",
      behavior: "smooth",
      inline: "nearest",
    });
}


export const ComboboxContext = React.createContext<ContextType>({
  value: undefined,
  onSelect: emptyFn,
});
