import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  component: Button,
  argTypes: {
    children: {
      description: "Button content",
    },
    variant: {
      description: "Colors variant",
      type: "string",
      options: ["default", "primary", "success", "warning", "danger", "ghost"],
      control: { type: "select" },
    },
    outline: {
      description: "Button outline",
      type: "boolean",
    },
    size: {
      description: "Button size",
      type: "string",
      options: ["default", "sm", "md", "lg", "full"],
      control: { type: "select" },
    },
    rounded: {
      description: "Button rounded",
      type: "string",
      options: ["basic", "sm", "md", "lg", "full"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const primary: Story = {
  args: {
    children: "Button primary",
    variant: "primary",
  },
};

export const success: Story = {
  args: {
    children: "Button success",
    variant: "success",
  },
};

export const warning: Story = {
  args: {
    children: "Button warning",
    variant: "warning",
  },
};

export const danger: Story = {
  args: {
    children: "Button danger",
    variant: "danger",
  },
};

export const Outline: Story = {
  args: {
    children: "Button outline",
    outline: true,
  },
};
