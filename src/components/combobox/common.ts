import * as React from "react";

export type ValueType =
  | string
  | number
  | boolean
  | Date
  | object
  | undefined
  | null;

type ContextType = {
  value: ValueType;
  activeId?: string;
  onSelect: (value: ValueType) => void;
};

export const emptyFn = (value: ValueType) => {};

export const ComboboxContext = React.createContext<ContextType>({
  value: undefined,
  onSelect: emptyFn,
});
