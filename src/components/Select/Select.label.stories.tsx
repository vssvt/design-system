import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";

const meta = {
  title: "Components/Select/Label",
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

export const Small: Story = {
  render: () => (
    <>
      <SelectLabel size="small">Small label</SelectLabel>
      <Select>
        <SelectValue valueState="placeholder" placeholder="Value" />
      </Select>
    </>
  ),
};

export const Large: Story = {
  render: () => (
    <>
      <SelectLabel size="large">Large label</SelectLabel>
      <Select>
        <SelectValue valueState="placeholder" placeholder="Value" />
      </Select>
    </>
  ),
};

export const WithCount: Story = {
  render: () => (
    <>
      <SelectLabel count={5}>Selected items</SelectLabel>
      <Select>
        <SelectValue valueState="multiple" multipleValues={["One", "Two", "Three", "Four", "Five"]} />
      </Select>
    </>
  ),
};
