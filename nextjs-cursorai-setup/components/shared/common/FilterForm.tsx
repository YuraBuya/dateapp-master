import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Divider, Form, Space } from "antd";
import { Children, FormEvent, isValidElement, ReactElement, ReactNode, useState } from "react";
import { cn } from "../utils";
import Button from "./Button";

export interface IFilterForm {
  children?: ReactNode;
  onSubmit?: (e?: FormEvent) => void;
  className?: string;
}

export interface IFormItem {
  children?: ReactNode;
  isAdvanced?: boolean;
  className?: string;
}

export interface IFormAction {
  children?: ReactNode;
  className?: string;
}

export const FilterForm = ({ onSubmit, children, className }: IFilterForm) => {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children).filter(
    (child): child is ReactElement<IFormItem> => isValidElement(child) && child.type === FormItem
  );
  const actions = Children.toArray(children).filter(
    (child): child is ReactElement<IFormAction> => isValidElement(child) && child.type === FormAction
  );

  const hasAdvancedItems = items.some((item) => item.props.isAdvanced);

  return (
    <Form onFinish={onSubmit} className={cn("p-6 rounded-lg border bg-neutral-50 border-neutral-200", className)}>
      <Space direction="vertical" size="middle" className="w-full">
        {items.map((item) => {
          if (item.props.isAdvanced && !open) return null;
          return item;
        })}

        {hasAdvancedItems && (
          <div className="flex justify-center">
            <Divider className="w-full" />
            <Button
              type="link"
              onClick={() => setOpen((prev) => !prev)}
              icon={open ? <UpOutlined /> : <DownOutlined />}
              className="absolute"
            >
              {open ? "접기" : "더보기"}
            </Button>
          </div>
        )}

        {actions}
      </Space>
    </Form>
  );
};

export const FormItem = ({ children, className }: IFormItem) => {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
};

export const FormAction = ({ children, className }: IFormAction) => {
  return <div className={cn("flex gap-2 justify-end", className)}>{children}</div>;
};
