import type { ReactNode } from "react";
import { FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import type { SelectLabelProps, SelectValueProps } from "./Select.types";
import "./Select.css";

export function SelectLabel({
  children,
  size = "small",
  count,
  htmlFor,
  className,
  "data-testid": dataTestId,
}: SelectLabelProps) {
  const rootClass = [
    "g-select-label",
    size === "large" ? "g-select-label--large" : "g-select-label--small",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={rootClass} htmlFor={htmlFor} data-testid={dataTestId}>
      <span>{children}</span>
      {typeof count === "number" ? (
        <span className="g-select-label__count">({count})</span>
      ) : null}
    </label>
  );
}

function Leading(props: SelectValueProps) {
  const { leadingVisual, hasLeading, template = "basic" } = props;
  const forcedLeading = template === "account" || template === "card";
  const fallbackLeading =
    template === "account"
      ? ({ type: "flag", label: "🇪🇺" } as const)
      : template === "card"
        ? ({ type: "card", icon: "credit_card" } as const)
        : undefined;

  const effectiveLeading = leadingVisual ?? fallbackLeading;
  if (!effectiveLeading) return null;
  if (!forcedLeading && !hasLeading) return null;

  let inner: ReactNode = null;
  if (effectiveLeading.type === "flag" && effectiveLeading.label) {
    inner = (
      <span className="g-select-value__leading-inner" aria-hidden>
        {effectiveLeading.label}
      </span>
    );
  } else if (effectiveLeading.type === "card" && effectiveLeading.brand) {
    const BrandIcon =
      effectiveLeading.brand === "visa"
        ? FaCcVisa
        : effectiveLeading.brand === "mastercard"
          ? FaCcMastercard
          : effectiveLeading.brand === "paypal"
            ? FaCcPaypal
            : FaCcAmex;
    inner = (
      <BrandIcon className="g-select-value__payment-icon" aria-hidden />
    );
  } else if (
    (effectiveLeading.type === "material" || effectiveLeading.type === "card") &&
    effectiveLeading.icon
  ) {
    inner = (
      <span className="g-select-value__leading-inner material-symbols-rounded" aria-hidden>
        {effectiveLeading.icon}
      </span>
    );
  }

  if (!inner) return null;

  return <div className="g-select-value__leading">{inner}</div>;
}

export function SelectValue(props: SelectValueProps) {
  const {
    valueState = "single",
    template = "basic",
    primaryText,
    secondaryText,
    placeholder = "Select…",
    multipleValues,
    showFavorite,
    className,
    id,
    "data-testid": dataTestId,
  } = props;

  const rootClass = [
    "g-select-value",
    valueState === "placeholder" ? "g-select-value--placeholder" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (valueState === "multiple" && multipleValues?.length) {
    const summary = multipleValues.join(", ");
    return (
      <div className={rootClass} id={id} data-testid={dataTestId}>
        <div className="g-select-value__multiple" title={summary}>
          {summary}
        </div>
      </div>
    );
  }

  if (valueState === "placeholder") {
    return (
      <div className={rootClass} id={id} data-testid={dataTestId}>
        <div className="g-select-value__row">
          <Leading {...props} />
          <div className="g-select-value__texts">
            <div className="g-select-value__primary">{placeholder}</div>
          </div>
        </div>
      </div>
    );
  }

  const supportsSecondaryRow =
    template === "basic" || template === "account" || template === "card";
  const accountSecondaryText = secondaryText ?? "Euro account";
  const accountPrimaryText = primaryText ?? "2000.500 EUR";
  const resolvedSecondaryText = template === "account" ? accountSecondaryText : secondaryText;
  const resolvedPrimaryText = template === "account" ? accountPrimaryText : primaryText;
  const showSecondaryRow = supportsSecondaryRow && Boolean(resolvedSecondaryText);
  const showFavoriteIcon = (template === "account" || template === "card") && Boolean(showFavorite);
  const isAccountTemplate = template === "account";

  return (
    <div className={rootClass} id={id} data-testid={dataTestId}>
      <div className="g-select-value__row">
        <Leading {...props} />
        <div className="g-select-value__texts">
          {isAccountTemplate && showSecondaryRow ? (
            <div className="g-select-value__secondary-row">
              {resolvedSecondaryText ? (
                <span className="g-select-value__secondary">{resolvedSecondaryText}</span>
              ) : null}
              {showFavoriteIcon ? (
                <span
                  className="g-select-value__favorite g-select-value__favorite--filled material-symbols-rounded"
                  aria-label="Favorite"
                >
                  star
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="g-select-value__primary" title={resolvedPrimaryText}>
            {resolvedPrimaryText}
          </div>
          {!isAccountTemplate && showSecondaryRow ? (
            <div className="g-select-value__secondary-row">
              {resolvedSecondaryText ? (
                <span className="g-select-value__secondary">{resolvedSecondaryText}</span>
              ) : null}
              {showFavoriteIcon ? (
                <span
                  className="g-select-value__favorite g-select-value__favorite--filled material-symbols-rounded"
                  aria-label="Favorite"
                >
                  star
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
