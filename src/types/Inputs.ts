import { CountryCode } from "libphonenumber-js";

export type PhoneNumberProps = {
  inputClass?: string;
  nameInput?: string;
  placeholderInput?: string;
  disabledInput?: boolean;
  requiredInput?: boolean;
  actionInput: (value: string) => void;
  valueInput: string;
  typeInput: "tel" | "number";
  //
  label?: string;
  //
  //
  defaultCountry?: CountryCode;
  dropdownClass?: string;
  containerDropdownClass?: string;
  itemDropdownClass?: string;
  disabledDropdown?: boolean;
};
