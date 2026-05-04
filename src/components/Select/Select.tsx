import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { SelectProps } from "./Select.types";
import "./Select.css";

function mapState(
  state: SelectProps["state"],
  readOnly: boolean | undefined,
  disabled: boolean | undefined
): string {
  if (readOnly) return "readOnly";
  if (state === "hover") return "hover";
  if (state === "focus") return "focus";
  if (disabled || state === "disabled") return "disabled";
  if (state === "error") return "error";
  return "default";
}

export function Select({
  children,
  state = "default",
  open: openControlled,
  readOnly,
  isClearable,
  helperText,
  errorText,
  onOpenChange,
  onClear,
  className,
  "data-testid": dataTestId,
}: SelectProps) {
  const generatedId = useId();
  const controlId = `g-select-${generatedId}`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openControlled !== undefined;
  const open = isControlled ? Boolean(openControlled) : uncontrolledOpen;
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, setOpen]);

  const disabled = state === "disabled";
  const dataState = mapState(state, readOnly, disabled);
  const isDisabled = disabled && !readOnly;

  const onControlClick = () => {
    if (readOnly || disabled) return;
    setOpen(!open);
  };

  const onControlKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setOpen(!open);
    }
    if (e.key === "Escape") setOpen(false);
  };

  const onClearClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClear?.();
  };

  const showClear = Boolean(isClearable && open && onClear);

  const rootClass = ["g-select", className].filter(Boolean).join(" ");

  return (
    <div
      ref={rootRef}
      className={rootClass}
      data-state={dataState}
      data-open={open ? "true" : "false"}
      data-testid={dataTestId}
    >
      {/* div + role="button": всередині мають бути окремі <button> (clear) — вкладеність button-in-button заборонена */}
      <div
        role="button"
        id={controlId}
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={readOnly ? undefined : open}
        className="g-select__control"
        onClick={onControlClick}
        onKeyDown={onControlKeyDown}
      >
        <div className="g-select__main">{children}</div>
        {!readOnly ? (
          <div className="g-select__actions">
            {showClear ? (
              <button
                type="button"
                className="g-select__icon g-select__icon-button material-symbols-rounded"
                aria-label="Clear"
                onClick={onClearClick}
              >
                close
              </button>
            ) : null}
            <span className="g-select__icon material-symbols-rounded" aria-hidden>
              {open ? "expand_less" : "expand_more"}
            </span>
          </div>
        ) : null}
      </div>
      {errorText ? (
        <p className="g-select__helper g-select__helper--error">{errorText}</p>
      ) : helperText ? (
        <p className="g-select__helper">{helperText}</p>
      ) : null}
    </div>
  );
}
