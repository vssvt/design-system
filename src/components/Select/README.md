# Select

## Overview

Select allows users to choose one or multiple options from a list.

It consists of:
- optional label
- trigger (interactive container)
- value (displayed content inside trigger)
- optional helper or error text

## Composition

Select is composed of:

- Label (optional) - instance of `select/label`
- Trigger
  - Value - instance of `select/value`
  - Chevron icon

## API

### Select visual state

`state` supports:

- `default` - idle state
- `hover` - pointer over trigger
- `focus` - focused via keyboard or click
- `disabled` - non-interactive
- `error` - validation error

`readOnly` is a separate boolean prop and is not part of the `state` union.

### `SelectProps`

- `children: ReactNode` - content inside trigger; when listbox data is provided and `children` is empty, Select renders value content internally
- `size?: "default" | "compact"` - visual density/height (`default` by default)
- `state?: "default" | "hover" | "focus" | "disabled" | "error"` - visual state override (`default` by default)
- `open?: boolean` - controlled open state
- `readOnly?: boolean` - keeps value visible but blocks editing
- `hasLabel?: boolean` - contract/story flag for label presence
- `isClearable?: boolean` - enables clear action (`true` by default)
- `helperText?: ReactNode` - helper text under control
- `errorText?: ReactNode` - error text under control
- `onOpenChange?: (open: boolean) => void` - open state callback
- `onClear?: () => void` - clear action callback
- `options?: SelectOption[]` - listbox options (`[]` by default)
- `groups?: SelectGroup[]` - listbox groups (`[]` by default)
- `value?: string | string[]` - controlled selected value(s)
- `defaultValue?: string | string[]` - uncontrolled initial value(s)
- `onValueChange?: (value: string | string[]) => void` - value change callback
- `isMultiple?: boolean` - multiple selection mode (`false` by default)
- `placeholder?: string` - placeholder in trigger (`Select...` by default)
- `className?: string` - custom class from base props
- `data-testid?: string` - testing attribute from base props

### `SelectOption`

- `id: string` - unique option id
- `value: string` - option value used in selection model
- `primary: string` - main text
- `secondary?: string` - secondary text
- `leading?: ReactNode` - leading visual/content
- `favorite?: boolean` - favorite marker flag
- `disabled?: boolean` - disables this option
- `groupId?: string` - links option to group
- `template?: "basic" | "account" | "card"` - option rendering template

### `SelectGroup`

- `id: string` - group id
- `label: string` - group heading text

### `SelectValueProps`

- `valueState?: "placeholder" | "single" | "multiple"` - value rendering mode (`single` by default)
- `template?: "basic" | "account" | "card"` - value template (`basic` by default)
- `primaryText?: string` - primary line text
- `secondaryText?: string` - secondary line text
- `placeholder?: string` - placeholder text (`Select…` by default)
- `multipleValues?: string[]` - values used when `valueState="multiple"`
- `showFavorite?: boolean` - shows favorite icon for account/card templates
- `hasLeading?: boolean` - enables leading visual for basic template
- `leadingVisual?: SelectValueLeadingVisual` - explicit leading visual config
- `id?: string` - custom id on value root
- `className?: string` - custom class from base props
- `data-testid?: string` - testing attribute from base props

### `SelectValueLeadingVisual`

- `type: "material" | "flag" | "card"`
- `icon?: string` - Material Symbols name for `material` or `card` fallback
- `brand?: "visa" | "mastercard" | "paypal" | "amex"` - payment brand for card visual
- `label?: string` - label (typically emoji flag)

## Trigger

### Anatomy

- Value
- Chevron icon

### Layout

Trigger uses horizontal layout:

```text
[Value]        [Chevron]
```

Rules:
- Value takes available width
- Chevron is aligned to the right
- Content is vertically centered
- Gap between Value and Chevron: `--g-space-8`

### Tokens used

Trigger layout:
- padding-horizontal: `--g-space-12`
- padding-vertical (value area): `--g-space-8`
- gap between Value and Chevron: `--g-space-8`
- border-radius: `--g-radius-md`

Trigger border:
- default: `--g-color-border-default`
- hover: `--g-color-border-default`
- focus: `--g-color-border-focus`
- open: `--g-color-border-default`
- error: `--g-color-border-danger`
- disabled: `--g-color-border-disabled`

Background:
- default: `--g-color-bg-neutral-lowest-default`
- hover: `--g-color-bg-neutral-lowest-hover`
- disabled: `--g-color-bg-disabled`

Chevron:
- icon (closed): `expand_more`
- icon (open): `expand_less`
- clear icon: `close`
- icon color: `--g-color-icon-secondary`

## Behavior

### Interaction

- click on trigger -> opens dropdown
- click outside -> closes dropdown
- selecting option -> updates value
- keyboard support:
  - `Enter` / `Space` -> open or close
  - `Esc` -> close

### Clear action

- available only when `isClearable = true`
- visible only when a value is selected
- visible only in open state
- clears value to placeholder state

### State logic

- open overrides hover
- focus persists while interacting
- disabled blocks all interaction
- error does not block interaction
- readOnly blocks value changes and hides action icons

### Value rendering rules

- `valueState="multiple"` renders a comma-separated summary from `multipleValues`
- `valueState="placeholder"` renders placeholder style/content
- account template renders `secondary` above `primary`
- basic/card templates render `primary` above `secondary`
- account/card templates force leading visual; basic template requires `hasLeading` (or explicit leading config)

## Layout

### Composition

Vertical layout:
- Label (optional)
- Trigger
- Helper / Error text (optional)

Spacing rules:
- Label defines spacing to Select

## Accessibility

- Label should be associated with Select trigger
- Focus state should be visible
- Keyboard navigation should be supported
- Error message should be announced to assistive technologies

## Dependencies

Select uses:
- `select/label`
- `select/value`

## Rules

- Select controls container, layout, and interaction
- Value controls content rendering
- Label provides context only
- Templates define content structure inside Value
- Do not duplicate Value logic inside Select
- Use semantic tokens for all visual styles

## Domain wrappers pattern

Use one base `Select` component for interaction logic and visual behavior.

For repeated domain scenarios (for example country, currency, or phone country code):

- create thin wrapper components (`CountrySelect`, `CurrencySelect`, `PhoneCountryCodeSelect`)
- map domain entities to `SelectOption[]` inside wrappers
- keep the base Select API and behavior unchanged

This keeps one source of truth for keyboard/a11y behavior and avoids duplicated custom selects.

## Storybook coverage strategy

Use both story types:

- `Playground` stories for interactive QA through controls
- `Use Cases` stories for stable domain examples with fixed props and realistic data

Recommended use-case stories:

- Country select
- Currency select
- Phone country code select
