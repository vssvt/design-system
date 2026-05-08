import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { radii } from "../../tokens";

const meta = {
  title: "Foundations/Radius",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const order = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "pill", "circle"] as const satisfies ReadonlyArray<
  keyof typeof radii
>;

const label: CSSProperties = {
  font: "var(--g-text-s-compact-font-weight) var(--g-text-s-compact-font-size)/var(--g-text-s-compact-line-height) var(--g-text-s-compact-font-family)",
  letterSpacing: "var(--g-text-s-compact-letter-spacing)",
  color: "var(--g-color-text-primary)",
};

const metaText: CSSProperties = {
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
        gap: "var(--g-space-16)",
        maxWidth: "48rem",
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
        Семантичні радіуси. У CSS: <code style={{ ...metaText, color: "var(--g-color-text-secondary)" }}>var(--g-radius-*)</code>; у TS:{" "}
        <code style={{ ...metaText, color: "var(--g-color-text-secondary)" }}>radii</code> з{" "}
        <code style={{ ...metaText, color: "var(--g-color-text-secondary)" }}>src/tokens/index.ts</code>.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "var(--g-space-16)",
        }}
      >
        {order.map((key) => {
          const isCircle = key === "circle";
          const isPill = key === "pill";
          const w = isPill ? "5.5rem" : "4.5rem";
          const h = isCircle ? "4.5rem" : isPill ? "2.25rem" : "4.5rem";
          const cssKey = key === "2xl" ? "2xl" : key;
          const varName = key === "2xl" ? "--g-radius-2xl" : `--g-radius-${cssKey}`;
          return (
            <figure
              key={String(key)}
              style={{
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "var(--g-space-8)",
              }}
            >
              <div
                style={{
                  width: w,
                  height: h,
                  marginInline: "auto",
                  borderRadius: radii[key],
                  background: "var(--g-color-bg-neutral-lower-default)",
                  border: "1px solid var(--g-color-border-default)",
                }}
              />
              <figcaption style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-2)" }}>
                <span style={{ ...label, textAlign: "center" }}>{String(key)}</span>
                <code style={{ ...metaText, textAlign: "center", wordBreak: "break-all" }}>{varName}</code>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  ),
};
