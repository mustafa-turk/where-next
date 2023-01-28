import Select from "react-select";
import dynamic from "next/dynamic";

import { getCountries } from "@/utils/lookup";

function CustomSelect({ onChange }: { onChange: Function }) {
  const options = getCountries().map((c) => ({
    value: c.name,
    label: `${c.emoji} ${c.name}`,
  }));

  return (
    <Select
      options={options}
      isMulti
      placeholder='Search visited countries'
      isClearable={false}
      className='my-react-select-container'
      classNamePrefix='my-react-select'
      onChange={(selected) => onChange(selected.map((s) => s.value))}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      classNames={{
        control: () => "shadow-none",
        placeholder: () => "text-neutral-900",
        multiValueLabel: () => "bg-neutral-800",
        multiValueRemove: () => "bg-neutral-800 text-white",
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(CustomSelect), {
  ssr: false,
});
