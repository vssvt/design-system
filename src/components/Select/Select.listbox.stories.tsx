import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel } from "./Select.slots";
import type { SelectGroup, SelectOption } from "./Select.types";

const groupedOptions: SelectOption[] = [
  { id: "acc-1", value: "eur-main", primary: "1000 EUR", secondary: "Account name", leading: "🇪🇺", favorite: true, groupId: "accounts" },
  { id: "acc-2", value: "usd-main", primary: "240 USD", secondary: "Account name", leading: "🇺🇸", groupId: "accounts" },
  { id: "acc-3", value: "pln-main", primary: "700 PLN", secondary: "Account name", leading: "🇵🇱", groupId: "accounts" },
  { id: "card-1", value: "visa-4255", primary: "Visa •••• 4255", secondary: "Card", leading: "💳", groupId: "cards" },
  { id: "card-2", value: "master-9921", primary: "Mastercard •••• 9921", secondary: "Card", leading: "💳", groupId: "cards" },
];

const groups: SelectGroup[] = [
  { id: "accounts", label: "Accounts" },
  { id: "cards", label: "Cards" },
];

const meta = {
  title: "Components/Select/Listbox",
  component: Select,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: "var(--g-space-8)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleGrouped: Story = {
  render: () => {
    const [value, setValue] = useState<string>("eur-main");
    return (
      <>
        <SelectLabel>Account</SelectLabel>
        <Select options={groupedOptions} groups={groups} value={value} onValueChange={(next) => setValue(String(next))} />
      </>
    );
  },
};

export const MultipleGrouped: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["eur-main", "master-9921"]);
    return (
      <>
        <SelectLabel count={value.length}>Accounts</SelectLabel>
        <Select
          options={groupedOptions}
          groups={groups}
          value={value}
          isMultiple
          onValueChange={(next) => setValue(Array.isArray(next) ? next : [String(next)])}
        />
      </>
    );
  },
};

export const CompoundApi: Story = {
  render: () => {
    const [value, setValue] = useState<string>("eur-main");
    return (
      <>
        <SelectLabel>Account</SelectLabel>
        <Select value={value} onValueChange={(next) => setValue(String(next))}>
          <Select.Trigger>
            <span className="g-select__summary">Choose account</span>
          </Select.Trigger>
          <Select.Listbox>
            <Select.Group>
              <Select.GroupLabel>Accounts</Select.GroupLabel>
              <Select.Option id="acc-1" value="eur-main" primary="1000 EUR" secondary="Account name" leading="🇪🇺" favorite />
              <Select.Option id="acc-2" value="usd-main" primary="240 USD" secondary="Account name" leading="🇺🇸" />
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Cards</Select.GroupLabel>
              <Select.Option id="card-1" value="visa-4255" primary="Visa •••• 4255" secondary="Card" leading="💳" />
            </Select.Group>
          </Select.Listbox>
        </Select>
      </>
    );
  },
};
