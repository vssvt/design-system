import type { FocusEvent, KeyboardEvent } from "react";
import type { BaseComponentProps } from "../../types/common";

export type SearchInputDemoState = "default" | "hover" | "focus" | "active" | "filled";

export interface SearchInputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  ariaLabel?: string;
  state?: SearchInputDemoState;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}
