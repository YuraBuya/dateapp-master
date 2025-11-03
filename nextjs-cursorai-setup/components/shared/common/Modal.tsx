import { Modal as AntModal, ModalProps } from "antd";
import { XIcon } from "lucide-react";
import React from "react";

interface CustomModalProps extends ModalProps {
  title?: React.ReactNode;
  width?: number;
}

const Modal: React.FC<CustomModalProps> = ({ title, width, ...props }) => {
  return (
    <AntModal
      title={title}
      centered
      maskClosable
      width={width || 600}
      closeIcon={<XIcon className="text-gray-400 hover:text-gray-600 text-xl" />}
      styles={{
        header: {
          padding: "0 0 16px 0",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: 0,
        },
        body: {
          padding: "24px 0",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          overflowX: "hidden",
        },
        footer: {
          padding: "16px 0 0 0",
          borderTop: "1px solid #f0f0f0",
          marginTop: 0,
        },
      }}
      {...props}
    >
      {props.children}
    </AntModal>
  );
};

export default Modal;
