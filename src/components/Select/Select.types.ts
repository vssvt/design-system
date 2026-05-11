import type { ReactNode } from "react";
import type { BaseComponentProps } from "../../types/common";

export type SelectVisualState =
  | "default"
  | "hover"
  | "focus"
  | "disabled"
  | "error";

export interface SelectLabelProps extends BaseComponentProps {
  children: ReactNode;
  size?: "small" | "large";
  count?: number;
  htmlFor?: string;
}

export type SelectValueState = "placeholder" | "single" | "multiple";

export type SelectValueTemplate = "basic" | "account" | "card";
export type SelectPaymentBrand = "visa" | "mastercard" | "paypal" | "amex";

export interface SelectValueLeadingVisual {
  type: "material" | "flag" | "card";
  /** Material Symbols icon name when type is "material" or "card" fallback */
  icon?: string;
  /** Payment brand icon id for card template */
  brand?: SelectPaymentBrand;
  /** Flag emoji or short code display */
  label?: string;
}

export interface SelectValueProps extends BaseComponentProps {
  valueState?: SelectValueState;
  template?: SelectValueTemplate;
  primaryText?: string;
  secondaryText?: string;
  placeholder?: string;
  multipleValues?: string[];
  showFavorite?: boolean;
  hasLeading?: boolean;
  leadingVisual?: SelectValueLeadingVisual;
  id?: string;
}

export interface SelectProps extends BaseComponentProps {
  children: ReactNode;
  size?: "default" | "compact";
  hasLeading?: boolean;
  state?: SelectVisualState;
  /** Controlled open state for the dropdown surface (stories / future menu). */
  open?: boolean;
  readOnly?: boolean;
  hasLabel?: boolean;
  isClearable?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  onClear?: () => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  isMultiple?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  searchPlaceholder?: string;
  searchEmptyText?: string;
}

export interface SelectOption {
  id: string;
  value: string;
  primary: string;
  secondary?: string;
  leading?: ReactNode;
  favorite?: boolean;
  disabled?: boolean;
  groupId?: string;
  template?: SelectValueTemplate;
}

export interface SelectGroup {
  id: string;
  label: string;
}
