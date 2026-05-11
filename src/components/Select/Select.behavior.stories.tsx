import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";

const meta = {
  title: "Components/Select/Behavior",
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

export const ReadOnly: Story = {
  name: "Read Only",
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select readOnly>
        <SelectValue valueState="single" primaryText="Read-only value" />
      </Select>
    </>
  ),
};
