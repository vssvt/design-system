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
  const { leadingVisual, hasLeading } = props;
  if (!hasLeading || !leadingVisual) return null;

  let inner: ReactNode = null;
  if (leadingVisual.type === "flag" && leadingVisual.label) {
    inner = (
      <span className="g-select-value__leading-inner" aria-hidden>
        {leadingVisual.label}
      </span>
    );
  } else if (leadingVisual.type === "card" && leadingVisual.brand) {
    const BrandIcon =
      leadingVisual.brand === "visa"
        ? FaCcVisa
        : leadingVisual.brand === "mastercard"
          ? FaCcMastercard
          : leadingVisual.brand === "paypal"
            ? FaCcPaypal
            : FaCcAmex;
    inner = (
      <BrandIcon className="g-select-value__payment-icon" aria-hidden />
    );
  } else if (
    (leadingVisual.type === "material" || leadingVisual.type === "card") &&
    leadingVisual.icon
  ) {
    inner = (
      <span className="g-select-value__leading-inner material-symbols-rounded" aria-hidden>
        {leadingVisual.icon}
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
  const showSecondaryRow = supportsSecondaryRow && Boolean(secondaryText);
  const showFavoriteIcon = (template === "account" || template === "card") && Boolean(showFavorite);
  const isAccountTemplate = template === "account";

  return (
    <div className={rootClass} id={id} data-testid={dataTestId}>
      <div className="g-select-value__row">
        <Leading {...props} />
        <div className="g-select-value__texts">
          {isAccountTemplate && showSecondaryRow ? (
            <div className="g-select-value__secondary-row">
              {secondaryText ? (
                <span className="g-select-value__secondary">{secondaryText}</span>
              ) : null}
              {showFavoriteIcon ? (
                <span
                  className="g-select-value__favorite material-symbols-rounded"
                  aria-label="Favorite"
                >
                  star
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="g-select-value__primary" title={primaryText}>
            {primaryText}
          </div>
          {!isAccountTemplate && showSecondaryRow ? (
            <div className="g-select-value__secondary-row">
              {secondaryText ? (
                <span className="g-select-value__secondary">{secondaryText}</span>
              ) : null}
              {showFavoriteIcon ? (
                <span
                  className="g-select-value__favorite material-symbols-rounded"
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
