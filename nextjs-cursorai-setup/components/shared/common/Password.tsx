import { Input as AntInput, InputProps, InputRef } from "antd";
import React, { forwardRef } from "react";
import { cn } from "../utils";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface CustomInputProps extends InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rightIcon?: React.ReactNode;  
  leftIcon?: React.ReactNode;
  error?: string;
}

const Password = forwardRef<InputRef, CustomInputProps>(({ 
  label, 
  placeholder, 
  required, 
  className, 
  rightIcon, 
  leftIcon, 
  error, 
  ...props 
}, ref) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";

  return (
    <div className="flex flex-col flex-1">
      {label && (
        <span className="label-text_form">
          {label} {requiredText}
        </span>
      )}
      <AntInput.Password
        ref={ref}
        className={cn("w-full", className, error && "border-error")} 
        placeholder={placeholder || "입력해 주세요"} 
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        {...props} 
        prefix={leftIcon}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

Password.displayName = 'Password';

export default Password;
