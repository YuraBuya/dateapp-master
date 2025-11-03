import type { SliderSingleProps } from 'antd';
import { Slider as AntSlider } from 'antd';
import React from 'react';

interface CustomSliderProps extends Omit<SliderSingleProps, 'className'> {
  label?: string;
  error?: string;
}

const Slider: React.FC<CustomSliderProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <div className="label-text_form">{label}</div>}
      <AntSlider
        className={`w-full ${error ? 'border-error' : ''}`}
        {...props}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Slider; 