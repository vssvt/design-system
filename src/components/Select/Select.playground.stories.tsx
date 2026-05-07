import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel } from "./Select.slots";
import type { SelectGroup, SelectOption, SelectVisualState } from "./Select.types";

type PlaygroundState = SelectVisualState | "open";
interface PlaygroundArgs {
  state: PlaygroundState;
  readOnly: boolean;
  hasLabel: boolean;
  label: string;
  labelSize: "small" | "large";
  placeholder: string;
  helperText: string;
  errorText: string;
  isMultiple: boolean;
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
        "label",
        "labelSize",
        "hasLabel",
        "placeholder",
        "isMultiple",
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
    hasLabel: { control: "boolean" },
    label: { control: "text" },
    labelSize: { control: "select", options: ["small", "large"] },
    placeholder: { control: "text" },
    isMultiple: { control: "boolean" },
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
    label: "Label",
    labelSize: "small",
    placeholder: "Select an option",
    helperText: "",
    errorText: "Select another value",
    isMultiple: true,
  },
  render: (args) => {
    const controlState: SelectVisualState = args.state === "open" ? "default" : args.state;
    const isErrorState = controlState === "error";
    const helperText = !isErrorState ? args.helperText || undefined : undefined;
    const errorText = isErrorState ? args.errorText || undefined : undefined;
    const listboxOptions: SelectOption[] = [
      {
        id: "acc-1",
        value: "eur-main",
        primary: "1000 EUR",
        secondary: "Main account",
        leading: "🇪🇺",
        favorite: true,
        groupId: "personal",
      },
      {
        id: "acc-2",
        value: "usd-main",
        primary: "240 USD",
        secondary: "Savings account",
        leading: "🇺🇸",
        groupId: "personal",
      },
      {
        id: "acc-3",
        value: "pln-main",
        primary: "700 PLN",
        secondary: "Spending account",
        leading: "🇵🇱",
        groupId: "personal",
      },
      {
        id: "acc-4",
        value: "gbp-main",
        primary: "120 GBP",
        secondary: "Travel account",
        leading: "🇬🇧",
        groupId: "business",
      },
      {
        id: "acc-5",
        value: "chf-main",
        primary: "560 CHF",
        secondary: "Reserve account",
        leading: "🇨🇭",
        groupId: "business",
      },
    ];
    const listboxGroups: SelectGroup[] = [
      { id: "personal", label: "Personal accounts" },
      { id: "business", label: "Business accounts" },
    ];
    const [listboxValue, setListboxValue] = useState<string | string[]>(args.isMultiple ? ["eur-main", "usd-main"] : "eur-main");
    const selectedCount = Array.isArray(listboxValue) ? listboxValue.length : listboxValue ? 1 : 0;

    return (
      <>
        {args.hasLabel ? (
          <SelectLabel size={args.labelSize} {...(args.isMultiple ? { count: selectedCount } : {})}>
            {args.label}
          </SelectLabel>
        ) : null}
        <Select
          state={controlState}
          {...(args.state === "open" ? { open: true } : {})}
          readOnly={args.readOnly}
          hasLabel={args.hasLabel}
          placeholder={args.placeholder}
          options={listboxOptions}
          groups={listboxGroups}
          isMultiple={args.isMultiple}
          value={listboxValue}
          onValueChange={(next) => setListboxValue(next)}
          {...(helperText ? { helperText } : {})}
          {...(errorText ? { errorText } : {})}
        >
          {null}
        </Select>
      </>
    );
  },
};
