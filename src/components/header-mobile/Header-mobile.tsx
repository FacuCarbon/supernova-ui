import { Link } from "react-router-dom";
import { ButtonHeaderToggle } from "../Button-header-toggle";
import { HeaderProps, NavbarItem } from "../../types/Global";
import { cn } from "../../utils/utils";
import { useCallback, useEffect } from "react";

export interface HeaderMobileProps extends HeaderProps {
  isOpen: boolean;
  handleToggleDrawer: () => void;
  renderButtonToggleDrawer: boolean;
}

export const ItemNavbar = ({
  title,
  handleAction,
  icon,
  url,
  text_color,
  underline,
}: NavbarItem) => {
  const renderTitle = (
    <p
      style={{ color: text_color }}
      className={cn(
        "text-xl font-bold md:text-lg",
        icon && "ml-1",
        underline && "underline"
      )}
    >
      {title}
    </p>
  );
  const classContainer =
    "flex items-center mb-3 hover:underline cursor-pointer md:mb-0";

  if (!url && !handleAction) {
    console.warn("ItemNavbar necesita al menos una URL o una acción.");
    return null;
  }

  if (url) {
    return (
      <Link to={url} className={`${classContainer}`}>
        {icon && icon} {renderTitle}
      </Link>
    );
  } else {
    if (handleAction) {
      return (
        <button
          aria-label="Action click for item"
          onClick={handleAction}
          className={`${classContainer}`}
        >
          {icon && icon} {renderTitle}
        </button>
      );
    }
  }
};

/**
 *
 * @param isOpen: Boolean - Estado actual del drawer
 * @param handleToggleDrawer: Función que se ejecuta al cambiar el estado del drawer
 * @param containerNavbar: Contenido del body
 * @param logo: Logo
 * @param navbarItems: NavbarItems
 * @param renderButtonToggleDrawer: Renderizar o no el boton de toggle drawer
 * @param drawerBackgroundColor: Color de fondo del drawer y header - solo disponible en clases bg-color de tailwind css.
 * @returns HeaderMobile
 */

export const HeaderMobile = ({
  isOpen,
  handleToggleDrawer,
  containerNavbar,
  logo,
  navbarItems,
  renderButtonToggleDrawer,
  drawerBackgroundColor,
}: HeaderMobileProps) => {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleToggleDrawer();
      }
    },
    [handleToggleDrawer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-400 bg-opacity-50 z-40"
          onClick={handleToggleDrawer}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-[20rem] ${
          drawerBackgroundColor ?? "bg-white"
        } shadow-lg z-50 p-4 transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ButtonHeaderToggle
          handleToggleDrawer={handleToggleDrawer}
          isOpen={isOpen}
          logo={logo}
          renderButtonToggleDrawer={renderButtonToggleDrawer}
          drawerBackgroundColor={drawerBackgroundColor}
        />

        {navbarItems && !containerNavbar ? (
          <nav
            className={cn(
              "mt-6",
              !drawerBackgroundColor || drawerBackgroundColor?.includes("white")
                ? "text-black"
                : "text-white"
            )}
          >
            {navbarItems?.map((navItem: NavbarItem, i: number) => (
              <ItemNavbar {...navItem} key={navItem?.id ?? i} />
            ))}
          </nav>
        ) : (
          <>{containerNavbar}</>
        )}
      </div>
    </>
  );
};
