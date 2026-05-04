export type ComponentSize = "sm" | "md" | "lg";

export type ComponentState = "default" | "hover" | "focus" | "disabled" | "loading";

export type TypographyToken =
  | "heading-xxl"
  | "heading-xl"
  | "heading-l"
  | "heading-l-accent"
  | "heading-m"
  | "heading-s"
  | "heading-s-accent"
  | "heading-xs"
  | "text-m"
  | "text-s"
  | "text-s-compact"
  | "text-xs";

export type RadiusToken =
  | "radius-none"
  | "radius-xs"
  | "radius-sm"
  | "radius-md"
  | "radius-lg"
  | "radius-xl"
  | "radius-2xl"
  | "radius-pill"
  | "radius-circle";

export type SpacingToken =
  | "space-2"
  | "space-4"
  | "space-8"
  | "space-12"
  | "space-16"
  | "space-20"
  | "space-24";

export interface BaseComponentProps {
  className?: string;
  "data-testid"?: string;
}

export interface ComposableSlots {
  root?: string;
  label?: string;
  helperText?: string;
  icon?: string;
}

export interface ComposableComponentProps extends BaseComponentProps {
  slots?: ComposableSlots;
}
