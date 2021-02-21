import * as React from "react";
import { memo, useCallback, useMemo, useRef } from "./react";
import Picker from "./Picker";
import { usePickerPosition } from "./usePosition";
import { emptyFn, ensureArray } from "./context";
import { normalizeChildren, getActiveDescendant } from "./Combobox.utils";
import {
  wrapper as $wrapper,
  combobox as $combobox,
  disabled as $disabled,
} from "./Combobox.module.css";
import {
  ComboboxMultipleProps,
  ComboboxProps,
  ComboboxSingleProps,
  ValueType,
} from "./types";
import {
  initialState,
  initState,
  reducer,
  ACTION_TYPE_COLLAPSE,
  ACTION_TYPE_EXPAND,
  ACTION_TYPE_DESCENDANT,
} from "./store";

const defaultDisplayRenderer = (value: any) => JSON.stringify(value);

function Combobox<T extends ValueType>(props: ComboboxProps<T>) {
  const {
    children,
    disabled = false,
    onChange = emptyFn,
    display = defaultDisplayRenderer,
    onSearch = emptyFn,
    multiple,
  } = props;
  const values = ensureArray<T>(props.value);
  const ref = useRef<HTMLDivElement>(null);
  const [state, dispatch] = React.useReducer(reducer, initialState, initState);
  const { activeDescendant, expanded, listboxId } = state;
  const pickerStyle = usePickerPosition(ref, expanded);
  const { dzieci, optProps } = useMemo(() => normalizeChildren<T>(children), [
    children,
  ]);
  const count = optProps.length;

  const collapse = useCallback(
    (focusBack = true) => {
      if (focusBack) {
        ref.current?.focus();
      }
      dispatch({ type: ACTION_TYPE_COLLAPSE });
      onSearch("");
    },
    [onSearch]
  );

  const onPickerSelection = useCallback(
    (selection?: T) => {
      if (multiple) {
        if (selection != null) {
          const newValues = values.slice();
          const position = values.indexOf(selection);
          if (position === -1) {
            newValues.push(selection);
          } else {
            newValues.splice(position, 1);
          }
          onChange(newValues);
        }
      } else {
        collapse();
        onChange(selection);
      }
    },
    [multiple, values, onChange, collapse]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (count === 0) return;
    const value = values[0];

    switch (event.code) {
      case "ArrowDown":
        dispatch({
          type: ACTION_TYPE_DESCENDANT,
          descendant: getActiveDescendant(
            activeDescendant,
            listboxId,
            optProps,
            value,
            expanded ? 1 : 0
          ),
        });
        break;

      case "ArrowUp":
        dispatch({
          type: ACTION_TYPE_DESCENDANT,
          descendant: getActiveDescendant(
            activeDescendant,
            listboxId,
            optProps,
            value,
            expanded ? -1 : 0
          ),
        });
        break;

      case "Space":
        if (!expanded) {
          dispatch({
            type: ACTION_TYPE_DESCENDANT,
            descendant: getActiveDescendant(
              activeDescendant,
              listboxId,
              optProps,
              value,
              0
            ),
          });
        }
        break;

      case "ArrowRight": {
        if (expanded || multiple) {
          return;
        }
        const index =
          value === undefined
            ? 0
            : optProps.findIndex((opt) => opt.value === value) + 1;
        if (index < count) {
          onPickerSelection(optProps[index].value);
        }
        break;
      }

      case "ArrowLeft": {
        if (expanded || multiple) {
          return;
        }
        const index =
          value === undefined
            ? 0
            : optProps.findIndex((opt) => opt.value === value) - 1;
        if (index > -1) {
          onPickerSelection(optProps[index].value);
        }
        break;
      }

      case "Enter": {
        const descendent = activeDescendant;
        collapse();
        if (expanded && descendent !== listboxId) {
          // apply multiple pending
          onPickerSelection(
            optProps.find((opt) => opt.key === descendent)?.value
          );
        }
        break;
      }

      case "Escape":
        collapse();
        break;
    }
  };

  console.log("render");

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
            : () =>
                expanded ? collapse() : dispatch({ type: ACTION_TYPE_EXPAND })
        }
      >
        <div
          role="textbox"
          aria-autocomplete="list"
          aria-readonly="true"
          aria-multiline="false"
          aria-activedescendant={activeDescendant}
        >
          {display(multiple ? values : values[0])}
        </div>
      </div>
      <Picker
        id={listboxId}
        style={pickerStyle}
        values={values}
        onSelect={onPickerSelection}
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
