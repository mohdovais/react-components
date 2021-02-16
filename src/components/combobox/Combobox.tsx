import * as React from "react";
import { usePickerPosition } from "./usePosition";
import Option, { OptionProps, Value } from "./Option";
import style from "./Combobox.module.css";
import { useRandomId } from "./useRandomId";
import Optgroup, { OptgroupProps } from "./Optgroup";
import Picker from "./Picker";

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

const emptyFn = () => {};
const defaultDisplayRenderer = (value: Value) => JSON.stringify(value);

type KeyValue<T> = {
  key: string;
  value: T;
};

function normalizeChildren<T>(
  children: React.ReactNode,
  disabled = false,
  dzieci: React.ReactElement<OptionProps>[] = [],
  keys: string[] = [],
  values: T[] = []
) {
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props;
      if (child.type === Option) {
        const key = (Math.random() + Math.random()).toString(36);
        keys.push(key);
        values.push(props.value);
        dzieci.push(
          React.cloneElement(child, {
            disabled: props.disabled || disabled,
            $__ID: key,
          })
        );
      } else if (child.type === Optgroup) {
        dzieci.push(
          React.cloneElement(
            child,
            {},
            normalizeChildren(props.children, props.disabled)
          )
        );
      }
    }
  });
  return { dzieci, keys, values };
}

export const ComboboxContext = React.createContext({
  value: undefined,
  onSelect: emptyFn,
});

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
  const { keys, values, dzieci } = React.useMemo(
    () => normalizeChildren<T>(children),
    [children]
  );

  const listboxId = useRandomId("listbox");
  const pickerStyle = usePickerPosition(ref, expanded);
  const count = keys.length;

  const onSelect = React.useCallback((value) => {
    setExpanded(false);
    onChange(value);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "ArrowDown":
      case "ArrowUp":
      case "Space":
        setExpanded(true);
        break;
      case "ArrowRight":
        if (!expanded) {
          const index = value === undefined ? 0 : values.indexOf(value) + 1;
          if (count > 0 && index < count) {
            onChange(values[index]);
          }
        }
        break;
      case "ArrowLeft":
        if (!expanded) {
          const index = value === undefined ? 0 : values.indexOf(value) - 1;
          if (count > 0 && index > -1) {
            onChange(values[index]);
          }
        }
        break;
      case "Enter":
        break;
      case "Escape":
        setExpanded(false);
        break;
    }
  };

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
        <div
          role="textbox"
          aria-autocomplete="list"
          aria-readonly="true"
          aria-multiline="false"
          aria-activedescendant=""
        >
          {display(value)}
        </div>
      </div>
      <Picker
        id={listboxId}
        style={pickerStyle}
        value={value}
        onSelect={onSelect}
        expand={expanded}
      >
        {dzieci}
      </Picker>
    </div>
  );
}

export default React.memo(Combobox) as typeof Combobox;
