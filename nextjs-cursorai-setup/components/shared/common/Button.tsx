import { Button as AntButton, ButtonProps } from "antd";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ type, size, leftIcon, rightIcon, htmlType, loading, ...props }) => {
  return (
    <AntButton
      htmlType={htmlType || "button"}
      className="cursor-pointer"
      size={size || "middle"}
      type={type || "primary"}
      {...props}
      icon={leftIcon || rightIcon}
      iconPosition={leftIcon ? "start" : "end"}
      loading={loading}
    />
  );
};

export default Button;
