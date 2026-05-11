import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { shadows } from "../../tokens";

const meta = {
  title: "Foundations/Shadows",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const title: CSSProperties = {
  margin: 0,
  font: "var(--g-heading-xs-font-weight) var(--g-heading-xs-font-size)/var(--g-heading-xs-line-height) var(--g-heading-xs-font-family)",
  letterSpacing: "var(--g-heading-xs-letter-spacing)",
  color: "var(--g-color-text-primary)",
};

const body: CSSProperties = {
  margin: 0,
  font: "var(--g-text-s-font-weight) var(--g-text-s-font-size)/var(--g-text-s-line-height) var(--g-text-s-font-family)",
  letterSpacing: "var(--g-text-s-letter-spacing)",
  color: "var(--g-color-text-secondary)",
};

const code: CSSProperties = {
  font: "var(--g-text-xs-font-weight) var(--g-text-xs-font-size)/var(--g-text-xs-line-height) var(--g-text-xs-font-family)",
  letterSpacing: "var(--g-text-xs-letter-spacing)",
  color: "var(--g-color-text-tertiary)",
  fontFamily: "ui-monospace, monospace",
};

const cardBase: CSSProperties = {
  width: "100%",
  maxWidth: "28rem",
  minHeight: "7rem",
  borderRadius: "var(--g-radius-md)",
  background: "var(--g-color-bg-neutral-lowest-default)",
  border: "1px solid var(--g-color-border-default)",
  padding: "var(--g-space-16)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--g-space-8)",
};

function ShadowCard({
  tokenLabel,
  tokenValue,
  usage,
}: {
  tokenLabel: string;
  tokenValue: string;
  usage: string;
}) {
  return (
    <article style={{ ...cardBase, boxShadow: tokenValue }}>
      <h3 style={title}>{tokenLabel}</h3>
      <p style={body}>{usage}</p>
      <code style={code}>{tokenValue}</code>
    </article>
  );
}

export const Semantic: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-16)" }}>
      <p style={body}>
        Semantic elevation tokens and recommended usage by surface type.
      </p>
      <ShadowCard
        tokenLabel="elevation1"
        tokenValue={shadows.elevation1}
        usage="Use for listbox, dropdown, popover and lightweight floating surfaces."
      />
      <ShadowCard
        tokenLabel="elevation2"
        tokenValue={shadows.elevation2}
        usage="Use for dashboard sections, cards and stronger elevated containers."
      />
    </div>
  ),
};
