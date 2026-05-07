import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors } from "../../tokens";

const CHIP = 28;
const RADIUS = "var(--g-radius-sm)";

const meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const sectionTitle: CSSProperties = {
  margin: "0 0 var(--g-space-8)",
  font: "var(--g-heading-xs-font-weight) var(--g-heading-xs-font-size)/var(--g-heading-xs-line-height) var(--g-heading-xs-font-family)",
  letterSpacing: "var(--g-heading-xs-letter-spacing)",
  color: "var(--g-color-text-secondary)",
};

const label: CSSProperties = {
  font: "var(--g-text-s-compact-font-weight) var(--g-text-s-compact-font-size)/var(--g-text-s-compact-line-height) var(--g-text-s-compact-font-family)",
  letterSpacing: "var(--g-text-s-compact-letter-spacing)",
  color: "var(--g-color-text-primary)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const code: CSSProperties = {
  font: "var(--g-text-xs-font-weight) var(--g-text-xs-font-size)/var(--g-text-xs-line-height) var(--g-text-xs-font-family)",
  letterSpacing: "var(--g-text-xs-letter-spacing)",
  color: "var(--g-color-text-tertiary)",
  fontFamily: "ui-monospace, monospace",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const intro: CSSProperties = {
  margin: 0,
  maxWidth: "40rem",
  font: "var(--g-text-xs-font-weight) var(--g-text-xs-font-size)/var(--g-text-xs-line-height) var(--g-text-xs-font-family)",
  letterSpacing: "var(--g-text-xs-letter-spacing)",
  color: "var(--g-color-text-secondary)",
};

const checkerboard: CSSProperties = {
  backgroundColor: "var(--g-color-bg-neutral-lowest-default)",
  backgroundImage: `linear-gradient(45deg, var(--g-color-bg-neutral-lower-default) 25%, transparent 25%),
    linear-gradient(-45deg, var(--g-color-bg-neutral-lower-default) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--g-color-bg-neutral-lower-default) 75%),
    linear-gradient(-45deg, transparent 75%, var(--g-color-bg-neutral-lower-default) 75%)`,
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
};

function cssVarFromTokenRef(ref: string): string {
  const m = /^var\((--[^)]+)\)$/.exec(ref);
  return m?.[1] ?? ref;
}

function Swatch({
  title,
  tokenRef,
  variant,
}: {
  title: string;
  tokenRef: string;
  variant: "fill" | "on-checker";
}) {
  const cssName = cssVarFromTokenRef(tokenRef);
  const isTransparent = cssName.endsWith("transparent");

  const chipBase: CSSProperties = {
    width: CHIP,
    height: CHIP,
    flexShrink: 0,
    borderRadius: RADIUS,
    border: "1px solid var(--g-color-border-low)",
  };

  const fillChip = (
    <div
      style={{
        ...chipBase,
        background: tokenRef,
      }}
    />
  );

  const checkerChip = (
    <div style={{ ...chipBase, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, ...checkerboard }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: tokenRef,
        }}
      />
    </div>
  );

  return (
    <figure
      title={`${title}\n${tokenRef}`}
      style={{
        margin: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "var(--g-space-8)",
        minWidth: 0,
        padding: "var(--g-space-4) var(--g-space-8)",
        borderRadius: "var(--g-radius-sm)",
        border: "1px solid var(--g-color-border-low)",
        background: "var(--g-color-bg-neutral-lowest-default)",
      }}
    >
      {variant === "on-checker" || isTransparent ? checkerChip : fillChip}
      <figcaption style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: "var(--g-space-2)" }}>
        <span style={label}>{title}</span>
        <code style={code}>{tokenRef}</code>
      </figcaption>
    </figure>
  );
}

const groupLabels: Record<string, string> = {
  text: "Text",
  icon: "Icon",
  border: "Border",
  background: "Background",
};

/** Один колір = один рядок (повна ширина списку). */
const list: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--g-space-8)",
  width: "100%",
  maxWidth: "40rem",
};

function SemanticInner() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-16)" }}>
      <p style={intro}>
        Семантика з <code style={code}>colors</code> (<code style={code}>--g-color-*</code>). Прозорість / backdrop — на
        «шахівці»; повний рядок у підказці (hover).
      </p>

      {(Object.keys(colors) as Array<keyof typeof colors>).map((group) => (
        <section key={group}>
          <h2 style={sectionTitle}>{groupLabels[group] ?? group}</h2>
          <div style={list}>
            {Object.entries(colors[group]).map(([key, tokenRef]) => {
              const title = `${group} · ${key}`;
              const isBackdrop = key === "backdrop";
              const isTransparent = key === "transparent";
              return (
                <Swatch
                  key={key}
                  title={title}
                  tokenRef={tokenRef}
                  variant={isBackdrop || isTransparent ? "on-checker" : "fill"}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export const Semantic: Story = {
  render: () => <SemanticInner />,
};

const primitives: { name: string; var: string }[] = [
  { name: "x-white", var: "var(--x-white)" },
  { name: "x-black", var: "var(--x-black)" },
  { name: "x-purple-30", var: "var(--x-purple-30)" },
  { name: "x-purple-100", var: "var(--x-purple-100)" },
  { name: "x-purple-400", var: "var(--x-purple-400)" },
  { name: "x-purple-500", var: "var(--x-purple-500)" },
  { name: "x-purple-600", var: "var(--x-purple-600)" },
  { name: "x-purple-700", var: "var(--x-purple-700)" },
  { name: "x-purple-500-a10", var: "var(--x-purple-500-a10)" },
  { name: "x-purple-500-a16", var: "var(--x-purple-500-a16)" },
  { name: "x-gray-30", var: "var(--x-gray-30)" },
  { name: "x-gray-60", var: "var(--x-gray-60)" },
  { name: "x-gray-80", var: "var(--x-gray-80)" },
  { name: "x-gray-100", var: "var(--x-gray-100)" },
  { name: "x-gray-200", var: "var(--x-gray-200)" },
  { name: "x-gray-400", var: "var(--x-gray-400)" },
  { name: "x-gray-600", var: "var(--x-gray-600)" },
  { name: "x-red-50", var: "var(--x-red-50)" },
  { name: "x-red-600", var: "var(--x-red-600)" },
  { name: "x-red-700", var: "var(--x-red-700)" },
  { name: "x-red-800", var: "var(--x-red-800)" },
  { name: "x-orange-100", var: "var(--x-orange-100)" },
  { name: "x-orange-500", var: "var(--x-orange-500)" },
  { name: "x-orange-700", var: "var(--x-orange-700)" },
  { name: "x-orange-800", var: "var(--x-orange-800)" },
  { name: "x-green-100", var: "var(--x-green-100)" },
  { name: "x-green-500", var: "var(--x-green-500)" },
  { name: "x-green-600", var: "var(--x-green-600)" },
  { name: "x-green-700", var: "var(--x-green-700)" },
  { name: "x-plum-800-a80", var: "var(--x-plum-800-a80)" },
];

export const Primitives: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--g-space-12)" }}>
      <p style={intro}>
        Примітиви <code style={code}>--x-*</code> у <code style={code}>global.css</code>; у UI — через{" "}
        <code style={code}>--g-color-*</code>.
      </p>
      <div style={list}>
        {primitives.map((p) => (
          <Swatch
            key={p.name}
            title={p.name}
            tokenRef={p.var}
            variant={
              p.name.includes("a10") || p.name.includes("a16") || p.name.includes("a80")
                ? "on-checker"
                : "fill"
            }
          />
        ))}
      </div>
    </div>
  ),
};
