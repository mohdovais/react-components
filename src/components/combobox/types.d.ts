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

export interface PickerProps {
  id?: string;
  style?: React.CSSProperties;
  expand?: boolean;
  values: ValueType[];
  children: React.ReactNode;
  activeId?: string;
  onSelect: (value: any) => void;
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

export interface ComboboxSingleProps<T> extends ComboboxBaseProps {
  multiple?: false;
  value?: T;
  onChange: (value?: T) => void;
  display?: (value?: T) => React.ReactNode;
}

export interface ComboboxMultipleProps<T> extends ComboboxBaseProps {
  multiple: true;
  value?: T[];
  onChange: (value: T[]) => void;
  display?: (value?: T[]) => React.ReactNode;
}

export type ComboboxProps<T extends ValueType> =
  | ComboboxSingleProps<T>
  | ComboboxMultipleProps<T>;

export type ContextType = {
  values: ValueType[];
  activeId?: string;
  onSelect: (value: ValueType) => void;
};
