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

type Unpacked<T> = T extends (infer U)[] ? U : never;
type NeverUnpacked<T> = T extends any[] ? never : T;

type children<T> =
  | React.ReactElement<OptionProps<T>>
  | React.ReactElement<OptionProps<T>>[]
  | React.ReactElement<OptgroupProps<T>>
  | React.ReactElement<OptgroupProps<T>>[];


export type ComboboxProps<T> =
  | {
      id?: string;
      className?: string;
      disabled?: boolean;
      value?: T;
      onSearch?: (searchText: string) => void;
      onChange?: (value: T) => void;
      displayRenderer?: (value: T) => React.ReactNode;
      multiple?: false;
      children?: children<T>;
    }
  | {
      id?: string;
      className?: string;
      disabled?: boolean;
      value?: T[];
      onSearch?: (searchText: string) => void;
      onChange?: (value: T[]) => void;
      displayRenderer?: (value: T[]) => React.ReactNode;
      multiple: true;
      children?: children<T>;
    };

export interface ContextValue<T = unknown> {
  values: T[];
  activeId?: string;
  onSelect: (value: T) => void;
}
