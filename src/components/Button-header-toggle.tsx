import { Link } from "react-router-dom";
import { LogoProps } from "../types/Global";
import { cn } from "../utils/utils";
import { HeaderMobileProps } from "./header-mobile/Header-mobile";

type Props = {
  isOpen: boolean;
  handleToggleDrawer: () => void;
  drawerBackgroundColor?: string;
};

const ThisButtonToggle = ({
  isOpen,
  handleToggleDrawer,
  drawerBackgroundColor,
}: Props) => {
  const spanClassName = cn(
    "block h-[5px] bg-black w-full rounded-[3px] transition-all duration-300 ease-in-out",
    !drawerBackgroundColor || drawerBackgroundColor?.includes("white")
      ? "bg-black"
      : "bg-white"
  );

  return (
    <div className="">
      <button
        onClick={handleToggleDrawer}
        aria-label={`${isOpen ? "Close" : "Open"} drawer`}
        className="cursor-pointer text-white flex flex-col justify-center items-center w-[2.5rem]"
      >
        <span
          className={`${spanClassName} ${
            isOpen ? "rotate-45 translate-y-[8px] mb-0" : "mb-[0.4rem]"
          }`}
        ></span>

        <span
          className={`${spanClassName} mb-[0.4rem] ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>

        <span
          className={`${spanClassName} mb-[0.4rem] ${
            isOpen ? "rotate-[-45deg] translate-y-[-8px]" : ""
          }`}
        ></span>
      </button>
    </div>
  );
};

export const Logotype = ({
  logo,
  renderButtonToggleDrawer,
}: {
  logo: LogoProps;
  renderButtonToggleDrawer: boolean;
}) => (
  <Link to={"/"} className="">
    {logo?.type === "logo_text" && (
      <p
        className={cn(
          "ml-8 text-3xl font-bold",
          !renderButtonToggleDrawer && "ml-0"
        )}
      >
        {logo?.logo}
      </p>
    )}
    {logo && logo?.type === "logo_image" && (
      <img src={logo?.logo as string} alt="logo" className="h-10 w-10" />
    )}
  </Link>
);

/**
 *
 * @param isOpen: Boolean - Estado actual del drawer
 * @param handleToggleDrawer: Función que se ejecuta al cambiar el estado del drawer
 * @param logo: Logo
 * @param renderButtonToggleDrawer: Renderizar o no el boton de toggle drawer
 * @returns ButtonHeaderToggle
 */
export const ButtonHeaderToggle = ({
  isOpen,
  handleToggleDrawer,
  logo,
  renderButtonToggleDrawer,
  drawerBackgroundColor,
}: HeaderMobileProps) => (
  <div
    className={cn(
      "flex items-center",
      !drawerBackgroundColor || drawerBackgroundColor?.includes("white")
        ? "text-black"
        : "text-white"
    )}
  >
    {renderButtonToggleDrawer && (
      <ThisButtonToggle
        isOpen={isOpen}
        handleToggleDrawer={handleToggleDrawer}
        drawerBackgroundColor={drawerBackgroundColor}
      />
    )}

    {logo && (
      <Logotype
        logo={logo}
        renderButtonToggleDrawer={renderButtonToggleDrawer}
      />
    )}
  </div>
);
