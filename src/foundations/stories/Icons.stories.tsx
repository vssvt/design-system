import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Icons",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const names = [
  "expand_more",
  "expand_less",
  "close",
  "star",
  "account_balance_wallet",
  "credit_card",
  "search",
  "check",
  "error",
  "visibility",
] as const;

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(7rem, 1fr))",
  gap: "var(--g-space-12)",
  maxWidth: "40rem",
};

const cell: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--g-space-8)",
  padding: "var(--g-space-12)",
  borderRadius: "var(--g-radius-md)",
  border: "1px solid var(--g-color-border-low)",
  background: "var(--g-color-bg-neutral-lowest-default)",
};

const glyph: CSSProperties = {
  fontSize: "var(--g-text-m-font-size)",
  color: "var(--g-color-icon-primary)",
};

const caption: CSSProperties = {
  font: "var(--g-text-xs-font-weight) var(--g-text-xs-font-size)/var(--g-text-xs-line-height) var(--g-text-xs-font-family)",
  letterSpacing: "var(--g-text-xs-letter-spacing)",
  color: "var(--g-color-text-tertiary)",
  textAlign: "center",
  wordBreak: "break-word",
};

const guidelinesList: CSSProperties = {
  margin: 0,
  paddingLeft: "1.2rem",
  display: "flex",
  flexDirection: "column",
  gap: "var(--g-space-4)",
  maxWidth: "42rem",
  font: "var(--g-text-s-font-weight) var(--g-text-s-font-size)/var(--g-text-s-line-height) var(--g-text-s-font-family)",
  letterSpacing: "var(--g-text-s-letter-spacing)",
  color: "var(--g-color-text-secondary)",
};

export const MaterialSymbolsRounded: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-16)" }}>
      <p
        style={{
          margin: 0,
          maxWidth: "42rem",
          font: "var(--g-text-s-font-weight) var(--g-text-s-font-size)/var(--g-text-s-line-height) var(--g-text-s-font-family)",
          letterSpacing: "var(--g-text-s-letter-spacing)",
          color: "var(--g-color-text-secondary)",
        }}
      >
        Іконки — це шрифт <strong>Material Symbols Rounded</strong> (Google Fonts), клас{" "}
        <code style={caption}>material-symbols-rounded</code>, усередині — лігатура з іменем іконки (латиницею, як у
        каталозі Google).
      </p>
      <ul style={guidelinesList}>
        <li>
          Base interactive icon size: <strong>20px</strong> (use for chevron, clear, leading material icon).
        </li>
        <li>
          Accent icon size: <strong>20px</strong> (favorite star in Select).
        </li>
        <li>
          Leading icon container size: <strong>40x40</strong> (`2.5rem`), circle background.
        </li>
        <li>
          Default icon color in controls: <code style={caption}>--g-color-icon-secondary</code>.
        </li>
        <li>
          Accent/favorite color: <code style={caption}>--g-color-icon-warning</code>, filled style via{" "}
          <code style={caption}>font-variation-settings: "FILL" 1</code>.
        </li>
      </ul>
      <div style={grid}>
        {names.map((name) => (
          <div key={name} style={cell}>
            <span className="material-symbols-rounded" style={glyph} aria-hidden>
              {name}
            </span>
            <span style={caption}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
