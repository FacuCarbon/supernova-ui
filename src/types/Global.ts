import { ReactNode } from "react";

export type LogoProps = {
  type: "logo_text" | "logo_image";
  logo: string | ReactNode;
};

export type NavbarItem = {
  id?: string | number;
  title: string;
  text_color?: string;
  underline?: boolean;
  url?: string;
  icon?: ReactNode;
  handleAction?: () => void;
};

export interface HeaderProps {
  navbarItems?: NavbarItem[];
  containerNavbar?: ReactNode;
  logo?: LogoProps;
  drawerBackgroundColor?: string;
}

export interface LayoutProps {
  children: ReactNode;
  logo?: LogoProps;
  containerNavbar?: ReactNode;
  navbarItems?: NavbarItem[];
  renderButtonToggleDrawer: boolean;
  drawerBackgroundColor?: string;
  headerBackgroundColor?: string;
}
