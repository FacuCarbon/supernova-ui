"use client";
/**
 * Componente personalizado para el campo de teléfono.
 * @author @FacuCarbon https://github.com/FacuCarbon
 *
 * @param valueInput {string} Valor actual del input telefónico.
 * @param actionInput {(value: string) => void} Función que se ejecuta al cambiar el valor del input.
 * @param label {string} Texto de la etiqueta del input. (opcional)
 * @param nameInput {string} Nombre del input-label. (opcional)
 * @param placeholderInput {string} Placeholder del input. (opcional)
 * @param disabledInput {boolean} Si el input está deshabilitado. (opcional)
 * @param requiredInput {boolean} Si el input es requerido. (opcional)
 * @param defaultCountry {CountryCode} Código de país por defecto para el prefijo. (opcional, por defecto "US")
 * @param typeInput {"tel" | "number"} Tipo de input. (opcional, por defecto "tel")
 * @param inputClass {string} Clases de estilo tailwind para el input. (opcional)
 * @param dropdownClass {string} Clases de estilo tailwind para el botón de dropdown. (opcional)
 * @param containerDropdownClass {string} Clases de estilo tailwind para el contenedor del dropdown. (opcional)
 * @param itemDropdownClass {string} Clases de estilo tailwind para los ítems del dropdown. (opcional)
 * @param disabledDropdown {boolean} Si el dropdown está deshabilitado. No permite seleccionar país. (opcional)
 *
 * @returns {JSX.Element} Elemento JSX que representa un input telefónico con selección de país.
 */

import { ChangeEvent, useState, useEffect, useRef } from "react";
import parsePhoneNumberFromString, {
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from "libphonenumber-js";
import { twMerge } from "tailwind-merge";
import { PhoneNumberProps } from "../../types/Inputs";

export const PhoneInput = ({
  inputClass,
  nameInput,
  placeholderInput,
  disabledInput,
  requiredInput,
  actionInput,
  valueInput,
  typeInput,
  label,
  defaultCountry = "US",
  dropdownClass,
  containerDropdownClass,
  itemDropdownClass,
  disabledDropdown,
}: PhoneNumberProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [countrySelected, setCountrySelected] =
    useState<CountryCode>(defaultCountry);
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState(valueInput);

  const countries = getCountries();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    val = val?.replace(/[^\d+]/g, "");

    const callingCode = getCountryCallingCode(countrySelected);
    const prefix = `+${callingCode}`;

    if (!val?.startsWith("+")) {
      val = prefix + val;
    }

    setInputValue(val);
    actionInput(val);
  };

  const handleSelectCountry = (c: CountryCode) => {
    setCountrySelected(c);
    setOpen(false);

    const callingCode = getCountryCallingCode(c);
    const newValue = `+${callingCode}`;

    setInputValue(newValue);
    actionInput(newValue);
  };

  useEffect(() => {
    setInputValue(valueInput);
    const phoneNumber = parsePhoneNumberFromString(valueInput);
    if (phoneNumber?.country) {
      setCountrySelected(phoneNumber.country);
    }
  }, [valueInput]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-sm transition-all duration-300">
      {label !== undefined && (
        <label
          htmlFor={nameInput ?? "phone"}
          className="block text-sm font-medium text-slate-700"
        >
          {label} {requiredInput && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center w-full rounded-md bg-dark-light border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
        <div ref={dropdownRef} className="">
          <button
            onClick={() => {
              if (!disabledDropdown) setOpen(!open);
            }}
            type="button"
            disabled={disabledDropdown}
            className={twMerge(
              "flex items-center gap-1 p-[0.5rem] border-r",
              dropdownClass,
              disabledDropdown
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            )}
          >
            <span
              className={`flag-icon flag-icon-${countrySelected?.toLowerCase()}`}
            ></span>
            <span className="text-sm ml-1">
              {countrySelected?.toUpperCase()}
            </span>
          </button>

          {open && (
            <div
              className={twMerge(
                "absolute z-10 left-0 top-[2.3rem] w-full max-h-64 bg-dark-light overflow-y-auto border shadow rounded",
                containerDropdownClass
              )}
            >
              {countries.map((c) => (
                <div
                  key={c}
                  onClick={() => handleSelectCountry(c)}
                  className={twMerge(
                    "flex items-center gap-2 px-3 py-1 hover:bg-slate-500 cursor-pointer",
                    itemDropdownClass
                  )}
                >
                  <span
                    className={`flag-icon flag-icon-${c.toLowerCase()}`}
                  ></span>
                  <span className="text-sm">{c.toUpperCase()}</span>
                  <span className="text-xs text-slate-500">
                    +{getCountryCallingCode(c)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type={typeInput ?? "tel"}
          id={nameInput ?? "phone"}
          name={nameInput ?? "phone"}
          disabled={disabledInput}
          required={requiredInput}
          className={twMerge(
            "flex-1 focus:outline-none p-[0.5rem] text-sm",
            inputClass,
            disabledInput ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholderInput ?? "Phone number"}
        />
      </div>
    </div>
  );
};
