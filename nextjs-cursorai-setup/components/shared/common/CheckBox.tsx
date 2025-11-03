import { Checkbox as AntCheckBox, CheckboxProps } from "antd";
import React from "react";

interface CustomInputProps extends CheckboxProps {
  label?: string;
  error?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  labelTit?: string;
}

const CheckBox: React.FC<CustomInputProps> = ({ label, error, required, options, labelTit, ...props }) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";

  return (
    <div className="flex flex-col">
      {label && <div className="label-text_form">{labelTit} {requiredText}</div>}
      <div className="flex gap-2 whitespace-nowrap">
        {
          options?.map((option) => (
            <AntCheckBox key={option.value} {...props} >{option.label}</AntCheckBox>
          ))
        }
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default CheckBox;
