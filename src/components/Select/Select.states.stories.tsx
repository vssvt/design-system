import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel, SelectValue } from "./Select.slots";

const meta = {
  title: "Components/Select/States",
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

export const Default: Story = {
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select>
        <SelectValue valueState="single" primaryText="Selected value" />
      </Select>
    </>
  ),
};

export const Hover: Story = {
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select state="hover">
        <SelectValue valueState="single" primaryText="Hover state" />
      </Select>
    </>
  ),
};

export const Focus: Story = {
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select state="focus">
        <SelectValue valueState="single" primaryText="Focus state" />
      </Select>
    </>
  ),
};

export const Open: Story = {
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select open>
        <SelectValue valueState="single" primaryText="Open state" />
      </Select>
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select state="disabled">
        <SelectValue valueState="single" primaryText="Disabled value" />
      </Select>
    </>
  ),
};

export const Error: Story = {
  render: () => (
    <>
      <SelectLabel>Field</SelectLabel>
      <Select state="error" errorText="This field is required.">
        <SelectValue valueState="placeholder" placeholder="Pick one" />
      </Select>
    </>
  ),
};
