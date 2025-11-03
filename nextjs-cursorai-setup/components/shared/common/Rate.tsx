import { Rate as AntRate, RateProps } from 'antd';
import React from 'react';

interface CustomRateProps extends RateProps {
  label?: string;
  error?: string;
  required?: boolean;
}

const Rate: React.FC<CustomRateProps> = ({ label, error, required, ...props }) => {
  const requiredText = required ? <span className="label-text_form_required">*</span> : "";

  return (
    <div className="w-full">
      {label && <div className="label-text_form">{label} {requiredText}</div>}
      <div className="flex items-center">
        <AntRate
          className={error ? 'border-error' : ''}
          {...props}
        />
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Rate; 