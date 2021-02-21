export type ValueType = string | number | boolean | Date | object | null;

export interface OptgroupProps {
  disabled?: boolean;
  label: string;
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

export interface OptionProps {
  disabled?: boolean;
  children: React.ReactNode;
  value?: ValueType;
}

export interface PickerProps<T> {
  id?: string;
  style?: React.CSSProperties;
  expand?: boolean;
  values: T[];
  children: React.ReactNode;
  activeId?: string;
  onSelect: (value: T) => void;
  onSearch?: (searchText: string) => void;
}

export type OptProps<T> = {
  key: string;
  value: T;
  disabled?: boolean;
};

interface ComboboxBaseProps {
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[]
    | React.ReactElement<OptgroupProps>
    | React.ReactElement<OptgroupProps>[];
  disabled?: boolean;
  onSearch?: (searchText: string) => void;
}

export type SingleDisplayRenderer<T> = (value?: T) => React.ReactNode;
export type MultipleDisplayRenderer<T> = (value: T[]) => React.ReactNode;
export type SingleOnChange<T> = (value?: T) => void;
export type MultipleOnChange<T> = (value: T[]) => void;

export interface ComboboxSingleProps<T> extends ComboboxBaseProps {
  multiple?: false;
  value?: T;
  onChange: SingleOnChange<T>;
  display?: SingleDisplayRenderer<T>;
}

export interface ComboboxMultipleProps<T> extends ComboboxBaseProps {
  multiple: true;
  value?: T[];
  onChange: MultipleOnChange<T>;
  display?: MultipleDisplayRenderer<T>;
}

export type ComboboxProps<T extends ValueType> =
  | ComboboxSingleProps<T>
  | ComboboxMultipleProps<T>;



export interface ContextValue<T = unknown> {
  values: T[];
  activeId?: string;
  onSelect: (value: T) => void;
}
