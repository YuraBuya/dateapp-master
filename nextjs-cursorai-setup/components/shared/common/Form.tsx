import { Form as AntForm, FormProps } from "antd";
import React from "react";
import { cn } from "../utils";

interface CustomFormProps extends FormProps {
  children: React.ReactNode;
  span?: number;
}

const Form: React.FC<CustomFormProps> & {
  useForm: typeof AntForm.useForm;
  Item: typeof AntForm.Item;
} = ({ children, className, span, ...props }) => {
  return (
    <AntForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: span || 24 }}
      className={cn(
        "w-full [&_.ant-upload]:w-full [&_.ant-form-item-explain-error]:text-red-500 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-explain-error]:mt-1",
        className
      )}
      {...props}
    >
      {children}
    </AntForm>
  );
};

Form.useForm = AntForm.useForm;
Form.Item = AntForm.Item;

export default Form;
