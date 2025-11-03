import { InputNumber as AntInputNumber, InputNumberProps } from "antd";
import React from "react";

interface CustomInputNumberProps extends InputNumberProps {
  label?: string;
  error?: string;
  required?: boolean;
}

const InputNumber: React.FC<CustomInputNumberProps> = ({ label, error, required, ...props }) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";
  return (
    <div className="w-full">
      {label && (
        <div className="label-text_form">
          {label} {requiredText}
        </div>
      )}
      <AntInputNumber className={`w-full ${error ? "border-error" : ""}`} type="number" {...props} />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default InputNumber;
