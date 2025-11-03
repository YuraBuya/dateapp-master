import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import React from "react";
import { cn } from "../utils";

interface CustomTextAreaProps extends TextAreaProps {
  label?: string;
  required?: boolean;
  error?: string;
}

const TextArea: React.FC<CustomTextAreaProps> = ({
  label,
  required,
  className,
  error,
  placeholder = "내용을 입력해주세요",
  rows = 4,
  ...props
}) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="label-text_form">
          {label} {requiredText}
        </div>
      )}
      <Input.TextArea
        className={cn(
          "w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          "placeholder:text-gray-400",
          className,
          error && "border-error"
        )}
        rows={rows}
        placeholder={placeholder}
        {...props}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default TextArea;
