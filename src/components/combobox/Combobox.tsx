import * as React from "react";
import { memo, useCallback, useMemo, useRef } from "../react";
import Picker from "./Picker";
import { usePickerPosition } from "../hooks/usePosition";
import { emptyFn, ensureArray } from "./context";
import { normalizeChildren, getActiveDescendant } from "./Combobox.utils";
import {
  wrapper as $wrapper,
  combobox as $combobox,
  textbox as $textbox,
  disabled as $disabled,
  focus_within as $focus_within,
  remote as $remote,
  local as $local,
  trigger as $trigger,
} from "./Combobox.module.css";
import { ComboboxProps } from "./types";
import {
  initialState,
  initState,
  reducer,
  ACTION_TYPE_COLLAPSE,
  ACTION_TYPE_EXPAND,
  ACTION_TYPE_DESCENDANT,
  ACTION_TYPE_FOCUS,
} from "./store";

function defaultDisplayRenderer<T>(value?: T | T[]) {
  return JSON.stringify(value);
}

const searchIcon = (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

const closeIcon = (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
);

export function Combobox<T>(props: ComboboxProps<T>): JSX.Element {
  const {
    id,
    className = "",
    children,
    disabled = false,
    remote,
    multiple,
    onSearch,
    onClear,
  } = props;

  const values = ensureArray<T>(props.value);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const textboxRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = React.useReducer(reducer, initialState, initState);
  const { activeDescendant, expanded, listboxId, hasFocus } = state;
  const pickerStyle = usePickerPosition(comboboxRef, expanded);
  const { dzieci, optProps } = useMemo(() => normalizeChildren<T>(children), [
    children,
  ]);
  const count = optProps.length;
  const isEditable = remote && values.length === 0;

  const focus = useCallback((focus: boolean) => {
    dispatch({ type: ACTION_TYPE_FOCUS, focus });
  }, []);

  const collapse = useCallback(
    (focusBack = true) => {
      if (focusBack) {
        comboboxRef.current?.focus();
      }
      dispatch({ type: ACTION_TYPE_COLLAPSE });
      typeof onSearch === "function" && onSearch("");
    },
    [onSearch]
  );

  const onPickerSelection = useCallback(
    (selection?: T) => {
      if (selection == null) {
        return;
      } else if (props.multiple) {
        const newValues = ensureArray(values, true);
        const position = newValues.indexOf(selection);
        if (position === -1) {
          newValues.push(selection);
        } else {
          newValues.splice(position, 1);
        }
        typeof props.onChange === "function" && props.onChange(newValues);
      } else {
        collapse();
        typeof props.onChange === "function" && props.onChange(selection);
      }
    },
    [values, collapse, props]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const hasOptions = count !== 0;
    const value = values[0];

    switch (event.code) {
      case "ArrowDown":
        hasOptions &&
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
        hasOptions &&
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
        if (hasOptions && !expanded) {
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
        if (!hasOptions || expanded || multiple) {
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
        if (!hasOptions || expanded || multiple) {
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
        event.preventDefault();

        const descendent = activeDescendant;
        collapse();
        if (expanded && descendent !== listboxId) {
          onPickerSelection(
            optProps.find((opt) => opt.key === descendent)?.value
          );
        }
        break;
      }

      case "Backspace":
        if (!isEditable) {
          event.preventDefault();
          if (remote) {
            typeof onClear === "function" && onClear();
          }
        }

        break;
      case "Escape":
        if (expanded) {
          collapse();
        } else if (remote && values.length !== 0) {
          typeof onClear === "function" && onClear();
        }

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
        ref={comboboxRef}
        id={id}
        className={[
          $combobox,
          disabled ? $disabled : "",
          hasFocus ? $focus_within : "",
          className,
        ].join(" ")}
        onClick={
          disabled
            ? undefined
            : () =>
                expanded
                  ? collapse()
                  : count !== 0 && dispatch({ type: ACTION_TYPE_EXPAND })
        }
      >
        <div
          role="textbox"
          aria-autocomplete="list"
          aria-readonly={!isEditable}
          aria-multiline="false"
          aria-activedescendant={activeDescendant}
          tabIndex={disabled ? undefined : 0}
          className={$textbox + " " + (remote ? $remote : $local)}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          contentEditable={isEditable || undefined}
          ref={textboxRef}
          onInput={(event: React.FormEvent<HTMLDivElement>) => {
            const text = event.target.textContent.trim();
            typeof onSearch === "function" && onSearch(text);
            text !== "" && dispatch({ type: ACTION_TYPE_EXPAND });
          }}
          onFocus={() => focus(true)}
          onBlur={() => focus(false)}
        >
          {isEditable
            ? null
            : typeof props.displayRenderer === "function"
            ? props.multiple === true
              ? props.displayRenderer(values)
              : props.displayRenderer(values[0])
            : defaultDisplayRenderer(values)}
        </div>
        {remote && !isEditable ? (
          <button
            type="button"
            tabIndex={-1}
            className={$trigger}
            onClick={() => {
              typeof onClear === "function" && onClear();
              textboxRef.current?.focus();
            }}
          >
            {closeIcon}
          </button>
        ) : null}
      </div>
      <Picker<T>
        id={listboxId}
        style={pickerStyle}
        values={values}
        onSelect={onPickerSelection}
        expand={count > 0 && expanded}
        activeId={activeDescendant}
        onSearch={remote ? undefined : onSearch}
      >
        {dzieci}
      </Picker>
    </div>
  );
}

export default memo(Combobox) as typeof Combobox;
