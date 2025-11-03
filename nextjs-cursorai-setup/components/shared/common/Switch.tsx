import { Switch as AntSwitch, SwitchProps } from 'antd';
import React from 'react';

interface CustomSwitchProps extends SwitchProps {
  label?: string;
  error?: string;
  required?: boolean;
}

const Switch: React.FC<CustomSwitchProps> = ({ label, error, required, ...props }) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";

  return (
    <div className="w-full">
      {label && <div className="label-text_form">{label} {requiredText}</div>}
      <div className="flex items-center">
        <AntSwitch
          className={error ? 'border-error' : ''}
          {...props}
        />
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Switch; 