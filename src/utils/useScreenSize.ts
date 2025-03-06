/**
 * Hook personalizado para capturar el alto y ancho de la pantalla renderizada (width, y height)
 * @returns - Devuelve en valor numerico el width y height actual de renderizado.
 */

import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return { width, height };
};
