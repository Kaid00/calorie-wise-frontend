/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import { SelectOption } from "@/types/index";

export type DropdownSelectProps<T> = {
  options: SelectOption[];
  onChange: (value: T) => void;
  defaultValue?: T;
};

function DropdownSelect({
  options,
  onChange,
  defaultValue,
}: DropdownSelectProps<SelectOption>) {
  const customStyles = {
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      // change border color based on focus
      borderColor: state.isFocused ? "#71717A" : "#A1A1AA",
      // add padding
      padding: `3px`,
      // add backgound Color
      backgroundColor: "#FAFAFA",
      //set text
      color: "#3F3F46",

      borderRadius: "0.5rem",
      //set width
    }),
    option: (base: any) => ({
      ...base,
      textAlign: "left",
    }),
  };

  return (
    <Select
      defaultValue={defaultValue}
      isClearable
      placeholder={defaultValue?.label}
      isSearchable={false}
      options={options}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#d95717",
          primary: "black",
        },
      })}
      required
      onChange={(event) => onChange(event as SelectOption)}
    ></Select>
  );
}
export default DropdownSelect;
