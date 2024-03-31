import React, { useState } from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

const options = [
  { label: "Todos", value: "all" },
  { label: "Administrador", value: "admin" },
  { label: "Comum", value: "common" },
];

export const FilterSelectComponent: React.FC<{
  onFilterChange: (value: "all" | "admin" | "common") => void;
}> = ({ onFilterChange }) => {
  const [value3, setValue3] = useState<"all" | "admin" | "common">("all");

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    setValue3(value);
    onFilterChange(value);
  };

  return (
    <>
      <Radio.Group
        options={options}
        onChange={onChange3}
        value={value3}
        optionType="button"
      />
    </>
  );
};
