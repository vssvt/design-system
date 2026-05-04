import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";
import type { SelectValueTemplate, SelectVisualState } from "./Select.types";

type PlaygroundState = SelectVisualState | "open";
type PlaygroundValueState = "placeholder" | "template" | "multiple";

interface PlaygroundArgs {
  state: PlaygroundState;
  readOnly: boolean;
  hasLabel: boolean;
  isClearable: boolean;
  label: string;
  labelSize: "small" | "large";
  hasCount: boolean;
  count: number;
  valueState: PlaygroundValueState;
  template: SelectValueTemplate;
  placeholder: string;
  primaryText: string;
  secondaryText: string;
  helperText: string;
  errorText: string;
  hasLeading: boolean;
  addedToFav: boolean;
}

const meta = {
  title: "Components/Select/Playground",
  component: Select,
  parameters: {
    controls: {
      sort: "none",
      include: [
        "state",
        "readOnly",
        "template",
        "label",
        "labelSize",
        "hasCount",
        "count",
        "hasLabel",
        "isClearable",
        "valueState",
        "primaryText",
        "secondaryText",
        "placeholder",
        "hasLeading",
        "addedToFav",
        "helperText",
        "errorText",
      ],
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "focus", "open", "disabled", "error"],
    },
    readOnly: { control: "boolean" },
    template: { control: "select", options: ["basic", "account", "card"] },
    valueState: { control: "select", options: ["placeholder", "template", "multiple"] },
    isClearable: { control: "boolean" },
    hasLabel: { control: "boolean" },
    label: { control: "text" },
    labelSize: { control: "select", options: ["small", "large"] },
    hasCount: { control: "boolean" },
    count: { control: "number" },
    primaryText: { control: "text" },
    secondaryText: { control: "text" },
    placeholder: { control: "text" },
    hasLeading: { control: "boolean" },
    addedToFav: { control: "boolean" },
    helperText: { control: "text" },
    errorText: { control: "text" },
    open: { table: { disable: true } },
    className: { table: { disable: true } },
    "data-testid": { table: { disable: true } },
    children: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    onClear: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: "var(--g-space-8)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    state: "default",
    readOnly: false,
    hasLabel: true,
    isClearable: true,
    label: "Label",
    labelSize: "small",
    hasCount: true,
    count: 3,
    valueState: "multiple",
    template: "card",
    placeholder: "Select an option",
    primaryText: "Selected value",
    secondaryText: "Secondary text",
    helperText: "",
    errorText: "Select another value",
    hasLeading: true,
    addedToFav: true,
  },
  render: (args) => {
    const controlState: SelectVisualState = args.state === "open" ? "default" : args.state;
    const open = args.state === "open";
    const isErrorState = controlState === "error";
    const helperText = !isErrorState ? args.helperText || undefined : undefined;
    const errorText = isErrorState ? args.errorText || undefined : undefined;
    const template = args.template;
    const defaultPrimaryTextByTemplate: Record<SelectValueTemplate, string> = {
      basic: "Selected value",
      account: "261.94 EUR",
      card: "Visa",
    };
    const defaultSecondaryTextByTemplate: Record<SelectValueTemplate, string> = {
      basic: "Secondary text",
      account: "Main expenses",
      card: "•••• 4255",
    };
    const effectivePrimaryText =
      args.primaryText === "Selected value" || args.primaryText.trim() === ""
        ? defaultPrimaryTextByTemplate[template]
        : args.primaryText;
    const effectiveSecondaryText =
      args.secondaryText === "Secondary text" || args.secondaryText.trim() === ""
        ? defaultSecondaryTextByTemplate[template]
        : args.secondaryText;

    const valueState =
      args.valueState === "placeholder"
        ? "placeholder"
        : args.valueState === "multiple"
          ? "multiple"
          : "single";
    const canClearValue = valueState !== "placeholder";
    const effectiveIsClearable = canClearValue && args.isClearable;
    const canUseCount = valueState === "multiple";
    const effectiveHasCount = canUseCount && args.hasCount;
    const effectiveCount = canUseCount ? args.count : undefined;

    const leadingVisual = !args.hasLeading
      ? undefined
      : template === "account"
        ? { type: "flag" as const, label: "🇪🇺" }
        : template === "card"
          ? { type: "card" as const, brand: "visa" as const, icon: "credit_card" }
          : { type: "material" as const, icon: "star" };

    return (
      <>
        {args.hasLabel ? (
          <SelectLabel size={args.labelSize} count={effectiveHasCount ? effectiveCount : undefined}>
            {args.label}
          </SelectLabel>
        ) : null}
        <Select
          state={controlState}
          open={open}
          readOnly={args.readOnly}
          hasLabel={args.hasLabel}
          isClearable={effectiveIsClearable}
          helperText={helperText}
          errorText={errorText}
          onClear={() => undefined}
        >
          <SelectValue
            valueState={valueState}
            template={template}
            placeholder={args.placeholder}
            primaryText={effectivePrimaryText}
            secondaryText={effectiveSecondaryText}
            hasLeading={args.hasLeading}
            leadingVisual={leadingVisual}
            showFavorite={args.addedToFav}
            multipleValues={["Anna K.", "Bohdan S.", "Very long name that should truncate"]}
          />
        </Select>
      </>
    );
  },
};
