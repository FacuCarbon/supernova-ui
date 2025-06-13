import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PhoneInput } from "./Phone-input";
import { getCountries } from "libphonenumber-js";

const countries = getCountries();

const meta: Meta<typeof PhoneInput> = {
  title: "Components/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  decorators: [],
  argTypes: {
    actionInput: {
      description: "Función para actualizar el valor del input",
      table: { category: "input data" },
    },
    valueInput: {
      description: "Valor del phone",
      table: { category: "input data" },
      control: { type: "text" },
    },
    typeInput: {
      description: "Tipo del input (opcional)",
      table: { category: "input data" },
      control: { type: "select" },
      options: ["tel", "number"],
    },
    nameInput: {
      description: "Nombre del input (opcional)",
      table: { category: "input data" },
      control: { type: "text" },
    },
    placeholderInput: {
      description: "Texto de placeholder del input (opcional)",
      table: { category: "input data" },
      control: { type: "text" },
    },
    disabledInput: {
      description: "Si el input está deshabilitado (opcional)",
      table: { category: "input data" },
      control: "boolean",
    },
    requiredInput: {
      description: "Si el input es requerido (opcional)",
      table: { category: "input data" },
      control: "boolean",
    },
    inputClass: {
      description: "Clase tailwind input (opcional)",
      table: { category: "input data" },
      control: { type: "text" },
    },
    containerDropdownClass: {
      description: "Clase tailwind container dropdown (opcional)",
      table: { category: "dropdown data" },
    },
    itemDropdownClass: {
      description: "Clase tailwind item dropdown (opcional)",
      table: { category: "dropdown data" },
    },
    dropdownClass: {
      description: "Clase tailwind dropdown (opcional)",
      table: { category: "dropdown data" },
    },
    disabledDropdown: {
      description: "Si el dropdown está deshabilitado (opcional)",
      table: { category: "dropdown data" },
      control: "boolean",
    },
    label: {
      control: "text",
      description: "Etiqueta del input",
    },
    defaultCountry: {
      control: { type: "select" },
      options: countries,
      description: "País por defecto",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.valueInput ?? "");

    return (
      <PhoneInput
        {...args}
        actionInput={(v) => setValue(v)}
        valueInput={value}
        nameInput="phone"
        placeholderInput="Phone number"
        typeInput="tel"
        label="Phone"
        defaultCountry="US"
      />
    );
  },
  args: {
    label: "Phone",
    defaultCountry: "US",

    nameInput: "phone",
    placeholderInput: "Phone number",
    disabledInput: false,
    requiredInput: false,
    typeInput: "tel",

    disabledDropdown: false,
  },
};
