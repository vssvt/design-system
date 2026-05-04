import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { spacing } from "../../tokens";

const meta = {
  title: "Foundations/Spacing",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const order = [2, 4, 8, 12, 16, 20, 24] as const satisfies ReadonlyArray<keyof typeof spacing>;

const rowLabel: CSSProperties = {
  font: "var(--g-text-s-compact-font-weight) var(--g-text-s-compact-font-size)/var(--g-text-s-compact-line-height) var(--g-text-s-compact-font-family)",
  letterSpacing: "var(--g-text-s-compact-letter-spacing)",
  color: "var(--g-color-text-primary)",
  minWidth: "7rem",
};

const rowMeta: CSSProperties = {
  font: "var(--g-text-xs-font-weight) var(--g-text-xs-font-size)/var(--g-text-xs-line-height) var(--g-text-xs-font-family)",
  letterSpacing: "var(--g-text-xs-letter-spacing)",
  color: "var(--g-color-text-tertiary)",
  fontFamily: "ui-monospace, monospace",
};

export const Semantic: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--g-space-12)",
        maxWidth: "40rem",
      }}
    >
      <p
        style={{
          margin: 0,
          font: "var(--g-text-s-font-weight) var(--g-text-s-font-size)/var(--g-text-s-line-height) var(--g-text-s-font-family)",
          letterSpacing: "var(--g-text-s-letter-spacing)",
          color: "var(--g-color-text-secondary)",
        }}
      >
        Семантичні відступи для компонентів. У CSS:{" "}
        <code style={{ ...rowMeta, color: "var(--g-color-text-secondary)" }}>var(--g-space-*)</code>
        ; у TS: <code style={{ ...rowMeta, color: "var(--g-color-text-secondary)" }}>spacing</code> з{" "}
        <code style={{ ...rowMeta, color: "var(--g-color-text-secondary)" }}>src/tokens/index.ts</code>
        .
      </p>
      {order.map((step) => (
        <div
          key={step}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--g-space-16)",
            padding: "var(--g-space-8) 0",
            borderBottom: "1px solid var(--g-color-border-low)",
          }}
        >
          <span style={rowLabel}>space-{step}</span>
          <code style={{ ...rowMeta, minWidth: "10rem" }}>{spacing[step]}</code>
          <div
            style={{
              height: "var(--g-space-24)",
              width: spacing[step],
              flexShrink: 0,
              borderRadius: "var(--g-radius-xs)",
              background: "var(--g-color-bg-brand-low-default)",
              border: "1px solid var(--g-color-border-focus)",
            }}
            title={`width: ${spacing[step]}`}
          />
        </div>
      ))}
    </div>
  ),
};
