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
      placeholder='Search'
      isClearable={false}
      onChange={(selected) => onChange(selected.map((s) => s.value))}
      classNames={{
        control: () => "shadow-none",
        placeholder: () => "text-neutral-400",
        multiValueLabel: () => "bg-neutral-100",
        multiValueRemove: () => "bg-neutral-100",
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(CustomSelect), {
  ssr: false,
});
