import * as React from "react";
import { cloneElement } from "./react";
import Option from "./Option";
import Optgroup from "./Optgroup";
import { OptgroupProps, OptionProps, OptProps } from "./types";

type Child<T> =
  | React.ReactElement<OptionProps<T>>
  | React.ReactElement<OptgroupProps<T>>;

export function randomId(prefix = "id"): string {
  return (Math.random() + Math.random())
    .toString(36)
    .replace(/^\d\./, prefix + "-");
}

export function normalizeChildren<T>(
  children: React.ReactNode,
  __disabled = false,
  __dzieci: Child<T>[] = [],
  __optProps: OptProps<T>[] = []
): { dzieci: Child<T>[]; optProps: OptProps<T>[] } {
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props;
      if (child.type === Option) {
        const key = randomId("option");
        __optProps.push({
          key,
          value: props.value,
          disabled: props.disabled,
        });
        __dzieci.push(
          cloneElement(child, {
            disabled: props.disabled || __disabled,
            $__ID: key,
          })
        );
      } else if (child.type === Optgroup) {
        __dzieci.push(
          cloneElement(
            child,
            {},
            normalizeChildren(props.children, props.disabled)
          )
        );
      }
    }
  });
  return { dzieci: __dzieci, optProps: __optProps };
}

export function getActiveDescendant<T>(
  activeDescendant: string,
  listboxId: string,
  optProps: OptProps<T>[],
  value: T,
  increment: number
): string {
  const options = optProps.filter((o) => !o.disabled);

  if (options.length === 0) {
    return listboxId;
  }

  let index =
    activeDescendant === "" || activeDescendant === listboxId
      ? value === undefined
        ? -1
        : options.findIndex((opt) => opt.value === value)
      : options.findIndex((opt) => opt.key === activeDescendant);

  index = Math.max(0, Math.min(index + increment, options.length - 1));

  return options[index].key;
}
