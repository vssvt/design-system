import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { IconStarFilled } from "../icons";
import { SearchInput } from "../SearchInput";
import type { SelectOption, SelectProps } from "./Select.types";
import "./Select.css";

function mapState(state: SelectProps["state"], readOnly: boolean | undefined, disabled: boolean | undefined): string {
  if (readOnly) return "readOnly";
  if (state === "hover") return "hover";
  if (state === "focus") return "focus";
  if (disabled || state === "disabled") return "disabled";
  if (state === "error") return "error";
  return "default";
}

const MULTI_SUMMARY_LIMIT = 22;

function firstEnabledIndex(options: SelectOption[]): number {
  return options.findIndex((option) => !option.disabled);
}

function moveEnabledIndex(options: SelectOption[], start: number, step: 1 | -1): number {
  let next = start;
  do {
    next += step;
    if (next < 0 || next >= options.length) return start;
  } while (options[next]?.disabled);
  return next;
}

function findBoundaryEnabledIndex(options: SelectOption[], fromStart: boolean): number {
  const ordered = fromStart ? options : [...options].reverse();
  const match = ordered.find((option) => !option.disabled);
  if (!match) return -1;
  return options.findIndex((option) => option.id === match.id);
}

function filterOptions(options: SelectOption[], query: string): SelectOption[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return options;
  return options.filter((option) => {
    const primary = option.primary.toLowerCase();
    const secondary = option.secondary?.toLowerCase() ?? "";
    return primary.includes(normalized) || secondary.includes(normalized);
  });
}

function buildMultiSummary(labels: string[]): string {
  if (labels.length === 0) return "";
  let summary = "";
  for (let index = 0; index < labels.length; index += 1) {
    const label = labels[index];
    if (!label) continue;
    const next = summary ? `${summary}, ${label}` : label;
    if (next.length > MULTI_SUMMARY_LIMIT) {
      const anchor = summary || label;
      const hidden = summary ? labels.length - index : labels.length - 1;
      return hidden > 0 ? `${anchor}, +${hidden}` : anchor;
    }
    summary = next;
  }
  return summary;
}

function renderOptionContent(option: SelectOption, size: SelectProps["size"], hasLeading: boolean) {
  const isCompact = size === "compact";
  if (isCompact) {
    const showCompactLeading = hasLeading && Boolean(option.leading);
    return (
      <div className="g-select-option__content">
        {showCompactLeading ? <div className="g-select-option__leading">{option.leading}</div> : null}
        <div className="g-select-option__texts">
          <div className="g-select-option__primary">{option.primary}</div>
        </div>
      </div>
    );
  }
  const template = option.template ?? "basic";
  const isAccountTemplate = template === "account";
  return (
    <div className="g-select-option__content">
      {option.leading ? <div className="g-select-option__leading">{option.leading}</div> : null}
      <div className="g-select-option__texts">
        {isAccountTemplate && option.secondary ? (
          <div className="g-select-option__meta-row">
            <span className="g-select-option__secondary">{option.secondary}</span>
            {option.favorite ? (
              <IconStarFilled className="g-select-option__favorite" aria-hidden />
            ) : null}
          </div>
        ) : null}
        <div className="g-select-option__primary">{option.primary}</div>
        {!isAccountTemplate && option.secondary ? (
          <div className="g-select-option__meta-row">
            <span className="g-select-option__secondary">{option.secondary}</span>
            {option.favorite ? (
              <IconStarFilled className="g-select-option__favorite" aria-hidden />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function renderDefaultValue(
  options: SelectOption[],
  selectedValues: string[],
  isMultiple: boolean,
  placeholder: string,
  size: SelectProps["size"],
  hasLeading: boolean
) {
  const isCompact = size === "compact";
  if (selectedValues.length === 0) {
    return <span className={isCompact ? "g-select__placeholder g-select__placeholder--compact" : "g-select__placeholder"}>{placeholder}</span>;
  }
  const selected = options.filter((option) => selectedValues.includes(option.value));
  if (isMultiple) {
    const labels = selected.map((option) => option.primary);
    return <span className={isCompact ? "g-select__summary g-select__summary--compact" : "g-select__summary"}>{buildMultiSummary(labels)}</span>;
  }
  const first = selected[0];
  if (!first) {
    return (
      <span className={isCompact ? "g-select__placeholder g-select__placeholder--compact" : "g-select__placeholder"}>
        {placeholder}
      </span>
    );
  }
  return renderOptionContent(first, size, hasLeading);
}

export function Select({
  children,
  size = "default",
  hasLeading = false,
  state = "default",
  open: openControlled,
  readOnly,
  isClearable = true,
  helperText,
  errorText,
  onOpenChange,
  onClear,
  options = [],
  groups = [],
  value: valueControlled,
  defaultValue,
  onValueChange,
  isMultiple = false,
  placeholder = "Select...",
  isSearchable = false,
  searchPlaceholder = "Search",
  searchEmptyText = "No results found",
  className,
  "data-testid": dataTestId,
}: SelectProps) {
  const generatedId = useId();
  const controlId = `g-select-${generatedId}`;
  const listboxId = `${controlId}-listbox`;
  const helperTextId = `${controlId}-helper`;
  const errorTextId = `${controlId}-error`;
  const hasListbox = options.length > 0;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openControlled !== undefined;
  const open = isControlled ? Boolean(openControlled) : uncontrolledOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );
  const isValueControlled = valueControlled !== undefined;
  const selectedValues = useMemo(
    () =>
      valueControlled === undefined
        ? uncontrolledValue
        : Array.isArray(valueControlled)
          ? valueControlled
          : valueControlled
            ? [valueControlled]
            : [],
    [uncontrolledValue, valueControlled]
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const setSelectedValues = useCallback(
    (nextValues: string[]) => {
      if (!isValueControlled) setUncontrolledValue(nextValues);
      onValueChange?.(isMultiple ? nextValues : nextValues[0] ?? "");
    },
    [isMultiple, isValueControlled, onValueChange]
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) return;
    setSearchQuery("");
    setIsSearchFocused(false);
  }, [open]);

  const filteredOptions = useMemo(() => filterOptions(options, searchQuery), [options, searchQuery]);

  const groupedOptions = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          options: filteredOptions.filter((option) => option.groupId === group.id),
        }))
        .filter((group) => group.options.length > 0),
    [filteredOptions, groups]
  );

  const ungroupedOptions = useMemo(
    () => filteredOptions.filter((option) => !option.groupId || !groups.some((group) => group.id === option.groupId)),
    [filteredOptions, groups]
  );

  const visibleOptions = useMemo(
    () => [...groupedOptions.flatMap((group) => group.options), ...ungroupedOptions],
    [groupedOptions, ungroupedOptions]
  );

  useEffect(() => {
    if (!open || options.length === 0) return;
    const selectedIndex = visibleOptions.findIndex((option) => selectedValues.includes(option.value) && !option.disabled);
    if (selectedIndex >= 0) {
      setActiveIndex(selectedIndex);
      return;
    }
    setActiveIndex(firstEnabledIndex(visibleOptions));
  }, [open, selectedValues, visibleOptions]);

  const disabled = state === "disabled";
  const dataState = mapState(state, readOnly, disabled);
  const isDisabled = disabled && !readOnly;

  const onControlClick = () => {
    if (readOnly || disabled) return;
    setOpen(!open);
  };

  const onSelectValue = useCallback(
    (option: SelectOption) => {
      if (readOnly || disabled || option.disabled) return;
      if (isMultiple) {
        const hasValue = selectedValues.includes(option.value);
        const nextValues = hasValue
          ? selectedValues.filter((value) => value !== option.value)
          : [...selectedValues, option.value];
        setSelectedValues(nextValues);
        return;
      }
      if (selectedValues[0] === option.value) {
        setOpen(false);
        return;
      }
      setSelectedValues([option.value]);
      setOpen(false);
    },
    [disabled, isMultiple, readOnly, selectedValues, setOpen, setSelectedValues]
  );

  const onControlKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || disabled) return;
    if (!visibleOptions.length) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((prev) =>
        moveEnabledIndex(visibleOptions, prev < 0 ? firstEnabledIndex(visibleOptions) : prev, 1)
      );
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((prev) =>
        moveEnabledIndex(visibleOptions, prev < 0 ? firstEnabledIndex(visibleOptions) : prev, -1)
      );
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(findBoundaryEnabledIndex(visibleOptions, true));
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(findBoundaryEnabledIndex(visibleOptions, false));
      return;
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const active = visibleOptions[activeIndex];
      if (active) onSelectValue(active);
      return;
    }
    if (e.key === "Escape") setOpen(false);
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) =>
        moveEnabledIndex(visibleOptions, prev < 0 ? firstEnabledIndex(visibleOptions) : prev, 1)
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        moveEnabledIndex(visibleOptions, prev < 0 ? firstEnabledIndex(visibleOptions) : prev, -1)
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(findBoundaryEnabledIndex(visibleOptions, true));
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(findBoundaryEnabledIndex(visibleOptions, false));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const fallbackIndex = firstEnabledIndex(visibleOptions);
      const active = visibleOptions[activeIndex >= 0 ? activeIndex : fallbackIndex];
      if (active) onSelectValue(active);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      if (searchQuery.length > 0) {
        setSearchQuery("");
        return;
      }
      setOpen(false);
    }
  };

  const onClearClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (hasListbox && selectedValues.length > 0) {
      setSelectedValues([]);
    }
    onClear?.();
  };

  const showClear = Boolean(isClearable && open && (hasListbox ? selectedValues.length > 0 : Boolean(onClear)));
  const activeOptionId = activeIndex >= 0 ? `${controlId}-option-${visibleOptions[activeIndex]?.id}` : undefined;
  const rootClass = ["g-select", className].filter(Boolean).join(" ");
  const shouldRenderDefaultValue = hasListbox && (children === null || children === undefined);
  const hasHelperText = helperText !== undefined && helperText !== null && helperText !== "";
  const hasErrorText = errorText !== undefined && errorText !== null && errorText !== "";
  const showSearch = isSearchable && open && hasListbox;
  const describedBy = [hasErrorText ? errorTextId : null, hasHelperText ? helperTextId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={rootClass}
      data-state={dataState}
      data-size={size}
      data-search-focused={isSearchFocused ? "true" : "false"}
      data-open={open ? "true" : "false"}
      data-testid={dataTestId}
    >
      <div
        role="combobox"
        id={controlId}
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        aria-haspopup="listbox"
        aria-controls={hasListbox ? listboxId : undefined}
        aria-expanded={readOnly ? undefined : open}
        aria-activedescendant={open && hasListbox ? activeOptionId : undefined}
        aria-describedby={describedBy || undefined}
        aria-invalid={hasErrorText || undefined}
        className="g-select__control"
        onClick={onControlClick}
        onKeyDown={onControlKeyDown}
      >
        <div className="g-select__main">
          {shouldRenderDefaultValue ? renderDefaultValue(options, selectedValues, isMultiple, placeholder, size, hasLeading) : children}
        </div>
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

      {hasErrorText ? (
        <p id={errorTextId} className="g-select__helper g-select__helper--error">
          {errorText}
        </p>
      ) : null}
      {hasHelperText ? (
        <p id={helperTextId} className="g-select__helper">
          {helperText}
        </p>
      ) : null}

      {open && hasListbox ? (
        <div
          id={listboxId}
          className="g-select-listbox"
          role="listbox"
          aria-multiselectable={isMultiple || undefined}
          onMouseLeave={() => setActiveIndex(-1)}
        >
          {showSearch ? (
            <div className="g-select-listbox__search">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
                autoFocus
                disabled={isDisabled}
                placeholder={searchPlaceholder}
                ariaLabel="Search options"
                onKeyDown={onSearchKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          ) : null}
          {groupedOptions.map((group) => (
            <div key={group.id} role="group" aria-label={group.label} className="g-select-listbox__group">
              <div className="g-select-listbox__group-label">{group.label}</div>
              {group.options.map((option) => {
                const optionIndex = visibleOptions.findIndex((item) => item.id === option.id);
                const isSelected = selectedValues.includes(option.value);
                const isActive = optionIndex === activeIndex;
                return (
                  <div
                    key={option.id}
                    id={`${controlId}-option-${option.id}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    data-selected={isSelected ? "true" : "false"}
                    data-active={isActive ? "true" : "false"}
                    data-disabled={option.disabled ? "true" : "false"}
                    className="g-select-option"
                    onMouseEnter={() => setActiveIndex(optionIndex)}
                    onMouseLeave={() => setActiveIndex(-1)}
                    onClick={() => onSelectValue(option)}
                  >
                    {renderOptionContent(option, size, hasLeading)}
                    {isMultiple ? (
                      <span className="g-select-option__checkbox material-symbols-rounded" aria-hidden>
                        {isSelected ? "check_box" : "check_box_outline_blank"}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
          {ungroupedOptions.map((option) => {
            const optionIndex = visibleOptions.findIndex((item) => item.id === option.id);
            const isSelected = selectedValues.includes(option.value);
            const isActive = optionIndex === activeIndex;
            return (
              <div
                key={option.id}
                id={`${controlId}-option-${option.id}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                data-selected={isSelected ? "true" : "false"}
                data-active={isActive ? "true" : "false"}
                data-disabled={option.disabled ? "true" : "false"}
                className="g-select-option"
                onMouseEnter={() => setActiveIndex(optionIndex)}
                onMouseLeave={() => setActiveIndex(-1)}
                onClick={() => onSelectValue(option)}
              >
                {renderOptionContent(option, size, hasLeading)}
                {isMultiple ? (
                  <span className="g-select-option__checkbox material-symbols-rounded" aria-hidden>
                    {isSelected ? "check_box" : "check_box_outline_blank"}
                  </span>
                ) : null}
              </div>
            );
          })}
          {visibleOptions.length === 0 ? <div className="g-select-listbox__empty">{searchEmptyText}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
