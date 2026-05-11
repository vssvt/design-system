import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";
import type { SearchInputDemoState } from "./SearchInput.types";

interface SearchInputStoryArgs {
  state: SearchInputDemoState;
  disabled: boolean;
}

const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: "var(--g-space-8)" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    state: { control: "select", options: ["default", "hover", "focus", "active", "filled"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<SearchInputStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    state: "default",
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.state === "active" || args.state === "filled" ? "Search text" : "");
    return (
      <SearchInput
        value={value}
        onChange={setValue}
        disabled={args.disabled}
        state={args.state}
        onClear={() => setValue("")}
      />
    );
  },
};
