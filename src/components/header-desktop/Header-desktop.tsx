import { HeaderProps, NavbarItem } from "../../types/Global";
import { cn } from "../../utils/utils";
import { Logotype } from "../Button-header-toggle";
import { ItemNavbar } from "../header-mobile/Header-mobile";

interface HeaderDesktopProps extends HeaderProps {
  renderButtonToggleDrawer: boolean;
}
export const HeaderDesktop = ({
  logo,
  containerNavbar,
  navbarItems,
  renderButtonToggleDrawer,
}: HeaderDesktopProps) => {
  const itemCount = navbarItems?.length || 0;

  return (
    <>
      <div
        className={cn(
          "w-full flex items-center",
          logo ? "justify-between" : "justify-center"
        )}
      >
        {logo && (
          <div className="w-[25%] flex justify-start">
            <Logotype
              logo={logo}
              renderButtonToggleDrawer={renderButtonToggleDrawer}
            />
          </div>
        )}
        {navbarItems && !containerNavbar ? (
          <nav
            aria-label="Main Navigation"
            className={cn(
              "flex items-center",
              // Si hay logo y <=3 elementos, reducir el ancho de la navbar
              logo && itemCount < 3
                ? "w-[20%] justify-between"
                : logo && itemCount > 4
                ? "w-[75%] justify-between"
                : // Si no hay logo y hay pocos elementos, centrarlos
                !logo && itemCount <= 3
                ? "w-full justify-center gap-6"
                : // Si no hay logo y hay más de 3 elementos, limitar el ancho
                  "w-[60%] justify-between"
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
