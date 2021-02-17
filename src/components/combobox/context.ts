import * as React from "react";
import { ContextType, ValueType } from "./types";

export const emptyFn = (value: ValueType) => {};

export const ComboboxContext = React.createContext<ContextType>({
  value: undefined,
  onSelect: emptyFn,
});
