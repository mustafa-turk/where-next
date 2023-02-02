import dynamic from "next/dynamic";
import Select from "react-select";

import { getAllCountries } from "@/utils/lookup";

type Props = {
  onChange: Function;
  isDisabled: boolean;
};

function CustomSelect({ onChange, isDisabled }: Props) {
  const isWindows = navigator.platform.indexOf("Win") === 0;

  const options = getAllCountries().map((c) => ({
    value: c.name,
    label: isWindows ? c.name : `${c.emoji} ${c.name}`,
  }));

  return (
    <Select
      options={options}
      isMulti
      placeholder='Search visited countries'
      isClearable={false}
      isDisabled={isDisabled}
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
