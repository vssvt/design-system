import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel } from "./Select.slots";
import type { SelectGroup, SelectOption, SelectValueTemplate, SelectVisualState } from "./Select.types";

type PlaygroundState = SelectVisualState | "open" | "active";
interface PlaygroundArgs {
  state: PlaygroundState;
  readOnly: boolean;
  hasLabel: boolean;
  label: string;
  labelSize: "small" | "large";
  placeholder: string;
  showHelperText: boolean;
  helperText: string;
  errorText: string;
  isMultiple: boolean;
  template: SelectValueTemplate;
  hasLeading: boolean;
  listMode: "grouped" | "flat";
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
        "template",
        "hasLeading",
        "listMode",
        "showHelperText",
        "helperText",
        "errorText",
      ],
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "focus", "active", "open", "disabled", "error"],
    },
    readOnly: { control: "boolean" },
    hasLabel: { control: "boolean" },
    label: { control: "text" },
    labelSize: { control: "select", options: ["small", "large"] },
    placeholder: { control: "text" },
    showHelperText: { control: "boolean" },
    isMultiple: { control: "boolean" },
    template: { control: "select", options: ["basic", "account", "card"] },
    hasLeading: { control: "boolean" },
    listMode: { control: "select", options: ["grouped", "flat"] },
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
    showHelperText: true,
    helperText: "",
    errorText: "Select another value",
    isMultiple: true,
    template: "account",
    hasLeading: false,
    listMode: "grouped",
  },
  render: (args) => {
    const controlState: SelectVisualState = args.state === "open" || args.state === "active" ? "default" : args.state;
    const isErrorState = controlState === "error";
    const helperText = args.showHelperText ? args.helperText || "Helper text" : undefined;
    const errorText = isErrorState ? args.errorText || undefined : undefined;
    const catalog: Record<
      SelectValueTemplate,
      { options: SelectOption[]; groups: SelectGroup[]; initialSingle: string; initialMultiple: string[] }
    > = {
      basic: {
        options: [
          {
            id: "basic-1",
            value: "invoice",
            primary: "Invoice payment",
            secondary: "Outgoing transfer",
            template: "basic",
            groupId: "recent",
          },
          {
            id: "basic-2",
            value: "salary",
            primary: "Salary transfer",
            secondary: "Incoming transfer",
            template: "basic",
            groupId: "recent",
          },
          {
            id: "basic-3",
            value: "utilities",
            primary: "Utilities",
            secondary: "Scheduled payment",
            template: "basic",
            groupId: "saved",
          },
          {
            id: "basic-4",
            value: "insurance",
            primary: "Insurance",
            secondary: "Monthly payment",
            template: "basic",
            groupId: "saved",
          },
        ],
        groups: [
          { id: "recent", label: "Recent" },
          { id: "saved", label: "Saved templates" },
        ],
        initialSingle: "invoice",
        initialMultiple: ["invoice", "utilities"],
      },
      account: {
        options: [
          {
            id: "acc-1",
            value: "eur-main",
            primary: "1000 EUR",
            secondary: "Main account",
            leading: "🇪🇺",
            favorite: true,
            template: "account",
            groupId: "personal",
          },
          {
            id: "acc-2",
            value: "usd-main",
            primary: "240 USD",
            secondary: "Savings account",
            leading: "🇺🇸",
            template: "account",
            groupId: "personal",
          },
          {
            id: "acc-3",
            value: "pln-main",
            primary: "700 PLN",
            secondary: "Spending account",
            leading: "🇵🇱",
            template: "account",
            groupId: "personal",
          },
          {
            id: "acc-4",
            value: "gbp-main",
            primary: "120 GBP",
            secondary: "Travel account",
            leading: "🇬🇧",
            template: "account",
            groupId: "business",
          },
          {
            id: "acc-5",
            value: "chf-main",
            primary: "560 CHF",
            secondary: "Reserve account",
            leading: "🇨🇭",
            template: "account",
            groupId: "business",
          },
        ],
        groups: [
          { id: "personal", label: "Personal accounts" },
          { id: "business", label: "Business accounts" },
        ],
        initialSingle: "eur-main",
        initialMultiple: ["eur-main", "usd-main"],
      },
      card: {
        options: [
          {
            id: "card-1",
            value: "visa-4255",
            primary: "Visa",
            secondary: "•••• 4255",
            leading: "💳",
            template: "card",
            groupId: "cards",
          },
          {
            id: "card-2",
            value: "mc-9921",
            primary: "Mastercard",
            secondary: "•••• 9921",
            leading: "💳",
            template: "card",
            groupId: "cards",
          },
          {
            id: "card-3",
            value: "amex-1108",
            primary: "Business card",
            secondary: "•••• 1108",
            leading: "💳",
            template: "card",
            groupId: "cards",
          },
        ],
        groups: [{ id: "cards", label: "Cards" }],
        initialSingle: "visa-4255",
        initialMultiple: ["visa-4255", "mc-9921"],
      },
    };
    const activeTemplate = catalog[args.template];
    const optionsForRender =
      args.template === "basic"
        ? activeTemplate.options.map((option) => ({
            ...option,
            leading: args.hasLeading ? "🧾" : undefined,
          }))
        : activeTemplate.options;
    const [listboxValue, setListboxValue] = useState<string | string[]>(
      args.isMultiple ? activeTemplate.initialMultiple : activeTemplate.initialSingle
    );
    const [templateKey, setTemplateKey] = useState(args.template);
    const [multipleKey, setMultipleKey] = useState(args.isMultiple);
    useEffect(() => {
      if (templateKey === args.template && multipleKey === args.isMultiple) return;
      setTemplateKey(args.template);
      setMultipleKey(args.isMultiple);
      setListboxValue(args.isMultiple ? activeTemplate.initialMultiple : activeTemplate.initialSingle);
    }, [activeTemplate.initialMultiple, activeTemplate.initialSingle, args.isMultiple, args.template, multipleKey, templateKey]);
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
          {...(args.state === "open" || args.state === "active" ? { open: true } : {})}
          readOnly={args.readOnly}
          hasLabel={args.hasLabel}
          {...(args.state === "active" ? { state: "focus" } : {})}
          placeholder={args.placeholder}
          options={optionsForRender}
          groups={args.listMode === "grouped" ? activeTemplate.groups : []}
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
