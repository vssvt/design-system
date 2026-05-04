import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";
import type { SelectValueTemplate, SelectVisualState } from "./Select.types";

type PlaygroundValueState = "placeholder" | "template" | "multiple";

interface PlaygroundArgs {
  state: SelectVisualState;
  readOnly: boolean;
  hasLabel: boolean;
  isClearable: boolean;
  open: boolean;
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
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "focus", "disabled", "error"],
    },
    readOnly: { control: "boolean" },
    hasLabel: { control: "boolean" },
    isClearable: { control: "boolean" },
    open: { control: "boolean" },
    label: { control: "text" },
    labelSize: { control: "select", options: ["small", "large"] },
    hasCount: { control: "boolean" },
    count: { control: "number" },
    valueState: {
      control: "select",
      options: ["placeholder", "template", "multiple"],
    },
    template: { control: "select", options: ["basic", "account", "card"] },
    placeholder: { control: "text" },
    primaryText: { control: "text" },
    secondaryText: { control: "text" },
    helperText: { control: "text" },
    errorText: { control: "text" },
    hasLeading: { control: "boolean" },
    addedToFav: { control: "boolean" },
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
    isClearable: false,
    open: false,
    label: "Label",
    labelSize: "small",
    hasCount: false,
    count: 3,
    valueState: "template",
    template: "basic",
    placeholder: "Select an option",
    primaryText: "Selected value",
    secondaryText: "Secondary text",
    helperText: "",
    errorText: "",
    hasLeading: false,
    addedToFav: false,
  },
  render: (args) => {
    const controlState: SelectVisualState = args.state;
    const open = args.open;
    const helperText = args.errorText ? undefined : args.helperText || undefined;
    const errorText = args.errorText || undefined;
    const template = args.template;

    const valueState =
      args.valueState === "placeholder"
        ? "placeholder"
        : args.valueState === "multiple"
          ? "multiple"
          : "single";

    const leadingVisual = !args.hasLeading
      ? undefined
      : template === "account"
        ? { type: "flag" as const, label: "🇪🇺" }
        : template === "card"
          ? { type: "card" as const, brand: "visa" as const, icon: "credit_card" }
          : { type: "material" as const, icon: "account_balance_wallet" };

    return (
      <>
        {args.hasLabel ? (
          <SelectLabel size={args.labelSize} count={args.hasCount ? args.count : undefined}>
            {args.label}
          </SelectLabel>
        ) : null}
        <Select
          state={controlState}
          open={open}
          readOnly={args.readOnly}
          hasLabel={args.hasLabel}
          isClearable={args.isClearable}
          helperText={helperText}
          errorText={errorText}
          onClear={() => undefined}
        >
          <SelectValue
            valueState={valueState}
            template={template}
            placeholder={args.placeholder}
            primaryText={args.primaryText}
            secondaryText={args.secondaryText}
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
