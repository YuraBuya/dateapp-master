import { Radio as AntRadio, RadioProps } from "antd";
import React from "react";

interface CustomRadioProps extends RadioProps {
  label?: string;
  error?: string;
  options?: { label: string; value: string | number }[];
}

const Radio: React.FC<CustomRadioProps> = ({ label, error, options, required, ...props }) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";

  return (
    <div className="w-full">
      {label && <div className="label-text_form">{label} {requiredText}</div>}
      <AntRadio.Group className={`w-full ${error ? "border-error" : ""}`} {...props}>
        {options?.map((option) => (
          <AntRadio key={option.value} value={option.value}>
            {option.label}
          </AntRadio>
        ))}
      </AntRadio.Group>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Radio;
