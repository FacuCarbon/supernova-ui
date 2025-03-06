import { useState, useEffect } from "react";
import { HeaderMobile } from "../header-mobile/Header-mobile";
import { LayoutProps } from "../../types/Global";
import { ButtonHeaderToggle } from "../Button-header-toggle";
import { HeaderDesktop, useScreenSize } from "../../main";
import { cn } from "../../utils/utils";

/**
 * Propiedades del componente Layout
 * @param children - ReactNode: Contenido del body
 * @param logo: Logo
 * @param containerNavbar: Contenido del header
 * @param navbarItems: NavbarItems
 * @param renderButtonToggleDrawer- Boolean: Renderizar o no el boton de toggle drawer
 * @param headerBackgroundColor - string: Color de fondo del header - solo disponible en clases bg-color de tailwind css.
 * @param drawerBackgroundColor - string: Color de fondo del drawer - solo disponible en clases bg-color de tailwind css.

 * @returns Layout
 */
export const Layout = ({
  children,
  logo,
  containerNavbar,
  navbarItems,
  renderButtonToggleDrawer,
  headerBackgroundColor,
  drawerBackgroundColor,
}: LayoutProps) => {
  const { width } = useScreenSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className="relative min-h-[20vh] w-full">
      <header
        className={cn(
          `sticky top-0 w-full transition-colors duration-300 flex items-center justify-between p-3  shadow-sm ${
            headerBackgroundColor ?? "bg-white"
          }`,
          containerNavbar && "shadow-none",
          !headerBackgroundColor || headerBackgroundColor?.includes("white")
            ? "text-black"
            : "text-white"
        )}
      >
        {width && width < 900 ? (
          <>
            <ButtonHeaderToggle
              handleToggleDrawer={handleToggle}
              isOpen={isOpen}
              logo={logo}
              renderButtonToggleDrawer={renderButtonToggleDrawer}
            />

            <HeaderMobile
              isOpen={isOpen}
              handleToggleDrawer={handleToggle}
              navbarItems={navbarItems}
              logo={logo}
              containerNavbar={containerNavbar}
              renderButtonToggleDrawer={renderButtonToggleDrawer}
              drawerBackgroundColor={drawerBackgroundColor}
            />
          </>
        ) : (
          <HeaderDesktop
            renderButtonToggleDrawer={false}
            logo={logo}
            navbarItems={navbarItems}
            containerNavbar={containerNavbar}
            drawerBackgroundColor={drawerBackgroundColor}
          />
        )}
      </header>

      <main className="mt-2 h-[200vh]">{children}</main>
    </div>
  );
};
