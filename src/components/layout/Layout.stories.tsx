import type { Meta, StoryObj } from "@storybook/react";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Layout> = {
  title: "components/Layout",
  tags: ["autodocs"],
  component: Layout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  args: {
    logo: {
      type: "logo_text",
      logo: "Supernova UI",
    },
    // containerNavbar: (
    //   <div>
    //     <p>Elemento 1</p>
    //     <p>Elemento 2</p>
    //     <p>Elemento 3</p>
    //     <p>Elemento 4</p>
    //   </div>
    // ),
    navbarItems: [
      {
        title: "Home",
        handleAction: () => console.log(""),
        icon: <p className="">&#169;</p>,
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

    children: (
      <div>
        <p>Data aca</p>
      </div>
    ),
    headerBackgroundColor: "bg-white",
    drawerBackgroundColor: "bg-red-400",
    renderButtonToggleDrawer: true,
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    //logo: undefined,
  },
};
