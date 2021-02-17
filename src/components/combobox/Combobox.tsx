import * as React from "react";
import {
  cloneElement,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "./react";
import Option from "./Option";
import Optgroup from "./Optgroup";
import Picker from "./Picker";
import { usePickerPosition } from "./usePosition";
import { useRandomId } from "./useRandomId";
import { emptyFn } from "./context";
import {
  wrapper as $wrapper,
  combobox as $combobox,
  disabled as $disabled,
} from "./Combobox.module.css";
import { ComboboxProps, OptionProps, ValueType } from "./types";

const defaultDisplayRenderer = (value: ValueType) => JSON.stringify(value);

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
        const key = (Math.random() + Math.random())
          .toString(36)
          .replace(/^\d\./, "option-");
        keys.push(key);
        values.push(props.value);
        dzieci.push(
          cloneElement(child, {
            disabled: props.disabled || disabled,
            $__ID: key,
          })
        );
      } else if (child.type === Optgroup) {
        dzieci.push(
          cloneElement(
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

function Combobox<T extends ValueType>(props: ComboboxProps<T>) {
  const {
    children,
    disabled = false,
    value,
    onChange = emptyFn,
    display = defaultDisplayRenderer,
    onSearch = emptyFn,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const listboxId = useRandomId("listbox");
  const [expanded, setExpanded] = useState(false);
  const [activeDescendant, setActiveDescendant] = useState(listboxId);
  const pickerStyle = usePickerPosition(ref, expanded);
  const { keys, values, dzieci } = useMemo(
    () => normalizeChildren<T>(children),
    [children]
  );
  const count = keys.length;

  const collapse = useCallback((focusBack = true) => {
    if (focusBack) {
      ref.current?.focus();
    }
    setActiveDescendant(listboxId);
    setExpanded(false);
    onSearch("");
  }, []);

  const onSelect = useCallback((value) => {
    collapse();
    onChange(value);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (count === 0) return;
    switch (event.code) {
      case "ArrowDown": {
        let descenedent = activeDescendant;
        if (descenedent === listboxId) {
          if (value !== undefined) {
            descenedent = keys[values.indexOf(value)];
          }
          if (descenedent === undefined) {
            descenedent = keys[0];
          }
        } else {
          let index = keys.indexOf(descenedent) + 1;
          if (index < count) {
            descenedent = keys[index];
          }
        }
        setActiveDescendant(descenedent);
        setExpanded(true);
        break;
      }

      case "ArrowUp": {
        let descenedent = activeDescendant;
        if (descenedent === listboxId) {
          if (value !== undefined) {
            descenedent = keys[values.indexOf(value)];
          }
          if (descenedent === undefined) {
            descenedent = keys[0];
          }
        } else {
          let index = keys.indexOf(descenedent) - 1;
          if (index > -1) {
            descenedent = keys[index];
          }
        }
        setActiveDescendant(descenedent);
        setExpanded(true);
        break;
      }

      case "Space": {
        if (!expanded) {
          let descenedent;
          if (value !== undefined) {
            descenedent = keys[values.indexOf(value)];
          }
          if (descenedent === undefined) {
            descenedent = keys[0];
          }
          setActiveDescendant(
            descenedent === undefined ? listboxId : descenedent
          );
          setExpanded(true);
        }
        break;
      }

      case "ArrowRight":
        if (!expanded) {
          const index = value === undefined ? 0 : values.indexOf(value) + 1;
          if (index < count) {
            onChange(values[index]);
          }
        }
        break;
      case "ArrowLeft":
        if (!expanded) {
          const index = value === undefined ? 0 : values.indexOf(value) - 1;
          if (index > -1) {
            onChange(values[index]);
          }
        }
        break;
      case "Enter": {
        let descendent = activeDescendant;
        collapse();
        if (expanded && descendent !== listboxId) {
          onChange(values[keys.indexOf(descendent)]);
        }
        break;
      }

      case "Escape":
        collapse();
        break;
    }
  };

  return (
    <div
      className={$wrapper}
      onKeyDown={handleKeyDown}
      onBlur={({ currentTarget, relatedTarget }) => {
        if (
          relatedTarget === null ||
          !currentTarget.contains(relatedTarget as Node)
        ) {
          collapse(false);
        }
      }}
    >
      <div
        role="combobox"
        aria-expanded={expanded}
        aria-owns={listboxId}
        aria-haspopup="listbox"
        ref={ref}
        className={$combobox + " " + (disabled ? $disabled : "")}
        tabIndex={disabled ? undefined : 0}
        onClick={
          disabled
            ? undefined
            : () => (expanded ? collapse() : setExpanded(true))
        }
      >
        <div
          role="textbox"
          aria-autocomplete="list"
          aria-readonly="true"
          aria-multiline="false"
          aria-activedescendant={activeDescendant}
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
        activeId={activeDescendant}
        onSearch={onSearch}
      >
        {dzieci}
      </Picker>
    </div>
  );
}

export default memo(Combobox) as typeof Combobox;
