import { Select as AntSelect, SelectProps } from "antd";
import React from "react";
import { cn } from "../utils";
import styles from "./common.module.css";

interface CustomSelectProps extends SelectProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  name: string;
  error?: string;
  multiple?: boolean;
  allowClear?: boolean;
  showNullOption?: boolean;
  nullOptionText?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  placeholder,
  required,
  className,
  name,
  error,
  multiple,
  allowClear = true,
  showNullOption = false,
  nullOptionText = "none",
  options = [],
  ...props
}) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";

  // 없음 옵션을 맨 위에 추가
  const enhancedOptions = showNullOption && !multiple ? [{ value: null, label: nullOptionText }, ...options] : options;

  return (
    <div className="flex flex-col flex-1">
      {label && (
        <span className="label-text_form">
          {label} {requiredText}
        </span>
      )}
      <AntSelect
        className={cn("w-full", className, error && styles.error)}
        placeholder={placeholder || "선택해 주세요"}
        allowClear={allowClear}
        options={enhancedOptions}
        {...props}
        mode={multiple ? "multiple" : undefined}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Select;
