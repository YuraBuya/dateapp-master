import { Input as AntInput, InputProps, InputRef } from "antd";
import React, { forwardRef } from "react";
import { cn } from "../utils";

interface CustomInputProps extends InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  error?: string;
  description?: string;
  type?: string;
  maxLength?: number;
}

const Input = forwardRef<InputRef, CustomInputProps>(
  (
    { label, placeholder, required, className, rightIcon, leftIcon, error, description, type, maxLength, ...props },
    ref
  ) => {
    const requiredText = required ? <span className="label-text_form_required">*</span> : "";

    return (
      <div className="flex flex-col flex-1">
        {label && (
          <span className="flex gap-1 justify-between label-text_form">
            <span>
              {label} {requiredText}
            </span>{" "}
            {description && <span className="text-xs text-gray-500">{description}</span>}
          </span>
        )}
        <AntInput
          type={type || "text"}
          ref={ref}
          className={cn("w-full", className, error && "border-error")}
          placeholder={placeholder || "입력해 주세요"}
          {...props}
          suffix={rightIcon}
          prefix={leftIcon}
          maxLength={maxLength || 255}
        />
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
