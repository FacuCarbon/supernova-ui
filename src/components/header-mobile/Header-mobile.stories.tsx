import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HeaderMobile } from "./Header-mobile";
import { BrowserRouter } from "react-router-dom";
import { ButtonHeaderToggle } from "../Button-header-toggle";

const meta: Meta<typeof HeaderMobile> = {
  title: "components/HeaderMobile",
  tags: ["autodocs"],
  component: HeaderMobile,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    isOpen: {
      description: "Visibilidad del header",
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderMobile>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <ButtonHeaderToggle
          handleToggleDrawer={() => setIsOpen((prev) => !prev)}
          isOpen={isOpen}
          renderButtonToggleDrawer={true}
        />
        <HeaderMobile
          {...args}
          isOpen={isOpen}
          handleToggleDrawer={() => setIsOpen((prev) => !prev)}
        />
      </div>
    );
  },
  args: {
    navbarItems: [
      {
        title: "Home",
        handleAction: () => console.log(""),
        icon: <p>&#169;</p>,
      },
      {
        title: "About",
        url: "/about",
        underline: true,
      },
      {
        title: "Contact",
        url: "/contact",
        text_color: "text-red-400",
      },
      {
        title: "Blog",
        url: "/blog",
      },
      {
        title: "Portfolio",
        url: "/portfolio",
      },
    ],
    renderButtonToggleDrawer: true,
    logo: {
      type: "logo_text",
      logo: "Supernova UI",
    },
  },
};
