import * as React from "react";
import { usePickerPosition } from "./usePosition";
import { OptionProps, Value } from "./Option";
import style from "./Combobox.module.css";
import { applyChildren, emptyFn } from "./utils";
import { useRandomId } from "./useRandomId";
import { OptgroupProps } from "./Optgroup";
import { useEvents } from "./useEvents";

export interface ComboboxProps<T> {
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[]
    | React.ReactElement<OptgroupProps>
    | React.ReactElement<OptgroupProps>[];
  disabled?: boolean;
  multiple?: boolean;
  value?: T;
  onChange: (value: T) => void;
  display?: (value?: T) => React.ReactNode;
}

const defaultDisplayRenderer = (value: Value) => JSON.stringify(value);

function Combobox<T extends Value>(props: ComboboxProps<T>) {
  const {
    children,
    disabled = false,
    value,
    onChange = emptyFn,
    display = defaultDisplayRenderer,
  } = props;
  const ref = React.useRef(null);
  const [expanded, setExpanded] = React.useState(false);
  const onSelect = React.useCallback((value) => {
    setExpanded(false);
    onChange(value);
  }, []);
  const listboxId = useRandomId("listbox");
  const pickerStyle = usePickerPosition(ref, expanded);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.code) {
        case "ArrowDown":
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "Space":
        case "Enter":
        case "Escape":
          console.log("asas");
      }
    },
    []
  );

  return (
    <div className={style.comboboxWrapper}>
      <div
        role="combobox"
        aria-expanded={expanded}
        aria-owns={listboxId}
        aria-haspopup="listbox"
        ref={ref}
        className={style.combobox + " " + (disabled ? style.disabled : "")}
        tabIndex={disabled ? undefined : 0}
        onClick={disabled ? undefined : () => setExpanded(!expanded)}
        onKeyDown={handleKeyDown}
      >
        {display(value)}
      </div>
      <div
        role="listbox"
        id={listboxId}
        className={style.listbox}
        style={pickerStyle}
      >
        {expanded ? applyChildren(children, { onSelect, value }) : null}
      </div>
    </div>
  );
}

export default React.memo(Combobox) as typeof Combobox;
