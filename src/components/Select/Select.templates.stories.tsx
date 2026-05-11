import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";

const meta = {
  title: "Components/Select/Templates",
  component: Select,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: "var(--g-space-8)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <>
      <SelectLabel>Template</SelectLabel>
      <Select>
        <SelectValue template="basic" valueState="single" primaryText="Selected item" />
      </Select>
    </>
  ),
};

export const Account: Story = {
  render: () => (
    <>
      <SelectLabel>Template</SelectLabel>
      <Select>
        <SelectValue
          template="account"
          valueState="single"
          hasLeading
          leadingVisual={{ type: "flag", label: "🇪🇺" }}
          primaryText="261.94 EUR"
          secondaryText="Main expenses"
          showFavorite
        />
      </Select>
    </>
  ),
};

export const Card: Story = {
  render: () => (
    <>
      <SelectLabel>Template</SelectLabel>
      <Select>
        <SelectValue
          template="card"
          valueState="single"
          hasLeading
          leadingVisual={{ type: "card", brand: "visa", icon: "credit_card" }}
          primaryText="Visa"
          secondaryText="•••• 4255"
        />
      </Select>
    </>
  ),
};
