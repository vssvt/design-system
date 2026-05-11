import { useMemo, useState, type FocusEvent } from "react";
import type { SearchInputProps } from "./SearchInput.types";
import "./SearchInput.css";

export function SearchInput({
  value,
  onChange,
  disabled = false,
  onClear,
  placeholder = "Search",
  autoFocus = false,
  ariaLabel = "Search options",
  state,
  onKeyDown,
  onFocus,
  onBlur,
  className,
  "data-testid": dataTestId,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const dataState = useMemo(() => {
    if (state) return state;
    if (isFocused && value.length > 0) return "active";
    if (isFocused) return "focus";
    if (value.length > 0) return "filled";
    return "default";
  }, [isFocused, state, value.length]);

  const showClear = !disabled && value.length > 0;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div className={["g-search-input", className].filter(Boolean).join(" ")} data-state={dataState} data-testid={dataTestId}>
      <span className="g-search-input__icon material-symbols-rounded" aria-hidden>
        search
      </span>
      <input
        type="text"
        className="g-search-input__field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
      {showClear ? (
        <button
          type="button"
          className="g-search-input__clear material-symbols-rounded"
          aria-label="Clear search"
          onClick={() => {
            onChange("");
            onClear?.();
          }}
        >
          close
        </button>
      ) : null}
    </div>
  );
}
