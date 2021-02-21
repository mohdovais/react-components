//export type ValueType = string | number | boolean | Date | object;
//type Unpacked<T> = T extends Array<infer U> ? U : T;

export interface OptgroupProps<T> {
  disabled?: boolean;
  label: string;
  children:
    | React.ReactElement<OptionProps<T>>
    | React.ReactElement<OptionProps<T>>[];
}

export interface OptionProps<T> {
  disabled?: boolean;
  children: React.ReactNode;
  value?: T;
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

interface ComboboxBaseProps<T> {
  children?:
    | React.ReactElement<OptionProps<T>>
    | React.ReactElement<OptionProps<T>>[]
    | React.ReactElement<OptgroupProps<T>>
    | React.ReactElement<OptgroupProps<T>>[];
  disabled?: boolean;
  onSearch?: (searchText: string) => void;
}

export type SingleDisplayRenderer<T> = (value?: T) => React.ReactNode;
export type MultipleDisplayRenderer<T> = (value: T[]) => React.ReactNode;
export type SingleOnChange<T> = (value?: T) => void;
export type MultipleOnChange<T> = (value: T[]) => void;

export const YES = true;
export const NO = false;

export interface ComboboxSingleProps<T> extends ComboboxBaseProps<T> {
  multiple?: typeof NO;
  value?: T;
  onChange: SingleOnChange<T>;
  display?: SingleDisplayRenderer<T>;
}

export interface ComboboxMultipleProps<T> extends ComboboxBaseProps<T> {
  multiple: typeof YES;
  value: T[];
  onChange: MultipleOnChange<T>;
  display?: MultipleDisplayRenderer<T>;
}

export type ComboboxProps<T> =
  | ComboboxSingleProps<T>
  | ComboboxMultipleProps<T>;

export interface ContextValue<T = unknown> {
  values: T[];
  activeId?: string;
  onSelect: (value: T) => void;
}
