import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";

const meta = {
  title: "Components/Select/Value",
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

export const Placeholder: Story = {
  render: () => (
    <>
      <SelectLabel>Value</SelectLabel>
      <Select>
        <SelectValue valueState="placeholder" placeholder="Select an option" />
      </Select>
    </>
  ),
};

export const MultipleSummary: Story = {
  render: () => (
    <>
      <SelectLabel count={3}>Recipients</SelectLabel>
      <Select>
        <SelectValue
          valueState="multiple"
          multipleValues={["Anna K.", "Bohdan S.", "Very long name that should truncate"]}
        />
      </Select>
    </>
  ),
};
