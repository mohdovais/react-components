import * as React from "react";
import Optgroup, { OptgroupProps } from "./Optgroup";
import Option, { PrivateOption, OptionProps } from "./Option";

export const emptyFn = () => {};

type Config = {
  onSelect: (value: any) => void;
  value: any;
  disabled?: boolean;
};

type ValidChildren =
  | React.ReactElement<OptionProps>
  | React.ReactElement<OptgroupProps>;

function x(child: React.ReactNode, config: Config): ValidChildren | undefined {
  const { onSelect, value } = config;
  if (React.isValidElement(child)) {
    switch (child.type) {
      case Option: {
        const { children, ...props } = child.props;
        const selected = props.value === value;
        return React.createElement(
          PrivateOption,
          {
            ...props,
            disabled: props.disabled || config.disabled,
            selected,
            onSelect,
          },
          children
        );
      }

      case Optgroup: {
        const { children, ...props } = child.props;
        const disabled: boolean = props.disabled;
        return React.cloneElement(
          child,
          { ...props },
          applyChildren(children, disabled ? { ...config, disabled } : config)
        );
      }
    }
  }
}

export function applyChildren(children: React.ReactNode, config: Config) {
  const c = React.Children.map(children, (child) => x(child, config));

  return c == null ? null : c.filter((c) => c !== undefined);
}

export function traverse(children: React.ReactNode) {
  const c = React.Children.toArray(children);
}
