# Components Architecture

This design system uses composition-first architecture.

## Rules

- Use semantic tokens only (`--g-*`).
- Never use primitive tokens (`--x-*`) in component styles.
- Never hardcode `px`, hex, or ad-hoc values in component styles.
- Use spacing tokens for `padding` and `gap`.
- Use `radius-md` for controls and `radius-lg` for surfaces by default.
- Use semantic typography tokens only; do not define manual font values.

## Component structure

Each component must include:

- `<Component>.tsx`
- `<Component>.css`
- `<Component>.types.ts`
- `<Component>.stories.tsx`

## Composition guidance

- Prefer split parts over large variant matrices.
- Extract meaningful subparts as slots (for example: root, label, helperText, icon).
- Keep token decisions in style layer, not in component logic.
