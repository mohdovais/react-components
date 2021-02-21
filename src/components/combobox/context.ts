import * as React from "react";
import { ContextType, ValueType } from "./types";

export const emptyFn = (value?: ValueType) => {};

export function ensureArray<T>(item?: T | T[], newInstance = false): T[] {
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

export const ComboboxContext = React.createContext<ContextType>({
  values: [],
  onSelect: emptyFn,
});
