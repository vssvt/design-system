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

## Properties

### `state`

- `default` - idle state
- `hover` - pointer over trigger
- `focus` - focused via keyboard or click
- `disabled` - non-interactive
- `error` - validation error

### `open`

- `true` - dropdown is visible
- `false` - dropdown is hidden

### `readOnly`

- `true` - value is visible but cannot be changed
- `false` - fully interactive

### `hasLabel`

- `true` - label is displayed
- `false` - label is hidden

### `isClearable`

- `true` - allows clearing selected value
- `false` - no clear action

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
