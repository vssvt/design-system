import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { typography } from "../../tokens";

const caption: CSSProperties = {
  font: "var(--g-text-xs-font-weight) var(--g-text-xs-font-size)/var(--g-text-xs-line-height) var(--g-text-xs-font-family)",
  letterSpacing: "var(--g-text-xs-letter-spacing)",
  color: "var(--g-color-text-tertiary)",
  fontFamily: "ui-monospace, monospace",
};

const tokenName: CSSProperties = {
  margin: 0,
  font: "var(--g-text-s-compact-font-weight) var(--g-text-s-compact-font-size)/var(--g-text-s-compact-line-height) var(--g-text-s-compact-font-family)",
  letterSpacing: "var(--g-text-s-compact-letter-spacing)",
  color: "var(--g-color-text-secondary)",
};

function resolveCssValue(value: string | number | undefined) {
  if (value === undefined) return "";
  if (typeof value === "number") return String(value);
  if (typeof window === "undefined") return value;

  const variable = value.match(/^var\((--[^)]+)\)$/)?.[1];
  if (!variable) return value;

  const resolved = window.getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return resolved || value;
}

function formatTypographyValues(style: CSSProperties) {
  const values = [
    `size: ${resolveCssValue(style.fontSize)}`,
    `weight: ${resolveCssValue(style.fontWeight)}`,
    `line-height: ${resolveCssValue(style.lineHeight)}`,
    `letter-spacing: ${resolveCssValue(style.letterSpacing)}`,
  ];

  return values.join(" \u00b7 ");
}

function toHeadingCssPrefix(key: string) {
  return `g-heading-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
}

function toTextCssPrefix(key: string) {
  const map: Record<string, string> = {
    m: "g-text-m",
    s: "g-text-s",
    sCompact: "g-text-s-compact",
    xs: "g-text-xs",
  };
  return map[key] ?? `g-text-${key}`;
}

const meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const headingSamples: Record<keyof typeof typography.heading, string> = {
  xxl: "Heading XXL sample",
  xl: "Heading XL sample",
  l: "Heading L sample",
  lAccent: "Heading L Accent sample",
  m: "Heading M sample",
  s: "Heading S sample",
  sAccent: "Heading S Accent sample",
  xs: "Heading XS sample",
};

const textSamples: Record<keyof typeof typography.text, string> = {
  m: "Text M sample. The quick brown fox jumps over 12345.",
  s: "Text S sample. The quick brown fox jumps over 12345.",
  sCompact: "Text S Compact sample. The quick brown fox jumps over 12345.",
  xs: "Text XS sample. The quick brown fox jumps over 12345.",
};

export const Semantic: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--g-space-24)",
        maxWidth: "48rem",
      }}
    >
      <section style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-12)" }}>
        <h2
          style={{
            margin: 0,
            font: "var(--g-heading-s-accent-font-weight) var(--g-heading-s-accent-font-size)/var(--g-heading-s-accent-line-height) var(--g-heading-s-accent-font-family)",
            letterSpacing: "var(--g-heading-s-accent-letter-spacing)",
            color: "var(--g-color-text-secondary)",
          }}
        >
          Headings
        </h2>
        {(Object.keys(typography.heading) as Array<keyof typeof typography.heading>).map((key) => {
          const style = typography.heading[key] as CSSProperties;
          const prefix = toHeadingCssPrefix(String(key));
          const values = formatTypographyValues(style);
          return (
            <div
              key={String(key)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--g-space-8)",
                padding: "var(--g-space-12)",
                border: "1px solid var(--g-color-border-low)",
                borderRadius: "var(--g-radius-md)",
                background: "var(--g-color-bg-neutral-lowest-default)",
              }}
            >
              <p style={tokenName}>{String(key)}</p>
              <p style={{ margin: 0, ...style, color: "var(--g-color-text-primary)" }}>{headingSamples[key]}</p>
              <code style={caption}>--{prefix}-font-* · {values}</code>
            </div>
          );
        })}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-12)" }}>
        <h2
          style={{
            margin: 0,
            font: "var(--g-heading-s-accent-font-weight) var(--g-heading-s-accent-font-size)/var(--g-heading-s-accent-line-height) var(--g-heading-s-accent-font-family)",
            letterSpacing: "var(--g-heading-s-accent-letter-spacing)",
            color: "var(--g-color-text-secondary)",
          }}
        >
          Text
        </h2>
        {(Object.keys(typography.text) as Array<keyof typeof typography.text>).map((key) => {
          const style = typography.text[key] as CSSProperties;
          const prefix = toTextCssPrefix(String(key));
          const values = formatTypographyValues(style);
          return (
            <div
              key={String(key)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--g-space-8)",
                padding: "var(--g-space-12)",
                border: "1px solid var(--g-color-border-low)",
                borderRadius: "var(--g-radius-md)",
                background: "var(--g-color-bg-neutral-lowest-default)",
              }}
            >
              <p style={tokenName}>{String(key)}</p>
              <p style={{ margin: 0, ...style, color: "var(--g-color-text-primary)" }}>{textSamples[key]}</p>
              <code style={caption}>--{prefix}-font-* · {values}</code>
            </div>
          );
        })}
      </section>
    </div>
  ),
};
