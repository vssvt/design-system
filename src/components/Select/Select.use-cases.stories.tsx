import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { SelectLabel } from "./Select.slots";
import type { SelectOption } from "./Select.types";

const countryOptions: SelectOption[] = [
  { id: "country-ua", value: "UA", primary: "Ukraine", leading: "🇺🇦" },
  { id: "country-pl", value: "PL", primary: "Poland", leading: "🇵🇱" },
  { id: "country-de", value: "DE", primary: "Germany", leading: "🇩🇪" },
  { id: "country-fr", value: "FR", primary: "France", leading: "🇫🇷" },
];

const currencyOptions: SelectOption[] = [
  { id: "currency-usd", value: "USD", primary: "USD", leading: "🇺🇸" },
  { id: "currency-eur", value: "EUR", primary: "EUR", leading: "🇪🇺" },
  { id: "currency-gbp", value: "GBP", primary: "GBP", leading: "🇬🇧" },
  { id: "currency-pln", value: "PLN", primary: "PLN", leading: "🇵🇱" },
];

const phoneCountryCodeOptions: SelectOption[] = [
  { id: "phone-ua", value: "+380", primary: "+380 Ukraine", leading: "🇺🇦" },
  { id: "phone-pl", value: "+48", primary: "+48 Poland", leading: "🇵🇱" },
  { id: "phone-de", value: "+49", primary: "+49 Germany", leading: "🇩🇪" },
  { id: "phone-fr", value: "+33", primary: "+33 France", leading: "🇫🇷" },
];

const meta = {
  title: "Components/Select/Use Cases",
  component: Select,
  parameters: {
    controls: {
      disable: true,
    },
  },
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

export const CountryCompactSingle: Story = {
  render: () => {
    const [value, setValue] = useState("UA");
    return (
      <>
        <SelectLabel size="small">Country</SelectLabel>
        <Select
          size="compact"
          hasLeading
          options={countryOptions}
          value={value}
          onValueChange={(next) => setValue(String(next))}
          placeholder="Select country"
        >
          {null}
        </Select>
      </>
    );
  },
};

export const CurrencyCompactSingle: Story = {
  render: () => {
    const [value, setValue] = useState("USD");
    return (
      <>
        <SelectLabel size="small">Currency</SelectLabel>
        <Select
          size="compact"
          hasLeading
          options={currencyOptions}
          value={value}
          onValueChange={(next) => setValue(String(next))}
          placeholder="Select currency"
        >
          {null}
        </Select>
      </>
    );
  },
};

export const PhoneCountryCodeCompactSingle: Story = {
  render: () => {
    const [value, setValue] = useState("+380");
    return (
      <>
        <SelectLabel size="small">Phone country code</SelectLabel>
        <Select
          size="compact"
          hasLeading
          options={phoneCountryCodeOptions}
          value={value}
          onValueChange={(next) => setValue(String(next))}
          placeholder="Select code"
        >
          {null}
        </Select>
      </>
    );
  },
};

export const CountryCompactMultiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["UA", "PL"]);
    return (
      <>
        <SelectLabel size="small" count={value.length}>
          Countries
        </SelectLabel>
        <Select
          size="compact"
          hasLeading
          isMultiple
          options={countryOptions}
          value={value}
          onValueChange={(next) => setValue(Array.isArray(next) ? next : [String(next)])}
          placeholder="Select countries"
        >
          {null}
        </Select>
      </>
    );
  },
};
