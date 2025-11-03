import { DatePicker as AntDatePicker, DatePickerProps } from "antd";
import React from "react";

interface CustomDatePickerProps extends DatePickerProps {
  label?: string;
  required?: boolean;
  error?: string;
}

const DatePicker: React.FC<CustomDatePickerProps> = ({ label, required, error, ...props }) => {
  const requiredText = required ? <span className="text-error">*</span> : "";

  return (
    <div className="flex flex-col">
      {label && (
        <div className="label-text_form">
          {label} {requiredText}
        </div>
      )}
      <AntDatePicker className={`w-full ${error ? "border-error" : ""}`} {...props} />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default DatePicker;
