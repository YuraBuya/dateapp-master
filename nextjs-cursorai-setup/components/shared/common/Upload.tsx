import { FileOutlined } from "@ant-design/icons";
import { Upload as AntUpload, UploadProps } from "antd";
import React from "react";
import Input from "./Input";

const Upload: React.FC<UploadProps> = (props) => {
  return (
    <AntUpload {...props} className="w-full inline-block">
        <Input type="text" placeholder="파일 첨부" readOnly className="w-full" suffix={<FileOutlined />} />
        {props.children}
    </AntUpload>
  );
};

export default Upload;
