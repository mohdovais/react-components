import * as React from "react";
import { memo, useEffect, useRef, useContext } from "./react";
import { ComboboxContext } from "./context";
import { OptionProps } from "./types";
import {
  option as $option,
  selected as $selected,
  disabled as $disabled,
  active as $active,
} from "./Combobox.module.css";

function Option(props: OptionProps) {
  // @ts-ignore $__ID is injected prop
  const { children, disabled, value, $__ID } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { onSelect, value: selection, activeId } = useContext(ComboboxContext);
  const selected = selection === value;
  const active = activeId === $__ID;

  useEffect(() => {
    let timeout: number;
    if (selected || active) {
      timeout = setTimeout(() => ref.current?.scrollIntoView(), 10);
    }
    return () => clearTimeout(timeout);
  }, [selected, active]);

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      id={$__ID}
      className={[
        $option,
        selected ? $selected + " selected" : "",
        disabled ? $disabled + " disabled" : "",
        active ? $active : "",
      ].join(" ")}
      onClick={disabled ? undefined : () => onSelect(value)}
      tabIndex={-1}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default memo(Option);
