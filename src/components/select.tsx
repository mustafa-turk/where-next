import dynamic from "next/dynamic";
import Select from "react-select";

import { getAllCountries } from "@/utils/lookup";

function CustomSelect({ onChange }: { onChange: Function }) {
  const options = getAllCountries().map((c) => ({
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
        multiValueRemove: () => "text-white",
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(CustomSelect), {
  ssr: false,
});
